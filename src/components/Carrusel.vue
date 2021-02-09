<template>
    <div class="">
        <div class=" text-center mb-5">
            <p class=" text-xl text-gray-800">Referencia: {{ arrayImagenes.referenceNumber }}</p>
        </div>
        <div class=" inline-flex">
            <div class=" my-auto mr-10">
                <button @click="cambiar_imagen('siguiente')" class="border hover:border-blue-500 rounded-xl">
                    <img src="../assets/img/flecha-izquierda.png" class="w-24 opacity-50" alt />
                </button>
            </div>
            <div class="h-72 flex items-center justify-center text-5xl">
                <lazy-image :src="arrayImagenes.array_img[index_imagen_actual].image" :img-class="['h-72', 'w-screen', ' rounded-xl']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>          
            </div>
            <div class=" my-auto ml-10">
                <button @click="cambiar_imagen('siguiente')" class="border hover:border-blue-500 rounded-xl">
                    <img src="../assets/img/flecha-derecha.png" class="w-24 opacity-50 border" alt />
                </button>
            </div>
        </div>
        <div class="mt-5 mx-auto inline-flex">            
                <img @click="cambiar_imagen" src="../assets/img/circlePoint.png" class="w-6 opacity-50 m-1 cursor-pointer border" alt />            
                <img @click="cambiar_imagen" src="../assets/img/circlePoint.png" class="w-6 opacity-50 m-1 cursor-pointer border" alt />            
                <img @click="cambiar_imagen" src="../assets/img/circlePoint.png" class="w-6 opacity-50 m-1 cursor-pointer border" alt />            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        arrayImagenes: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return{
            index_imagen_actual: 0
        }
    }


}
</script>

<style>

</style>