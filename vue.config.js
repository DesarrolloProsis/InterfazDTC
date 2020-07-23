module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: 'Mantenimiento',
      themeColor: '#083756',
      background_color: '#083756',
      msTileColor: '#083756',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: '#083756',
  
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'src/service-worker.js',
        // ...other Workbox options...
      }
    }
  }
  