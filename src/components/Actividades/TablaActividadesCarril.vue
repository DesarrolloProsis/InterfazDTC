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
                            <th class="w-64 border-2 border-gray-800">Actividad</th>                             
                            <th class="w-64 border-2 border-gray-800">Ubicacion</th>                                                                                          
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
                            <td class="w-66 text-center border-2 border-gray-800">{{ item.equipo }}</td>   
                            <td class="w-66 text-center border-2 border-gray-800">{{ item.componente }}</td>                                                         
                            <td class="w-66 text-center border-2 border-gray-800">{{ item.actividades }}</td>   
                            <td class="w-66 text-center border-2 border-gray-800">{{ item.ubicacion }}</td>                                                                                
                            <td class="w-66 text-center border-2 border-gray-800" :class="{'bg-green-500': item.jobStatus == 1, 'bg-yellow-500': item.jobStatus == 2, 'bg-orange-500': item.jobStatus == 3, 'bg-red-500': item.jobStatus == 4 }">
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

}
</script>

<style>

</style>