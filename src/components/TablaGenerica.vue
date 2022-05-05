<template>
  <div>    
    <div class="bg-white rounded-lg shadow overflow-y-auto overflow-x-0 sm:mb-24 font-titulo mb-12 sm:text-xs w-full" style="height:426px;">
        <table class="border-collapse table-auto  whitespace-no-wrap bg-white table-striped w-full">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead id="">
                <!-- VersionPC  -->
                <tr class="text-sm text-gray-400 font-normal bg-blue-800 sm:hidden md:hidden w-full">
                    <th colspan="movilHeaderKey.length">
                        <div class="grid grid-rows-1" :class="{'grid-cols-8': normalheaderKey.length == 8, 'grid-cols-9': normalheaderKey.length == 9, 'grid-cols-3': normalheaderKey.length == 3 }">
                            <div v-for="(item, keyPc) in normalheaderKey" :key="keyPc" class="cabeceraTable border-none">                                
                                {{ item.text }}
                            </div>
                        </div>
                    </th>      
                </tr>
                <!-- VersionMovil  -->
                <tr class="text-md text-gray-400 font-normal bg-blue-800 lg:hidden xl:hidden">                    
                    <th colspan="movilHeaderKey.length">
                        <div class="grid grid-cols-3 grid-rows-1">
                            <div v-for="(item, keyMovil) in movilHeaderKey" :key="keyMovil" class="cabeceraTable border-none">
                                {{ item.text }}
                            </div>
                        </div>
                    </th>                  
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody id="multiselectHamburguesa" name="table">
                <template v-if="listaDataTable.length == 0 && loadingTabla != true"> 
                    <tr>
                        <td class="w-full text-center text-red-500 m-10" colspan="9">                                    
                            <div class="mt-8 mb-8">Sin Informacion</div>
                        </td>
                    </tr>  
                </template> 
                <template v-else-if="loadingTabla && listaDataTable.length == 0">  
                    <tr>
                        <td colspan="9">                                    
                            <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                        </td>                          
                    </tr>  
                </template>                            
                <template v-else>  
                    <!-- VersionPC  -->
                    <RowHelper v-for="(item, keyPc) in listaDataTable" :key="'P' + keyPc"
                        @acciones-mapper="acciones_mapper"
                        :itemRow="item" 
                        :listaAcciones="validarAcciones(item)"                        
                        :keyRow="normalheaderKey"
                        :letrasGris="item.statusDtc == 1"
                        :RowAzul ="item.statusId == 4" 
                        :Rowverde ="item.statusId == 5"           
                        class="sm:hidden md:hidden">
                    </RowHelper>
                    <!-- VersionMovil  -->
                    <RowHelper v-for="(item, keyMovil) in listaDataTable" :key="'M' + keyMovil" 
                        @acciones-mapper="acciones_mapper"
                        :itemRow="item" 
                        :listaAcciones="validarAcciones(item)"
                        :keyRow="movilHeaderKey" 
                        :keyNormalFull="normalheaderKey" 
                        :letrasGris="item.statusDtc == 1" 
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
            require: false,
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
        },
        loadingTabla: {
            type: Boolean,
            require: true,
            default: () => true
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