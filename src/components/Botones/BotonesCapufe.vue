<template>
    <div>
        <div class="flex justify-center mt-2 sm:mt-14">
            <div class="mb-66">       
                <div class="flex">     
                    <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400">
                        <router-link to="/ListarDTC" class="text-center cursor-pointer">
                            <img src="../../assets/img/perfiles.png" height="200" width="200" class="m-10 sm:m-1" />
                            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Revisar DTC</h1>
                        </router-link>                       
                    </div> 
                    <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400" v-if="tipoUsuario == 7">
                        <router-link to="/Inventario" class="text-center cursor-pointer">
                            <img src="../../assets/img/inventario.png" height="200" width="200" class="m-10 sm:m-1"/>
                            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Inventario Plaza</h1>
                        </router-link>
                    </div>               
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tipoUsuario: 0
        }
    },  
    beforeMount(){
        this.tipoUsuario = this.$store.getters['Login/getTypeUser']        
    }
}
</script>