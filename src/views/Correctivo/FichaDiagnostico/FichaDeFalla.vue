<template>
    <div>        
        <div class="justify-center sm:w-auto">
            <!--/////////////////////////////////////////////////////////////////////
            ////                     MODAL IMAGENES                        /////
            ////////////////////////////////////////////////////////////////////-->
            <div class="sticky inset-0" :class="{'modal-container': modalImage}">
                <div v-if="modalImage" class="modalCargarImg sm:m-4 sm:mt-66 mt-66">          
                    <span @click="cerrar_modal_imagenes" class="absolute  top-0 right-0">
                        <!-- <img  src="@/assets/img/close.png" class=" w-8 cursor-pointer sm:w-6 sm:h-6" /> -->
                        <font-awesome-icon icon="fa-regular fa-circle-xmark" class="h-8 cursor-pointer sm:w-6 sm:h-6 text-blue-800"/>
                    </span>
                    <div class="justify-center text-center block ml-4 mr-4">            
                        <!-- /////////////////////////////////////////////////////////////////////
                        ////                         IMAGENES                             ////
                        ///////////////////////////////////////////////////////////////////// -->
                        <ImagenesFichaDiagnostico @bloquear-boton-diagnostico="bloquear_boton_diagnostioc_img" :reporteDataInsertada="reporteInsertado" :tipo="'Ficha'" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>
                        <button @click="enviar_header_ficha(false)" :disabled="blockBotonModal" class="botonIconCrear mt-4 sm:mt-12" :class="{'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': blockBotonModal, 'hover:bg-gray-300 hove:border-black': blockBotonModal  }">
                            <!-- <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" /> -->
                            <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="mr-2 text-green-800 h-8"/>
                            <span>Generar Ficha Técnica</span>
                        </button>  
                    </div>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20 md:mx-auto">
                    <h1 class="text-black text-center text-4xl ml-66 mt-3 mb-1 sm:mb-1 sm:text-xl font-titulo font-bold">
                        <span class="bg-white tracking-wide text-gray-800 font-titulo font-bold rounded border-b-2 border-gray-600  py-2 px-6 inline-flex items-center -ml-62 mr-4 sm:text-lg">
                            Ficha Técnica de Atención
                        </span>
                    </h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo="'FICHA'" @actualizar-header="actualizar_header" @mapear-tipo-falla="mapear_tipo_falla"></HeaderFalla>  
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesFichaDiagnostico v-if="($route.params.tipoVista == 'Editar'  || botonEditCreate == false) && tipoFalla <= 1" :reporteDataInsertada="reporteInsertado" :tipo="'Ficha'" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>         
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-5 mt-2 ml-77 sm:mb-6 sm:mx-6 sm:-mt-16 md:mx-auto md:mb-18 lg:mx-auto xl:mx-auto">
                        <div v-if="botonEditCreate">                            
                            <button v-if="$route.params.tipoVista == 'Crear' && botonEditCreate == true" @click="enviar_header_ficha(true)" class="botonIconCrear">
                                <!-- <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" /> -->
                                <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="mr-2 text-green-800 h-8"/>
                                <span>Enviar Información de Ficha</span>
                            </button>                                                                                                  
                        </div>
                        <div v-else class="xl:-mt-10">
                            <button @click="enviar_header_ficha(true)" class="botonIconActualizar sm:mt-12">
                                <!-- <img src="../../../assets/img/documento.png" class="mr-2" width="35" height="35" /> -->
                                <font-awesome-icon icon="fa-solid fa-file-pen" class="mr-2 text-yellow-600 h-8"/>
                                <span>Actualizar Ficha</span>
                            </button>                            
                        </div>
                    </div>  
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           SPINNER                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <Spinner :modalLoading="modalLoading"/>  
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import HeaderFalla from '../../../components/Header/CrearHeaderFalla';
import ImagenesFichaDiagnostico from '../../../components/ImagenesGenericas'
import Spinner from '../../../components/Sppiner.vue'
import ServiceReporte from '../../../services/ReportesPDFService'
import EventBus from '../../../services/EventBus'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: "Diagnostico",
    components: {         
        HeaderFalla,
        ImagenesFichaDiagnostico,
        Spinner     
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
            botonEditCreate: true,
            tipoFalla: 1,
            blockBotonModal: false,
            modalLoading: false            
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
        bloquear_boton_diagnostioc_img(value){
            this.blockBotonModal = value
        },
        mapear_tipo_falla(item){
            this.tipoFalla = item
        },
        actualizar_header(objHeader){                
            this.datosHeader = objHeader.header  
            if(objHeader.value == false){ 
                this.modalLoading = true
                this.$http.get(`${API}/FichaTecnicaAtencion/Images/GetPaths/${objHeader.header.referenceNumber.split('-')[0]}/${objHeader.header.referenceNumber}`)            
                    .then((response) => {                        
                        if(response.data.length > 0){
                            if(objHeader.crear)      
                                this.insertar_ficha_falla(objHeader.value)
                    }
                    else{
                        this.$notify.warning({
                            title: "Ops!!",
                            class:"font-titulo",
                            msg: "SE NECESITA MINIMO UNA FOTO.",
                            position: "bottom right",
                            styles: { height: 100, width: 500 },
                        });
                    }
                })
            }
            else {
                if(objHeader.crear){
                    this.modalLoading = true
                    if(this.botonEditCreate == false && objHeader.header.tipoFalla <= 1){
                        this.$http.get(`${API}/FichaTecnicaAtencion/Images/GetPaths/${objHeader.header.referenceNumber.split('-')[0]}/${objHeader.header.referenceNumber}`)            
                            .then((response) => {                    
                                if(response.data.length > 0){                                
                                    this.insertar_ficha_falla(objHeader.value)
                                }  
                                else{
                                    this.$notify.warning({
                                        title: "Ops!!",
                                        class:"font-titulo",
                                        msg: "SE NECESITA MINIMO UNA FOTO.",
                                        position: "bottom right",
                                        styles: { height: 100, width: 500 },
                                    });
                                } 
                            })    
                    }
                    else {
                        this.insertar_ficha_falla(objHeader.value)
                    }
                }
            }
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
                        if(objFicha.typeFaultId == 1) {
                            if(this.botonEditCreate != false){
                                this.modalLoading = false
                                this.modalImage = true
                            }
                        }
                        else{
                            ServiceReporte.generar_pdf_ficha_falla(this.datosHeader.referenceNumber) 
                            if(this.$route.params.tipoVista == 'Editar'){ 
                                this.$router.push('/ConcentradoFichas')  
                            }
                            else {
                                if(this.$route.query.referenceNumberFinishDiagnostic == undefined)
                                {
                                    this.$router.push(`/NuevoDtc/Crear/${this.datosHeader.referenceNumber}/${this.datosHeader.tipoFalla}`)
                                }
                                else
                                    this.$router.push('/Home')
                            }
                        }
                        if(this.$route.params.tipoVista == 'Editar'){   
                            this.modalLoading = false
                            this.modalImage = false                         
                            ServiceReporte.generar_pdf_ficha_falla(this.datosHeader.referenceNumber)                   
                            if(this.datosHeader.tipoFalla <= 1) {
                                this.$router.push('/Home')                                                                   
                            }                                                                                   
                        }                                                                                                       
                    })                             
            }
            else{                
                ServiceReporte.generar_pdf_ficha_falla(this.datosHeader.referenceNumber)                   
                if(this.datosHeader.tipoFalla > 1){  
                    if(this.$route.query.referenceNumberFinishDiagnostic == undefined)                  
                        this.$router.push(`/NuevoDtc/Crear/${this.datosHeader.referenceNumber}/${this.datosHeader.tipoFalla}`)    
                    else
                        this.$router.push('/Home')    
                } 
                else
                    this.$router.push('/Home')   
            }
        }
    },
}
</script>

<style>
 .modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>