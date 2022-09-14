const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
    publicPath: process.env.NODE_ENV === "development" ? "/" : "",
    configureWebpack: {
      plugins: [new GenerateSW()]
    },
    pwa: {
      name: 'Bitacora Prosis',
      themeColor: '#2c5282', //not required for service worker, but place theme color here if manifest.json doesn't change the color
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: '#2c5282',
      workboxPluginMode: 'InjectManifest',    
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'src/service-worker.js'
        // ...other Workbox options... 
      }
    }
  }