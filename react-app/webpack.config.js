const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "gyf",
    projectName: "reactApp",
    webpackConfigEnv,
    argv,
  });

  return defaultConfig;
};
