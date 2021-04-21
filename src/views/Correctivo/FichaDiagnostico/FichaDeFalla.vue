<template>
    <div>        
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-if="type == 'DIAG'">Diagnostico de Falla</h1>
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-else>Ficha Técnica de Atención</h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo="'FICHA'" @actualizar-header="actualizar_header"></HeaderFalla>
                <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesFichaDiagnostico :reporteDataInsertada="reporteInsertado" :tipo="'Ficha'" :referenceNumber="''"></ImagenesFichaDiagnostico>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-12 sm:mb-6">
                        <div v-if="$route.params.tipoVista == 'Crear'">
                            <div>
                                <button @click="enviar_header_ficha(true)" class="botonIconCrear">
                                    <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                    <span>Enviar Informacion Reporte</span>
                                </button>
                            </div>
                            <div>
                                <button @click="enviar_header_ficha(false)" class="botonIconCrear">
                                    <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                    <span>Imprimir Reporte</span>
                                </button>                                
                            </div>
                        </div>
                        <div v-else>
                            <button @click="enviar_header_ficha" class="botonIconCrear">
                                <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                <span>Actualizar Reporte</span>
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
import Axios from 'axios';
import ImagenesFichaDiagnostico from '../../../components/ImagenesGenericas'
import ServiceReporte from '../../../services/ReportesPDFService'
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
            type: 'DIAGNOSTICO'              
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
        enviar_header_ficha(value){    
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
                    else{
                        this.insertar_ficha_falla(value)                   
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
        insertar_ficha_falla(value){
            if(value){
                let objFicha = {
                    referenceNumber: this.datosHeader.referenceNumber,
                    typeFaultId: this.datosHeader.tipoFalla,
                    intervention: this.datosHeader.solucionFalla,
                    updateFlag: 0 // 0 -> Insertar || 1 -> actualizar
                }            
                Axios.post(`${API}/FichaTecnicaAtencion/Insert/${objFicha.referenceNumber.split('-')[0]}`, objFicha)
                    .then(() => {                                                                    
                    })
                    .catch((error) => {                                            
                        console.log(error)
                    })  
            }
            else{                
                ServiceReporte.generar_pdf_ficha_falla(this.datosHeader.referenceNumber7)                   
                if(this.datosHeader.tipoFalla > 0)
                    this.$router    .push('/NuevoDtc')     
                else
                    this.$router.push('/Home')   
            }
        }
    },
}
</script>