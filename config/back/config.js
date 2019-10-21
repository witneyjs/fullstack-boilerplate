module.exports = function() {
  let config = {
    isNode: true,
    isLibrary: false,
    id: "back",
    useHot: true,
    devServerPort: 8081
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;

  return config;
};
