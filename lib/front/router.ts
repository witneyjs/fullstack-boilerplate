import { createRouter as createRouter_ } from "router5";
import browserPlugin from "router5-plugin-browser";

export const createRouter = function({ config, createRouter5Config }) {
  const router5Config = createRouter5Config(config);
  const router = createRouter_(router5Config.routes, router5Config.options);
  router.usePlugin(
    browserPlugin({
      useHash: false
    })
  );

  return router;
};
