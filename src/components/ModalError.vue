<template>
    <div>
    <!--////////////////////////////////////////////////////////////////////
    ////            MODAL NO SE PUEDE ACTUALIZAR HEADER                ////
    ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 sm:text-xs font-titulo " :class="{'modal-error': error}">               
        <div v-if="error" class="absolute w-73 sm:w-66 border border-gray-400 rounded-xl mx-auto  justify-center inset-x-0 pointer-events-auto mt-54">         
            <div class="rounded-lg border border-none bg-white px-12 py-10 shadow-2xl">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900"> Error al Actualizar </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">NO SE PUDO ACTUALIZAR, VERIFIQUE LOS DATOS. RECUERDA QUE NO SE PUEDE TENER UN NÚMERO DE SINIESTRO REPETIDO.</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="error = false">Entendido</button>
                </div>
            </div>
        </div>                  
    </div>
    </div>
</template>
<script>
import { ExclamationIcon } from "@vue-hero-icons/outline"
export default {
    name:"Error",
    props: {
        error: Boolean
    },
    components:{
        ExclamationIcon,
    },
    data() {
        return {
            cerrar: this.error 
        }
    },
}
</script>
<style scoped>
.modal-error{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
</style>