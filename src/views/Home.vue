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
import { mapGetters } from 'vuex'
export default {
  name: "home",
  components: {
    Nav,
    BotonesAdm,
    BotonesTec
  },
  data: function(){
    return {
        typeUser: true,        
      }
  },
  beforeMount: function(){
    if(this.$store.getters['Login/getTypeUser'] == 1){
        this.typeUser = false
    }
  },
  computed: {
    ...mapGetters({getReferenceSquareActual: 'Login/getReferenceSquareActual'})
  }
};
</script>
