module.exports = function() {
  let config = {
    isNode: false,
    isLibrary: false,
    id: "front",
    useHot: true
  };

  config.useWorkBox = !config.isLibrary;
  config.useHtmlCreation = !config.isLibrary;
  config.useCodeSplitting = !config.isLibrary;

  return config;
};