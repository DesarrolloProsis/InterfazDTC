<template>
    <div>
        <div class="flex justify-center mt-10">
            <h1 class=" text-3xl">TABLA DE ACTIVIDADES</h1>
        </div>
        <div class="bg-red-200 inline-flex w-full mt-5">
            <div class="w-1/2 flex justify-center text-lg">
                <p>Actividades Correspondientes al mes de: Abril 2000</p>                
            </div>            
        </div>
        <div>
            <div class=" justify-center flex">
                <!--//////////////////////////////////////////////////////////////////////
                    ////                           TABLA                             ////
                    ////////////////////////////////////////////////////////////////////-->
                <table class="border-2 border-gray-800 table-fixed">
                    <!--/////////////////////////////////////////////////////////////////
                    ////                           HEADER TABLA                      ////
                    ////////////////////////////////////////////////////////////////////-->
                    <thead>
                        <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                            <th class="w-56 border-2 border-gray-800">Carril</th>
                            <th class="w-24 border-2 border-gray-800">Numero Capufe</th>
                            <th class="w-56 border-2 border-gray-800">Tramo</th>
                            <th class="w-40 border-2 border-gray-800">Fecha de Actividad</th>
                            <th class="w-40 border-2 border-gray-800">Tipo de Actividad</th>
                            <th class="w-32 border-2 border-gray-800">Acciones</th>                
                        </tr>
                    </thead>
                <!--/////////////////////////////////////////////////////////////////
                    ////                           Body TABLA                     ////
                    /////////////////////////////////////////////////////////////////-->
                    <body>
                        <tr class="h-12 text-gray-900 text-sm" v-for="(item, key) in list_Component" :key="key"> 
                            <td class="text-center border-2 border-gray-800">{{ item.lane }}</td>
                            <td class="text-center border-2 border-gray-800">{{ item.capufeLaneNum }}</td>
                            <td class="text-center border-2 border-gray-800">{{ item.idGare }}</td>
                            <td class="text-center border-2 border-gray-800">{{ item.day }}</td>
                            <td class="text-center border-2 border-gray-800">{{ item.frequencyId }}</td>
                            <td class="text-center border-2 border-gray-800"></td>
                        </tr>                    
                    </body>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
/////////////////////////////////////////////////////////////////////
////                        CICLOS DE VIDA                       ////
/////////////////////////////////////////////////////////////////////
beforeMount(){

    
}


}
</script>
