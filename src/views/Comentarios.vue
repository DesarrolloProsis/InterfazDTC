<template>
    <div>
        <div class="flex justify-center p-4 sm:text-xs">
            <div>
            <HeaderGenerico @filtrar-comentario="guardar_palabra_busqueda" :titulo="'Concentrado Comentarios'" :tipo="'COMENTARIOS'"></HeaderGenerico>
            <div class="overflow-x-auto font-titulo bg-white rounded-lg shadow overflow-y-auto sm:mb-24 w-77 sm:w-67 mb-20" style="height:500px;">
                <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped ">
                    <thead>
                        <tr class="text-md text-gray-400 bg-blue-800">
                            <th class="cabeceraTable">Usuario</th>
                            <th class="cabeceraTable">Tipo de Falla</th>
                            <th class="cabeceraTable">Fecha</th>
                            <th class="cabeceraTable">Comentario</th>
                        </tr>
                    </thead>
                    <tbody name="table" is="transition-group">
                        <template v-if="listaComentarios_filtrada.length == 0 && loadingTabla != true"> 
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
                        <template v-if="listaComentarios_filtrada.length > 0">
                        <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item,key) in listaComment" :key=key>
                            <td class="cuerpoTable sm:text-xs">{{ item.userName }}</td>
                            <td class="cuerpoTable sm:text-xs">{{ item.description }}</td>                                
                            <td class="cuerpoTable sm:text-xs">{{ item.dateStamp | formatDate }}</td>
                            <td class="cuerpoTable sm:text-xs">{{ item.comment }}</td>                                 
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
import moment from "moment";
import HeaderGenerico from "@/components/Header/HeaderGenerico";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: 'Comentarios',
    components:{
        HeaderGenerico,
    },
    data(){
        return{
            listaComentarios_completa:[],
            listaComentarios_filtrada:[],
            listaComment:[],
            loadingTabla: false,
        }
    },
    beforeMount: function () {
        this.loadingTabla = true
        this.$http.get(`${API}/Comentario/ListarComentario`)
        .then((response)=>{
            this.listaComentarios_completa = response.data.result
            this.listaComentarios_filtrada = this.listaComentarios_completa
            this.listaComment = this.listaComentarios_filtrada
            this.loadingTabla = false
        })
    },
    methods:{
        guardar_palabra_busqueda: function(newPalabra){        
            if (newPalabra != "") {
                let array_filtrado = this.listaComentarios_filtrada.filter(item => {
                    return item.userName.toUpperCase().includes(newPalabra.toUpperCase()) || item.description.toUpperCase().includes(newPalabra.toUpperCase())
                })       
                this.listaComment = array_filtrado;
            }
            else{
                this.listaComment = this.listaComentarios_filtrada
            }
        },
    },
/////////////////////////////////////////////////////////////////////
////                           FILTROS                           ////
/////////////////////////////////////////////////////////////////////
    filters: {
        formatDate: function (value) {
            return moment(value.substring(0, 10)).format("DD/MM/YYYY");
        },
    },
    
}
</script>