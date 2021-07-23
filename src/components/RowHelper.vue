<template>
    <div>
        <tr class="h-12 sm:text-xs text-gray-900 text-center w-full">
           <td :colspan="keyRow.length" class="w-full lg:ml-20">               
                <div v-for="(itemSub, keyMovil) in keyRow" :key="keyMovil" class=" text-center inline-flex sm:w-32 w-48 ml-1">
                    <template v-if="itemSub != 'Acciones'" class="sm:text-xs">
                        {{ itemRow[itemSub] }}
                    </template>
                    <template v-else>
                        <div v-if="tipoRow != 'PC'">
                            <button v-if="!boolMoreInformation" @click="show_more_infomacion">
                                <img src="../assets/img/flecha-hacia-abajo.png" class="w-5 h-5" alt="">                                    
                            </button>
                             <button v-else @click="boolMoreInformation = false, keyLimpio = []">                                    
                                <img src="../assets/img/flecha-hacia-arriba.png" class="w-5 h-5" alt="">
                            </button>
                        </div>
                        <div v-else>
                            'Acciones'
                        </div>
                    </template> 
                </div>
            </td> 
        </tr>
        <transition name="slide-fade">  
            <tr v-if="boolMoreInformation" class="">
                <td :colspan="keyRow.length" class="">
                    <div v-for="(item, key) in keyLimpio" :key="key" class="w-full">
                        <div class="inline-flex">
                            <div class="w-32 ml-6">{{  item }}</div>
                            <div class="w-32 ml-6">{{ itemRow[item] }}</div>
                        </div>
                    </div>
                    <div>
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
                        </multiselect>  -->
                    </div>
                </td>
            </tr>
        </transition>
    </div>
</template>

<script>
export default {
    props:{
        tipoRow: {
            type: String,
            require: false,
            default: () => 'PC'
        },
        itemRow: {
            type: Object,
            require: true,
            default: () => {}
        },
        keyRow: {
            type: Array,
            require: true,
            default: () => []
        },
        //Solo en Movil
        keyNormalFull: {
            type: Array,
            require: false,
            default: () => []
        }
    },
    data(){
        return {
            boolMoreInformation: false,
            keyLimpio: []
        }
    },
    methods: {
        show_more_infomacion(){
            this.boolMoreInformation = true
            this.keyNormalFull.forEach((item) => {
                if(!this.keyRow.includes(item)){
                    if(item != 'Acciones')
                        this.keyLimpio.push(item)               
                }
            })
        }
    }
}
</script>

<style>

</style>