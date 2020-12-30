
<template>
    <div>
        <!--///////////////////////////////////////////////////////////////////
          ////                             HEADER                          ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="text-2xl text-center inline-flex sm:inline-block w-full mt-10">
            <div class=" w-auto mx-auto flex justify-center">
                <div class="border-gray-800 w-66 border-2 p-5">
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-48"/>
                </div>
            </div>
            <div class="w-2/3 sm:w-auto sm:mt-3 sm:text-sm flex justify-start sm:justify-center">
                <div class="border-gray-800 border-2 p-5 pt-0">
                    <h1 class="mt-5 border-purple-800">Mantenimiento Preventivo Trimestal Nivel Carril</h1>            
                </div>
            </div>
        </div>
        <div class="inline-flex sm:inline-block  w-full">
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA IZQUIERDA                        ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-2/3 sm:w-full inline-flex sm:inline-block text-sm">
                <div class="w-1/2 sm:w-full p-8 sm:p-2">
                    <div class="flex justify-starts m-5">
                        <p class=" font-bold">Numero de Reporte:</p>
                        <h2 class="ml-5">TLA-201234</h2>
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Plaza de Cobro:</p>
                        <select class="ml-5 w-40 sm:w-32">
                            <option value="">Selecciones la Plaza</option>
                        </select>
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Ubicacion:</p>
                        <select class="ml-5 w-40">
                            <option value="">Seleccione el Carril</option>
                        </select>
                    </div>
                </div>
                <div class="w-1/2 sm:w-full p-8 sm:p-2">
                    <div class="flex justify-start m-5">
                        <p class=" font-bold">Fecha:</p>
                        <input class="ml-5 w-40" type="date">
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Hora Inicio:</p>
                        <input class="ml-5 w-40" type="time">
                    </div>
                    <div class="flex justify-start m-5">
                        <p class="font-bold">Hora Fin:</p>
                        <input class="ml-5 w-40" type="time">
                    </div>
                </div>
            </div>
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA INDICACIONES                    ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/3 sm:w-full uppercase text-xs p-10 sm:p-5">
                <p class=" font-bold">Estatus Equipo:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Operando en optimas condiciones</p>
                    <div class="bg-green-500 border-gray-800 border w-16 h-6 ml-3 text-center">Ok</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Equipo con Daño Fisico y/o Vandalizado</p>
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
