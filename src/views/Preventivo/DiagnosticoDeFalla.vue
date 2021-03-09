<template>
    <div>
        <Nav></Nav>
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-if="this.type == 'DIAG' ">Diagnostico de Falla</h1>
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-else>Ficha Técnica de Atención</h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo="type" @enviar-header-diagnostico="enviar_header_diagnostico" @actualizar-header="actualizar_header"></HeaderFalla>
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
import ServiceReportePDF from '../../services/ReportesPDFService';
import moment from "moment";
import HeaderFalla from '../../components/FichaDiagnostico/HeaderFalla';

export default {
    name: "Diagnostico",
    components: {
        Nav,        
        HeaderFalla

    },
    props:{
        tipo:{
            type: String,
            default: () => ''
        } 
    }, 
    ///////////////////////////////////////////////////////////////////////
    ////                      DATA                                    ////
    /////////////////////////////////////////////////////////////////////
    data (){
        return{    
            datosHeader: {},      
            type:"DIAG"
        }
    },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function (){    
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
    actualizar_header(header){
        this.datosHeader = header
    },
    enviar_header_diagnostico(){        
    },
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