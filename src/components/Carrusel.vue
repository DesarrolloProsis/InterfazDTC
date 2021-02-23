<template>
    
<div class="shadow-2xl ">
	<div class="relative  w-full">
        <span @click="cerrar_carrusel" class="absolute border rounded-full top-0 right-0">
            <img  src="../assets/img/closeCircle.png" class=" w-8 cursor-pointer " />
        </span>
        <div class="inline-flex">
            <div class="my-auto absolute mt-48 ml-6 sm:ml-0">
                <button @click="cambiar_imagen('anterior')">
                    <img src="../assets/img/anterior.png" class="w-24 opacity-50" alt />
                </button>
            </div>         
            <div class="block h-69 w-full  bg-indigo-500 text-white text-5xl text-center">           
                <lazy-image v-if="cambiarImagenBool" :src="arrayImagenes.array_img[index_imagen_actual].image" :img-class="['w-full', 'h-69', ' rounded-xl', '']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif" />          
            </div>
            <div class="my-auto absolute mt-48 ml-73 sm:ml-64">
                <button @click="cambiar_imagen('siguiente')">
                    <img src="../assets/img/siguiente.png" class="w-24 opacity-50 " alt />
                </button>
            </div>
        </div>
        
        <!-- <div class=" text-center">
            <p class=" text-xl mb-5 text-gray-800">Referencia: {{ arrayImagenes.referenceNumber }}</p>
                <span @click="cerrar_carrusel" class="absolute border rounded-full top-0 right-0">
                <img  src="../assets/img/closeCircle.png" class=" w-6 cursor-pointer " />
            </span>  
        </div>
        <div class=" inline-flex">
            <div class=" my-auto">
                <button @click="cambiar_imagen('anterior')" class="border hover:border-blue-500 rounded-xl">
                    <img src="../assets/img/flecha-izquierda.png" class="w-24 opacity-50" alt />
                </button>
            </div>
            <div class=" flex items-center justify-center text-5xl">
                <lazy-image v-if="cambiarImagenBool" :src="arrayImagenes.array_img[index_imagen_actual].image" :img-class="['h-screen', 'w-full', ' rounded-xl']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif" />          
            </div>
            <div class=" my-auto">
                <button @click="cambiar_imagen('siguiente')" class="border hover:border-blue-500 rounded-xl">
                    <img src="../assets/img/flecha-derecha.png" class="w-24 opacity-50 border" alt />
                </button>
            </div>
        </div> -->
        <!-- <div class="mt-5 mx-auto inline-flex">            
                <img src="../assets/img/circlePoint.png" class="w-6 opacity-50 m-1 cursor-pointer border" alt />            
                <img src="../assets/img/circlePoint.png" class="w-6 opacity-50 m-1 cursor-pointer border" alt />            
                <img src="../assets/img/circlePoint.png" class="w-6 opacity-50 m-1 cursor-pointer border" alt />            
        </div> -->
    </div>
</div>
</template>

<script>
export default {
    props: {
        arrayImagenes: {
            type: Object,
            default: () => []
        }
    },
    data(){
        return{
            index_imagen_actual: 0,
            cambiarImagenBool: true,
        }
    },
    beforeMount(){        
    },  
    methods:{
        cerrar_carrusel(){
            this.$emit('cerrar-modal-carrusel')
        },
        cambiar_imagen: function (value) {      
            this.cambiarImagenBool = false;
            if (value == "anterior") {
                if (this.index_imagen_actual == 0)
                    this.index_imagen_actual = this.arrayImagenes.array_img.length - 1;        
                else
                    this.index_imagen_actual = this.index_imagen_actual - 1;        
            }
            if (value == "siguiente") {
                if (this.index_imagen_actual == this.arrayImagenes.array_img.length - 1)
                    this.index_imagen_actual = 0;        
                else       
                    this.index_imagen_actual = this.index_imagen_actual + 1;          
            }      
            this.$nextTick().then(() =>{
                this.cambiarImagenBool = true;
            })
        }
    }


}
</script>

<style>

</style>