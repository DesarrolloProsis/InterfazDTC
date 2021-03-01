<template>
    <div>
        <Nav></Nav>
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
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
                                <span class="ml-16">Fecha:</span>
                                <input class="ml-16 bg-white border-gray-400" type="date"/>
                            </div>
                            <div class="mt-5">
                                <span class="px-3">Hora INICIO:</span>
                                <input class="ml-4 bg-white border-gray-400 mr-4" type="time"/>
                            </div>
                            <div class="mt-5">
                                <span class="mr-2">Hora FIN:</span>
                                <input class="ml-10 bg-white border-gray-400" type="time"/>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                             FOLIOS                            ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10">
                        <div class="mt-6 ml-5 w-full">
                            <div class="text-center w-32 ml-64 mr-40">
                                <span class="">Folio de FALLA:</span>
                            </div>
                            <div class="mt-5 text-center w-32 ml-64">
                                <span class="">No. De Reporte:</span>
                            </div>
                            <div class="mt-5 text-center w-56 ml-40">
                                <span class="">Técnico Responsable PROSIS:</span>
                            </div>
                        </div>
                        <div class="mt-6 mr-16 grid grid-cols-1">
                            <div class="-ml-69">
                                <input class="bg-white border-gray-400 w-full text-center" />
                            </div>
                            <div class="mt-5 -ml-69">
                                <input class="bg-white border-gray-400 w-full text-center" />
                            </div>
                            <div class="mt-5 -ml-69">
                                <input class="bg-white border-gray-400 w-full text-center" readonly/>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <div class="mt-2 sm:text-xs sm:ml-3 mb-16 mr-5 ml-5">
                        <!--/////////////////////////////////////////////////////////////////////
                        /////                           FILA UNO                            ////
                        ////////////////////////////////////////////////////////////////////--> 
                        <div class="mt-6 w-full grid grid-cols-2">
                            <div class=" mr-10">
                                <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="descripcion"
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                    v-bind:maxlength="limite"
                                />
                                <span class="text-gray-500">{{ restante_desc }}/300</span>
                            </div>
                            <div class="mr-10">
                                <span class="">DIAGNOSTICO DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="diagnostico"
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="Observaciones"
                                    v-bind:maxlength="limite"
                                />
                                <span class="text-gray-500">{{ restante_diag }}/300</span>
                            </div>
                            <div class="mt-5 mr-10">
                                <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="causaFalla"
                                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                                    placeholder="jane@example.com"
                                    name="CausaDeLaFalla"
                                    v-bind:maxlength="limite"
                                />
                                <span class="text-gray-500">{{ restante_causa }}/300</span>
                            </div>
                            <!-- <div class="border-2 border-gray-500 text-center h-12 border-dashed mt-20 mr-10">         
                                <div class="inline-flex justify-center">
                                    <input type="file" class="opacity-0 w-auto h-12 absolute" multiple @change="recibirImagenes"/>
                                    <img src="../../assets/img/image-mini.png" class="w-6 mr-3 mt-3 border" alt/>
                                    <p class="text-base text-gray-900 mt-3">Fotos Equipo Dañado</p>
                                </div>
                            </div> -->
                            <!-- /////////////////////////////////////////////////////////////////////
                            ////                         IMAGENES                             ////
                            ///////////////////////////////////////////////////////////////////// -->
                            <div class="flex text-center cursor-pointer border-gray-800 flex-col sm:m-3 sm:mt-5 mt-12">
                                <ImagenesCard></ImagenesCard>
                            </div>
                        </div>
                    </div>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-12">
                        <div>
                            <button class="botonIconCrear">
                                <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                <span>Crear</span>
                            </button>
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../../components/Navbar";
import ImagenesCard from "../../components/DTC/ImagenesCard.vue";

export default {
    name: "Diagnostico",
    components: {
        Nav,
        ImagenesCard,

    },
    data(){
        return{
            limite:300,
            causaFalla: "",
            descripcion: "",
            diagnostico: "",
            TIPO_USUARIO: 0
        }
    },
    
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
    restante_causa(){
        return this.causaFalla.length
    },
    restante_desc(){
        return this.descripcion.length
    },
    restante_diag(){
        return this.diagnostico.length
    },
}
}
</script>

<style>

</style>