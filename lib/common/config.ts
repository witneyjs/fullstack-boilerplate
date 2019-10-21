import { createRoutes } from "./routes";

export const config = {
  routes: createRoutes(),
  notFoundRoute: "home",
  router5options: {
    trailingSlash: true,
    allowNotFound: true
  }
};

export const createRouter5Config = function(aConfig: typeof config) {
  const router5config = { routes: [] as any[], options: {} };
  for (const [key, value] of Object.entries(aConfig.routes)) {
    router5config.routes.push({
      name: key,
      path: value.path
    });
  }

  router5config.options = aConfig.router5options;

  return router5config;
};
