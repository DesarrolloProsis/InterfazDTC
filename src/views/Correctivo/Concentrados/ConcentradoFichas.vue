<template>
    <div>                      
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">                      
                <!--/////////////////////////////////////////////////////////////////
                ////                      ESCANEADO                             ////
                ////////////////////////////////////////////////////////////////////-->
                <PdfEscaneado 
                    @limpiar-componente-escaneado="limpiar_componete_escaneado" 
                    :abrirModal="modalSubirSellado" 
                    :objInsert="objInsertEscaneado" 
                    :tipoReporte="tipoEscaneado"
                >
                </PdfEscaneado>    
                <!--/////////////////////////////////////////////////////////////////
                ////                      MODAL ELIMINAR                         ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="absolute mt-66 ml-69 sm:ml-4">
                    <div v-if="modalEliminar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-12 py-10 shadow-2xl">
                        <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
                            <img src="@/assets/img/warning.png" class="ml-2 sm:-ml-4" width="35" height="35" />
                            <p class="-mt-10 text-black sm:-ml-3 sm:-mt-6">Advertencia</p>
                            <img src="@/assets/img/warning.png" class="ml-66 -mt-12 sm:-mt-10 sm:ml-48" width="35" height="35" />
                        </h1>
                        <ValidationObserver ref="observer">
                            <p class="text-red-600 font-thin text-md sm:text-sm text-justify" v-if="infoEliminar.referenceDTC != '--'">Se eliminará el Diagnóstico y la Ficha con referencia <span class="text-black font-bold">{{ infoEliminar.referenceNumber }}</span> y DTC con referencia <span class="text-black font-bold">{{ infoEliminar.referenceDTC}}</span></p>
                            <p class="text-red-600 font-thin text-md sm:text-sm text-justify" v-else>Se eliminará el Diagnóstico y la Ficha con referencia <span class="text-black font-bold">{{ infoEliminar.referenceNumber }}</span></p>
                            <ValidationProvider name="comentarioBorrar" rules="required:max:300"  v-slot="{ errors }">    
                                <p class="text-md mb-1 font-semibold text-gray-900 mt-10">Motivo</p>
                                <textarea v-model="comentarioBorrar" class="textAreaCalendario" name="comentarioBorrar"/>              
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="mt-5 text-center">
                                <button @click="borrar_diagnostico_falla()" class="botonIconCrear">Si</button>
                                <button @click="modalEliminar = false" class="botonIconCancelar font-boton">No</button>
                            </div>
                        </ValidationObserver>
                    </div>
                </div>
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico 
                    @filtrar-concentrado-diagnostico="filtrar_concentrado_diagnostico" 
                    @limpiar-concentrado-diagnostico="limpiar_filtros" 
                    @buscar-df="guardar_palabra_busqueda" 
                    :titulo="'Concentrado Diagnostico/Ficha'" 
                    :tipo="'DF'"
                >
                </HeaderGenerico>
            <!--/////////////////////////////////////////////////////////////////////
                /////                       TABLA GENERICA                      ////
                ////////////////////////////////////////////////////////////////////-->  
                <TablaGenerica  
                    @acciones-mapper="acciones_mapper"              
                    :listaDataTable="listaFicha"
                    :loadingTabla="loadingTabla"
                    :validarAcciones="opticones_select_acciones"
                    :normalheaderKey="[{text: 'Numero Referencia', key: 'referenceNumber'},{text: 'Plaza', key: 'squareName'},{text: 'Fecha Diagnostico', key: 'diagnosisDate', formatoFecha: true},{text: 'Carriles', key: 'lanes'},{text: 'Numero Falla', key: 'failuerNumber'},{text: 'Numero Siniestro', key:'siniesterNumber'},{text: 'Referencia DTC', key: 'referenceDTC'},{text: 'Acciones', key: 'Acciones'}]"
                    :movilHeaderKey="[{text: 'Numero Referencia', key: 'referenceNumber'},{text: 'Fecha Diagnostica', key: 'diagnosisDate', formatoFecha: true},{text: 'Acciones', key: 'Acciones'}]"
                >
                </TablaGenerica>                                  
            </div>
        </div>    
    </div>
</template>
<script>
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import moment from 'moment'
const API = process.env.VUE_APP_URL_API_PRODUCCION
import ServiceReporte from '../../../services/ReportesPDFService'
import ServiceFiltros from '../../../services/FiltrosDTCServices'
import ServiceCookies from '../../../services/CookiesService'
import PdfEscaneado from '../../../components/PdfEscaneado.vue'
import TablaGenerica from '../../../components/TablaGenerica.vue'

export default {
    name: "ConcentradoFichas",
    components:{        
        HeaderGenerico,
        PdfEscaneado,
        TablaGenerica
    },
    data (){
        return {
            infoFichasFallaCompleta:[],
            infoFichasFallaFiltrada: [],
            listaFicha: [],
            loadingTabla: false,
            typeUser:'',             
            infoEliminar:{},
            comentarioBorrar:'',
            modalEliminar: false,            
            modalSubirSellado: false,
            objInsertEscaneado: {},
            tipoEscaneado: 'Diagnostico'
        }
    },
    beforeMount: function (){
        this.typeUser = this.$store.state.Login.cookiesUser.rollId 
        this.loadingTabla = true
        let userId = this.$store.state.Login.cookiesUser.userId
        this.$http.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
        .then((response) => {
            setTimeout(() => {
                this.infoFichasFallaCompleta = response.data.result
                this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
                this.listaFicha = this.infoFichasFallaFiltrada
                this.loadingTabla = false
            },500)           
        })
        .catch(() => {
            this.loadingTabla = false
            this.infoFichasFallaCompleta = []
            this.infoFichasFallaFiltrada = []                       
        })
    },
    methods: {    
        actualizarTabla(){
            this.typeUser = this.$store.state.Login.cookiesUser.rollId 
            this.loadingTabla = true
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
            .then((response) => {            
                this.infoFichasFallaCompleta = response.data.result
                this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
                this.listaFicha = this.infoFichasFallaFiltrada
                this.loadingTabla = false
            })
            .catch(() => {
                this.loadingTabla = false
                this.infoFichasFallaCompleta = []
                this.infoFichasFallaFiltrada = []                       
            })
        },     
        borrar_diagnostico_falla(){
            let userId = this.$store.state.Login.cookiesUser.userId 
            let clavePlaza = this.infoEliminar.referenceNumber.split('-')[0] 
            let indexRowBorrar = this.listaFicha.findIndex(item => item.referenceNumber == this.infoEliminar.referenceNumber)
            this.loadingTabla = true
            this.listaFicha.splice(indexRowBorrar, 1)            
            this.$http.post(`${API}/DiagnosticoFalla/BorraDiagnosticoFull/${clavePlaza}/${this.infoEliminar.referenceNumber}/${userId}/${this.comentarioBorrar}/${this.infoEliminar.referenceDTC}`)
            .then(() => {                                  
                this.modalEliminar = false
                this.comentarioBorrar = ''
                setTimeout(() => {
                    let indexRowBorrar = this.listaFicha.findIndex(item => item.referenceNumber == this.infoEliminar.referenceNumber)
                    this.listaFicha.splice(indexRowBorrar, 1) 
                    this.loadingTabla = false                                           
                }, 1000)
            })      
        },
        guardar_palabra_busqueda: function(newPalabra){            
            if (newPalabra != "") {
                let array_filtrado = this.infoFichasFallaFiltrada.filter(item => {
                    return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase()) || item.referenceDTC.toUpperCase().includes(newPalabra.toUpperCase())
                })       
                this.listaFicha = array_filtrado;    
            }
            else {
                this.listaFicha = this.infoFichasFallaCompleta
            }
        },          
        filtrar_concentrado_diagnostico(objFiltro){            
            this.listaFicha = []
            this.loadingTabla = true
            setTimeout(() => {
                this.listaFicha = ServiceFiltros.filtros_concentrado_diagnostico(this.infoFichasFallaCompleta, objFiltro)
                this.loadingTabla = false
            }, 1000)
        },
        limpiar_filtros(){
            this.listaFicha = this.infoFichasFallaCompleta
        },
        formato_fecha_hora_diagnostico(dateInicio, dateFin){
            let fechaInicio = dateInicio.split(' ')[0].split('-'); let horatInicio = dateInicio.split(' ')[1].split(':')
            let fechaParseInicio = new Date(fechaInicio[2], parseInt(fechaInicio[1]) - 1, fechaInicio[0], parseInt(horatInicio[0]), parseInt(horatInicio[1]), 0);
            let fechaFin = dateFin.split(' ')[0].split('-'); let horatFin = dateFin.split(' ')[1].split(':')
            let fechaParseFin = new Date(fechaFin[2], parseInt(fechaFin[1]) - 1, fechaFin[0], parseInt(horatFin[0]), parseInt(horatFin[1]), 0);      
            return { fechaInicio: fechaParseInicio.toISOString(), fechaFin: fechaParseFin.toISOString()  }
        },
        editar_diagnostico_falla(item){                      
            let objDateParse = this.formato_fecha_hora_diagnostico(item.start, item.end)
            item['start'] = objDateParse['fechaInicio']; item['end'] = objDateParse['fechaFin'];
            this.$router.push({ path: '/Correctivo/PreDTC/Editar/DiagnosticoDeFalla', query: { item, referenciaDtc: item.referenceDTC } })
        },
        terminar_ficha_diagnostico: async function(item){                 
            let carrilesMapeados = []            
            let objDateParse = this.formato_fecha_hora_diagnostico(item.start, item.end)
            item['start'] = objDateParse['fechaInicio']; item['end'] = objDateParse['fechaFin'];            
            let numeroPlaza = this.$store.state.Login.cookiesUser.plazasUsuario.find(plaza => plaza.administradorId == item.adminSquareId).numeroPlaza   
            ServiceCookies.actualizar_plaza(item.adminSquareId)
            await this.$store.dispatch('Refacciones/BUSCAR_CARRILES', numeroPlaza)        
            setTimeout(() => {
                let carriles =  this.$store.getters["Refacciones/GET_CARRILES_STATE"];                  
                item.lanes.split(',').forEach(lane => {                    
                    let carrilFull = carriles.find(carril => carril.lane == lane)                    
                    if(carrilFull != undefined){
                        carrilesMapeados.push({
                            capufeLaneNum: carrilFull.capufeLaneNum,
                            idGare: carrilFull.idGare,
                            lane: carrilFull.lane
                        })
                    }
                })       
                let data = {
                    causaFalla: item.causeFailure,
                    descripcionFalla: item.faultDescription,
                    diagnosticoFalla: item.failureDiagnosis,
                    fechaDiagnostico: moment(item.diagnosisDate,"YYYY-MM-DD").format("YYYY-MM-DD"),
                    folioFalla: item.failuerNumber,
                    horaFin: item.end,
                    horaInicio: item.start,
                    numeroReporte: item.siniesterNumber,
                    referenceNumber: item.referenceNumber,
                    ubicacion: carrilesMapeados,
                }              
                this.$router.push({ path: '/Correctivo/PreDTC/Crear/FichaTecnicaDeFalla', query: { data } })    
            }, 500)        
        },             
        limpiar_componete_escaneado(){            
            this.loadingTabla = true  
            this.modalSubirSellado = false          
            setTimeout(() => {              
                let indexRowUpdate = this.listaFicha.findIndex(item => item.referenceNumber == this.objInsertEscaneado.referenceNumber)
                let objRowUpdate = Object.assign(this.listaFicha[indexRowUpdate])
                this.listaFicha.splice(indexRowUpdate,1,objRowUpdate)
                if(this.tipoEscaneado == 'Diagnostico'){
                    objRowUpdate['diagnosticoSellado'] = true
                    this.listaFicha.splice(indexRowUpdate,1,objRowUpdate)
                }else{
                    objRowUpdate['fichaSellado'] = true
                    this.listaFicha.splice(indexRowUpdate,1,objRowUpdate)
                } 
                this.objInsertEscaneado = {}
                this.loadingTabla = false 
            },500)           
        },     
        acciones_mapper({ acciones, itemRow }){     
            console.log(acciones)                   
            if(acciones.title == 'Terminar Ficha'){
                this.terminar_ficha_diagnostico(itemRow)
            }
            if(acciones.title == 'Terminar DTC'){
                this.$router.push(`/NuevoDtc/Crear/${itemRow.referenceNumber}/${itemRow.typeFaultId}`)                 
            }   
            if(acciones.title == 'Editar'){                     
                this.editar_diagnostico_falla(itemRow)
            }
            if(acciones.title == 'Borrar'){                             
                this.infoEliminar = itemRow; this.modalEliminar = true;  
            }
            if(acciones.title == 'Dignóstico de Falla'){     
                ServiceReporte.generar_pdf_diagnostico_falla(itemRow.referenceNumber) 
            }
            if(acciones.title == 'Ficha Técnica'){                    
                ServiceReporte.generar_pdf_ficha_falla(itemRow.referenceNumber)
            }
            if(acciones.title == 'Dictamen (DTC)'){                    
                ServiceReporte.generar_pdf_correctivo(itemRow.referenceDTC, 2, false, undefined)
                if (this.typeUser != 4 && this.typeUser != 8){
                    setTimeout(() => {
                        ServiceReporte.generar_pdf_fotografico_correctivo(itemRow.referenceDTC);               
                    },1000)
                }
            }
            if(acciones.title == 'Subir DF Sellado'){                
                this.tipoEscaneado = 'Diagnostico'
                this.modalSubirSellado = true
                this.objInsertEscaneado = {
                    referenceNumber: itemRow.referenceNumber
                }
            }
            if(acciones.title == 'Subir FT Sellada'){                
                this.tipoEscaneado = 'Ficha'
                this.modalSubirSellado = true
                this.objInsertEscaneado = {
                    referenceNumber: itemRow.referenceNumber
                }
                
            }
            if(acciones.title ==  'Bajar FT Sellada'){                
                ServiceReporte.generar_pdf_ficha_sellada(itemRow.referenceNumber, 2)
            }
            if(acciones.title == 'Bajar DF Sellado'){                
                ServiceReporte.generar_pdf_ficha_sellada(itemRow.referenceNumber, 1)
            }                     
        },
        opticones_select_acciones(item){
            const options= [                
                { title: 'Terminar Ficha', accionCss: 'terminar', tipo: '', img: '/img/nuevoDtc.90090632.png' }, //0
                { title: 'Terminar DTC', accionCss: 'terminar', img: '/img/nuevoDtc.90090632.png' },//1
                { title: 'Editar', accionCss: 'editar', img: '/img/pencil.04ec78bc.png' }, //2
                { title: 'Borrar', accionCss: 'borrar', img: '/img/borrar.16664eed.png' },//3
                { title: 'Dignóstico de Falla', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' }, //4
                { title: 'Ficha Técnica', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' },//5
                { title: 'Dictamen (DTC)', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' }, //6
                { title: 'Subir DF Sellado', accionCss: 'editar', img: '/img/upload.8d26bb4f.png' }, //7
                { title: 'Subir FT Sellada', accionCss: 'editar', img: '/img/upload.8d26bb4f.png' }, //8
                { title: 'Bajar FT Sellada', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' },//9
                { title: 'Bajar DF Sellado', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' },//10
            ]
            let filtroOpciones = []            
            filtroOpciones.push(options[4])
            if(this.typeUser != 7){
                filtroOpciones.push(options[7])
            }
            if(item.diagnosticoSellado){
                filtroOpciones.push(options[10])
            } 
            if(item.validacionFichaTecnica){
                filtroOpciones.push(options[5]) 
                if(this.typeUser != 7){
                    filtroOpciones.push(options[8])
                }
                if(item.fichaSellado){
                    filtroOpciones.push(options[9]) 
                }
                if(!item.validacionDTC && item.typeFaultId >= 2 && this.typeUser != 7){
                    filtroOpciones.push(options[1])
                }           
                if(item.validacionDTC && item.validacionFichaTecnica){
                    filtroOpciones.push(options[6])
                } 
                if(this.typeUser == 1 || this.typeUser == 2 || this.typeUser == 3 || this.typeUser == 5 ){                                                   
                    filtroOpciones.push(options[2])
                    filtroOpciones.push(options[3])
                }
            }     
            else{
                if(this.typeUser != 7)
                filtroOpciones.push(options[0])
            }                                       
            return filtroOpciones
        },
    },   
}
</script>
