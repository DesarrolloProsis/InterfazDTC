<template>
    <div>
        <Nav></Nav>
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 ml-66 absolute sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">Diagnóstico de Falla</h1>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                   DATOS DEL REPORTE                           ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10">
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA UNO                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 ml-5 w-full">
                            <div>
                                <span class="mr-5">No. De Reporte</span>
                                <input class="bg-white border-gray-400 w-69" readonly/>
                            </div>
                            <div class="mt-5">
                                <span class="mr-6">Plaza de Cobro</span>
                                <input class="bg-white border-gray-400 w-69" readonly/>
                            </div>
                            <div class="mt-5">
                                <span class="mr-16">Ubicación</span>
                                <input class="bg-white border-gray-400 w-69" readonly/>
                            </div>
                        </div>
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA DOS                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 ml-10 mr-5 text-center">
                            <div>
                                <span class="ml-16">Fecha  </span>
                                <input class="ml-16 bg-white border-gray-400" type="date"/>
                            </div>
                            <div class="mt-5">
                                <span class="px-4">Hora Inicio</span>
                                <input class="ml-4 bg-white border-gray-400 mr-4" type="time" readonly/>
                            </div>
                            <div class="mt-5">
                                <span class="mr-2">Hora Fin</span>
                                <input class="ml-10 bg-white border-gray-400" type="time" readonly/>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                             FOLIOS                            ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10">
                        <div class="mt-6 ml-5 w-full">
                            <div class="text-center w-32 ml-64 mr-40">
                                <span class="">Folio de FALLA</span>
                            </div>
                            <div class="mt-5 text-center w-32 ml-64">
                                <span class="">No. De Reporte</span>
                            </div>
                            <div class="mt-5 text-center w-32 ml-64">
                                <span class="">No. De Reporte</span>
                            </div>
                        </div>
                        <div class="mt-6 mr-16 grid grid-cols-1">
                            <div class="-ml-32">
                                <input class="bg-white border-gray-400 w-full" />
                            </div>
                            <div class="mt-5 -ml-32">
                                <input class="bg-white border-gray-400 w-full" />
                            </div>
                            <div class="mt-5 -ml-32">
                                <input class="bg-white border-gray-400 w-full" readonly/>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <div class="grid grid-cols-1 mt-2 sm:text-xs sm:ml-3 mb-16 mr-5 ml-5">
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA UNO                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 w-full">
                            <div>
                                <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                                <textarea
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                />
                                <span class="text-gray-500">{{ restante }}/300</span>
                            </div>
                            <div class="mt-5">
                                <span class="">DIAGNOSTICO DE LA FALLA REPORTADA:</span>
                                <textarea
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                />
                                <span class="text-gray-500">{{ restante }}/300</span>
                            </div>
                            <div class="mt-5">
                                <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                                <textarea
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                />
                                <span class="text-gray-500">{{ restante }}/300</span>
                            </div>
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../../components/Navbar";

export default {
    name: "Diagnostico",
    components: {
    Nav,
    },
}
</script>

<style>

</style>