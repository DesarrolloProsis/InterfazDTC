<template>
    <div>        
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico :titulo="'Concentrado Diagnostico/Ficha'" :tipo="'DF'"></HeaderGenerico>                       
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
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////
                        ////                          BODY TABLA                          ////
                        ////////////////////////////////////////////////////////////////////-->
                        <tbody name="table" is="transition-group">  
                            <tr v-for="(item, key) in infoFichasFalla" :key="key" class="h-12 text-gray-900 text-sm text-center">                
                                <td class="cuerpoTable">{{ item.referenceNumber }}</td>
                                <td class="cuerpoTable">{{ item.squareName }}</td>
                                <td class="cuerpoTable">{{ item.diagnosisDate }}</td>
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
export default {
    name: "ConcentradoFichas",
    components:{        
        HeaderGenerico
    },
    data (){
        return {
            infoFichasFalla:[],
        }
    },
    beforeMount: function (){
        let userId = this.$store.state.Login.cookiesUser.userId
        Axios.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
        .then((response) => {
            this.infoFichasFalla = response.data.result
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
        }

    },
}
</script>