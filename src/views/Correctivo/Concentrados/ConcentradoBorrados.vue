<template>
    <div>
        <div class="flex justify-center p-4">
            <div class="mt-5">
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <HeaderGenerico @filtrar-borrado="filtradoDTC" @limpiar-borrado="limpiarDTC" :titulo="'Concentrado DTC Borrados'" :tipo="'BORRADO'"></HeaderGenerico>
                <h1 class="text-4xl font-bold text-gray-800 text-center mb-8 hidden">DTC Borrado</h1>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 w-80" style="height:650px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">
                                <th class="cabeceraTable">Referencia</th>
                                <th class="cabeceraTable">Usuario</th>
                                <th class="cabeceraTable">Fecha de Elaboración</th>
                            </tr>
                        </thead>
                        <tbody name="table" is="transition-group">  
                            <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaDTC_filtrada" :key="key">
                                <td class="cuerpoTable">{{ `${item.refereceNumber}` }}</td>
                                <td class="cuerpoTable">{{ item.userName }}</td>
                                <td class="cuerpoTable">{{ item.dateStamp | formatDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
    </div>
</template>
<script>
import Axios from 'axios';
import moment from "moment";
import FiltrosServices from "../../../services/FiltrosDTCServices";
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "DTCBorrados",
    components:{
        HeaderGenerico,
    },
    data (){
        return{
            listaDTC_borrados:[],
            listaDTC_filtrada:[]
        }
    },
    beforeMount: function(){
        Axios.get(`${API}/DtcData/GetReferencesLog`)
        .then((response)=>{
            this.listaDTC_borrados = response.data.result
            this.listaDTC_filtrada = this.listaDTC_borrados
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    },
    methods:{
        actualizarFiltro(){
            Axios.get(`${API}/DtcData/GetReferencesLog`)
            .then((response)=>{
                this.listaDTC_borrados = response.data.result
                this.listaDTC_filtrada = this.listaDTC_borrados
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        },
        filtradoDTC(value){
            this.listaDTC_filtrada = FiltrosServices.filtro_dtc_borrado(this.listaDTC_borrados, value) 
        },
        limpiarDTC(){
            this.listaDTC_filtrada = this.listaDTC_borrados
        }
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