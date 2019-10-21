import { addRoute } from ".";

export const HOME_ROUTE = "home";

export default function(routes) {
  addRoute(routes, {
    id: HOME_ROUTE,
    path: "/?name&color",
    controller: BUILD.IS_NODE && (() => import("@lib/back/controllers/home")),
    action: "index",
    view: () => import("@lib/front/screens/home")
  });
}
