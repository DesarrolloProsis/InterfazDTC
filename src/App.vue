<template>

  <div id="app">   
    <transition name="fade">       
      <router-view/>
    </transition>
    <Footer></Footer>
  </div>
</template>


<script>
import Footer from '../src/components/Footer'

  export default {
    components: {
      Footer
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
