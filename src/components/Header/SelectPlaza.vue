<template>
    <div>
        <p class="text-md font-semibold mb-1 text-gray-900">Cambiar Plaza</p>
        <select v-model="plazaSelect.numeroPlaza" @change="cambiarPlaza" :disabled="boolCambiarPlaza" class="w-48" type="text" name="TipoDescripcion">
            <option disabled value>Selecionar...</option>
            <option v-for="(item, index) in listaPlazas" :value="item.numeroPlaza" :key="index">{{ item.plazaNombre }}</option>
        </select>
    </div>
</template>

<script>
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
            plazaSelect: {}
        }
    },
    beforeMount() {
        if(this.fullPlazas)
            this.listaPlazas = this.$store.state.Login.cookiesUser.plazasUsuario 
        
        this.plazaSelect = this.listaPlazas[0]
        this.$store.commit('Login/PLAZA_SELECCIONADA_MUTATION', this.plazaSelect)      
    }

}
</script>

<style>

</style>