<template>
    <div>
        <div class="flex justify-center mt-2 mb-16 sm:mt-14">
            <div class="grid grid-cols-3 sm:grid-cols-2 sm:mb-20">
                <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
                    <button class="text-center">
                        <img src="../assets/img/comentarios.png" height="200" width="200" class="m-10 sm:m-1"/>
                        <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Comentarios</h1>
                    </button>
                </div>
                <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
                    <button class="text-center">
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
    </div>
</template>
<script>
import ReportesPDFService from '../services/ReportesPDFService'
export default {
    methods:{
        manual_pdf(){
            ReportesPDFService.manual_pdf()
        }
    }
}
</script>