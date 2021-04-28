<template>
    <div>        
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico @filtrar-concentrado-diagnostico="filtrar_concentrado_diagnostico" @limpiar-concentrado-diagnostico="limpiar_filtros" :titulo="'Concentrado Diagnostico/Ficha'" :tipo="'DF'"></HeaderGenerico>                       
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24" style="height:450px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <!--/////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      ////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                                <th class="cabeceraTable">Referencia</th>
                                <th class="cabeceraTable">Plaza</th>
                                <th class="cabeceraTable">Fecha</th>
                                <th class="cabeceraTable">Ubicacion</th>
                                <th class="cabeceraTable">Folio de Falla</th>
                                <th class="cabeceraTable">Folio de Siniestro</th>
                                <th class="cabeceraTable">Diagnostico</th>
                                <th class="cabeceraTable">Ficha</th>
                                <th class="cabeceraTable">Accion</th>
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////
                        ////                          BODY TABLA                          ////
                        ////////////////////////////////////////////////////////////////////-->
                        <tbody name="table" is="transition-group">  
                            <tr v-for="(item, key) in infoFichasFallaFiltrada" :key="key" class="h-12 text-gray-900 text-sm text-center">                
                                <td class="cuerpoTable">{{ item.referenceNumber }}</td>
                                <td class="cuerpoTable">{{ item.squareName }}</td>
                                <td class="cuerpoTable">{{ item.diagnosisDate.slice(0,10) }}</td>
                                <td class="cuerpoTable">{{ item.lanes }}</td>
                                <td class="cuerpoTable">{{ item.failuerNumber }}</td>
                                <td class="cuerpoTable">{{ item.siniesterNumber }}</td>
                                <td class="cuerpoTable">
                                    <div>                        
                                        <button @click="imprimir_pdf_diagnostico(item.referenceNumber)" class="botonDescargar">
                                            <img src="../../../assets/img/descargar.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Descargar</span>
                                        </button>
                                    </div>
                                </td>
                                    <td class="cuerpoTable">
                                    <div>                        
                                        <button @click="imprimir_pdf_ficha(item.referenceNumber)" class="botonDescargar">
                                            <img src="../../../assets/img/descargar.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Descargar</span>
                                        </button>
                                    </div>
                                </td>
                                <td class="cuerpoTable">
                                    <div>                                      
                                        <button @click="editar_diagnostico_falla(item)" class="botonIconActualizar">
                                            <img src="@/assets/img/pencil.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Editar</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
    </div>
</template>
<script>
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import Axios from 'axios'
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
            infoFichasFallaFiltrada: []
        }
    },
    beforeMount: function (){
        let userId = this.$store.state.Login.cookiesUser.userId
        Axios.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
        .then((response) => {
            console.log(response)
            this.infoFichasFallaCompleta = response.data.result
            this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
        })
        .catch((error) => {
            console.log(error)            
        })
    },
    methods: {       
        imprimir_pdf_diagnostico(referenceNumber){
            ServiceReporte.generar_pdf_diagnostico_falla(referenceNumber)
        },
        imprimir_pdf_ficha(referenceNumber){
            ServiceReporte.generar_pdf_ficha_falla(referenceNumber)
        },
        filtrar_concentrado_diagnostico(objFiltro){
            console.log(objFiltro)
            this.infoFichasFallaFiltrada = []
            this.infoFichasFallaFiltrada = ServiceFiltros.filtros_concentrado_diagnostico(this.infoFichasFallaCompleta, objFiltro)
        },
        limpiar_filtros(){
            this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
        },
        editar_diagnostico_falla(item){
            this.$router.push({ path: '/Correctivo/PreDTC/Editar/DiagnosticoDeFalla', query: { item } })
        }
    },
}
</script>