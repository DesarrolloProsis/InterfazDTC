module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: 'Mantenimiento',
      themeColor: '#FF5733',
      msTileColor: '#FF5733',
      appleMobileWebAppCapable: 'yes',      
  
      // configure the workbox plugin      
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'dev/sw.js',
        // ...other Workbox options...
      }
    }
  }