import { Route, NewRoute } from "./types";

import homeRoute from "./home";
import notHomeRoute from "./notHome";
import redirectRoute from "./redirect";
import iocRoute from "./ioc";

const activeRoutes = [homeRoute, notHomeRoute, redirectRoute, iocRoute];

export const createRoutes = function() {
  let routes: { [key: string]: Route } = {};
  activeRoutes.forEach(function(val) {
    val(routes);
  });

  return routes;
};

export const addRoute = function(routes, config: NewRoute) {
  if (routes[config.id]) {
    throw new Error(`Route Id "${config.id}" already exists`);
  }

  const route: Route = {
    ...config,
    action: config.action || "index"
  };

  routes[config.id] = route;
};
