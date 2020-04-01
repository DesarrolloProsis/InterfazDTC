<template>
  <div>    
    <Nav></Nav>
      <BotonesAdm></BotonesAdm>  
  </div>
</template>

<script>

import Nav from '../components/Navbar'
import BotonesAdm from '../components/BotonesAdm'

export default {
  name: "home",
  components: {
    Nav,    
    BotonesAdm
  },
 
};
</script>
