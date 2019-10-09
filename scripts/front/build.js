#!/usr/bin/env node

const { paths } = require("../../lib/node");

require("../templates/build")({
  nameSpaceId: "front",
  useDevServer: true,
  useBundleAnalyzer: true,
  rawJsBundles: {
    "externals.js": {
      files: [
        {
          jsPath: paths.project("node_modules/faye/client/faye-browser.js")
        }
      ]
    }
  }
});
