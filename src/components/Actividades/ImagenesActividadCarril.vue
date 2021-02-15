<template>
    <div>
        <p class="text-center font-bold text-xl text-gray-800 mb-5">Imagenes</p>          
        <div class=" inline-flex h-40 border border-gray-800 w-full">
            <div class="w-2/3 grid grid-cols-2 p-2 gap-4 overflow-auto">                                                                                                                
                <div class="relative border" v-for="(item, key) in arrayImagenes" :key="key">
                    <span @click="eliminar_imagen(item, key)" class="absolute border rounded-full top-0 right-0">
                        <img  src="../../assets/img/closeCircle.png" class="w-4 cursor-pointer " />
                    </span>   
                    <div class="p-2">      
                        <lazy-image v-if="item.imgbase.length < 200" :src="`${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>     
                        <lazy-image v-else :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>
                    </div>
                </div>
            </div>
            <div class="w-1/3 border-2 relative border-gray-600 inline-block border-dashed text-center">
                <div class="">
                    <input @change="recibir_imagenes" type="file" multiple class="h-40 w-full inset-0 absolute opacity-0 ">
                    <img src="../../assets/img/more.png" class="p-5 w-auto h-32" alt/>
                    <span class="text-gray-500 text-sm">Agregar imagenes</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import ServiceImagenes from '../../services/ImagenesService'
import EventBus from "../../services/EventBus.js";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    props:{
        referenceNumber: {
            type: String,
            default: () => ''
        }
    },
    data(){
        return{
            arrayImagenes: []
        }
    },
    created(){
        EventBus.$on("guardar_imagenes", referenceNumber => {                                          
            this.enviar_imagen(referenceNumber)
        });
    },
    beforeMount() {        
        setTimeout(() => {
            Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`)
                .then((response) => {      
                    if(response.status != 404){
                        response.data.forEach(item => {
                            this.arrayImagenes.push({
                                "name": item, 
                                "imgbase": `${API}/ReporteFotografico/MantenimientoPreventivo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${item}`
                            })
                        })                                       
                    }    
                })
                .catch(Ex => {                    
                    console.log(Ex);                    
            });
        }, 1000)
    },
    methods: {
        recibir_imagenes: async function (e){                                    
            this.listaActividadesarrayImagenes =  await ServiceImagenes.obtener_array_imagenes(e, this.arrayImagenes)                           
        },
        enviar_imagen: async function(referenceNumber){
            for(let imagenes of this.arrayImagenes){
                let imgagen = ServiceImagenes.base64_to_file(imagenes.imgbase, imagenes.name)
                let formData = new FormData();
                formData.append("image", imgagen);
                await Axios.post(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/${referenceNumber.split('-')[0]}/${referenceNumber}`,formData)
                    .then((response) => {     
                        console.log(response)                                                                                      
                    })
                    .catch(Ex => {                    
                        console.log(Ex);                    
                });   
            }                     
        },
        eliminar_imagen(item, key){
            if(this.arrayImagenes.length > 1){                
                if(item.imgbase.length < 200){
                    Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/TLA/${this.referenceNumber}/${item.name}`)
                        .then((response) => {     
                            console.log(response)                                                                                      
                        })
                        .catch(Ex => {                    
                            console.log(Ex);                    
                    });  
                } 
                this.$nextTick(() => {
                    this.arrayImagenes.splice(key,1)
                    let arrayCache = { ...this.arrayImagenes }
                    this.arrayImagenes = []
                    this.arrayImagenes = arrayCache
                })
            }
            else{
                this.arrayImagenes = []
                if(item.imgbase.length < 200){
                Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/TLA/${this.referenceNumber}/${item.name}`)
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

}
</script>
