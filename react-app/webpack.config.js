const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "rlarreta",
    projectName: "reactApp",
    webpackConfigEnv,
    argv,
  });

  return defaultConfig;
};
