<template>
    <div>
    <!--///////////////////////////////////////////////////////////////////
          ////                             HEADER                          ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="text-2xl text-center inline-flex sm:inline-block w-full mt-10">
            <div class=" w-auto mx-auto flex justify-center">
                <div class="border-gray-800 w-66 border-2 p-5">
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-48"/>
                </div>
            </div>
            <div class="w-2/3 sm:w-auto sm:mt-3 sm:text-sm flex justify-start sm:justify-center">
                <div class="border-gray-800 border-2 p-5 pt-0">
                    <h1 class="mt-5 border-purple-800 w-72 sm:w-full">{{ `Calendario de Actividades` }}</h1>            
                </div>
            </div>
        </div>
        <div class="inline-flex sm:inline-block  w-full">
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA IZQUIERDA                        ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-2/3 sm:w-full inline-flex sm:inline-block text-base sm:text-sm">
                <div class="w-1/2 sm:w-full p-8 sm:p-2">
                    <div class="flex justify-starts m-5">
                        <p class=" font-bold">Correspondiente al mes de:</p>
                        <h2 class="ml-5">{{ `${mesNombre} del ${año}` }}</h2>
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Plaza de Cobro:</p>
                        <select v-model="plazaSelect" @change="cambiar_plaza" class="w-56 h-6 ml-5" type="text">
                            <option disabled value="">Selecionar...</option>     
                            <option v-for="(item, index) in plazasValidas" :value="item.numPlaza" :key="index">{{ item.plazaName }}</option>                
                        </select>                             
                    </div>  
                    <div class="flex justify-start m-5">
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-blue-700 h-12 w-32">
                            <img src="../../assets/img/add.png" class="mr-2" width="25" height="25" />
                            <span>Crear</span>
                        </button>
                    </div>                
                </div>
                <div class=" w-1/2 sm:w-full p-8 sm:p-2">
                    <span class="text-center font-bold text-sm text-gray-800">Observaciones</span>          
                    <textarea
                        v-model="comentario"
                        v-validate="'max:300'"
                        :class="{ 'is_valid': !errors.first('Observaciones'), 'is_invalid': errors.first('Observaciones')}"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-32 w-full placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="Observaciones"
                    />
                    <p class="text-xs">{{ errors.first("Observaciones") }}</p>
                </div>              
            </div>
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA INDICACIONES                    ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/4 sm:w-full uppercase text-xs p-10 sm:p-5">
                <p class=" font-bold">Codigo de Colores:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Semanal</p>
                    <div class="bg-green-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Verde</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Mensual</p>
                    <div class="bg-red-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Rojo</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Trimestral</p>
                    <div class="bg-blue-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Azul</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Semestral</p>
                    <div class="bg-pink-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Rosa</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Anual</p>
                    <div class="bg-orange-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Naranja</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceActividades from '../../services/ActividadesService'
export default {
    props:{
        comentario:{
            type: String,
            default: () => ''
        },
        mes: {
            type: Number,
            default: () => 0
        },
        año: {
            type: Number,
            default: () => 0
        },
        plazaSelect: {
            type: String,
            default: () => 0
        }
    },
    data(){
        return {            
            plazasValidas: ''
        }
    },
    beforeMount(){        
        this.plazasValidas = this.$store.getters['Login/getListaPlazasUser']
    },
    methods: {
        cambiar_plaza(){
            let index = this.plazasValidas.findIndex(
                (item) => item.numPlaza == this.plazaSelect
            );
            this.$store.commit("Header/PLAZAELEGIDAMUTATION", index);
            this.$store.commit("Login/PLAZAELEGIDAMUTATION", index);             
            this.$emit("actualizar-actividad", this.plazasValidas[index]);            
        }        
    },
    computed:{
        mesNombre(){
            return ServiceActividades.numero_to_nombre(this.mes)
        }
    }
}
</script>

<style>

</style>