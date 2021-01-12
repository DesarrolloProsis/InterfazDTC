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
        if(this.listaActividades.length == 0){
            this.$notify.warning({
                title: "Ups!",
                msg: `NO TIENE ACTIVIDADES.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
            setTimeout(() => {
                this.$router.push({ path:'/ReportesMantenimiento/TablaActividades' })
            }, 300);  
        }
    }
}
</script>