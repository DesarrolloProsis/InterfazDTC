<template>
    <div class="">
        <!--///////////////////////////////////////////////////////////////////
          ////                             HEADER                          ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="text-2xl text-center inline-flex sm:inline-block w-full mt-10">
            <div class=" w-auto mx-auto flex justify-center">
                <div class="w-66 p-5 sm:ml-16 sm:-mt-10">
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-48"/>
                </div>
            </div>
            <div class="w-2/3 sm:w-auto sm:-mt-3 sm:text-sm flex justify-start sm:justify-center">
                <div class="">
                    <h1 class="mt-5 font-titulo font-bold text-3xl sm:text-lg">{{ `Mantenimiento Preventivo ${header.frequencyName} Nivel ${tituloUbicacion}` }}</h1>            
                </div>
            </div>
        </div>
        <div class="inline-flex sm:inline-block  w-full">
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA IZQUIERDA                        ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-2/3 sm:w-full inline-flex sm:inline-block text-base sm:text-xs">
                <div class="w-1/2 sm:w-full p-8 sm:p-2">
                    <div class="flex justify-starts m-5 sm:ml-3 -ml-1">
                        <p class="font-titulo font-bold">Numero de Reporte:</p>
                        <h2 class="font-titulo ml-5">{{ referenceNumber }}</h2>
                    </div>
                    <div class="flex justify-start m-5 sm:ml-3 -ml-1">
                        <p class="font-titulo font-bold">Plaza de Cobro:</p>
                        <p class="font-titulo ml-5">{{ header.plazaNombre }}</p>                                   
                    </div>
                    <div class="flex justify-start m-5 sm:ml-3 -ml-1">
                        <p class="font-titulo font-bold">Ubicacion:</p>       
                        <p class="font-titulo ml-5">{{ header.lane }}</p>               
                    </div>
                </div>
                <div class="w-1/2 sm:w-full sm:-mt-10 p-8 sm:p-2 ">
                    <div class="flex justify-start sm:ml-3 m-5">
                        <p class="font-titulo font-bold">Fecha:</p>                        
                        <p class="font-titulo ml-5">{{ header.day }}</p> 
                        <p @click="modalCambiarFecha" v-if="!$route.query.edicion" class="ml-5 text-sm cursor-pointer text-blue-700 font-boton font-bold">Cambiar Fecha</p>                            
                    </div>
                    <div class="flex justify-start m-5 sm:ml-3">
                        <p class="font-titulo font-bold">Hora Inicio:</p>
                        <input v-model="horaInicio" class="ml-5 w-40 is_valid font-titulo" type="time">
                    </div>
                    <div class="flex justify-start m-5 sm:ml-3">
                        <p class="font-titulo font-bold">Hora Fin:</p>
                        <input v-model="horaFin" class="ml-10 w-40 is_valid font-titulo" type="time">
                    </div>
                    <div class="justify-start m-5 sm:ml-3 grid grid-cols-1">
                        <p class="font-titulo font-bold">Encargado de Plaza:</p>
                        <p>
                            <select class="is_valid" v-model="adminIdCalendar" @change="enviar_nuevo_admin_id">
                                <option v-for="(item, key) in listaPlazaAdminValid" :value="item.administradorId" :key="key">{{ item.plazaAdminNombre }}</option>
                            </select>
                        </p>
                    </div>
                </div>
            </div>
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA INDICACIONES                    ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/3 sm:w-full uppercase text-xs sm:text-xs p-10 sm:p-5">
                <p class="font-titulo font-bold">Estatus Equipo:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p class="font-titulo">Operando en optimas condiciones</p>
                    <div class="bg-green-500 border-gray-800 border w-20 h-6 ml-3 text-center is_valid -mt-1 font-titulo">
                        <p class="mt-1 mb-1 text-white">Ok</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2 font-titulo">
                    <p>Equipo con Daño Fisico y/o Vandalizado</p>
                    <div class="bg-yellow-500 border-gray-800 border w-20 h-6 ml-3 text-center is_valid -mt-1 sm:mt-1">
                        <p class="mt-1 text-white">Dañado</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2 font-titulo">
                    <p>No aplica por garantia con el fabricante</p>
                    <div class="bg-orange-500 border-gray-800 border w-20 h-6 ml-3 text-center is_valid -mt-1 sm:mt-1">
                        <p class="mt-1 text-white">No Aplica</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2 font-titulo">
                    <p>No Existe Equipo (Vandalizado)</p>
                    <div class="bg-red-500 border-gray-800 border w-20 h-6 ml-3 text-center is_valid -mt-1 sm:-mt-1">
                        <p class="mt-1 text-white">No Existe</p>
                    </div>
                </div>
            </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR FECHA                    ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
            <div v-if="showModal" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-2 sm:p-2 -mt-67">
                <ValidationObserver ref="observer">
                <div class="rounded-lg border bg-white border-gray-400 px-12 py-10 sm:px-6 shadow-2xl">
                    <p class="text-gray-900 font-titulo font-thin text-md">Indica la fecha y el motivo por el cual desea cambiar la fecha</p>
                    <div>
                        <div class="mt-5 sm:grid grid-cols-1">
                            <div class="justify-start grid grid-cols-2 font-titulo">
                                <p class="font-bold">Fecha Original:</p>                        
                                <p class="ml-5 text-center">{{ header.day }}</p> 
                            </div> 
                            <br> 
                            <div class="grid grid-cols-2 sm:grid-cols-2 font-titulo "> 
                                <ValidationProvider name="Nueva Fecha" rules="required" v-slot="{ errors }"> 
                                <p class="font-bold my-1 sm:text-sm">Nueva Fecha *:</p>
                                <input v-model="fechaCambio" class="border w-40 is_valid sm:mb-6 sm:-mt-1" type="date"/>
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="mt-5 font-titulo">
                            <ValidationProvider name="Motivo del Cambio" rules="required:max:300"  v-slot="{ errors }">    
                            <p class="mb-1 sm:text-sm">Motivo del Cambio *:</p>
                            <textarea v-model="motivoCambioFecha" class="textAreaCalendario text-center" placeholder="Motivo del cambio" name="Motivo"/>
                            <span class="text-xs text-gray-500">{{ restante }}/300</span>
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////
                    ////                     BOTONES MODAL CAMBIAR FECHA          ////
                    ////////////////////////////////////////////////////////////////////-->
                    <div class="justify-center flex -mt-5 -mb-6 sm:-mt-3">
                        <button  @click="botoncambiar_modal" class="botonIconCrear m-6 sm:m-3">Cambiar</button>
                        <button  @click="botoncancelar_modal" class="botonIconCancelar font-boton m-6 sm:m-3">Cancelar</button>
                    </div>
                </div>
                </ValidationObserver>
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
        tituloUbicacion: '',
        listaPlazaAdminValid: [],
        adminIdCalendar: ''
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
    this.listaPlazaAdminValid = this.$store.state.Login.cookiesUser.plazasUsuario.filter(item => item.numeroPlaza == this.header.squareId && item.statusAdmin == true)
    this.adminIdCalendar = this.header.adminId      
    this.$emit('guardar-adminId-nuevo', this.adminIdCalendar)
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
    },
    enviar_nuevo_admin_id(){
        this.$emit('guardar-adminId-nuevo', this.adminIdCalendar)
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
    }, 
}


};
</script>
