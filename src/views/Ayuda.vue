<template>
    <div>
        <div class="flex justify-center mt-2 mb-16 sm:mt-14">
            <div class="grid grid-cols-3 sm:grid-cols-2 sm:mb-20">
                <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
                    <button @click="ventana_comentario" class="text-center">
                        <img src="../assets/img/comentarios.png" height="200" width="200" class="m-10 sm:m-1"/>
                        <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Comentarios</h1>
                    </button>
                </div>
                <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
                    <button @click="ventana_videos" class="text-center">
                        <img src="../assets/img/videos.png" height="200" width="200" class="m-10 sm:m-1" />
                        <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Videos</h1>              
                    </button>
                </div>
                <div class="border-gray-200  border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion ">
                    <button class="text-center cursor-pointer"  @click="manual_pdf">
                        <img src="../assets/img/guia.png" height="200" width="200" class="m-10 sm:m-1" />
                        <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Manual de Usuario</h1>
                    </button>
                </div>   
            </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL AYUDA                              ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
            <div v-if="modal_coment" class="rounded-lg  -mt-68 justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-10 sm:p-2">
                <ValidationObserver ref="observer">      
                    <div class="rounded-lg border bg-white border-gray-400 px-12 py-10 shadow-2xl">
                        <h1 class="mb-10 -mt-6 sm:text-sm text-center font-bold text-2xl">Ingresa tu comentario</h1> 
                        <div>
                            <div class="mt-5">
                                <ValidationProvider name="Comentario" rules="required|max:300" v-slot="{ errors }"> 
                                    <textarea
                                        v-model="comentario"                                        
                                        class="textAreaCalendario ph-center"
                                        placeholder="ingresa tus comentarios"
                                        name="Observaciones"
                                        :maxlength="limite"
                                    />
                                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                    <span class="text-xs text-gray-400">{{ restante_comentario }}/300</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="justify-center flex mt-5">
                            <button class="botonIconCrear m-4">Enviar</button>
                            <button  @click="modal_coment = false, comentario = ''" class="botonIconCancelar font-boton m-4">Cancelar</button>
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL VIDEOS                              ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
            <div v-if="modal_videos" class="bg-white -mt-68 justify-center absolute inset-x-0 w-full mx-auto px-12 py-10 sm:p-2">
                <span @click="modal_videos = false" class="absolute  top-1">
                    <img  src="../assets/img/close.png" class="w-8 cursor-pointer " />
                </span> 
                <div class="border border-gray-400 rounded-xl">
                    <div class="grid grid-cols-3">
                        <div>
                            <img src="../assets/img/guia.png" height="200" width="200" class="m-10 sm:m-1" />
                            <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Manual de Usuario</h1>
                        </div>
                        <div>
                            <img src="../assets/img/videos.png" height="200" width="200" class="m-10 sm:m-1" />
                            <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Manual de Usuario</h1>
                        </div>
                        <div>
                            <img src="../assets/img/comentarios.png" height="200" width="200" class="m-10 sm:m-1" />
                            <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Manual de Usuario</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReportesPDFService from '../services/ReportesPDFService'
export default {
    name: 'Ayuda',
    data(){
        return {
            modal_coment: false,
            modal_videos: false,
            comentario: '',
            limite: 300
        }
    },  
    methods:{
        manual_pdf(){
            ReportesPDFService.manual_pdf()
        },
        ventana_comentario(){
            this.modal_coment = true
        },
        ventana_videos(){
            this.modal_videos = true
        }
    },
    computed:{
        restante_comentario(){
            return this.comentario.length
        }
    }
}
</script>