<template>
    <div>
        <div class="flex justify-center p-4">
            <div class="mt-5">
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">DTC Borrado</h1>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24" style="height:650px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">
                                <th class="cabeceraTable">Referencia</th>
                                <th class="cabeceraTable">Correo</th>
                                <th class="cabeceraTable">Plaza</th>
                            </tr>
                        </thead>
                        <tbody name="table" is="transition-group">  
                            <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaDTC_borrados" :key="key">
                                <td class="cuerpoTable">{{ `${item.name} ${item.lastName1} ${item.lastName2}` }}</td>
                                <td class="cuerpoTable">{{ item.mail }}</td>
                                <td class="cuerpoTable">{{ item.squareName }}</td>
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
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: "DTCBorrados",
    data (){
        return{
            listaDTC_borrados:[]
        }
    },
    beforeMount: function(){
        Axios.get(`${API}/dtcData/GetReferencesLog`)
        .then((response)=>{
            this.listaDTC_borrados = response.data.result
        }).catch((error)=>{
            console.log(error)
        })
    },
}
</script>