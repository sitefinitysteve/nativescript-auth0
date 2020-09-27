import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.auth0demo',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    requireModules: {
      0: 'nativescript-auth0',
    },
  },
  appPath: 'app',
  webpackConfigPath: './webpack.custom.config.js',
} as NativeScriptConfig
