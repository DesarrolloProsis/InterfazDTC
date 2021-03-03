<template>
    <div>
        <div v-if="forma == ''">
            <p class="text-md font-semibold mb-1 text-gray-900">Cambiar Plaza</p>
            <select v-model="plazaSelect" @change="actualizar_plaza" :disabled="boolCambiarPlaza" class="w-48" type="text" name="TipoDescripcion">
                <option :disabled="tipo != 'filtro'" value>Selecionar...</option>
                <option v-for="(item, index) in listaPlazas" :value="item" :key="index">{{ item.plazaNombre }}</option>
            </select>
        </div>
        <div v-if="forma == 'diagnostico'">
            <select v-model="plazaSelect" @change="actualizar_plaza" class="w-48" type="text" name="TipoDescripcion">
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
        }
    },
    data(){ 
        return{
            listaPlazas: [],
            plazaSelect: {},            
            convenioSelect: {},
            boolCambiarPlaza: false,
        }
    },
    beforeMount: async function() {
        if(this.fullPlazas)
            this.listaPlazas = this.$store.state.Login.cookiesUser.plazasUsuario 
                
        if(this.tipo == 'edicion'){
            this.plazaSelect = this.$store.state.Login.plazaSelecionada
            this.convenioSelect = this.$store.state.Header.headerSeleccionado
            this.boolCambiarPlaza = true
        }
        else if(this.tipo != 'filtro'){
            let { plazaSelect, convenioSelect } = await  ServiceCookies.actualizar_plaza(undefined, this.listaPlazas, this.listaHeaders)    
            this.plazaSelect = plazaSelect
            this.convenioSelect = convenioSelect
            this.boolCambiarPlaza = true 
        }
        

    },
    methods:{    
        actualizar_plaza: async function(){   
            if(this.tipo != 'filtro'){                                           
                this.convenioSelect = await ServiceCookies.actualizar_plaza(this.plazaSelect, this.listaPlazas, this.listaHeaders)
                EventBus.$emit('ACTUALIZAR_INVENTARIO')
            }
            this.$emit('actualizar-plaza', this.plazaSelect.numeroPlaza)            
        }
    },
    computed:{
        ...mapState('Header', ['listaHeaders'])
    }

}
</script>

<style>

</style>