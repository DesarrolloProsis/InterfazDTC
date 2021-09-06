<template>
<div >
    <div class="flex justify-center p-2">
        <div class="grid gap-4 grid-cols-1" :class="{'opacity-50':deshabilitar}">
            <div class="divtabla sm:text-xs" :class="{ 'overflow-x-auto': scrollBool}">
            <!--//////////////////////////////////////////////////////////////////////
                ////                           TABLA                             ////
                ////////////////////////////////////////////////////////////////////-->
                <table class="table table-striped"  style="height:550px;">
                    <!--/////////////////////////////////////////////////////////////////
                    ////                           HEADER TABLA                      ////
                    ////////////////////////////////////////////////////////////////////-->
                    <thead>
                        <tr class="text-md h-16 trTable"> 
                            <th class="w-64 cabeceraTable font-titulo font-medium">Equipo</th>               
                            <th class="w-64 cabeceraTable font-titulo font-medium">Componente</th> 
                            <th class="w-64 cabeceraTable font-titulo font-medium">Actividad</th>                             
                            <th class="w-64 cabeceraTable font-titulo font-medium">Ubicacion</th>                                                                                          
                            <th class="w-64 cabeceraTable font-titulo font-medium"><p>Acciones</p></th>                
                        </tr>
                    </thead>
                <!--///////////////////////////////////////////////////////////////////
                    ////                           Body TABLA                     ////
                    /////////////////////////////////////////////////////////////////-->
                    <tbody name="table" is="transition-group">       
                        <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividades" :key="key"> 
                            <td class="w-66 cuerpoTable font-titulo font-normal text-center">{{ item.equipo }}</td>   
                            <td class="w-66 cuerpoTable font-titulo font-normal text-center">{{ item.componente }}</td>                                                         
                            <td class="w-66 cuerpoTable font-titulo font-normal text-center">{{ item.actividades }}</td>   
                            <td class="w-66 cuerpoTable font-titulo font-normal text-center">{{ item.ubicacion }}</td>                                                                                
                            <td class="w-66 cuerpoTable font-titulo font-normal text-center">                                                                
                                <select v-model="item.jobStatus" @change="actualizar_actividad(item)" class="w-32 text-md text-gray-800 is_valid ml-20 sm:ml-0" :class="{'bg-green-500': item.jobStatus == 1, 'bg-yellow-500': item.jobStatus == 2, 'bg-orange-500': item.jobStatus == 3, 'bg-red-500': item.jobStatus == 4 }" >
                                    <option value="0">Seleccione...</option>
                                    <option class="bg-green-500" value="1">Ok</option>
                                    <option class="bg-yellow-500" value="2">Dañado</option>
                                    <option class="bg-orange-500" value="3">No Aplica</option>
                                    <option class="bg-red-500" value="4">No Existe</option>
                                </select>
                            </td>
                        </tr>                    
                    </tbody>                    
                </table>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import EventBus from "../../services/EventBus.js";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: 'TablaActividadesCarril',
    props: {
        listaActividades: {
            type: Array,
            default: () => []
        },
        referenceNumber: {
            type: String,
            default: () => ''
        },
        calendarioId:{
            type: Number,
            default: () => null
        },
        deshabilitar:{
            type: Boolean,
            default: () => false
        }
    },
    data(){
        return{
            scrollBool: '',
            reporteNuevo: true,         
        }
    },
    created(){
        EventBus.$on('insertar-todas-actividades', () => {
            this.insertar_actividades_nuevas()
        })
    },
    beforeMount(){
        this.$route.params.tipoVista == 'editar' 
            ? this.reporteNuevo = false 
            : this.reporteNuevo = true 
    },
    destroyed(){
        EventBus.$off('insertar-todas-actividades')
    },
    methods:{
        insertar_actividades_nuevas(){
            if(this.reporteNuevo){                      
                let arrayJob = []
                this.listaActividades.forEach((item) => {
                    arrayJob.push({
                        referenceNumber: this.referenceNumber,
                        componentJob: parseInt(item.idJob),
                        jobStatus: parseInt(item.jobStatus),
                        flagUpdate: this.reporteNuevo 
                    }) 
                })                
                this.$http.post(`${API}/Calendario/CalendarReportActivities/${this.referenceNumber.split('-')[0]}/${this.calendarioId}`, arrayJob)
                .then(() => {                                   
                })                                    
            } 
        },
        actualizar_actividad(item){
            if(!this.reporteNuevo){                
                let arrayJob = []
                arrayJob.push({
                    referenceNumber: this.referenceNumber,
                    componentJob: parseInt(item.idJob),
                    jobStatus: parseInt(item.jobStatus),
                    flagUpdate: this.reporteNuevo 
                }) 
                this.$http.post(`${API}/Calendario/CalendarReportActivities/${this.referenceNumber.split('-')[0]}/${this.calendarioId}`, arrayJob)
                .then(() => {                                   
                })                                     
            }            
        }
    }

}
</script>

<style>

</style>