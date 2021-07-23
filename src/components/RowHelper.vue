<template>
    <div>
    <tr class="h-12 text-gray-900 text-sm text-center lg:hidden xl:hidden 4k:hidden">
       <td colspan="headerRow.length" v-for="(itemSub, keyMovilSub) in headerRow" :key="'MS' + keyMovilSub" class="">
           <div class="w-32">
                <template v-if="itemSub != 'Acciones'" class=" sm:text-xs">
                    {{ itemRow[itemSub] }}
                </template>
                <template v-else>
                    <button v-if="itemRow.moreInformationMovil == false" @click="insertar_more_infomacion(keyMovil)" :disabled="itemRow.disableMoreInformation">
                        <img src="../assets/img/flecha-hacia-abajo.png" class="w-5 h-5" alt="">                                    
                    </button>
                     <button v-else @click="delete_more_information(keyMovil)">                                    
                        <img src="../assets/img/flecha-hacia-arriba.png" class="w-5 h-5" alt="">
                    </button>
                </template> 
            </div>                          
        </td> 
    </tr>
    <tr v-if="false">
        <td colspan="headerRow.length">
            <p>hola mundo</p>
        </td>
    </tr>
  </div>
</template>

<script>
export default {
    props:{
        itemRow: {
            type: Object,
            require: true,
            default: () => {}
        },
        headerRow: {
            type: Array,
            require: true,
            default: () => []
        }
    }
}
</script>

<style>

</style>