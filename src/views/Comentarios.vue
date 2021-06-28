<template>
    <div>
        <div class="flex justify-center p-4">
            <div class="overflow-x-auto font-titulo bg-white rounded-lg shadow overflow-y-auto sm:mb-24 w-77 sm:w-67 sm:ml-32 mb-20" style="height:500px;">
                <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                    <thead>
                        <tr class="text-md text-gray-400 bg-blue-800">
                            <th class="cabeceraTable">Usuario</th>
                            <th class="cabeceraTable">Tipo de Falla</th>
                            <th class="cabeceraTable">Fecha</th>
                            <th class="cabeceraTable">Comentario</th>
                        </tr>
                    </thead>
                    <tbody name="table" is="transition-group">  
                        <tr class="h-12 text-gray-900 text-sm text-center">
                            <td class="cuerpoTable"></td>
                            <td class="cuerpoTable"></td>                                
                            <td class="cuerpoTable"></td>
                            <td class="cuerpoTable"></td>                                 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>