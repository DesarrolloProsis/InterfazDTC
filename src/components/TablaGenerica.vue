<template>
  <div>    
    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 font-titulo mb-12 sm:text-xs" style="height:550px;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead id="">
                <tr class="text-md text-gray-400 font-normal bg-blue-800 sm:hidden md:hidden">
                    <th v-for="(item, keyCompu) in normalheaderKey" :key="keyCompu" class="cabeceraTable sm:text-xs">{{ item }}</th>
                </tr>
                 <tr class="text-md text-gray-400 font-normal  bg-red-800 lg:hidden xl:hidden">
                    <!-- <th v-for="(item, keyMovil) in movilHeaderKey" :key="keyMovil" class="cabeceraTable sm:text-xs">{{ item }}</th> -->
                    <th colspan="movilHeaderKey.length" class="inline-flex">
                        <div v-for="(item, keyMovil) in movilHeaderKey" :key="keyMovil" class="cabeceraTable sm:text-xs w-1/3">
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
                    <!-- <tr v-for="(item, keyCompu) in lista" :key="'C' + keyCompu" class="h-12 text-gray-900 text-sm text-center sm:hidden md:hidden">                                        
                        <td v-for="(itemSub, keyCompuSub) in normalheaderKey" :key="'CS' +keyCompuSub " class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item[itemSub] }}</td>                      
                    </tr> -->
                    <!-- <div v-for="(item, keyMovil) in lista" :key="'M' + keyMovil" class="h-12 text-gray-900 text-sm text-center lg:hidden xl:hidden 4k:hidden">  -->
                        <RowHelper v-for="(item, keyMovil) in lista" :key="'M' + keyMovil" :itemRow="item" :headerRow="movilHeaderKey"></RowHelper>
                    <!-- </div> -->
                    <!-- <tr v-for="(item, keyMovil) in lista" :key="'M' + keyMovil" class="h-12 text-gray-900 text-sm text-center lg:hidden xl:hidden 4k:hidden">                                        
                        <td v-for="(itemSub, keyMovilSub) in movilHeaderKey" :key="'MS' + keyMovilSub" class="border-dashed border-t border-gray-200 px-3 sm:text-xs">
                            <div v-if="itemSub != 'Acciones'">
                                {{ item[itemSub] }}
                            </div>
                            <div v-else>
                                <button v-if="item.moreInformationMovil == false" @click="insertar_more_infomacion(keyMovil)" :disabled="item.disableMoreInformation">
                                    <img src="../assets/img/flecha-hacia-abajo.png" class="w-5 h-5" alt="">                                    
                                </button>
                                 <button v-else @click="delete_more_information(keyMovil)">                                    
                                    <img src="../assets/img/flecha-hacia-arriba.png" class="w-5 h-5" alt="">
                                </button>
                            </div>                           
                        </td>                                             
                    </tr>                                                            -->
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
    mounted() {
        window.onresize = () => {
            if(window.innerWidth >= 320 && window.innerWidth < 895){
                this.windowWidth = 'sm'   
            }
            else if(window.innerWidth >= 895 && window.innerWidth < 1024){
                this.windowWidth = 'md'
            }
            else if(window.innerWidth >= 1024 && window.innerWidth < 1279){
                this.windowWidth = 'lg'
            }
            else if(window.innerWidth >= 1279 && window.innerWidth < 2040){
                this.windowWidth = 'xl'
            }
            else{
                this.windowWidth = '4k'
            }   
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
        insertar_more_infomacion(index){
            this.disableFilasMovil(true, index)        
            index += this.lista.length   
            let nodo = document.getElementById('filaTablaMovil')                     
            let nodoBefore = nodo.children[index + 1]              
            let nodoNew = document.createElement('tr')                                  
            nodoNew.innerHTML = `
                <td colspan="${this.movilHeaderKey.length}" class="bg-blue-600"> 
                    <slot></slot>                   
                </td>                
            `            
            nodo.insertBefore(nodoNew, nodoBefore)
        },
        delete_more_information(index){
            this.disableFilasMovil(false, index)                                    
            index = index + this.lista.length
            let nodo = document.getElementById('filaTablaMovil')
            let nodoDelete = nodo.children[index + 1]            
            nodo.removeChild(nodoDelete)
        },
        disableFilasMovil(statusChange, index){
            this.lista.forEach((item, indexfor, listafor) => {
                let updateObj = Object.assign(item)       
                if(indexfor == index)                   
                    updateObj['moreInformationMovil'] = statusChange
                if(indexfor != index)
                    updateObj['disableMoreInformation'] = statusChange
                listafor.slice(index, 1, updateObj)   
            })
        }
    },           
}
</script>

<style>

</style>