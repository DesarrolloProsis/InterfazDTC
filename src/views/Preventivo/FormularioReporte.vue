<template>
    <div>
        <HeaderPreventivo :header="header" :referenceNumber="referenceNumber"></HeaderPreventivo>
        <TablaActividadesCarril :listaActividades="listaActividades"></TablaActividadesCarril>
        <div class=" inline-flex mx-auto w-full pl-20 pr-20">
            <div class="w-1/2">                
                <span class="text-center font-bold text-xl text-gray-800">Observaciones</span>          
                <textarea
                    v-model="observaciones"
                    v-validate="'max:300'"
                    :class="{ 'is_valid': !errors.first('Observaciones'), 'is_invalid': errors.first('Observaciones')}"
                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                    placeholder="jane@example.com"
                    name="Observaciones"
                />
                <p class="text-xs">{{ errors.first("Observaciones") }}</p>
            </div>
            <div class="w-1/2 justify-end flex">
                <button class="mt-32 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-blue-700 h-16 w-32">
                    <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                    <span>Crear</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderPreventivo from '../../components/Header/CrearHeaderPreventivo'
import TablaActividadesCarril from '../../components/Actividades/TablaActividadesCarril'
import ServiceReporte from '../../services/ReportesPDFService'
import EventBus from "../../services/EventBus.js";
export default {
    components:{
        HeaderPreventivo,
        TablaActividadesCarril
    },
    data(){
        return{
            referenceNumber: '',
            header: {},
            listaActividades: [],
            observaciones: '',
            horaFin: '',
            horaInicio: ''
        }
    },
    created() {        
        EventBus.$on("actualizar_hora_inicio", (newHora) => {                              
            console.log(newHora)
            this.horaInicio = newHora
        });
        EventBus.$on("actualizar_hora_fin", (newHora) => {                              
            console.log(newHora)
            this.horaFin = newHora           
        });
    },
    beforeMount: async function(){
        this.header = this.$route.query.header 
        let refPlaza = await this.$store.getters['Login/getReferenceSquareNombre'](this.$route.query.header.plazaNombre)
        this.referenceNumber = await ServiceReporte.crear_referencia_calendario(
            refPlaza,
            this.header.frequencyName,
            this.header.day,
            this.header.lane
        )        
        this.referenceNumber
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