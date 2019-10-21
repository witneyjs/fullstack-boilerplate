import { h, render } from "preact";
import { createRouter, constants } from "router5";
import browserPlugin from "router5-plugin-browser";
import { observable, observe, batchStart, batchEnd } from "alo";
import ky from "ky-universal";

import { config, createRouter5Config } from "../../common/config";
import { App } from "@lib/common/containers/app";
import { createFrontActionResult } from "@lib/common/controllers";
import svg from "../assets/svgs.svg.txt";
import { appendSvg } from "../util/svg";

appendSvg(svg);

const globals = observable({
  data: window["ACTION_RESULT"].data,
  route: null,
  router: null,
  view: null
} as any);

const router5Config = createRouter5Config(config);
const router = createRouter(router5Config.routes, router5Config.options);
globals.router = router;
router.usePlugin(
  browserPlugin({
    useHash: false
  })
);
router.subscribe(function({ route }) {
  globals.route = route;
});
router.start();

const mount = function() {
  render(<App globals={globals} />, document.querySelector(".root")!);
};

let initialUpdate = true;
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

observe(function() {
  const route = globals.route;
  if (!route) return;

  loadRoute(route);
});

if (module.hot) {
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
