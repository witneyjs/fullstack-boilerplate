import { addRoute } from ".";

export const NOT_HOME_ROUTE = "notHome";

export default function(routes) {
  addRoute(routes, {
    id: NOT_HOME_ROUTE,
    path: "/notHome",
    controller: BUILD.IS_NODE && (() => import("@lib/back/controllers/home")),
    action: "index",
    view: () => import("@lib/front/screens/notHome")
  });
}
