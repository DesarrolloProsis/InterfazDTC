<template>

  <div id="app">
    <div id="nav">      
    </div>
    <router-view/>
  </div>
</template>


<script>

  export default {

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
