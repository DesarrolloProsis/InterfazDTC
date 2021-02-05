<template>
    <div>
        <p class="text-center font-bold text-xl text-gray-800 mb-5">Imagenes</p>          
        <div class=" inline-flex h-40 border border-gray-800 w-full">
            <div class="w-2/3 grid grid-cols-2 p-2 gap-4 overflow-auto">                                                                                                                
                <div class="relative border" v-for="(item, key) in arrayImagenes" :key="key">
                    <span class="absolute border rounded-full top-0 right-0">
                        <img src="../../assets/img/closeCircle.png" class="w-4" />
                    </span>   
                    <div class="p-2">           
                        <lazy-image :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>
                    </div>
                </div>
            </div>
            <div class="w-1/3 border-2 relative border-gray-600 inline-block border-dashed text-center">
                <div class="">
                    <input @change="recibir_imagenes" type="file" multiple class="h-40 w-full inset-0 absolute opacity-0 ">
                    <img src="../../assets/img/more.png" class="w-auto h-32" alt/>
                    <span class=" text-gray-500 text-sm">Agregar imagenes</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import ServiceImagenes from '../../services/ImagenesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    data(){
        return{
            arrayImagenes: []
        }
    },
    methods: {
        recibir_imagenes: async function (e){                        
            alert()
            this.listaActividadesarrayImagenes =  await ServiceImagenes.obtener_array_imagenes(e, this.arrayImagenes)                           
        },
        enviar_imagen: async function(){
            for(let imagenes of this.arrayImagenes){
                let imgagen = ServiceImagenes.base64_to_file(imagenes.imgbase, imagenes.name)
                let formData = new FormData();
                formData.append("image", imgagen);
                await Axios.post(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/TLA/${this.referenceNumber}`,formData)
                    .then((response) => {     
                        console.log(response)                                                               
                    })
                    .catch(Ex => {                    
                        console.log(Ex);                    
                });   
            }         
        }
    }

}
</script>
