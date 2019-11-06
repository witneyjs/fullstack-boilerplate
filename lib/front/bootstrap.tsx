import { batchStart, batchEnd } from "alo";
import { Router } from "router5";

import { createRouter } from "./router";
import { config } from "../common/config";
import { createController } from "./controller";
import { createGlobals } from "@lib/common/globals";

const globals = createGlobals();

if (window["ACTION_RESULT"]) {
  globals.data = window["ACTION_RESULT"].data;
}

let router: Router;
let unsubscribe;
const init = function() {
  let controller = createController({ config, globals });

  if (router) {
    unsubscribe();
    router.stop();
  }

  batchStart();

  router = createRouter({ config });
  unsubscribe = router.subscribe(function({ route }) {
    globals.route = route;
    if (!route) {
      console.error("Something is fishy");
    }
    controller(route);
  });
  router.start();
  globals.router = router;

  batchEnd();
};

init();

if (module.hot) {
  module.hot.accept("../common/config", function() {
    init();
  });
  module.hot.addStatusHandler(function(status) {
    // TODO: Check if webpack 5 might bring a better solution
    // After a syntax error HMR stops updating itself and stays in "check"
    // We have to reload the page to fix HMR again :/
    setTimeout(function() {
      if (module!.hot!.status() === "check") {
        location.reload();
      }
    }, 2000);
  });
}
