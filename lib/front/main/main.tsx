import { h, render } from "preact";
import { constants } from "router5";
import { observable, batchStart, batchEnd } from "alo";
import ky from "ky-universal";

import { App } from "@lib/common/containers/app";
import { createFrontActionResult } from "@lib/common/controllers";
import svg from "../assets/svgs.svg.txt";
import { appendSvg } from "../util/svg";
import { createRouter } from "../router";
import { config, createRouter5Config } from "./../../common/config";

appendSvg(svg);

const globals = observable({
  data: {},
  route: null,
  router: null,
  view: null
} as any);

if (window["ACTION_RESULT"]) {
  globals.data = window["ACTION_RESULT"].data;
}

let initialUpdate = true;
let router: ReturnType<typeof createRouter>;
let unsubscribe;
const init = function({ config }) {
  initialUpdate = true;

  if (router) {
    unsubscribe();
    router.stop();
  }

  batchStart();

  router = createRouter({ config, createRouter5Config });
  unsubscribe = router.subscribe(function({ route }) {
    globals.route = route;
    if (!route) return;
    loadRoute(route);
  });
  router.start();
  globals.router = router;

  batchEnd();
};

const mount = function() {
  render(<App globals={globals} />, document.querySelector(".root")!);
};

const loadRoute = async function(route) {
  let routeName =
    route.name === constants.UNKNOWN_ROUTE ? config.notFoundRoute : route.name;

  const nextViewPromise = config.routes[routeName].view();

  let actionResultResponse: Response;
  let actionResult: ReturnType<typeof createFrontActionResult> | undefined;
  if (!initialUpdate) {
    actionResultResponse = await ky(route.path, {
      headers: {
        Accept: "application/json"
      }
    });
    if (actionResultResponse.ok) {
      actionResult = await actionResultResponse.json();
    } else {
      console.error("Something went wrong");
    }
  }

  if (actionResult && actionResult.redirect) {
    location.replace(actionResult.redirect.url);
  }

  const nextView = await nextViewPromise;

  batchStart();
  globals.view = nextView.default;
  if (!initialUpdate && actionResult) {
    globals.data = actionResult.data;
  }
  batchEnd();

  if (initialUpdate) {
    mount();
  }
  initialUpdate = false;
};

init({ config });

if (module.hot) {
  module.hot.accept("./../../common/config", function() {
    init({ config });
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
