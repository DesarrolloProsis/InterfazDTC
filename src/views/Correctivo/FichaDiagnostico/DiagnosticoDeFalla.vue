<template>
    <div>        
        <div class="justify-center">       
    <!--/////////////////////////////////////////////////////////////////////
        ////                     MODAL IMAGENES                        /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" v-if="modalImage">
            <div v-if="true" class="modalCargarImg sm:mt-66 sm:m-4">          
                <span @click="cerrar_modal_imagenes" class="absolute  top-0 right-0">
                    <img  src="@/assets/img/close.png" class=" w-8 cursor-pointer sm:w-6 sm:h-6" />
                </span> 
                <div class="justify-center text-center block">            
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesFichaDiagnostico :reporteDataInsertada="true" :tipo="'Diagnostico'" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>
                    <button @click="enviar_header_diagnostico(false)" class="botonIconCrear mt-6">
                        <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                        <span>Generar Diagnóstico</span>
                    </button>  
                </div>
            </div>
        </div>
            <div class="grid gap-4 grid-cols-1 py-3 px-3">      
                <div class="mt-1  mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center -ml-30 text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-titulo font-bold">Diagnóstico de Falla</h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->                       
                    <HeaderFalla :tipo="'DIAG'" :reporteInsertado="reporteInsertado" @actualizar-header="actualizar_header"></HeaderFalla>                      
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesFichaDiagnostico v-if="$route.params.tipoVista == 'Editar' || botonEditCreate == false" :reporteDataInsertada="true" :tipo="type" :referenceNumber="datosHeader.referenceNumber != undefined ? datosHeader.referenceNumber : ''"></ImagenesFichaDiagnostico>       
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-5 -mt-10 ml-77 sm:mb-6 sm:ml-1 sm:-mt-16">
                        <div v-if="$route.params.tipoVista == 'Crear'">                            
                            <button @click="enviar_header_diagnostico(true)" class="botonIconCrear" v-if="!modalImage">
                                <img src="../../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                <span>Enviar Información del Diagnóstico</span>
                            </button>                                                                                                         
                        </div>
                        <div v-else>
                            <button @click="enviar_header_diagnostico(true)" class="botonIconActualizar sm:mt-12">
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
import HeaderFalla from '../../../components/Header/CrearHeaderFalla';
import ServiceReporte from '../../../services/ReportesPDFService'
import ImagenesFichaDiagnostico from '../../../components/ImagenesGenericas'
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
            itemCompletoEdit: {},
            type: 'Diagnostico',
            reporteInsertado: false,
            modalImage: false,
            botonEditCreate: true                 
        }
    },
    beforeMount(){
        if(this.$route.params.tipoVista == 'Editar'){            
            this.itemCompletoEdit = this.$route.query.item
            this.reporteInsertado = true
            this.botonEditCreate = false
        }
    },
/////////////////////////////////////////////////////////////////////
////        {}                  METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
    actualizar_header(objHeader){                      
        this.datosHeader = objHeader.header
        if(objHeader.value == false){             
            this.$http.get(`${API}/DiagnosticoFalla/Images/GetPaths/${objHeader.header.referenceNumber.split('-')[0]}/${objHeader.header.referenceNumber}`)            
                .then((response) => {
                    console.log(response.data)
                    if(response.data.length > 0){
                        if(objHeader.crear)
                            this.insertar_diagnostico_falla(objHeader.value)
                    }  
                    else{
                        this.$notify.warning({
                            title: "Ops!!",
                            msg: "LAS FOTOS SON NECESARIAS.",
                            position: "bottom right",
                            styles: { height: 100, width: 500 },
                        });
                    } 
                })             
        }
        else {
            if(objHeader.crear)
                this.insertar_diagnostico_falla(objHeader.value)
        }
    },
    enviar_header_diagnostico(value){            
        EventBus.$emit('validar_header_diagnostico', value)
    },
    cerrar_modal_imagenes(){
        this.modalImage = false
        this.botonEditCreate = false
    },
    insertar_diagnostico_falla(value){                
        if(value){
            let userIdPlaza = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
            let administradorId = this.$store.state.Login.plazaSelecionada.administradorId
            let flagInsert = this.$route.params.tipoVista == 'Editar' ? 0 : 1
            flagInsert = this.botonEditCreate == false ? 0 : 1
            let objDiagnostico = {
                referenceNumber: this.datosHeader.referenceNumber,
                squareId: userIdPlaza.numPlaza,
                diagnosisDate: this.datosHeader.fechaDiagnostico,
                start: this.datosHeader.horaInicio,
                end: this.datosHeader.horaFin,
                sinisterNumber: this.datosHeader.numeroReporte == "" ? null : this.datosHeader.numeroReporte,
                failureNumber: this.datosHeader.folioFalla == "" ? null : this.datosHeader.folioFalla,
                userId: userIdPlaza.idUser,
                failureDescription: this.datosHeader.descripcionFalla,
                failureDiagnosis: this.datosHeader.diagnosticoFalla,
                causeFailure: this.datosHeader.causaFalla,
                adminSquareId: administradorId,
                updateFlag: flagInsert // 1 -> Insertar || 0 -> editar
            }              
            this.$http.post(`${API}/DiagnosticoFalla/InsertDiagnosticoDeFalla/${objDiagnostico.referenceNumber.split('-')[0]}`, objDiagnostico)
                .then(() => {                
                    let carrilesInsertDiagnostic = this.datosHeader.ubicacion.map(carril => {
                        let newCarril = {}
                        newCarril["referenceNumber"] = objDiagnostico.referenceNumber
                        newCarril["capuLaneNum"] = carril.capufeLaneNum
                        newCarril["idGare"] = carril.idGare
                        newCarril["addFlag"] = 1 // 1 -> Insertar || 0 -> Borrar
                        return newCarril
                    })       
                    let borrarDatos = { ...carrilesInsertDiagnostic[0] }
                    borrarDatos["addFlag"] = 0                    
                    this.$http.post(`${API}/DiagnosticoFalla/FichaTecnicaDiagnosticoLane/${objDiagnostico.referenceNumber.split('-')[0]}`, borrarDatos)
                    .then(() =>{                        
                        carrilesInsertDiagnostic.forEach(carril => {                                                     
                            this.$http.post(`${API}/DiagnosticoFalla/FichaTecnicaDiagnosticoLane/${objDiagnostico.referenceNumber.split('-')[0]}`, carril)
                                .then(() => { 
                                    if(this.botonEditCreate != false)
                                        this.modalImage = true                                                                    
                                })                                 
                        }); 
                        setTimeout(() => {
                            if(this.$route.params.tipoVista == 'Editar'){
                                this.type = 'Ficha' 
                                this.modalImage = false
                                ServiceReporte.generar_pdf_diagnostico_falla(this.datosHeader.referenceNumber)      
                                this.datosHeader["tipoFalla"] = this.itemCompletoEdit.typeFaultId 
                                this.datosHeader["solucionFalla"] = this.itemCompletoEdit.intervention             
                                let referenciaDtc = this.$route.query.referenciaDtc                                
                                this.$router.push({
                                    path: 'FichaTecnicaDeFalla',
                                    query: { data: this.datosHeader, referenciaDtc }
                                }) 
                            }  
                        },2000)
                    })                                  
                    this.reporteInsertado = true                                                                       
                })
                .catch(() => {                    
                    this.$notify.warning({
                        title: "Ops!!",
                        msg: "NO SE PUDO INSERTAR EL DIAGNOSTICO PORFAVOR VERIFIQUE SUS DATOS.",
                        position: "bottom right",
                        styles: { height: 100, width: 500 },
                    });
                })
                
        }        
        else{
            this.type = 'FICHA' 
            ServiceReporte.generar_pdf_diagnostico_falla(this.datosHeader.referenceNumber)      
            let referenciaDtc = this.$route.query.referenciaDtc         
            this.$router.push({
                path: 'FichaTecnicaDeFalla',
                query: { data: this.datosHeader, referenciaDtc }
            }) 
        }       
    }
},
}
</script>
