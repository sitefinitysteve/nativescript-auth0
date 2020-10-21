import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.auth0demo',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'src',
  webpackConfigPath: './webpack.custom.config.js',
} as NativeScriptConfig
