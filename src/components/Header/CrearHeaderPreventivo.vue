
<template>
    <div class="p-10">
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
                    <h1 class="mt-5 border-purple-800">{{ `Mantenimiento Preventivo ${header.frequencyName} Nivel Carril` }}</h1>            
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
                        <p class=" font-bold">Numero de Reporte:</p>
                        <h2 class="ml-5">{{ referenceNumber }}</h2>
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Plaza de Cobro:</p>
                        <p class="ml-5">{{ header.plazaNombre }}</p>                                   
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Ubicacion:</p>       
                        <p class="ml-5">{{ header.lane }}</p>               
                    </div>
                </div>
                <div class="w-1/2 sm:w-full p-8 sm:p-2">
                    <div class="flex justify-start m-5">
                        <p class=" font-bold">Fecha:</p>                        
                        <p class="ml-5">{{ header.day }}</p> 
                        <p @click="modalCambiarFecha" class="ml-5 text-sm cursor-pointer text-blue-700 font-mono">Cambiar Fecha</p>    
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Hora Inicio:</p>
                        <input v-model="horaInicio" class="ml-5 w-40" type="time">
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Hora Fin:</p>
                        <input v-model="horaFin" class="ml-5 w-40" type="time">
                    </div>
                </div>
            </div>
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA INDICACIONES                    ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/3 sm:w-full uppercase text-xs p-10 sm:p-5">
                <p class=" font-bold">Estatus Equipo:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Operando en optimas condiciones</p>
                    <div class="bg-green-500 border-gray-800 border w-16 h-6 ml-3 text-center">Ok</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Equipo con Daño Fisico y/o Vandalizado</p>
                    <div class="bg-yellow-500 border-gray-800 border w-16 h-6 ml-3 text-center">Dañado</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>No aplica por garantia con el fabricante</p>
                    <div class="bg-orange-500 border-gray-800 border w-16 h-6 ml-3 text-center">No Aplica</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>No Existe Equipo (Vandalizado)</p>
                    <div class="bg-red-500 border-gray-800 border w-16 h-6 ml-3 text-center">No Existe</div>
                </div>
            </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR FECHA                    ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
        <div v-if="showModal" class="rounded-lg  justify-center border absolute inset-x-0 w-69 mx-auto px-12 py-10">
            <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
            <p class="text-gray-900 font-thin text-md">Indica la fecha y el motivo por el cual desea cambiar la fecha</p>
            <div>
                <div class="mt-5">
                <div class="flex justify-start">
                    <p class=" font-bold">Fecha Original:</p>                        
                    <p class="ml-5">{{ header.day }}</p> 
                </div> 
                 <br> 
                <p class="font-bold mb-5 sm:text-sm">Nueva Fecha *:</p>
                <input v-model="fechaCambio" class="border w-40" type="date"/>
               
              </div>
              <div class="mt-5">
                <p class="mb-1 sm:text-sm">Motivo del Cambio *:</p>
                <textarea
                  v-model="motivoCambioFecha"
                  v-validate="'max:300'"
                  :class="{ 'is_valid': !errors.first('Motivo'), 'is_invalid': errors.first('Motivo')}"
                  class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border"
                  placeholder="Motivo del cambio"
                  name="Motivo"
                />
                 <p class="text-xs text-red-600">{{ errors.first("Motivo") }}</p>
              </div>
            </div>
        <!--/////////////////////////////////////////////////////////////////
          ////                     BOTONES MODAL CAMBIAR FECHA          ////
        ////////////////////////////////////////////////////////////////////-->
            <div class="justify-end flex mt-5">
              <button  @click="botoncambiar_modal" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Cambiar</button>
              <button  @click="botoncancelar_modal" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">Cancelar</button>
            </div>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import EventBus from "../../services/EventBus.js";
import ServicesPDF from "../../services/ReportesPDFService.js";
export default {
/////////////////////////////////////////////////////////////////////
////                          DATA                               ////
/////////////////////////////////////////////////////////////////////
data() {
    return {
        showModal: false,
        horaInicio: '',
        horaFin: '',
        fechaCambio: '',
        motivoCambioFecha: ''
    };
},
props: {
    header:{
        type: Object,
        default: () => {},
    },
    referenceNumber: {
        type: String,
        default: () => ''
    }
},
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function() {    
    
},
/////////////////////////////////////////////////////////////////////
////                       METODOS                               ////
/////////////////////////////////////////////////////////////////////
methods:{
modalCambiarFecha: function (){
        this.showModal = true
            
},
botoncambiar_modal: async function (){
    if(this.fechaCambio !='' && this.motivoCambioFecha != '')
    {

        let refPlaza = await this.$store.getters['Login/getReferenceSquareActual']
        this.referenceNumber = await ServicesPDF.crear_referencia_calendario(refPlaza,this.header.frequencyName,this.fechaCambio ,this.header.lane)
        let toDay = new Date()
        let fecha = new Date(this.fechaCambio)
        
        fecha.setDate(fecha.getDate())
        //fecha.setDate(fecha.getDate()+1)
        
        console.log(fecha <= toDay)
        
        console.log(toDay)
        console.log(fecha)

        if( fecha > toDay)
        {
            this.$notify.warning({
            title: "Ops!! ",
            msg: "FECHA INVALIDA",
            position: "bottom right",
            styles: {
                    height: 100,
                    width: 500,
                    },
                });
            this.fechaCambio = ''    
        }
        else
        {
            this.header.day = this.fechaCambio    
            this.showModal = false
            this.fechaCambio = ''
            this.motivoCambioFecha = ''
        }
    }
   else
   {
        this.$notify.warning({
        title: "* Son datos obligatorios",
        msg: "NO SE SELECCIONÓ ALGUNO DE LOS DATOS NECESARIOS",
        position: "bottom right",
        styles: {
             height: 100,
             width: 500,
          },
        });
        }
   },
botoncancelar_modal: function (){
    this.showModal = false
    this.fechaCambio = ''
    this.motivoCambioFecha = ''
}
},
/////////////////////////////////////////////////////////////////////
////                       Watcher                               ////
/////////////////////////////////////////////////////////////////////
watch:{
    horaInicio: function(newHora){
        EventBus.$emit("actualizar_hora_inicio", newHora);
    },
    horaFin: function(newHora){
        EventBus.$emit("actualizar_hora_fin", newHora);
    }
}


};
</script>
