<template>
  <div>    
    <Nav></Nav>
      <BotonesAdm></BotonesAdm>  
      <h1>Lorem ipsum, dolor sit amet consectet</h1>
      <h2>lore 3</h2>
      <h5>Lorem ipsum dolor sit amet.</h5>   

      <div>
        <div class="grid grid-cols-3 gap-4 my-2">
        <div class="bg-red-500">A</div>
        <div class="bg-red-600">A</div>
        <div class="bg-red-700">A</div>
        <div class="bg-red-800">A</div>
        <div class="bg-red-900">A</div>

    </div>
      </div>

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
