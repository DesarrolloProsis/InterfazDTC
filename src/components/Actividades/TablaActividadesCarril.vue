<template>
<div>
    <div class="flex justify-center p-10">
        <div class="grid gap-4 grid-cols-1">
            <div class="sm:text-xs" :class="{ 'overflow-x-auto': scrollBool}">
            <!--//////////////////////////////////////////////////////////////////////
                ////                           TABLA                             ////
                ////////////////////////////////////////////////////////////////////-->
                <table class="border-2 border-gray-800">
                    <!--/////////////////////////////////////////////////////////////////
                    ////                           HEADER TABLA                      ////
                    ////////////////////////////////////////////////////////////////////-->
                    <thead>
                        <tr class="text-md h-16 text-gray-400 font-normal bg-blue-800"> 
                            <th class="w-64 border-2 border-gray-800">Equipo</th>               
                            <th class="w-64 border-2 border-gray-800">Componente</th>                            
                            <th class="w-64 border-2 border-gray-800">Ubicacion</th>                                
                            <th class="w-64 border-2 border-gray-800">Imagenes</th>
                            <th class="w-64 border-2 border-gray-800">
                                <p>Acciones</p>                                    
                            </th>                
                        </tr>
                    </thead>
                <!--///////////////////////////////////////////////////////////////////
                    ////                           Body TABLA                     ////
                    /////////////////////////////////////////////////////////////////-->
                    <tbody>
                        <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividades" :key="key"> 
                            <td class="w-64 text-center border-2 border-gray-800">{{ item.equipo }}</td>   
                            <td class="w-64 text-center border-2 border-gray-800">{{ item.componente }}</td>                                                         
                            <td class="w-64 text-center border-2 border-gray-800">{{ item.ubicacion }}</td>                                
                            <td class="w-64 text-center border-2 border-gray-800 pr-2">
                                <div class="border-2  border-gray-500 flex-col justify-center h-12 border-dashed w-full m-1" >
                                    <div class="flex justify-center" v-if="item.addImg">
                                        <input @change="recibir_imagenes($event,key)" type="file" multiple class="opacity-0 w-auto h-12 absolute" />
                                        <img src="../../assets/img/image-mini.png" class="w-6 mr-3 mt-3 border" alt/>
                                        <p class="text-base text-gray-900 mt-3">Fotos</p>
                                    </div>
                                    <div class="flex" v-else>
                                        <div class="inline-flex">
                                            <img src="../../assets/img/image-mini.png" class="w-5 m-2 mt-3 border" alt/>    
                                            <p class="ml-1 mr-2 mt-3 text-sm">{{  item.img.length +'Imagenes' }}</p>
                                        </div>
                                        <div class="mt-2 justify-between">
                                            <button @click="item.addImg = true" class="rounded-md border h-7 p-1 mr-2 bg-red-600 text-sm">Cancelar</button>
                                            <button @click="enviar_imagen(key)" class="rounded-md border h-7 p-1 bg-green-600 text-sm">Enviar</button>
                                        </div>            
                                    </div>
                                </div>
                            </td>                                
                            <td class="w-64 text-center border-2 border-gray-800" :class="{'bg-green-500': item.jobStatus == 1, 'bg-yellow-500': item.jobStatus == 2, 'bg-orange-500': item.jobStatus == 3, 'bg-red-500': item.jobStatus == 4 }">
                                <!-- <span class="text-sm text-blue-700">Finalizada</span>
                                <input v-model="actividadFinalizada" class="ml-1 h-2w-2 rounded-lg" type="checkbox" />         -->
                                <select v-model="item.jobStatus" class="w-32 text-md text-gray-800 border-gray-900" :class="{'bg-green-500': item.jobStatus == 1, 'bg-yellow-500': item.jobStatus == 2, 'bg-orange-500': item.jobStatus == 3, 'bg-red-500': item.jobStatus == 4 }">
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
import ServiceImagenes from '../../services/ImagenesService'
import Axios from 'axios'
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
        }
    },
    data(){
        return{
            scrollBool: '',
            actividadFinalizada: ''
        }
    },
    methods:{
        recibir_imagenes: async function (e, index){                        
            let result =  await ServiceImagenes.obtener_array_imagenes(e, [])
            this.listaActividades[index].img = result
            this.listaActividades[index].addImg = false     
        },
        enviar_imagen: async function(index){                        
            let imgagen = ServiceImagenes.base64_to_file(
                this.listaActividades[index].img[0].imgbase, 
                this.listaActividades[index].img[0].name,
                false
            )
            let formData = new FormData();
            formData.append("image", imgagen);
            await Axios.post(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/TLA/${this.referenceNumber}`,formData)
                .then((response) => {     
                    console.log(response)
                    this.listaActividades[index].addImg = false     
                })
                .catch(Ex => {                    
                    console.log(Ex);
                    
            });            
        }
    }
}
</script>

<style>

</style>