<template>
  <div id="app">   
    <NavBar></NavBar>
    <!-- <transition name="slide-fade">  -->      
      <router-view/>
    <!-- </transition> -->
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../src/components/Footer'
import NavBar from '../src/components/Navbar'

  export default {
    components: {
      Footer,
      NavBar
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
