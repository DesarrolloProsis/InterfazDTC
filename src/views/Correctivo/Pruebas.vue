<template>
    <div class="relative">
        <Nav></Nav>
        <button v-on:click="show = !show">
                Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>

import Nav from "../../components/Navbar";

export default {
    name: "HeaderGenerico",
    components: {
    
    Nav
    },
    data (){
        return{
            show: false                        
        }
        
    },
    methods:{
    }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
