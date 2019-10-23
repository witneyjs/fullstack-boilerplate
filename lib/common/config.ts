import { createRoutes } from "./routes";

export const config = {
  routes: createRoutes(),
  notFoundRoute: "home",
  router5options: {
    trailingSlash: true,
    allowNotFound: true
  }
};
