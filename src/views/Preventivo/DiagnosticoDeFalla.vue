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
        tipo:
        {
            type: String,
            default: () => ''
        } 
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
            type:"DIAG"
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