<template>
    <div class="font-titulo">
        <div v-if="forma == ''">
            <p class="text-md font-bold mb-1 mt-1 text-gray-900" :class="{'hidden': $route.params.type != ''}">Cambiar Plaza</p>
            <p class="w-48 input ml-20 sm:ml-1 md:mx-auto" :class="{'sm:w-32':vista=='Actividades', 'sm:w-62':vista=='ConcentradoDTC', 'sm:w-62':vista=='GMMEP', 'xl:-ml-1 sm:w-full sm:ml-0':vista=='Inventario', 'sm:w-full sm:-ml-0':vista=='Encargados'}">
            <select v-model="plazaSelect" @change="actualizar_plaza" :disabled="boolCambiarPlaza" class="w-48 is_valid" :class="{'sm:w-32 sm:text-xs':vista=='Actividades', 'sm:w-63':vista=='Calendario', 'sm:w-62':vista=='ConcentradoDTC', 'sm:w-62':vista=='GMMEP', 'xl:ml-1 sm:w-full sm:ml-0':vista=='Inventario','sm:w-full sm:-ml-2':vista=='Encargados'}" type="text" name="TipoDescripcion">
                <!-- <option :disabled="tipo != 'filtro'" value>Selecionar...</option> -->
                <option v-for="(item, index) in listaPlazas" :value="item" :key="index">
                    {{ isDtc == true ? item.plazaAdminNombre : item.plazaNombre }}
                </option>
            </select></p>
        </div>
        <div v-if="forma == 'encargado'">            
            <select v-model="plazaSelect" @change="actualizar_plaza" :disabled="boolCambiarPlaza" class="w-48 is_valid" type="text" name="TipoDescripcion">                
                <option v-for="(item, index) in listaPlazas" :value="item" :key="index">
                    {{ isDtc == true ? item.plazaAdminNombre : item.plazaNombre }}
                </option>
            </select>
        </div>
        <div v-if="forma == 'diagnostico'">
            <select v-model="plazaSelect" @change="actualizar_plaza" class="w-48 sm:w-20" type="text" name="TipoDescripcion">
                <option :disabled="tipo != 'filtro'" value>Selecionar...</option>
                <option v-for="(item, index) in listaPlazas" :value="item" :key="index">{{ item.plazaNombre }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import EventBus from "../../services/EventBus.js";
import ServiceCookies from '../../services/CookiesService'
import { mapState } from 'vuex'
export default {
    props: {
        fullPlazas: {
            type: Boolean,
            default: true
        },
        tipo: {
            type: String,
            default: 'insercion'
        },
        forma: {
            type: String,
            default: () => ''
        }, 
        edicion: {
            type: Number,
            default: () => 0
        },
        vista:{
            type: String,
            default: () => ''
        }
    },
    data(){ 
        return{
            listaPlazas: [],
            plazaSelect: {},            
            convenioSelect: {},
            boolCambiarPlaza: false,
            isDtc: false,
        }
    },   
    created(){
        EventBus.$on('Limpiar-SelectPlaza', () => {      
            this.plazaSelect = {}
            this.convenioSelect = {}            
        });
    },
    beforeMount: async function() {        
        this.listaPlazas = this.$store.state.Login.cookiesUser.plazasUsuario.filter(item => item.statusAdmin == true)         
        if(this.tipo == "filtro" || this.tipo == "edicion" || this.tipo == "insercion"){
            let plazasSinRepetir = []
            this.listaPlazas.forEach(element => {                                        
                if(!plazasSinRepetir.some(item => item.numeroPlaza == element.numeroPlaza)){                        
                    plazasSinRepetir.push(element)
                }
            });                
            this.listaPlazas = plazasSinRepetir
        }                      
        if(this.tipo == 'edicion'){
            this.plazaSelect = this.$store.state.Login.plazaSelecionada
            this.convenioSelect = this.$store.state.Header.headerSeleccionado
            this.boolCambiarPlaza = this.edicion ==  0 ? true : false
        }
        else if(this.tipo == 'tipoPlazaSelect'){               
            this.plazaSelect = this.$store.state.Login.plazaSelecionada
            this.convenioSelect = this.$store.state.Header.headerSeleccionado
            this.boolCambiarPlaza = false
            this.isDtc = true
        }
        else if(this.tipo == 'editDTC'){             
            this.plazaSelect = this.$store.state.Login.plazaSelecionada
            this.convenioSelect = this.$store.state.Header.headerSeleccionado
            this.boolCambiarPlaza = true
            this.isDtc = true
        }        
        else if(this.tipo == 'insercion'){            
            let { plazaSelect, convenioSelect } = await  ServiceCookies.actualizar_plaza()    
            this.plazaSelect = plazaSelect
            this.convenioSelect = convenioSelect
            this.boolCambiarPlaza = false
        }        
    },
    destroyed(){
        EventBus.$off('Limpiar-SelectPlaza')
    },
    methods:{    
        actualizar_plaza: async function(){               
            if(this.plazaSelect != ''){
                if(this.tipo != 'filtro'){                                                            
                    this.convenioSelect = await ServiceCookies.actualizar_plaza(this.plazaSelect.administradorId).convenioSelect
                    //EventBus.$emit('ACTUALIZAR_INVENTARIO')
                    this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSelect.numeroPlaza)
                }
                this.$emit('actualizar-plaza', this.plazaSelect.numeroPlaza)   
            }
            else{
                this.convenioSelect = []
                this.$emit('actualizar-plaza', this.plazaSelect)
            }                 
        }
    },
    computed:{
        ...mapState('Header', ['listaHeaders'])
    },
    watch: {
        selectPlazaState(newValue){            
            this.plazaSelect = newValue
        },
        selectHeaderPlaza(newValue){                
            this.convenioSelect = newValue
        }
    }
}
</script>

<style>

</style>