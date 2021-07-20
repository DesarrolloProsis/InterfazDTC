<template>
    <footer class="fixed inset-x-0 bottom-0">        
        <div class="w-full px-6 bg-blue-800">                
            <div class="inline-flex justify-between  py-3 w-full">
                <div id="nombreRollShow" v-if="$route != undefined && $route.name != 'login'">
                    <p id="testNombreRoll" class="text-xs sm:mt-1 text-blue-400 w-32">{{ nombreRoll }}</p>
                </div>
                <div class="w-full ml-16 sm:-ml-16 text-center">
                    <p class="text-sm text-white font-titulo">
                        © 2021 Proyectos y Sistemas Informaticos.
                    </p>
                </div>
                <div class="inline-flex" v-if="$route != undefined && $route.name != 'login'">
                    <p class="sm:hidden">
                        <span v-tooltip="{ ref: 'tooltipRef', offset: 25, class: 'tooltip-custom tooltip-other-custom' }">
                            <div class="-mt-3 ml-3">
                            <span class="flex -mt-4 h-3 w-3">
                                <span v-if="this.mostrar" @mouseover="bandera" class="animate-ping absolute mt-2 inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75"></span>
                            </span>
                            </div>
                            <img src="@/assets/img/notificacion.png" class=" w-8 h-6 my-auto mx-auto" />
                        </span></p>
                    <div ref="tooltipRef" class=" font-titulo">
                        <p class="text-center text-gray-800">🎉 Nueva Versión 2.0.1 !!! 🎉</p>
                        <ol class="pl-5 mt-2 text-gray-800 pb-2">
                            <li>·</li>
                        </ol>
                    </div>                    
                </div>
                <div>
                    <p class="sm:text-xs ml-5 text-sm sm:mt-1 font-titulo font-light text-blue-400">V2.0.1</p>
                </div>
            </div>                                
        </div>        
    </footer>
</template>
<script>
export default {  
    data(){
        return{
            msg: `hola
            dsakl
            dflkjs`,
            mostrar: true,   
        }
    },
    computed:{
        nombreRoll(){
            return this.$store.state.Login.cookiesUser.nombreRoll        
        }
    },
    methods:{
        bandera: function(){
            this.mostrar = false
        }
    }   
}
</script>
<style>
.vue-tooltip.tooltip-custom {
    width: 50rem;  
    background-color: rgba(255, 255, 255, 0.685);  
    border: 1px solid #466fa1;  
    box-shadow: 1000;
    border-radius: 15px;
}

.vue-tooltip.tooltip-custom .tooltip-arrow {  
    border: 3px solid #466fa1;  
}
</style>


