<template>

  <div id="app">   
    <NavBar></NavBar>
    <transition name="slide-fade">       
      <router-view/>
    </transition>
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
  .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
