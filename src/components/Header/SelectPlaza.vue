<template>
    <div>
        <p class="text-md font-semibold mb-1 text-gray-900">Cambiar Plaza</p>
        <select v-model="plazaSelect.numeroPlaza" @change="actualizar_plaza" :disabled="boolCambiarPlaza" class="w-48" type="text" name="TipoDescripcion">
            <option disabled value>Selecionar...</option>
            <option v-for="(item, index) in listaPlazas" :value="item.numeroPlaza" :key="index">{{ item.plazaNombre }}</option>
        </select>
    </div>
</template>

<script>
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
            headerSelect: {},
        }
    },
    beforeMount() {
        if(this.fullPlazas)
            this.listaPlazas = this.$store.state.Login.cookiesUser.plazasUsuario 
        
        this.plazaSelect = this.listaPlazas[0]   
        this.actualizar_plaza()     
        this.headerSelect = this.listaHeaders.find(header => header.referenceSquare == this.plazaSelect.refereciaPlaza)     
        this.actualizar_convenio_plaza()   
    },
    methods:{
        actualizar_convenio_plaza: function(){
            let objConvenio = {
                id: null,
                numPlaza: this.plazaSelect.numeroPlaza,
                numConvenio: this.headerSelect.agrement,
                idConvenio: this.headerSelect.agremmentInfoId,
            }
            this.$store.commit('Header/CONVENIO_ACTUAL_MUTATION', objConvenio)
        },
        actualizar_plaza: function(){   
            this.$store.commit('Login/PLAZA_SELECCIONADA_MUTATION', this.plazaSelect)         
            this.actualizar_convenio_plaza()
        }
    },
    computed:{
        ...mapState('Header', ['listaHeaders'])
    }

}
</script>

<style>

</style>