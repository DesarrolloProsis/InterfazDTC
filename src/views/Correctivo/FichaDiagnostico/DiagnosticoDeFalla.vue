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
                    <HeaderFalla :tipo="'DIAG'" @actualizar-header="actualizar_header"></HeaderFalla>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-12 sm:mb-6">
                        <div>
                            <button @click="enviar_header_diagnostico" class="botonIconCrear">
                                <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
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
import Nav from "../../../components/Navbar";
import HeaderFalla from '../../../components/FichaDiagnostico/HeaderFalla';
import Axios from 'axios';
import CookiesService from '../../../services/CookiesService';
import EventBus from '../../../services/EventBus'
const API = process.env.VUE_APP_URL_API_PRODUCCION
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
            type: 'DIAG',                 
        }
    },

/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
    actualizar_header(header){
        this.datosHeader = header
    },
    validar_horas(){
        let horaISplite = this.datosHeader.horaInicio.split(':')            
        let horaFSplite = this.datosHeader.horaFin.split(':')            
        let dateInicio = new Date(1995,11,17,horaISplite[0],horaISplite[1],0);
        let dateFin = new Date(1995,11,17,horaFSplite[0],horaFSplite[1],0);             
        return dateInicio < dateFin ? true : false                   
    },
    enviar_header_diagnostico(){    
        let llavesHeader = Object.keys(this.datosHeader)            
        if(llavesHeader.length == 10){            
            let valueHeader = Object.values(this.datosHeader)
            let validar = valueHeader.some(prop => prop == '')            
            if(validar){                                
                this.$notify.warning({
                    title: "Ups!",
                    msg: `FALTA LLENAR CAMPOS.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
            }
            else{                                                
                let horasValidas = this.validar_horas()
                if(horasValidas != true){                           
                    this.$notify.warning({
                        title: "Ups!",
                        msg: `LA HORA INICIO NO PUEDE SER MAYOR QUE LA HORA FIN.`,
                        position: "bottom right",
                        styles: {
                            height: 100,
                            width: 500,
                        },
                    });
                }                
            }     
            if(this.type == "DIAG")
                this.insertar_diagnostico_falla()                   
            else
                this.insertar_diagnostico_falla()

            this.$notify.success({
                title: "Ok",
                msg: `SE CREO CORRECTAMENTE.`,
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
                    msg: `FALTA LLENAR CAMPOS.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
        }
    },
    insertar_diagnostico_falla(){
        this.type = 'FICHA'
        let userIdPlaza = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
        let administradorId = this.$store.state.Login.plazaSelecionada.administradorId
        let objDiagnostico = {
            referenceNumber: this.datosHeader.referenceNumber,
            squareId: userIdPlaza.numPlaza,
            diagnosisDate: this.datosHeader.fechaDiagnostico,
            start: this.datosHeader.horaInicio,
            end: this.datosHeader.horaFin,
            sinisterNumber: this.datosHeader.numeroReporte,
            failureNumber: this.datosHeader.folioFalla,
            userId: userIdPlaza.idUser,
            failureDescription: this.datosHeader.descripcionFalla,
            failureDiagnosis: this.datosHeader.diagnosticoFalla,
            causeFailure: this.datosHeader.causaFalla,
            adminSquareId: administradorId,
            updateFlag: 0 // 0 -> Insertar || 1 -> actualizar
        }        
        Axios.post(`${API}/DiagnosticoFalla/InsertDiagnosticoDeFalla/${objDiagnostico.referenceNumber.split('-')[0]}`, objDiagnostico, CookiesService.obtener_bearer_token())
            .then((response) => {
                console.log(response)
                let carrilesInsertDiagnostic = this.datosHeader.ubicacion.map(carril => {
                    let newCarril = {}
                    newCarril["referenceNumber"] = objDiagnostico.referenceNumber
                    newCarril["capuLaneNum"] = carril.capufeLaneNum
                    newCarril["idGare"] = carril.idGare
                    newCarril["addFlag"] = 1 // 0 -> Insertar || 1 -> actualizar
                    return newCarril
                })                
                carrilesInsertDiagnostic.forEach(carril => {      
                    console.log(carril)                              
                    Axios.post(`${API}/DiagnosticoFalla/FichaTecnicaDiagnosticoLane/${objDiagnostico.referenceNumber.split('-')[0]}`, carril, CookiesService.obtener_bearer_token())
                        .then((response) => {
                            console.log(response)       
                            EventBus.$emit('guardar_imagenes')                 
                            this.$router.push({
                                path: 'FichaTecnicaDeFalla',
                                query: { data: this.datosHeader }
                            })                            
                        })
                        .catch((error) => {
                            console.log(error)
                            if(error.response.status == 401)
                                CookiesService.token_no_autorizado()
                        })    
                });                                       
                
            })
            .catch((error) => {
                if(error.response.status == 401)
                    CookiesService.token_no_autorizado()
                console.log(error)
            })         
    }
},
}
</script>
