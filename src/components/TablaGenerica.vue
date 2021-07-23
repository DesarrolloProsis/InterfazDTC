<template>
  <div>    
    <div class="bg-white rounded-lg shadow overflow-y-auto overflow-x-0 sm:mb-24 font-titulo mb-12 sm:text-xs" style="height:550px;">
        <table class="border-collapse table-auto  whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead id="">
                <tr class="text-md text-gray-400 font-normal bg-blue-800 sm:hidden md:hidden">
                    <th v-for="(item, keyCompu) in normalheaderKey" :key="keyCompu" class="cabeceraTable sm:text-xs">{{ item }}</th>
                </tr>
                 <tr class="text-md text-gray-400 font-normal bg-blue-800 lg:hidden xl:hidden">                    
                    <th colspan="movilHeaderKey.length" class="inline-flex  w-full">
                        <div v-for="(item, keyMovil) in movilHeaderKey" :key="keyMovil" class="cabeceraTable inline-flex sm:text-xs sm:ml-0 md:ml-6 md:mx-auto border-none">
                            {{ item }}
                        </div>
                    </th>                  
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody id="filaTablaMovil" name="table">
                <template v-if="lista.length == 0 && loadingTabla != true"> 
                    <tr>
                        <td class="w-full text-center text-red-500 m-10" colspan="9">                                    
                            <div class="mt-8 mb-8">Sin Informacion</div>
                        </td>
                    </tr>  
                </template> 
                <template v-if="loadingTabla">  
                    <tr>
                        <td colspan="9">                                    
                            <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                        </td>                          
                    </tr>  
                </template>                            
                <template v-if="lista.length > 0">
                    <tr v-for="(item, keyCompu) in lista" :key="'C' + keyCompu" class="h-12 text-gray-900 text-sm text-center sm:hidden md:hidden">                    

                        <td v-for="(itemSub, keyCompuSub) in normalheaderKey" :key="'CS' +keyCompuSub " class="border-dashed border-t border-gray-200 px-3 sm:text-xs">
                            <template v-if="itemSub != 'Acciones'">{{ item[itemSub] }}</template>
                            <template v-else>Acciones</template>
                        </td>                      
                    </tr>                    
                    <RowHelper v-for="(item, keyMovil) in lista" :key="'M' + keyMovil" :itemRow="item" :headerRow="movilHeaderKey" :keyNormalFull="normalheaderKey"></RowHelper>                                                                        
                </template>  
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import RowHelper from '../components/RowHelper.vue'
export default {
    components: {
        RowHelper
    },
    data(){
        return{
            lista: [],
            loadingTabla: false,
            windowWidth: '',
            normalheaderKey: ['referenceNumber', 'squareName', 'squareName', 'diagnosisDate', 'lanes', 'failuerNumber', 'siniesterNumber', 'referenceDTC', 'Acciones'],
            movilHeaderKey: ['referenceNumber', 'referenceNumber', 'Acciones']
        }
    },
    beforeMount(){
        let userId = this.$store.state.Login.cookiesUser.userId
        this.$http.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
        .then((response) => { 
            console.log(response)           
            this.lista = response.data.result.map(item => {
                item['moreInformationMovil'] = false
                item['disableMoreInformation'] = false
                return item
            })          
        })
        .catch(() => {                                                        
        })                       
    },
    methods: {
               
    },           
}
</script>

<style>

</style>