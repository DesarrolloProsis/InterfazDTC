<template>
    <div>
        <p class="text-center font-bold text-xl text-gray-800 mb-5">Imagenes</p>          
        <div class=" inline-flex h-40 border border-gray-800 w-full">
            <div class="w-2/3 grid grid-cols-2 p-2 gap-4 overflow-auto">                                                                                                                
                <div class="relative border" v-for="(item) in arrayImagenes" :key="item.name">
                    <span @click="eliminar_imagen(item.name)" class="absolute border rounded-full top-0 right-0">
                        <img  src="../../assets/img/closeCircle.png" class="w-4 cursor-pointer " />
                    </span>   
                    <div class="p-2">      
                        <lazy-image v-if="item.imgbase.length < 200" :src="`${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>     
                        <lazy-image v-else :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>
                    </div>
                </div>
            </div>
            <div class="w-1/3 border-2 relative border-gray-600 inline-block border-dashed text-center">
                <div class=""
                >
                    <input @change="recibir_imagenes" type="file" multiple class="h-40 w-full inset-0 absolute opacity-0 ">
                    <img src="../../assets/img/more.png" class="p-5 ml-6 w-auto h-32" alt/>
                    <span class="text-gray-500 text-sm">Agregar imagenes {{ num }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import ServiceImagenes from '../../services/ImagenesService'
import EventBus from "../../services/EventBus.js";
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    props:{
        referenceNumber: {
            type: String,
            default: () => ''
        },
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
    destroyed(){
        this.arrayImagenes = []
    },
    beforeMount() {        
        setTimeout(() => {
            Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`, CookiesService.obtener_bearer_token())
                .then((response) => {                          
                    if(response.status != 404){  
                        let newArrayImg = []                      
                        response.data.forEach(item => {
                            newArrayImg.push({
                                "name": item, 
                                "imgbase": `${API}/ReporteFotografico/MantenimientoPreventivo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${item}`
                            })
                        })
                        this.arrayImagenes = newArrayImg                                       
                    }    
                })
                .catch(Ex => {                    
                    console.log(Ex);    
                    if(Ex.response.status == 401)
                        CookiesService.token_no_autorizado()               
            });
        }, 1000)
    },
    computed:{
        num (){
            return this.arrayImagenes.length
        }
    },
    methods: {
        recibir_imagenes: async function (e){  
            this.arrayImagenes =  await ServiceImagenes.obtener_array_imagenes(e, this.arrayImagenes)         
        },
        enviar_imagen: async function(objReporte){  
            console.log(objReporte)  
            let boolValidacion = this.arrayImagenes.some(item => item.name.split('_')[0] != this.referenceNumber) 
            if(boolValidacion){                           
                let contador = 0                          
                for(let imagenes of this.arrayImagenes){                
                    if(imagenes.name.split('_')[0] != this.referenceNumber){          
                        contador++         
                        let imgagen = ServiceImagenes.base64_to_file(imagenes.imgbase, imagenes.name)                    
                        let formData = new FormData();
                        formData.append("image", imgagen);
                        await Axios.post(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`,formData, CookiesService.obtener_bearer_token())
                            .then(() => {                                                                                                            
                            })
                            .catch(error => {                                                      
                                if(error.response.status == 401)
                                    CookiesService.token_no_autorizado()
                        });                       
                    }                      
                }
                this.$notify.success({
                    title: "Ok!",
                    msg: `SE INSERTARON ${contador}.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                }); 
            }                     
        },
        eliminar_imagen(nombreImagen){                
            if(this.arrayImagenes.length > 1){                
                if(nombreImagen.split('_')[0] == this.referenceNumber){
                    Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`, CookiesService.obtener_bearer_token())
                        .then(() => {                                                                 
                            this.$notify.success({
                                title: "Ok!",
                                msg: `SE ELIMINO LA IMAGEN CORRECTAMENTE.`,
                                position: "bottom right",
                                styles: {
                                    height: 100,
                                    width: 500,
                                },
                            });                                                                                 
                        })
                        .catch(Ex => {                    
                            console.log(Ex);                    
                            if(Ex.response.status == 401)
                                CookiesService.token_no_autorizado()
                    });  
                }        
                this.$nextTick(() => {                                     
                    let arrayIMG = this.arrayImagenes.filter(imagen => imagen.name != nombreImagen)
                    this.arrayImagenes = []
                    this.arrayImagenes = arrayIMG                    
                })               
            }
            else{
                this.arrayImagenes = []
                if(nombreImagen.split('_')[0] == this.referenceNumber){
                    Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`, CookiesService.obtener_bearer_token())
                        .then(() => {                                                                                                              
                        })
                        .catch(Ex => {                    
                            console.log(Ex);  
                            if(Ex.response.status == 401)
                                CookiesService.token_no_autorizado()
                        });  
                } 
            }
        }
    }

}
</script>
