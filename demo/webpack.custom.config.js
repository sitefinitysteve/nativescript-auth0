const webpackConfig = require("./webpack.config");

module.exports = env => {
  env = env || {};
  env.appComponents = env.appComponents || [];
  env.appComponents.push("nativescript-auth0/android/provider/redirectActivity");

  const config = webpackConfig(env);
  return config;
};
