<template>
    <div>        
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">                      
                <!--/////////////////////////////////////////////////////////////////
                ////                      ESCANEADO                             ////
                ////////////////////////////////////////////////////////////////////-->
                <PdfEscaneado @limpiar-componente-escaneado="limpiar_componete_escaneado" :abrirModal="modalSubirSellado" :objInsert="objInsertEscaneado" :tipoReporte="tipoEscaneado"></PdfEscaneado>    
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
                                <button @click="borrar()" class="botonIconCrear">Si</button>
                                <button @click="modalEliminar = false" class="botonIconCancelar font-boton">No</button>
                            </div>
                        </ValidationObserver>
                    </div>
                </div>
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico @filtrar-concentrado-diagnostico="filtrar_concentrado_diagnostico" @limpiar-concentrado-diagnostico="limpiar_filtros" @buscar-df="guardar_palabra_busqueda" :titulo="'Concentrado Diagnostico/Ficha'" :tipo="'DF'"></HeaderGenerico>                       
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 font-titulo mb-12 sm:text-xs" style="height:550px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <!--/////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      ////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                                <th class="cabeceraTable font-medium">Referencia</th>
                                <th class="cabeceraTable font-medium">Plaza</th>
                                <th class="cabeceraTable font-medium">Fecha</th>
                                <th class="cabeceraTable font-medium">Ubicacion</th>
                                <th class="cabeceraTable font-medium">Folio de Falla</th>
                                <th class="cabeceraTable font-medium">Folio de Siniestro</th>                                                                                                
                                <th class="cabeceraTable font-medium">Referencia DTC</th>
                                <th class="cabeceraTable font-medium">Acciones</th>
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////
                        ////                          BODY TABLA                          ////
                        ////////////////////////////////////////////////////////////////////-->
                        <tbody name="table" class="">
                            <template v-if="infoFichasFallaFiltrada.length == 0 && loadingTabla != true"> 
                                <tr>
                                    <td class="w-full text-center text-red-500 m-10" colspan="9">                                    
                                        <div class="mt-8 mb-8">Sin Informacion</div>
                                    </td>
                                </tr>  
                            </template> 
                            <template v-if="loadingTabla">  
                                <tr>
                                    <td class="w-full" colspan="9">                                    
                                        <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                                    </td>                          
                                </tr>  
                            </template>                            
                            <template v-if="infoFichasFallaFiltrada.length > 0">
                                <tr v-for="(item, key) in listaFicha" :key="key" class="h-12 text-gray-900 text-sm text-center">                
                                    <td class="cuerpoTable sm:text-xs">{{ item.referenceNumber }}</td>
                                    <td class="cuerpoTable sm:text-xs">{{ item.squareName }}</td>
                                    <td class="cuerpoTable sm:text-xs">{{ item.diagnosisDate.slice(0,10) | formato_concentrado }}</td>
                                    <td class="cuerpoTable sm:text-xs">{{ item.lanes }}</td>
                                    <td class="cuerpoTable sm:text-xs">{{ item.failuerNumber }}</td>
                                    <td class="cuerpoTable sm:text-xs">{{ item.siniesterNumber }}</td>                              
                                    <td class="cuerpoTable">{{ item.referenceDTC }}</td>
                                    <td class="cuerpoTable">
                                        <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <div class="inline-flex">
                                                    <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                                                    <span class="option__title bg-red-300">{{ props.option.title }}</span>
                                                </div>
                                            </template>
                                            <template slot="option" slot-scope="props">                                                
                                                <div class="option__desc "><span class="option__title inline-flex">
                                                    <img :src="props.option.img" class="mr-5" width="15" height="15">    
                                                    {{ props.option.title }}</span>
                                                </div>
                                            </template>
                                        </multiselect> 
                                    </td>
                                </tr>
                            </template>  
                        </tbody>
                    </table>
                </div>
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
import PdfEscaneado from '../../../components/PdfEscaneado.vue'

export default {
    name: "ConcentradoFichas",
    components:{        
        HeaderGenerico,
        PdfEscaneado
    },
    data (){
        return {
            infoFichasFallaCompleta:[],
            infoFichasFallaFiltrada: [],
            listaFicha: [],
            loadingTabla: false,
            typeUser:'', 
            modalEliminar: false,
            infoEliminar:{},
            comentarioBorrar:'',
            value: '',
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
        confirmarBorrar (item){
            this.infoEliminar = item
            this.modalEliminar = true
            console.log(item)
        },
        desargar_pdf(value){
            ServiceReporte.generar_pdf_correctivo(value.referenceDTC, 2, false, undefined)
            if (this.typeUser != 4 && this.typeUser != 8){
                setTimeout(()=>{
                    ServiceReporte.generar_pdf_fotografico_correctivo(value.referenceDTC);               
                },1000)
            }
            this.$notify.success({
                title: "Ok!",
                class:'font-titulo',
                msg: `Se Descargo el DTC con Referencia ${value.referenceDTC}.`,
                position: "bottom right",
                styles: { height: 100, width: 500 },
            }); 
        },
        borrar(){
            let userId = this.$store.state.Login.cookiesUser.userId 
            let clavePlaza = this.infoEliminar.referenceNumber.split('-')[0] 
            this.$http.post(`${API}/DiagnosticoFalla/BorraDiagnosticoFull/${clavePlaza}/${this.infoEliminar.referenceNumber}/${userId}/${this.comentarioBorrar}/${this.infoEliminar.referenceDTC}`)
            .then((response)=>{
                console.log(response)
                this.modalEliminar = false
                this.comentarioBorrar = ''
                this.actualizarTabla()
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        guardar_palabra_busqueda: function(newPalabra){            
            if (newPalabra != "") {
                let array_filtrado = this.infoFichasFallaFiltrada.filter(item => {
                    return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase()) || item.referenceDTC.toUpperCase().includes(newPalabra.toUpperCase())
                })       
                this.listaFicha = array_filtrado;    
            }
            else{
                this.listaFicha = this.infoFichasFallaCompleta
            }
        },  
        imprimir_pdf_diagnostico(referenceNumber){
            ServiceReporte.generar_pdf_diagnostico_falla(referenceNumber)
        },
        imprimir_pdf_ficha(referenceNumber){
            ServiceReporte.generar_pdf_ficha_falla(referenceNumber)
        },
        filtrar_concentrado_diagnostico(objFiltro){            
            this.listaFicha = []
            this.loadingTabla = true
            setTimeout(() => {
                this.listaFicha = ServiceFiltros.filtros_concentrado_diagnostico(this.infoFichasFallaCompleta, objFiltro)
                this.loadingTabla = false
            },1000)
        },
        limpiar_filtros(){
            this.listaFicha = this.infoFichasFallaCompleta
        },
        editar_diagnostico_falla(item){            
            let splitInicio = item.start.split(' ')                      
            let fecha = splitInicio[0].split('-')
            let tiempo = splitInicio[1].split(':')                      
            let fechaPArseInicio = new Date(fecha[2], parseInt(fecha[1]) - 1, fecha[0], parseInt(tiempo[0]), parseInt(tiempo[1]), 0)                        
            let splitFin = item.end.split(' ')                            
            let fecha2 = splitFin[0].split('-')
            let tiempo2 = splitFin[1].split(':')                                
            let fechaPArseFin = new Date(fecha2[2], parseInt(fecha2[1]) - 1, fecha2[0], tiempo2[0], tiempo2[1], 0)                        
            item.end = fechaPArseFin.toISOString()
            item.start = fechaPArseInicio.toISOString()            
            this.$router.push({ path: '/Correctivo/PreDTC/Editar/DiagnosticoDeFalla', query: { item, referenciaDtc: item.referenceDTC } })
        },
        terminar_ficha_diagnostico(item){            
            let carrilesMapeados = []            
            let numeroPlaza = this.$store.state.Login.cookiesUser.plazasUsuario.find(plaza => plaza.administradorId == item.adminSquareId)            
            this.$store.dispatch('Refacciones/BUSCAR_CARRILES', numeroPlaza)
            let carriles = this.$store.getters["Refacciones/GET_CARRILES_STATE"];   
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
        },
        terminar_dtc(referencia, typeFaultId){
            this.$router.push(`/NuevoDtc/Crear/${referencia}/${typeFaultId}`) 
        },
        customLabel ({ title }) {
            return `${title}`
        },
        limpiar_componete_escaneado(){
            this.modalSubirSellado = false
            this.objInsertEscaneado = {}
        },
        acciones_mapper(item){                
            if(this.value.title == 'Terminar Ficha'){
                this.terminar_ficha_diagnostico(item)
            }
            if(this.value.title == 'Terminar DTC'){
                this.terminar_dtc(item.referenceNumber, item.typeFaultId)
            }   
            if(this.value.title == 'Editar'){            
                this.editar_diagnostico_falla(item)
            }
            if(this.value.title == 'Borrar'){       
                this.confirmarBorrar(item)     
            }
            if(this.value.title == 'Dignóstico de Falla'){     
                this.imprimir_pdf_diagnostico(item.referenceNumber)       
            }
            if(this.value.title == 'Ficha Técnica'){    
                this.imprimir_pdf_ficha(item.referenceNumber)
            }
            if(this.value.title == 'Dictamen (DTC)'){    
                this.desargar_pdf(item)
            }
            if(this.value.title == 'Diagnostico Sellado'){
                this.tipoEscaneado = 'Diagnostico'
                this.modalSubirSellado = true
                this.objInsertEscaneado = {
                    referenceNumber: item.referenceNumber
                }
            }
            if(this.value.title == 'Ficha Sellada'){
                this.tipoEscaneado = 'Ficha'
                this.modalSubirSellado = true
                this.objInsertEscaneado = {
                    referenceNumber: item.referenceNumber
                }
            }
            this.value = ""
            
        },
        opticones_select_acciones(item){
            const options= [                
                { title: 'Terminar Ficha', img: '/img/nuevoDtc.90090632.png' }, //0
                { title: 'Terminar DTC', img: '/img/nuevoDtc.90090632.png' },
                { title: 'Editar', img: '/img/pencil.04ec78bc.png' }, //2
                { title: 'Borrar', img: '/img/borrar.16664eed.png' },
                { title: 'Dignóstico de Falla', img: '/img/download.ea0ec6db.png' }, //4
                { title: 'Ficha Técnica', img: '/img/download.ea0ec6db.png' },
                { title: 'Dictamen (DTC)', img: '/img/download.ea0ec6db.png' }, //6
                { title: 'Diagnostico Sellado', img: '/img/download.ea0ec6db.png' }, //7
                { title: 'Ficha Sellada', img: '/img/download.ea0ec6db.png' }, //8
            ]
            let filtroOpciones = []
            //Diagnostico Descargar Siempre va
            filtroOpciones.push(options[4])
            if(item.validacionFichaTecnica){
                filtroOpciones.push(options[5])   
                if(!item.validacionDTC && item.typeFaultId  >= 2){
                    filtroOpciones.push(options[1])
                }           
                if(item.validacionDTC && item.validacionFichaTecnica){
                    filtroOpciones.push(options[6])
                }   
                if(this.typeUser != 7 || this.typeUser != 10 || this.typeUser != 4){
                    filtroOpciones.push(options[2])
                    filtroOpciones.push(options[3])
                }
                filtroOpciones.push(options[7])
                filtroOpciones.push(options[8])
            }     
            else{
                filtroOpciones.push(options[7])
                filtroOpciones.push(options[0])
            }                             
            return filtroOpciones
        },
    },
    filters: {
        formato_concentrado(fecha){            
            return moment(fecha,"YYYY-MM-DD").format("DD/MM/YYYY")
        }
    }
}
</script>