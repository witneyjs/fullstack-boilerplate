import { addRoute } from ".";

export const REDIRECT_ROUTE = "redirect";

export default function(routes) {
  addRoute(routes, {
    id: REDIRECT_ROUTE,
    path: "/redirect",
    controller: BUILD.IS_NODE && (() => import("@lib/back/controllers/home")),
    action: "redirect",
    view: () => import("@lib/front/screens/home")
  });
}
