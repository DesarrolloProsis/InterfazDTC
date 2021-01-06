<template>

  <div id="app">    
      
    <router-view/>
    <Fotter></Fotter>

  </div>
</template>


<script>
import Fotter from '../src/components/footer'

  export default {
    components: {
      Fotter
    },
    created() {
      if (this.$workbox) {
        this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
        });
      }
    },

    methods: {
      async accept() {
        this.showUpgradeUI = false
        await this.$workbox.messageSW({ type: "SKIP_WAITING" });
      }
    },  
  }
</script>


<style scoped>

  body {

    margin: 0%;
  }
</style>
