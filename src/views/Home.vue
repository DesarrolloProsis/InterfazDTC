<template>
  <div>
    <Nav></Nav>
    <BotonesAdm v-if="typeUser"></BotonesAdm>
    <BotonesTec v-else></BotonesTec>
  </div>
</template>

<script>
import Nav from "../components/Navbar";
import BotonesAdm from "../components/BotonesAdm";
import BotonesTec from "../components/BotonesTec";

export default {
  name: "home",
  components: {
    Nav,
    BotonesAdm,
    BotonesTec
  },
  data: function(){

    return {

        typeUser: true
      
      }
  },
  beforeMount: function(){

    if(this.$store.getters['Login/getTypeUser'] == 1){
        this.typeUser = false
    }
  }
};
</script>
