<template>
    <div>        
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico @filtrar-concentrado-diagnostico="filtrar_concentrado_diagnostico" @limpiar-concentrado-diagnostico="limpiar_filtros" @buscar-df="guardar_palabra_busqueda" :titulo="'Concentrado Diagnostico/Ficha'" :tipo="'DF'"></HeaderGenerico>                       
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 font-titulo" style="height:550px;">
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
                                <th class="cabeceraTable font-medium">Diagnostico</th>
                                <th class="cabeceraTable font-medium">Ficha</th>
                                <th class="cabeceraTable font-medium">DTC</th>
                                <th class="cabeceraTable font-medium" :class="{'hidden': typeUser == 4 || typeUser == 10}">Acciones</th>
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////
                        ////                          BODY TABLA                          ////
                        ////////////////////////////////////////////////////////////////////-->
                        <tbody name="table">
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
                                    <td class="cuerpoTable">{{ item.referenceNumber }}</td>
                                    <td class="cuerpoTable">{{ item.squareName }}</td>
                                    <td class="cuerpoTable">{{ item.diagnosisDate.slice(0,10) | formato_concentrado }}</td>
                                    <td class="cuerpoTable">{{ item.lanes }}</td>
                                    <td class="cuerpoTable">{{ item.failuerNumber }}</td>
                                    <td class="cuerpoTable">{{ item.siniesterNumber }}</td>
                                    <td class="cuerpoTable">
                                        <div>                        
                                            <button @click="imprimir_pdf_diagnostico(item.referenceNumber)" class="botonDescargar font-boton sm:w-32">
                                                <img src="../../../assets/img/download.png" class="mr-2 sm:ml-2" width="15" height="15" />
                                                <span class="sm:text-xs sm:ml-1">Descargar</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="cuerpoTable">
                                        <div>                        
                                            <button @click="imprimir_pdf_ficha(item.referenceNumber)" class="botonDescargar font-boton sm:w-32">
                                                <img src="../../../assets/img/download.png" class="mr-2 sm:ml-2" width="15" height="15" />
                                                <span class="sm:text-xs sm:ml-1">Descargar</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="cuerpoTable" :class="{}">                                    
                                        <button v-if="item.validacionFichaTecnica && !item.validacionDTC && item.typeFaultId  >= 2" @click="terminar_dtc(item.referenceNumber, item.typeFaultId)" :disabled="item.validacionDTC || item.typeFaultId <= 1" :class="{'botonDescargarDes': item.validacionDTC || item.typeFaultId <= 1, 'hidden': typeUser == 4 || typeUser == 10 }" class="botonDescargar font-boton sm:w-32">
                                            <img src="@/assets/img/nuevoDtc.png" class="mr-2 sm:ml-0" width="15" height="15" />
                                            <span class="sm:text-xs">Terminar DTC</span>
                                        </button>
                                        <button v-if="item.validacionDTC && item.validacionFichaTecnica" @click="terminar_dtc(item.referenceNumber, item.typeFaultId)"  class="botonBorrarFicha font-boton sm:w-32">
                                            <img src="@/assets/img/pdf-firmado.png" class="mr-2 sm:-ml-1" width="15" height="15" />
                                            <span class="sm:text-xs">Descargar DTC</span>
                                        </button>
                                        <button v-if="!item.validacionDTC && item.typeFaultId <= 1" @click="terminar_dtc(item.referenceNumber, item.typeFaultId)" :disabled="item.validacionDTC || item.typeFaultId <= 1" class="botonNoAplica font-boton sm:w-32 cursor-not-allowed">
                                            <img src="@/assets/img/error.png" class="mr-2 sm:ml-0" width="15" height="15" />
                                            <span class="sm:text-xs">No Aplica DTC</span>
                                        </button>                                          
                                    </td>
                                    <td class="cuerpoTable" :class="{'hidden': typeUser != 1}">
                                        <div v-if="item.validacionFichaTecnica" class="">
                                            <button @click="editar_diagnostico_falla(item)" class="botonEditarDF font-boton sm:mr-1 mr-2">
                                                <img src="@/assets/img/pencil.png" class="sm:mr-1 mr-2" width="15" height="15" />
                                                <span class="sm:text-xs">Editar</span>                                                
                                            </button>
                                            <button @click="editar_diagnostico_falla(item)" class="botonBorrarFicha font-boton">
                                                <img src="@/assets/img/borrar.png" class="sm:mr-1 mr-2" width="15" height="15" />
                                                <span class="sm:text-xs">Borrar</span>                                                
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button @click="terminar_ficha_diagnostico(item)" class="botonTerminarFicha font-boton  w-full sm:w-33 justify-center">
                                                <img src="@/assets/img/nuevoDtc.png" class="mr-2" width="15" height="15" />
                                                <span class="sm:text-xs">Terminar Ficha</span>                                                
                                            </button>
                                        </div>
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
export default {
    name: "ConcentradoFichas",
    components:{        
        HeaderGenerico
    },
    data (){
        return {
            infoFichasFallaCompleta:[],
            infoFichasFallaFiltrada: [],
            listaFicha: [],
            loadingTabla: false,
            typeUser:''
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
        guardar_palabra_busqueda: function(newPalabra){            
            if (newPalabra != "") {
                let array_filtrado = this.infoFichasFallaFiltrada.filter(item => {
                    return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase())
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
            this.$router.push({ path: '/Correctivo/PreDTC/Editar/DiagnosticoDeFalla', query: { item } })
        },
        terminar_ficha_diagnostico(item){            
            let carrilesMapeados = []
            let numeroPlaza = this.$store.state.Login.cookiesUser.plazasUsuario.find(plaza => plaza.administradorId == item.adminSquareId).numeroPlaza
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
        }

    },
    filters: {
        formato_concentrado(fecha){            
            return moment(fecha,"YYYY-MM-DD").format("DD/MM/YYYY")
        }
    }
}
</script>