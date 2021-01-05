<template>
    <div>
        <HeaderPreventivo :header="header"></HeaderPreventivo>
        <TablaActividadesCarril :listaActividades="listaActividades"></TablaActividadesCarril>
    </div>
</template>
<script>
import HeaderPreventivo from '../../components/Header/CrearHeaderPreventivo'
import TablaActividadesCarril from '../../components/Actividades/TablaActividadesCarril'
export default {
    components:{
        HeaderPreventivo,
        TablaActividadesCarril
    },
    data(){
        return{
            header: {},
            listaActividades: []
        }
    },
    beforeMount: async function(){
        this.header = this.$route.query.header 
        this.listaActividades = await this.$store.state.Actividades.listaActividadesCheck   
    }
}
</script>