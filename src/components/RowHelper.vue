<template>
    <div>
        <tr class="sm:text-xs text-gray-900 text-center">            
            <td :colspan="keyRow.length" class="text-xs justify-items-center hover:bg-gray-200" :class="{ 'bg-blue-100 border border-blue-700': rowCssColor == 'terminar', 'bg-yellow-100 border border-yellow-700': rowCssColor == 'editar', 'bg-red-100 border border-red-700': rowCssColor == 'borrar' ,'bg-green-100' : Rowverde,'bg-blue-100' : RowAzul}">                              
                <div class="grid grid-rows-1" :class="{'grid-cols-8': keyRow.length == 8, 'grid-cols-9': keyRow.length == 9, 'grid-cols-3': keyRow.length == 3 }">
                    <div v-for="(itemSub, keyMovil) in keyRow" :key="keyMovil" class=" text-center sm:w-32" :class="{ 'w-48': keyRow.length == 9, 'w-64': keyRow.length == 8, 'w-56': keyRow.length == 3}">                    
                        <template v-if="itemSub['formatoFecha']" class="sm:text-xs">                         
                            {{ itemRow[itemSub['key']] | dataRowFormat }} 
                        </template>
                        <template v-else-if="itemSub['formatoFechaHora']" class="sm:text-xs">                         
                            {{ itemRow[itemSub['key']] | dataRowFormathour }}
                        </template>
                        <template v-else-if="itemSub['text'] != 'Acciones'" class="sm:text-xs">                        
                            <p class="" :class="{'text-gray-500':letrasGris && itemSub['LetrasGris']}">{{ itemRow[itemSub['key']] == '' ? 'Sin informacion' : itemRow[itemSub['key']] }}</p>                      
                        </template>                   
                        <template v-else>
                            <div class="w-32" v-if="tipoRow != 'PC'">
                                <button v-if="!boolMoreInformation" @click="show_more_infomacion">
                                    <!-- <img src="../assets/img/flecha-hacia-abajo.png" class="w-5 h-5 mx-auto" alt=""> -->
                                    <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                </button>
                                <button v-else @click="boolMoreInformation = false, keyLimpio = []">                                    
                                    <!-- <img src="../assets/img/flecha-hacia-arriba.png" class="w-5 h-5 mx-auto" alt=""> -->
                                    <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>
                                </button>
                            </div>
                            <div v-else>
                                <div>
                                    
                                    <multiselect v-model="selectMulti" @close="acciones_mapper()" placeholder="Seleccione una Accion" label="title" track-by="title" class="multi" :options="listaAcciones" :option-height="200" :custom-label="customLabel"  :show-labels="false">
                                        <template slot="singleLabel" slot-scope="props">
                                            <div class="inline-flex">
                                                <!-- <img :src="props.option.img" class="mr-5" width="15" height="15"> -->
                                                <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                                <span class="option__title bg-red-300">{{ props.option.title }}</span>

                                            </div>
                                        </template>
                                        <template slot="option" slot-scope="props">                                                
                                            <div class="option__desc "><span class="option__title inline-flex">
                                                <!-- <img :src="props.option.img" class="mr-5" width="15" height="15"> -->
                                                <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                                {{ props.option.title }}</span>
                                            </div>
                                        </template>
                                    </multiselect>
                                    
                                </div>  
                            </div>
                        </template> 
                    </div>
                </div>
            </td> 
        </tr>
        <transition name="slide-fade">  
            <tr v-if="boolMoreInformation" class="">
                <td :colspan="keyRow.length" class="hover:bg-gray-200" :class="{ 'bg-blue-100 border border-blue-700': rowCssColor == 'terminar', 'bg-yellow-100 border border-yellow-700': rowCssColor == 'editar', 'bg-red-100 border border-red-700': rowCssColor == 'borrar'}">
                    <div v-for="(item, key) in keyLimpio" :key="key" class="w-full">
                        <div class="inline-flex">
                            <p>{{keyLimpio}}</p>
                            <div class="w-32 ml-6">{{  item['text'] }}</div>
                            <div v-if="item['formatoFecha']" class="w-32 ml-6">{{ itemRow[item['key']] | dataRowFormat }}</div>
                            <div v-else class="w-32 ml-6" :class="{'text-gray-500':letrasGris && item['LetrasGris']}">{{ itemRow[item['key']] }}</div>
                        </div>
                    </div>
                    <div class="inline-flex mb-3">
                        <div class="w-32 ml-6 mr-0">Acciones</div>
                        <div class="p-1 pl-0 m-0">                            
                            <multiselect v-model="selectMulti" 
                            @close="acciones_mapper()" placeholder="Seleccione una Accion" label="title" track-by="title" :options="listaAcciones" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                <template slot="singleLabel" slot-scope="props">
                                    <div class="inline-flex">
                                        <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>                                                                
                                        <span class="option__title bg-red-300">{{ props.option.title }}</span>
                                    </div>
                                </template>
                                <template slot="option" slot-scope="props">                                                
                                    <div class="option__desc "><span class="option__title inline-flex">
                                        <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>     
                                        {{ props.option.title }}</span>
                                    </div>
                                </template>
                            </multiselect>                             
                        </div>                       
                    </div>
                </td>
            </tr>
        </transition>
    </div>
</template>

<script>
import moment from "moment";
export default {
    props:{
        tipoRow: {
            type: String,
            require: false,
            default: () => 'PC'
        },
        listaAcciones: {
            type: Array,
            require: true,
            default: () => []
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
        },
        letrasGris:{
            type: Boolean,
            require: false,
            default: () => false
        },
        RowAzul:{
            type: Boolean,
            require: false,
            default: () => false
        },
        Rowverde:{
            type: Boolean,
            require: false,
            default: () => false
        },
    },
    data(){
        return {
            boolMoreInformation: false,
            keyLimpio: [],
            selectMulti: '',
            rowCssColor: ''
        }
    },
    methods: {
        show_more_infomacion(){
            this.boolMoreInformation = true
            let keyOnly = this.keyRow.map(item => item['key'])
            this.keyNormalFull.forEach((item) => {                                                
                if(!keyOnly.includes(item['key'])){
                    if(item['key'] != 'Acciones')
                        this.keyLimpio.push(item)               
                }
            })
        },
        acciones_mapper(){        
            if(this.selectMulti != ''){
                this.rowCssColor = this.selectMulti.accionCss
                let acciones = this.selectMulti                
                this.selectMulti = ''
                setTimeout(() => {
                    this.$emit('acciones-mapper', { acciones: acciones, itemRow: this.itemRow})                    
                    this.rowCssColor = ''
                },500)
            }
        },
        customLabel ({ title }) {
            return `${title}`
        },
    },
    filters: {
        dataRowFormat(item){
            return moment(item.substring(0, 10)).format("DD/MM/YYYY");            
        },
        dataRowFormathour(item){
            return moment(item.substring(0, 50)).format("DD/MM/YYYY HH:mm:ss");            
        },
    }
}
</script>