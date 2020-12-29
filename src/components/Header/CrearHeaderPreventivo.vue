
<template>
    <div>
        <div class="text-2xl text-center inline-flex w-full mt-5">
            <div class=" w-1/3 flex justify-center">
                <div class="border-gray-800 border-2 p-5">
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12"/>
                </div>
            </div>
            <div class="w-2/3 flex justify-start">
                <div class="border-gray-800 border-2 p-5 pt-0">
                    <h1 class="mt-5 border-purple-800">Mantenimiento Preventivo Trimestal Nivel Carril</h1>            
                </div>
            </div>
        </div>
        <div class="inline-flex sm:inline-block bg-blue-100 w-full">
            <div class="w-2/3 inline-flex">
                <div class="w-1/2 p-8">
                    <div class="flex justify-end m-5">
                        <p>Numero de Reporte:</p>
                        <input class="ml-5 w-40" type="date">
                    </div>
                    <div class="flex justify-end m-5">
                        <p>Plaza de Cobro:</p>
                        <input class="ml-5 w-40" type="time">
                    </div>
                    <div class="flex justify-end m-5">
                        <p>Ubicacion:</p>
                        <input class="ml-5 w-40" type="date">
                    </div>
                </div>
                <div class="w-1/2 p-8">
                    <div class="flex justify-end m-5">
                        <p>Fecha:</p>
                        <input class="ml-5 w-40" type="date">
                    </div>
                    <div class="flex justify-end m-5">
                        <p>Hora Inicio:</p>
                        <input class="ml-5 w-40" type="time">
                    </div>
                    <div class="flex justify-end m-5">
                        <p>Hora Fin:</p>
                        <input class="ml-5 w-40" type="time">
                    </div>
                </div>
            </div>
            <div class="w-1/3 sm:w-full uppercase text-xs bg-purple-500 p-8 sm:p-2">
                <p>Estatus Equipo:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Operando en optimas condiciones</p>
                    <div class="bg-green-500 border-gray-800 border w-16 h-6 ml-3 text-center">Ok</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Equipo con Daño Fisico y/o CAndalizado</p>
                    <div class="bg-yellow-500 border-gray-800 border w-16 h-6 ml-3 text-center">Dañado</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>No aplica por garantia con el fabricante</p>
                    <div class="bg-orange-500 border-gray-800 border w-16 h-6 ml-3 text-center">No Aplica</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>No Existe Equipo (Vandalizado)</p>
                    <div class="bg-red-500 border-gray-800 border w-16 h-6 ml-3 text-center">No Existe</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
/////////////////////////////////////////////////////////////////////
////                          DATA                               ////
/////////////////////////////////////////////////////////////////////
data() {
    return {
    
    };
},
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////


};
</script>
