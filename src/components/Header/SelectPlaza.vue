<template>
    <div>
        <p class="text-md font-semibold mb-1 text-gray-900">Cambiar Plaza</p>
        <select v-model="plazaSelect" @change="actualizar_plaza" :disabled="boolCambiarPlaza" class="w-48" type="text" name="TipoDescripcion">
            <option disabled value>Selecionar...</option>
            <option v-for="(item, index) in listaPlazas" :value="item" :key="index">{{ item.plazaNombre }}</option>
        </select>
    </div>
</template>

<script>
import EventBus from "../../services/EventBus.js";
import { mapState } from 'vuex'
export default {
    props: {
        fullPlazas: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            listaPlazas: [],
            plazaSelect: {},            
            convenioSelect: {}
        }
    },
    beforeMount() {
        if(this.fullPlazas)
            this.listaPlazas = this.$store.state.Login.cookiesUser.plazasUsuario 
        
        this.plazaSelect = this.listaPlazas[0]   
        this.actualizar_plaza()     
        this.convenioSelect = this.listaHeaders.find(header => header.referenceSquare == this.plazaSelect.refereciaPlaza)                
    },
    methods:{    
        actualizar_plaza: async function(){                              
            await this.$store.commit('Login/PLAZA_SELECCIONADA_MUTATION', this.plazaSelect)  
            this.convenioSelect = this.listaHeaders.find(header => header.referenceSquare == this.plazaSelect.refereciaPlaza)                                         
            let objConvenio = {
                id: null,
                numPlaza: this.plazaSelect.numeroPlaza,
                numConvenio: this.convenioSelect.agrement,
                idConvenio: this.convenioSelect.agremmentInfoId,
            }                      
            await this.$store.commit('Header/CONVENIO_ACTUAL_MUTATION', objConvenio)
            await this.$store.dispatch('Refacciones/FULL_COMPONETES', objConvenio)
            EventBus.$emit('ACTUALIZAR_INVENTARIO')
        }
    },
    computed:{
        ...mapState('Header', ['listaHeaders'])
    }

}
</script>

<style>

</style>