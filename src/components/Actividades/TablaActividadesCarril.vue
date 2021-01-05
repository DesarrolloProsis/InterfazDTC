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
                                <th class="w-64 border-2 border-gray-800">Componente</th>
                                <th class="w-64 border-2 border-gray-800">Equipo</th>
                                <th class="w-64 border-2 border-gray-800">Frecuencia</th>                                
                                <th class="w-64 border-2 border-gray-800">Ubicacion</th>
                                <th class="w-64 border-2 border-gray-800">Acciones</th>                
                            </tr>
                        </thead>
                    <!--/////////////////////////////////////////////////////////////////
                        ////                           Body TABLA                     ////
                        /////////////////////////////////////////////////////////////////-->
                        <tbody>
                            <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividades" :key="key"> 
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.componente }}</td>
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.equipo }}</td>
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.frecuencia }}</td>
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.ubicacion }}</td>                                
                                <td class="w-64 text-center border-2 border-gray-800">
                                    <span class="text-sm text-blue-700">Finalizada</span>
                                    <input v-model="actividadFinalizada" class="ml-1 h-2w-2 rounded-lg" type="checkbox" />        
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
        }
    },
    data(){
        return{
            scrollBool: '',
            actividadFinalizada: ''
        }
    }

}
</script>

<style>

</style>