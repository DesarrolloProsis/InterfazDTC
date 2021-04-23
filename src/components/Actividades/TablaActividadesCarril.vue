<template>
<div>
    <div class="flex justify-center p-10">
        <div class="grid gap-4 grid-cols-1">
            <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto" :class="{ 'overflow-x-auto': scrollBool}">
            <!--//////////////////////////////////////////////////////////////////////
                ////                           TABLA                             ////
                ////////////////////////////////////////////////////////////////////-->
                <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped"  style="height:550px;">
                    <!--/////////////////////////////////////////////////////////////////
                    ////                           HEADER TABLA                      ////
                    ////////////////////////////////////////////////////////////////////-->
                    <thead>
                        <tr class="text-md h-16 text-gray-400 font-normal bg-blue-800"> 
                            <th class="w-64 cabeceraTable">Equipo</th>               
                            <th class="w-64 cabeceraTable">Componente</th> 
                            <th class="w-64 cabeceraTable">Actividad</th>                             
                            <th class="w-64 cabeceraTable">Ubicacion</th>                                                                                          
                            <th class="w-64 cabeceraTable">
                                <p>Acciones</p>                                    
                            </th>                
                        </tr>
                    </thead>
                <!--///////////////////////////////////////////////////////////////////
                    ////                           Body TABLA                     ////
                    /////////////////////////////////////////////////////////////////-->
                    <tbody name="table" is="transition-group">       
                        <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividades" :key="key"> 
                            <td class="w-66 cuerpoTable">{{ item.equipo }}</td>   
                            <td class="w-66 cuerpoTable">{{ item.componente }}</td>                                                         
                            <td class="w-66 cuerpoTable">{{ item.actividades }}</td>   
                            <td class="w-66 cuerpoTable">{{ item.ubicacion }}</td>                                                                                
                            <td class="w-66 cuerpoTable text-center" :class="{'bg-green-500': item.jobStatus == 1, 'bg-yellow-500': item.jobStatus == 2, 'bg-orange-500': item.jobStatus == 3, 'bg-red-500': item.jobStatus == 4 }">                                                                
                                <select v-model="item.jobStatus" @change="actualizar_actividad(item)" class="w-32 text-md text-gray-800 border-gray-900" >
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
import Axios from 'axios';
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
                Axios.post(`${API}/Calendario/CalendarReportActivities/${this.referenceNumber.split('-')[0]}/${this.calendarioId}`, arrayJob)
                .then((response) => {               
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
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
                Axios.post(`${API}/Calendario/CalendarReportActivities/${this.referenceNumber.split('-')[0]}/${this.calendarioId}`, arrayJob)
                .then((response) => {               
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })                                
            }            
        }
    }

}
</script>

<style>

</style>