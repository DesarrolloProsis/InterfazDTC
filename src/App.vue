<template>
  <div id="app">   
    <NavBar></NavBar>
    {{ isIdle }}
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
    computed:{
     isIdle(){
        return this.$store.state.idleVue.isIdle;
      }
    },
    watch:{
      isIdle(newState){        
        if(newState){             
          if(localStorage.getItem('token') != null){
            let fechaExipracion = new Date(JSON.parse(localStorage.getItem('token')).expiration)            
            console.log(fechaExipracion >= new Date())
            if(new Date() >= fechaExipracion)
              this.$router.push({ path: '/SesionExpirada', replace: true  })
          }
        }
      }
    }
  }
</script>


<style scoped>
  body {
    margin: 0%;
  }
</style>
