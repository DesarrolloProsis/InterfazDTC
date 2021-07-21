<template>
  <div>    
    <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 font-titulo mb-12 sm:text-xs" style="height:550px;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead id="">
                <tr class="text-md text-gray-400 font-normal bg-blue-800 sm:hidden md:hidden">
                    <th v-for="(item, key) in normalheaderKey" :key="key" class="cabeceraTable sm:text-xs">{{ item }}</th>
                </tr>
                 <tr class="text-md text-gray-400 font-normal bg-red-800 lg:hidden xl:hidden">
                    <th v-for="(item, key) in movilHeaderKey" :key="key" class="cabeceraTable sm:text-xs">{{ item }}</th>
                </tr>
                <!-- <tr  class="text-md text-gray-400 font-normal bg-blue-800">  

                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Referencia</th>
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Plaza</th>
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Fecha</th>
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Ubicacion</th>
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Folio de Falla</th>
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Folio de Siniestro</th>                                                                                                
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Referencia DTC</th>
                    <th class="py-2 px-3 top-0 border-b border-gray-200 bg-blue-800 font-medium">Acciones</th>
                </tr> -->
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody name="table" id="multiselectHamburguesa">
                <template v-if="lista.length == 0 && loadingTabla != true"> 
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
                <template v-if="lista.length > 0">
                    <tr v-for="(item, key) in lista" :key="key" class="h-12 text-gray-900 text-sm text-center">                
                        <td class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item.referenceNumber }}</td>
                        <td class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item.squareName }}</td>
                        <td class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item.diagnosisDate.slice(0,10) | formato_concentrado }}</td>
                        <td class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item.lanes }}</td>
                        <td class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item.failuerNumber }}</td>
                        <td class="border-dashed border-t border-gray-200 px-3 sm:text-xs">{{ item.siniesterNumber }}</td>                              
                        <td class="border-dashed border-t border-gray-200 px-3">{{ item.referenceDTC }}</td>
                        <td class="border-dashed border-t border-gray-200 px-3">                                               
                            <!-- <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                <template slot="singleLabel" slot-scope="props" class="static">
                                    <div class="inline-flex">
                                        <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                                        <span class="option__title bg-red-300">{{ props.option.title }}</span>
                                    </div>
                                </template>
                                <template slot="option" slot-scope="props" class="static">                                                
                                    <div class="option__desc "><span class="option__title inline-flex">
                                        <img :src="props.option.img" class="mr-5" width="15" height="15">    
                                        {{ props.option.title }}</span>
                                    </div>
                                </template>
                            </multiselect>                                                                                                                                                                                 -->
                        </td>
                    </tr>
                </template>  
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>

const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    data(){
        return{
            lista: [],
            loadingTabla: false,
            windowWidth: '',
            normalheaderKey: ['referenceNumber', 'squareName', 'squareName', 'diagnosisDate', 'lanes', 'failuerNumber', 'siniesterNumber', 'referenceDTC'],
            movilHeaderKey: ['referenceNumber', 'diagnosisDate']
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
            this.lista = response.data.result          
        })
        .catch(() => {                                                        
        })                       
    },
    methods: {
        size_screen(){
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
    watch:{
        windowWidth(newSize){
            if(newSize == 'sm' || newSize == 'md'){
                console.log('mini')
            }
            else {
                let tableHeader = window.document.getElementById('headerTab')
                // tableHeader.innerHTML = `
                //     <tr v-for="(item, key) in normalheaderKey" :key="key" class="text-md text-gray-400 font-normal bg-blue-800">
                //         <td class="cuerpoTable sm:text-xs">{{ item }}</td>
                //     </tr>
                // `
                console.log(tableHeader)
            }
        }
    }

}
</script>

<style>

</style>