const webpack = require("@nativescript/webpack");

module.exports = (env) => {
  // handle auth0 activity for android (appComponents are only handled for android)
  env.appComponents = (env.appComponents || []).concat([
    "nativescript-auth0/android/provider/redirectActivity",
  ]);
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  return webpack.resolveConfig();
};
