<template>
  <div>    
    <div class="bg-white rounded-lg shadow overflow-y-auto overflow-x-0 sm:mb-24 font-titulo mb-12 sm:text-xs" style="height:550px;">
        <table class="border-collapse table-auto  whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead id="">
                <tr class="text-md text-gray-400 font-normal bg-blue-800 sm:hidden md:hidden">
                    <th colspan="movilHeaderKey.length" class="inline-flex w-full">
                        <div v-for="(item, keyPc) in normalheaderKey" :key="keyPc" class="cabeceraTable inline-flex sm:text-xs w-48  md:mx-auto border-none">
                            {{ item.text }}
                        </div>
                    </th>      
                </tr>
                 <tr class="text-md text-gray-400 font-normal bg-blue-800 lg:hidden xl:hidden">                    
                    <th colspan="movilHeaderKey.length" class="inline-flex  w-full">
                        <div v-for="(item, keyMovil) in movilHeaderKey" :key="keyMovil" class="cabeceraTable inline-flex sm:text-xs sm:ml-0 md:ml-6 md:mx-auto border-none">
                            {{ item.text }}
                        </div>
                    </th>                  
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody id="filaTablaMovil" name="table">
                <template v-if="listaDataTable.length == 0 && loadingTabla != true"> 
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
                <template v-if="listaDataTable.length > 0">  
                    <!-- VersionPC  -->
                    <RowHelper v-for="(item, keyPc) in listaDataTable" :key="'P' + keyPc"
                        @acciones-mapper="acciones_mapper"
                        :itemRow="item" 
                        :listaAcciones="validarAcciones(item)"                        
                        :keyRow="normalheaderKey"                         
                        class="sm:hidden md:hidden">
                    </RowHelper>
                    <!-- VersionMovil  -->
                    <RowHelper v-for="(item, keyMovil) in listaDataTable" :key="'M' + keyMovil" 
                        @acciones-mapper="acciones_mapper"
                        :itemRow="item" 
                        :listaAcciones="validarAcciones(item)"
                        :keyRow="movilHeaderKey" 
                        :keyNormalFull="normalheaderKey" 
                        :tipoRow="'Movil'" 
                        class="lg:hidden, xl:hidden 4k:hidden">
                    </RowHelper>                                                                        
                </template>  
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import RowHelper from '../components/RowHelper.vue'
export default {
    components: {
        RowHelper
    },
    props:{
        listaDataTable: {
            type: Array,
            require: true,
            default: () => []
        },
        validarAcciones:{
            type: Function,
            require: true,
            default: () => []
        },
        normalheaderKey: {
            type: Array,
            require: true,
            default: () => []
        },
        movilHeaderKey: {
            type: Array,
            require: true,
            default: () => []
        } 
    },
    data(){
        return{
            lista: [],
            loadingTabla: false,                                   
        }
    },   
    methods: {        
        acciones_mapper(item){            
            this.$emit('acciones-mapper', item)
        }
    },           
}
</script>

<style>

</style>