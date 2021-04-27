<template>
    
<div class="shadow-2xl bg-gray-300">
	<div class="relative  w-full">
            <span @click="cerrar_carrusel" class="absolute  top-0 right-0">
                <img  src="../assets/img/close.png" class=" w-8 cursor-pointer " />
            </span>     
            <div class="inline-flex w-full">
                <div class="my-auto absolute mt-48 ml-6 sm:ml-0">
                    <button @click="cambiar_imagen('anterior')">
                        <img src="../assets/img/anterior.png" class="w-24 opacity-50" alt />
                    </button>
                </div>         
                <div class="block h-69 w-full text-white text-5xl text-center">           
                    <lazy-image v-if="cambiarImagenBool" :src="arrayImagenes.array_img[index_imagen_actual].image" :img-class="['w-full', 'h-69', ' rounded-xl', '']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif" />          
                </div>
                <div class="my-auto absolute mt-48 ml-73 sm:ml-64">
                    <button @click="cambiar_imagen('siguiente')">
                        <img src="../assets/img/siguiente.png" class="w-24 opacity-50 " alt />
                    </button>
                </div>
            </div>
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