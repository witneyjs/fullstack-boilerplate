import { addRoute } from ".";

export default function(routes) {
  addRoute(routes, {
    id: "ioc",
    path: "/ioc",
    controller:
      BUILD.IS_NODE && (() => import("@lib/back/controllers/iocTest")),
    action: "index",
    view: () => import("@lib/front/screens/home")
  });
}
