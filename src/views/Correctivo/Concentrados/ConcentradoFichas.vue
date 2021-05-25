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
                                <th class="cabeceraTable font-medium">Accion</th>
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
                                    <td class="cuerpoTable">{{ item.diagnosisDate.slice(0,10) }}</td>
                                    <td class="cuerpoTable">{{ item.lanes }}</td>
                                    <td class="cuerpoTable">{{ item.failuerNumber }}</td>
                                    <td class="cuerpoTable">{{ item.siniesterNumber }}</td>
                                    <td class="cuerpoTable">
                                        <div>                        
                                            <button @click="imprimir_pdf_diagnostico(item.referenceNumber)" class="botonDescargar font-boton">
                                                <img src="../../../assets/img/descargar.png" class="mr-2 sm:m-0" width="15" height="15" />
                                                <span>Descargar</span>
                                            </button>
                                        </div>
                                    </td>
                                        <td class="cuerpoTable">
                                        <div>                        
                                            <button @click="imprimir_pdf_ficha(item.referenceNumber)" class="botonDescargar font-boton">
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
            infoFichasFallaFiltrada: [],
            listaFicha: [],
            loadingTabla: false
        }
    },
    beforeMount: function (){
        this.loadingTabla = true
        let userId = this.$store.state.Login.cookiesUser.userId
        Axios.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
        .then((response) => {
            console.log(response)
            this.infoFichasFallaCompleta = response.data.result
            this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
            this.listaFicha = this.infoFichasFallaFiltrada
            this.loadingTabla = false
        })
        .catch((error) => {
            this.loadingTabla = false
            this.infoFichasFallaCompleta = []
            this.infoFichasFallaFiltrada = []
            console.log(error)            
        })
    },
    methods: {   
        guardar_palabra_busqueda: function(newPalabra){
            console.log(newPalabra)      
            if (newPalabra != "") {
                let array_filtrado = this.infoFichasFallaFiltrada.filter(item => {
                    return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase())
                })       
                this.listaFicha = array_filtrado;
    
            }
            else{
                this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
            }
        },  
        imprimir_pdf_diagnostico(referenceNumber){
            ServiceReporte.generar_pdf_diagnostico_falla(referenceNumber)
        },
        imprimir_pdf_ficha(referenceNumber){
            ServiceReporte.generar_pdf_ficha_falla(referenceNumber)
        },
        filtrar_concentrado_diagnostico(objFiltro){            
            this.infoFichasFallaFiltrada = []
            this.loadingTabla = true
            setTimeout(() => {
                this.infoFichasFallaFiltrada = ServiceFiltros.filtros_concentrado_diagnostico(this.infoFichasFallaCompleta, objFiltro)
                this.loadingTabla = false
            },1000)
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