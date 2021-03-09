<template>
    <div>
        <Nav></Nav>
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-if="this.type == 'DIAG' ">Diagnostico de Falla</h1>
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-else>Ficha Técnica de Atención</h1>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                   DATOS DEL REPORTE                           ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mb-2">
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA UNO                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 ml-5 w-full sm:grid grid-cols-1 sm:ml-4">
                            <div class="grid grid-cols-2 sm:grid grid-cols-1 md:grid grid-cols-1">
                                <span class="">No. De Reporte:</span>
                                <p class="-ml-66 sm:ml-0 sm:w-24">{{ datosDiagnostico.ReferenceNumber }}</p>
                            </div>
                            <div class="mt-5 grid grid-cols-2 sm:grid grid-cols-2">
                                <div>
                                    <span>Plaza de Cobro:</span>
                                </div>
                                <div class="-ml-66 sm:ml-0">
                                    <SelectPlaza @actualizar-plaza="cambiar_plaza"  :fullPlazas="true" :tipo="'edicion'" :forma="'diagnostico'"></SelectPlaza>
                                </div>
                            </div>
                            <div class="mt-5 grid grid-cols-2 sm:grid grid-cols-2">
                                <div>
                                    <span class="mr-20 sm:mr-0">Ubicación:</span>
                                </div>
                                <div class="-ml-66 sm:ml-0">
                                    <select class="w-56 sm:w-20" v-model="arraySelect" type="text">
                                        <option value="">Selecionar...</option>
                                        <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA DOS                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 ml-65 sm:ml-4">
                            <div>
                                <span class="">Fecha:</span>
                                <input class="ml-16 bg-white border-gray-400" 
                                type="date" 
                                v-model="fecha"
                                @change="crear_referencia"/>
                            </div>
                            <div class="mt-5">
                                <span class="">Hora INICIO:</span>
                                <input class="ml-4 bg-white border-gray-400 mr-4 sm:ml-8" type="time" v-model="horaInicio"/>
                            </div>
                            <div class="mt-5">
                                <span class="">Hora FIN:</span>
                                <input class="ml-10 bg-white border-gray-400 sm:ml-12" type="time" v-model="horaFin"/>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                             FOLIOS                            ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mt-0">
                        <div class="mt-6 ml-5 w-full sm:-ml-6">
                            <div class="text-center w-32 ml-64 mr-40 sm:ml-0">
                                <span class="">Folio de FALLA:</span>
                            </div>
                            <div class="mt-5 text-center w-32 ml-64 sm:ml-0">
                                <span class="">No. De Reporte:</span>
                            </div>
                            <div class="mt-5 text-center w-56 ml-40 sm:-ml-12">
                                <span class="sm:hidden">Técnico Responsable PROSIS:</span>
                                <span class="sm:show md:show lg:hidden xl:hidden">Tec.Res. PROSIS:</span>
                            </div>
                        </div>
                        <div class="mt-5 mr-16 grid grid-cols-1 sm:mr-2">
                            <div class="-ml-69 sm:-ml-16">
                                <input class="bg-white border-gray-400 w-full text-center" v-model="folioFalla" />
                            </div>
                            <div class="mt-5 -ml-69 sm:-ml-16">
                                <input class="bg-white border-gray-400 w-full text-center" v-model="noReporte"  />
                            </div>
                            <div class="mt-5 -ml-69 sm:-ml-16">
                                <p class="border-gray-400 w-full text-center">{{ nombre_usuario }}</p>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo = this.type></HeaderFalla>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-12 sm:mb-6">
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
import EventBus from "../../services/EventBus.js";
import SelectPlaza from '../../components/Header/SelectPlaza';
import ServiceReportePDF from '../../services/ReportesPDFService';
import moment from "moment";
import HeaderFalla from '../../components/FichaDiagnostico/HeaderFalla';

export default {
    name: "Diagnostico",
    components: {
        Nav,
        SelectPlaza,
        HeaderFalla

    },
    ///////////////////////////////////////////////////////////////////////
    ////                      DATA                                    ////
    /////////////////////////////////////////////////////////////////////
    data (){
        return{
            limite:300,
            nameUser:"",
            horaInicio:"",
            horaFin:"",
            fecha: "",
            folioFalla:"",
            noReporte:"",
            datosDiagnostico:{
                ReferenceNumber: ""
            },
            listaPlazas: [],
            arrayReference: [],
            headerSelecionado: {},
            plazaSeleccionada:"",
            arraySelect:{},
            type:"DIAG",
        }
    },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function (){
    //this.listaPlazas = await this.$store.state.Login.plazaSeleccionada.refereciaPlaza
    this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
    this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
    this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
    nombre_usuario(){
        return this.$store.getters["Header/GET_HEADER_SELECCIONADO"].nombre;    
    },
    carriles_plaza(){
        return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
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
    this.plazaSeleccionada = numeroPlaza 
    this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
    this.arrayCarriles = this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
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
                /* this.$notify.warning({
                title: "Ups!",
                msg: `LA HORA INICIO NO PUEDE SER MAYOR QUE LA HORA FIN.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,

                },
            });
            */
            console.log('LA HORA INICIO NO PUEDE SER MAYOR QUE LA HORA FIN.')
            return false
        }
    }
    else{                    
                /* this.$notify.warning({
                title: "Ups!",
                msg: `FALTA LLENAR CAMPOS DE HORA FIN Y HORA INICIO.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            }); */
            console.log('FALTA LLENAR CAMPOS DE HORA FIN Y HORA INICIO.')
            return false    
        }
    },
crearDiagnostico (){
    if(this.fecha != '' && this.folioFalla != '' && this.noReporte !='' && this.validar_horas() != false )
    {   
        if(this.type == 'DIAG')
        {
        this.$notify.success({
            title: "Ok!",
            msg: `SE GENERÓ CORRECTAMENTE EL DIAGNOSTICO DE FALLA.`,
            position: "bottom right",
            styles: {
                height: 100,
                width: 500,
                },
            });
        this.type = 'FICHA'
        console.log(this.type)
        }
        else
        {
            this.$notify.success({
            title: "Ok!",
            msg: `SE GENERÓ CORRECTAMENTE LA FICHA TÉCNICA.`,
            position: "bottom right",
            styles: {
                height: 100,
                width: 500,
                },
            });
        }
        
    }
    else{
        this.$notify.warning({
            title: "Ups!",
            msg: `NO SE HA LLENADO LOS CAMPOS CORRECTAMENTE O ESTAN INCOMPLETOS.`,
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