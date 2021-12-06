<template>
    <div>
        <div class="flex justify-center p-4 sm:text-xs">
            <div>
                <HeaderGenerico @descargar-reporte="descargar_reporte" :titulo="'Componentes Requeridos'" :tipo="'COMPONENTES'"></HeaderGenerico>
                <div class="overflow-x-auto font-titulo bg-white rounded-lg shadow overflow-y-auto sm:mb-24 w-80 sm:w-67 mb-20" style="height:500px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped ">
                        <thead>
                            <tr class="text-md text-gray-400 bg-blue-800">
                                <th class="cabeceraTable">Plaza</th>
                                <th class="cabeceraTable">Carril</th>
                                <th class="cabeceraTable">Componente</th>
                                <th class="cabeceraTable">Precio</th>
                                <th class="cabeceraTable">Solicitante</th>
                                <th class="cabeceraTable">Tipo DTC</th>
                                <th class="cabeceraTable">Referencia</th>
                            </tr>
                        </thead>
                        <tbody name="table" is="transition-group">
                            <template v-if="lista_Filtrada.length == 0 && loadingTabla != true"> 
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
                            </template>  -->
                            <template v-if="lista_Filtrada.length > 0">
                            <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in lista_Filtrada" :key="key">
                                <td class="cuerpoTable sm:text-xs">{{ item.plaza }}</td>
                                <td class="cuerpoTable sm:text-xs">{{ item.carril }}</td>                                
                                <td class="cuerpoTable sm:text-xs">{{ item.componente }}</td>
                                <td class="cuerpoTable sm:text-xs">${{ item.precio }}</td> 
                                <td class="cuerpoTable sm:text-xs">{{ item.solicitante }}</td>
                                <td class="cuerpoTable sm:text-xs">{{ item.tipoDTC }}</td>                                
                                <td class="cuerpoTable sm:text-xs">{{ item.referencia }}</td>                                
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
const API = process.env.VUE_APP_URL_API_PRODUCCION
import HeaderGenerico from "@/components/Header/HeaderGenerico";
import ServiceReportPDF from "../../../services/ReportesPDFService"
export default {
    name:'ReporteComponentes',
    components:{
        HeaderGenerico,
    },
    data(){
        return {
            lista_Componentes:[],
            lista_Filtrada:[],
            lista:[],
            loadingTabla: false,
        }
    },
    beforeMount(){
        this.loadingTabla = true
        this.$http.get(`${API}/Component/ReporteComponente`)
        .then((response)=>{
            this.lista_Componentes = response.data.result
            this.lista_Filtrada = this.lista_Componentes
            this.lista = this.lista_Filtrada
            this.loadingTabla = false
        })
    },
    methods:{
        descargar_reporte: function(){
            ServiceReportPDF.reporte_componentes()
        }
    }
}
</script>