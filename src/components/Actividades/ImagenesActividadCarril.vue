<template>
    <div>
        <p class="text-center font-bold text-xl text-gray-800 mb-5">Imagenes</p>          
        <div class=" inline-flex h-40 border border-gray-800 w-full">
            <div class="w-2/3 grid grid-cols-2 p-2 gap-4 overflow-auto">                                                                                                                
                <div class="relative border" v-for="(item, key) in 10" :key="key">
                    <span class="absolute border rounded-full top-0 right-0">
                        <img src="../../assets/img/closeCircle.png" class="w-4" />
                    </span>   
                    <div class="p-2">           
                        <img src="../../assets/img/add.png" class="" />                    
                    </div>
                </div>
            </div>
            <div class="w-1/3 border-2 border-gray-600 border-dashed text-center">
                <input type="file" class=" h-40 w-32 opacity-0 absolute">
                <img src="../../assets/img/more.png" class="w-full h-32 p-5 m t-3" alt/>
                <span class=" text-gray-500 text-sm">Agregar imagenes</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    }

}
</script>
