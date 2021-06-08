<template>
    <div>        
        <div class="justify-center">
            <!--/////////////////////////////////////////////////////////////////////
            ////                     MODAL IMAGENES                        /////
            ////////////////////////////////////////////////////////////////////-->
            <div class="sticky inset-0">
                <div v-if="modalImage" class="modalCargarImg mt-48 sm:m-4 sm:mt-66">          
                    <span @click="cerrar_modal_imagenes" class="absolute  top-0 right-0">
                        <img  src="@/assets/img/close.png" class=" w-8 cursor-pointer sm:w-6 sm:h-6" />
                    </span>
                    <div class="justify-center text-center block ml-4 mr-4">            
                        <!-- /////////////////////////////////////////////////////////////////////
                        ////                         IMAGENES                             ////
                        ///////////////////////////////////////////////////////////////////// -->
                        <ImagenesFichaDiagnostico :reporteDataInsertada="reporteInsertado" :tipo="'Ficha'" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>
                        <button @click="enviar_header_ficha(false)" class="botonIconCrear mt-4 sm:mt-12">
                            <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                            <span>Generar Ficha Técnica</span>
                        </button>  
                    </div>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-titulo font-bold">
                        <span class="bg-white tracking-wide text-gray-800 font-titulo font-bold rounded border-b-2 border-gray-600  py-2 px-6 inline-flex items-center ml-4 mr-4">
                            Ficha Técnica de Atención
                        </span>
                    </h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo="'FICHA'" @actualizar-header="actualizar_header"></HeaderFalla>  
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesFichaDiagnostico v-if="$route.params.tipoVista == 'Editar'  || botonEditCreate == false" :reporteDataInsertada="reporteInsertado" :tipo="'Ficha'" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>         
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-6 ml-79 sm:mb-6 sm:ml-1 sm:mt-6">
                        <div v-if="botonEditCreate">                            
                            <button v-if="$route.params.tipoVista == 'Crear'" @click="enviar_header_ficha(true)" class="botonIconCrear">
                                <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                <span>Enviar Información de Ficha</span>
                            </button>                                                                                                  
                        </div>
                        <div v-else>
                            <button @click="enviar_header_ficha(true)" class="botonIconActualizar sm:mt-12">
                                <img src="../../../assets/img/documento.png" class="mr-2" width="35" height="35" />
                                <span>Actualizar Ficha</span>
                            </button>                            
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import HeaderFalla from '../../../components/Header/CrearHeaderFalla';
import ImagenesFichaDiagnostico from '../../../components/ImagenesGenericas'
import ServiceReporte from '../../../services/ReportesPDFService'
import EventBus from '../../../services/EventBus'
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
            type: 'DIAGNOSTICO',
            reporteInsertado: false  ,
            modalImage: false,
            botonEditCreate: true               
        }
    },
    beforeMount(){
        if(this.$route.params.tipoVista == 'Editar'){
            this.reporteInsertado = true
            this.botonEditCreate = false
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
        actualizar_header(objHeader){        
            this.datosHeader = objHeader.header
            console.log(this.datosHeader);
            this.insertar_ficha_falla(objHeader.value)
        }, 
        cerrar_modal_imagenes(){
            this.modalImage = false
            this.botonEditCreate = false
        },
        enviar_header_ficha(value){               
            EventBus.$emit('validar_header_diagnostico', value)
        },
        insertar_ficha_falla(value){
            if(value){
                let flagInsert = this.$route.params.tipoVista == 'Editar' ? 0 : 1
                flagInsert = this.botonEditCreate == false ? 0 : 1
                let objFicha = {
                    referenceNumber: this.datosHeader.referenceNumber,
                    typeFaultId: this.datosHeader.tipoFalla,
                    intervention: this.datosHeader.solucionFalla,
                    updateFlag: flagInsert // 1 -> Insertar || 0 -> actualizar                    
                }                          
                this.$http.post(`${API}/FichaTecnicaAtencion/Insert/${objFicha.referenceNumber.split('-')[0]}`, objFicha)
                    .then(() => {                                  
                        this.reporteInsertado = true    
                        this.modalImage = true  
                        if(this.$route.params.tipoVista == 'Editar'){   
                            this.modalImage = false                         
                            ServiceReporte.generar_pdf_ficha_falla(this.datosHeader.referenceNumber)                   
                            if(this.datosHeader.tipoFalla > 1){
                                this.$router.push(`/NuevoDtc/Crear/${this.datosHeader.referenceNumber}/${this.datosHeader.tipoFalla}`) 
                            }
                            else
                                this.$router.push('/Home')                          
                        }                                                                               
                    })                             
            }
            else{                
                ServiceReporte.generar_pdf_ficha_falla(this.datosHeader.referenceNumber)                   
                if(this.datosHeader.tipoFalla > 1)
                    this.$router.push(`/NuevoDtc/Crear/${this.datosHeader.referenceNumber}/${this.datosHeader.tipoFalla}`)     
                else
                    this.$router.push('/Home')   
            }
        }
    },
}
</script>