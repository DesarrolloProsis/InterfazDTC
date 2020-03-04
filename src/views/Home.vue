<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <Nav></Nav>
  
  <BotonesAdm></BotonesAdm>
  

  </div>
</template>

<script>

import Nav from '../components/Navbar'
// import BotonesTec from '../components/BotonesTec'
import BotonesAdm from '../components/BotonesAdm'

export default {
  name: "home",
  components: {
    Nav,    
    BotonesAdm
  },
  data(){
    return{
      convenio: "4500029287",
      
    }
  },
  // async beforeMount() {
  //   this.$store.commit("Header/numConvenioMutation", this.datos.convenio);
  // },
};
</script>
