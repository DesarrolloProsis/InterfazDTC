<template>
    <div>        
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-titulo font-bold" v-if="this.type == 'DIAG' ">Diagnóstico de Falla</h1>
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-titulo font-bold" v-else>Ficha Técnica de Atención</h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo="'DIAG'" :reporteInsertado="reporteInsertado" @actualizar-header="actualizar_header"></HeaderFalla>
                <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesFichaDiagnostico :reporteDataInsertada="reporteInsertado" :tipo="'Diag'" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-79 sm:mb-6 sm:ml-1 sm:mt-4 -mt-24">
                        <div v-if="$route.params.tipoVista == 'Crear'">
                            <div v-if="!reporteInsertado">
                                <button @click="enviar_header_diagnostico(true)" class="botonIconCrear">
                                    <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                    <span>Enviar Informacion del Diagnóstico</span>
                                </button>
                            </div>
                            <div v-else>
                                <button @click="enviar_header_diagnostico(false)" class="botonIconCrear">
                                    <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                    <span>Generar Diagnóstico</span>
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <button @click="enviar_header_diagnostico(true)" class="botonIconActualizar">
                                <img src="../../../assets/img/documento.png" class="mr-2" width="35" height="35" />
                                <span>Actualizar Diagnóstico</span>
                            </button>
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import HeaderFalla from '../../../components/FichaDiagnostico/HeaderFalla';
import ServiceReporte from '../../../services/ReportesPDFService'
import ImagenesFichaDiagnostico from '../../../components/ImagenesGenericas'
import Axios from 'axios';
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: "Diagnostico",
    components: {        
        HeaderFalla,
        ImagenesFichaDiagnostico        
    }, 
    ///////////////////////////////////////////////////////////////////////
    ////                      DATA                                    ////
    /////////////////////////////////////////////////////////////////////
    data (){
        return{    
            datosHeader: {},
            type: 'DIAG',
            reporteInsertado: false                 
        }
    },
    beforeMount(){
        if(this.$route.params.tipoVista == 'Editar'){
            this.reporteInsertado = true
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
    enviar_header_diagnostico(value){                
        let llavesHeader = Object.keys(this.datosHeader)           
        console.log(llavesHeader) 
        if(llavesHeader.length == 10){            
            let valueHeader = Object.values(this.datosHeader)
            console.log(valueHeader);
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
                else{
                    this.insertar_diagnostico_falla(value)                       
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
            }                 
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
    insertar_diagnostico_falla(value){                
        if(value){
            let userIdPlaza = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
            let administradorId = this.$store.state.Login.plazaSelecionada.administradorId
            let flagUpdate = this.$route.params.tipoVista == 'Editar' ? 1 : 0
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
                updateFlag: flagUpdate // 0 -> Insertar || 1 -> actualizar
            }        
            Axios.post(`${API}/DiagnosticoFalla/InsertDiagnosticoDeFalla/${objDiagnostico.referenceNumber.split('-')[0]}`, objDiagnostico)
                .then(() => {                
                    let carrilesInsertDiagnostic = this.datosHeader.ubicacion.map(carril => {
                        let newCarril = {}
                        newCarril["referenceNumber"] = objDiagnostico.referenceNumber
                        newCarril["capuLaneNum"] = carril.capufeLaneNum
                        newCarril["idGare"] = carril.idGare
                        newCarril["addFlag"] = flagUpdate // 0 -> Insertar || 1 -> actualizar
                        return newCarril
                    })                
                    carrilesInsertDiagnostic.forEach(carril => {                                                     
                        Axios.post(`${API}/DiagnosticoFalla/FichaTecnicaDiagnosticoLane/${objDiagnostico.referenceNumber.split('-')[0]}`, carril)
                            .then((response) => {         
                                console.log(response) 
                                if(this.$route.params.tipoVista == 'Editar'){
                                    this.type = 'FICHA' 
                                    ServiceReporte.generar_pdf_diagnostico_falla(this.datosHeader.referenceNumber)              
                                    this.$router.push({
                                        path: 'FichaTecnicaDeFalla',
                                        query: { data: this.datosHeader }
                                    }) 
                                }
                            })
                            .catch((error) => {                            
                                console.log(error)                                
                            })    
                    }); 
                    this.reporteInsertado = true                                                   
                    
                })
                .catch((error) => {                                    
                    console.log(error)
                })  
        }        
        else{
            this.type = 'FICHA' 
            ServiceReporte.generar_pdf_diagnostico_falla(this.datosHeader.referenceNumber)              
            this.$router.push({
                path: 'FichaTecnicaDeFalla',
                query: { data: this.datosHeader }
            }) 
        }       
    }
},
}
</script>
