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
                    <div class="md:flex lg:flex xl:flex justify-start sm:grid-cols-1 ml-5">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true"></SelectPlaza>                                                    
                    </div>  
                    <div class="flex justify-start m-5">
                        <button @click="generar_pdf" class="botonIconCrear">
                            <img src="../../assets/img/add.png" class="mr-2" width="25" height="25" />
                            <span>Crear</span>
                        </button>
                    </div>
                </div>
                <div class=" w-1/2 sm:w-full p-8 sm:p-2">
                    <span class="text-center font-bold text-sm text-gray-800 sm:ml-5">Observaciones</span>          
                    <textarea
                        v-model="comentario"
                        v-validate="'max:500|required'"
                        :class="{ 'is_valid': !errors.first('comentario'), 'is_invalid': errors.first('comentario')}"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-32 w-full placeholder-gray-500 border sm:mt-2 sm:mb-1"
                        placeholder="jane@example.com"
                        name="comentario"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-xs text-gray-500 sm:ml-4">{{ restante }}/500</span>
                    <p class="text-xs">{{ errors.first("comentario") }}</p>
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
import SelectPlaza from '../Header/SelectPlaza'

export default {
    components:{
        SelectPlaza
    },
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
        numeroActividades: {
            type: Number,
            default: () => 0
        }
    },
    data(){
        return {                        
            limite:500,            
        }
    },
    destroyed(){        
        if(this.comentario == '' && this.numeroActividades > 0){
            this.$router.push({ path: 'CalendarioActividades' })
            this.$notify.warning({
                title: "Ups!",
                msg: `NO PUEDES TENER CALENDARIO SIN COMENTARIO`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },          
            });          
        }
        else if(this.numeroActividades == 0 && this.comentario != ''){
            this.$router.push({ path: 'CalendarioActividades' })
            this.$notify.warning({
                title: "Ups!",
                msg: `NO PUEDES TENER CALENDARIO SIN ACTIVIDADES`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },          
            });  
        }                                    
    },    
    methods: {
        cambiar_plaza(numeroPlaza){                  
            this.$emit("actualizar-actividad", numeroPlaza);            
        },
        generar_pdf(){           
            this.$emit('generar-pdf', this.comentario)
        }        
    },
    computed:{
        restante(){
            return  this.comentario.length
        },
        mesNombre(){
            return ServiceActividades.numero_to_nombre(this.mes)
        }
    },
    watch: {
        comentario(newValue){
            this.$emit('actualizar-comentario', newValue)
        }
    }

}
</script>

<style>

</style>