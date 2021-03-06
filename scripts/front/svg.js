#!/usr/bin/env node

const { paths } = require("../../lib/node");
const path = require("path");

const nameSpaceId = "front";
const featherDir = paths.project("node_modules/feathericon/build/svg");

require("../templates/svg")({
  name: "svgs",
  nameSpaceId,
  svgs: {
    home: path.join(featherDir, "home.svg"),
    rocket: path.join(featherDir, "rocket.svg"),
    smile: path.join(featherDir, "smile.svg")
  }
});
