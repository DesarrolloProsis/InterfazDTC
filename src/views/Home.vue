<template>
  <div>
    <Nav></Nav>
    <BotonesAdm v-if="typeUser == 4" :typeUser="typeUser"></BotonesAdm>
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
        typeUser: '',        
      }
  },
  beforeMount: function(){
    this.typeUser = this.$store.getters['Login/getTypeUser']        
    
  },
  computed: {
    ...mapGetters({getReferenceSquareActual: 'Login/getReferenceSquareActual'})
  }
};
</script>
