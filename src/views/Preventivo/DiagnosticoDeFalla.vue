<template>
    <div>
        <Nav></Nav>
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">Diagnóstico de Falla</h1>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                   DATOS DEL REPORTE                           ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10">
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA UNO                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 ml-5 w-full">
                            <div class="grid grid-cols-2">
                                <span class="">No. De Reporte</span>
                                <p class="-ml-66">{{ datosDiagnostico.ReferenceNumber }}</p>
                            </div>
                            <div class="mt-5 grid grid-cols-2">
                                <div>
                                    <span>Plaza de Cobro</span>
                                </div>
                                <div class="-ml-66">
                                    <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'edicion'" :forma="'diagnostico'"></SelectPlaza>
                                </div>
                            </div>
                            <div class="mt-5">
                                <span class="mr-20">Ubicación</span>
                                <input class="bg-white border-gray-400 w-69" readonly/>
                            </div>
                        </div>
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA DOS                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 ml-65">
                            <div>
                                <span class="">Fecha:</span>
                                <input class="ml-16 bg-white border-gray-400" 
                                type="date" 
                                v-model="fecha"
                                @change="crear_referencia"/>
                            </div>
                            <div class="mt-5">
                                <span class="">Hora INICIO:</span>
                                <input class="ml-4 bg-white border-gray-400 mr-4" type="time" v-model="horaInicio"/>
                            </div>
                            <div class="mt-5">
                                <span class="">Hora FIN:</span>
                                <input class="ml-10 bg-white border-gray-400" type="time" v-model="horaFin"/>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                             FOLIOS                            ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10">
                        <div class="mt-6 ml-5 w-full">
                            <div class="text-center w-32 ml-64 mr-40">
                                <span class="">Folio de FALLA:</span>
                            </div>
                            <div class="mt-5 text-center w-32 ml-64">
                                <span class="">No. De Reporte:</span>
                            </div>
                            <div class="mt-5 text-center w-56 ml-40">
                                <span class="">Técnico Responsable PROSIS:</span>
                            </div>
                        </div>
                        <div class="mt-6 mr-16 grid grid-cols-1">
                            <div class="-ml-69">
                                <input class="bg-white border-gray-400 w-full text-center" />
                            </div>
                            <div class="mt-5 -ml-69">
                                <input class="bg-white border-gray-400 w-full text-center"  />
                            </div>
                            <div class="mt-5 -ml-69">
                                <p class="border-gray-400 w-full text-center">{{ nombre_usuario }}</p>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <div class="mt-2 sm:text-xs sm:ml-3 mb-16 mr-5 ml-5">
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA UNO                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 w-full grid grid-cols-2">
                            <div class=" mr-10">
                                <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="descripcion"
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                    v-bind:maxlength="limite"
                                />
                                <span class="text-gray-500">{{ restante_desc }}/300</span>
                            </div>
                            <div class="mr-10">
                                <span class="">DIAGNOSTICO DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="diagnostico"
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                    v-bind:maxlength="limite"
                                />
                                <span class="text-gray-500">{{ restante_diag }}/300</span>
                            </div>
                            <div class="mt-5 mr-10">
                                <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="causaFalla"
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="CausaDeLaFalla"
                                    v-bind:maxlength="limite"
                                />
                                <span class="text-gray-500">{{ restante_causa }}/300</span>
                            </div>
                            <!-- /////////////////////////////////////////////////////////////////////
                            ////                         IMAGENES                             ////
                            ///////////////////////////////////////////////////////////////////// -->
                            <div class="flex text-center cursor-pointer border-gray-800 flex-col sm:m-3 sm:mt-5 mt-12">
                                <ImagenesCard></ImagenesCard>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-12">
                        <div>
                            <button @click="crearDiagnostico" class="botonIconCrear">
                                <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                <span>Crear</span>
                            </button>
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../../components/Navbar";
import ImagenesCard from "../../components/DTC/ImagenesCard.vue";
import EventBus from "../../services/EventBus.js";
import SelectPlaza from '../../components/Header/SelectPlaza';
import ServiceReportePDF from '../../services/ReportesPDFService'
import moment from "moment";

export default {
    name: "Diagnostico",
    components: {
        Nav,
        ImagenesCard,
        SelectPlaza

    },
    data(){
        return{
            limite:300,
            causaFalla: "",
            descripcion: "",
            diagnostico: "",
            nameUser:"",
            horaInicio:"",
            horaFin:"",
            fecha: "",
            datosDiagnostico:{
                ReferenceNumber: ""
            },
            listaPlazas: [],
            arrayReference: [],
            headerSelecionado: {},
            
        }
    },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function (){
    //this.listaPlazas = await this.$store.state.Login.plazaSeleccionada.refereciaPlaza
    this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
    restante_causa(){
        return this.causaFalla.length
    },
    restante_desc(){
        return this.descripcion.length
    },
    restante_diag(){
        return this.diagnostico.length
    },
    nombre_usuario(){
        return this.$store.getters["Header/GET_HEADER_SELECCIONADO"].nombre;    
    },
    plaza_selecc(){
        return this.$store.getters["Login/GET_REFERENCIA_ACTUAL_PLAZA"];    
    }
},
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
crear_referencia: async function () {      
    let _arrayReference  = await ServiceReportePDF.crear_referencia(
        moment(this.fecha,"YYYY-MM-DD").format("DD-MM-YYYY"), 
        this.headerSelecionado.referenceSquare, true
    )    
    if(typeof(_arrayReference) == 'object'){
        return this.arrayReference = _arrayReference
    }
    else{
        return this.datosDiagnostico.ReferenceNumber = _arrayReference
    }          
},
async cambiar_plaza(numeroPlaza) {  
    console.log(numeroPlaza) 
    this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
    this.crear_referencia()      
    if (JSON.stringify(this.headerEdit) != "{}") {
        this.datosDiagnostico.ReferenceNumber = this.headerEdit.referenceNumber;
    }
},
    validar_horas(){
    if(this.horaInicio != '' && this.horaFin != ''){
        let horaISplite = this.horaInicio.split(':')            
        let horaFSplite = this.horaFin.split(':')            
        let dateInicio = new Date(1995,11,17,horaISplite[0],horaISplite[1],0);
        let dateFin = new Date(1995,11,17,horaFSplite[0],horaFSplite[1],0);             
        if(dateInicio < dateFin){                
            return true
        }
        else{
                this.$notify.warning({
                title: "Ups!",
                msg: `LA HORA INICIO NO PUEDE SER MAYOR QUE LA HORA FIN.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
            return false
        }
    }
    else{                    
                this.$notify.warning({
                title: "Ups!",
                msg: `FALTA LLENAR CAMPOS DE HORA FIN Y HORA INICIO.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
            return false    
        }
    },
    crearDiagnostico : function (){
        if( this.causaFalla != '' && this.descripcion != '' && this.diagnostico != '' && this.horaInicio != '' && this.horaFin != '' && this.fecha != '')
        {
            this.causaFalla=''
            this.descripcion=''
            this.diagnostico=''
            this.$notify.success({
                    title: "Ok!",
                    msg: `SE GENERÓ CORRECTAMENTE EL DICTAMEN.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                        },
                    });         
        }
        else{
            this.$notify.warning({
                title: "Ups!",
                msg: `NO SE HA LLENADO LOS CAMPOS.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
        }
    },
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
},
}
</script>

<style>

</style>