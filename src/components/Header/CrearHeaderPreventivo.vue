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
                    <h1 class="mt-5 border-purple-800">{{ `Mantenimiento Preventivo ${header.frequencyName} Nivel ${tituloUbicacion}` }}</h1>            
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
                        <p @click="modalCambiarFecha" v-if="!$route.query.edicion" class="ml-5 text-sm cursor-pointer text-blue-700 font-mono">Cambiar Fecha</p>                            
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
            <div v-if="showModal" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-2 sm:p-2">
                <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md">Indica la fecha y el motivo por el cual desea cambiar la fecha</p>
                    <div>
                        <div class="mt-5 sm:grid grid-cols-1">
                            <div class="justify-start grid grid-cols-2">
                                <p class=" font-bold">Fecha Original:</p>                        
                                <p class="ml-5 text-center">{{ header.day }}</p> 
                            </div> 
                            <br> 
                            <div class="grid grid-cols-2 sm:grid-cols-1">  
                            <p class="font-bold my-1 sm:text-sm">Nueva Fecha *:</p>
                            <input v-model="fechaCambio" class="border w-40" type="date"/>
                            </div>
                        </div>
                        <div class="mt-5">
                            <p class="mb-1 sm:text-sm">Motivo del Cambio *:</p>
                            <textarea
                            id="mensaje"
                            v-model="motivoCambioFecha"
                            v-validate="'max:300'"
                            :class="{ 'is_valid': !errors.first('Motivo'), 'is_invalid': errors.first('Motivo')}"
                            class="text-center appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border"
                            placeholder="Motivo del cambio"
                            name="Motivo"
                            v-bind:maxlength="limite"
                            />
                            <span class="text-xs text-gray-500">{{ restante }}/300</span>
                            <p class="text-xs text-red-600">{{ errors.first("Motivo") }}</p>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////
                    ////                     BOTONES MODAL CAMBIAR FECHA          ////
                    ////////////////////////////////////////////////////////////////////-->
                    <div class="justify-center flex mt-5">
                        <button  @click="botoncambiar_modal" class="botonIconCrear m-6 sm:m-3">Cambiar</button>
                        <button  @click="botoncancelar_modal" class="botonIconCancelar m-6 sm:m-3">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from "../../services/EventBus.js";
import ServicesPDF from "../../services/ReportesPDFService.js";
import moment from "moment";
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
        motivoCambioFecha: '',
        limite: 300,
        tituloUbicacion: ''
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
    this.tituloUbicacion = this.header.capufeLaneNum == '0000' ? 'Plaza' : 'Carril' 
    this.horaInicio = this.$route.query.horas.horaInicio
    this.horaFin = this.$route.query.horas.horaFin
},
/////////////////////////////////////////////////////////////////////
////                       COMPUTADOS                            ////
/////////////////////////////////////////////////////////////////////
computed:{
    restante(){
        return  this.motivoCambioFecha.length
    }
},
/////////////////////////////////////////////////////////////////////
////                       METODOS                               ////
/////////////////////////////////////////////////////////////////////
methods:{
    modalCambiarFecha: function (){
            this.showModal = true                    
    },
    botoncambiar_modal: async function (){
        if(this.fechaCambio !='' && this.motivoCambioFecha != ''){        
            let toDay = new Date()
            let mest = toDay.getMonth()
            mest = mest + 1;            
            let fecha = new Date(this.fechaCambio)
            let mes = fecha.getMonth()
            mes = mes + 1;            
            fecha.setDate(fecha.getDate())
            if( mes > mest || mes < mest){
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
            else {
                this.fechaCambio = moment(this.fechaCambio, "YYYY-MM-DD").format("DD/MM/YYYY")                
                let refPlaza = await this.$store.getters['Login/GET_REFERENCIA_PLAZA_TO_NOMBRE'](this.header.plazaNombre).refereciaPlaza                                         
                let referenceNumber = await ServicesPDF.crear_referencia_calendario(refPlaza,this.header.frequencyName, this.fechaCambio ,this.header.lane)
                this.$emit('guarar-log-fecha', {
                    fecha: this.fechaCambio,
                    motivo: this.motivoCambioFecha,
                    ref: referenceNumber 
                })            
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
        }0
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
