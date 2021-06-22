<template>
    <footer class="fixed inset-x-0 bottom-0">        
        <div class="w-full px-6 bg-blue-800">                
            <div class="inline-flex justify-between  py-3 w-full">
                <div id="nombreRollShow" v-if="$route != undefined && $route.name != 'login'">
                    <p id="testNombreRoll" class="text-xs sm:mt-1 text-blue-400">{{ nombreRoll }}</p>
                </div>
                <div class="w-full ml-16 sm:ml-0 text-center">
                    <p class="text-sm text-white font-titulo">
                        © 2021 Proyectos y Sistemas Informaticos.
                    </p>
                </div>
                <div class=" inline-flex">
                    <!-- <button class="mr-5 font-semibold" v-tooltip="{
                        content: msg,
                        placement: 'bottom-center',
                        classes: ['info'],
                        targetClasses: ['it-has-a-tooltip'],
                        offset: 20,
                        delay: { show: 100, hide: 5000 },     
                                    
                        
                    }">?</button> -->
                    <v-popover offset="16" placement="bottom-center" classes="[info]"
>
  <!-- This will be the popover target (for the events and position) -->
  <button class="mr-5">?</button>

  <!-- This will be the content of the popover -->
  <template slot="popover">
    <input class="tooltip-content" v-model="msg" placeholder="Tooltip content" />
    <p>
      {{ msg }}
    </p>

    <!-- You can put other components too -->
    
  </template>
</v-popover>
                    <p class="sm:text-xs text-sm sm:mt-1 font-titulo font-light text-blue-400">V1.6.3</p>
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
            dflkjs`
        }
    },
    computed:{
        nombreRoll(){
            return this.$store.state.Login.cookiesUser.nombreRoll        
        }
    }   
}
</script>


