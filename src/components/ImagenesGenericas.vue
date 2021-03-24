<template>
    <div class="mr-10 -mt-3 sm:mr-0 sm:ml-4 sm:mt-0" :class="{'sm:-ml-1': tipo =='Ficha'}">
        <p class="text-gray-800 mt-2 mb-1 sm:text-sm sm:mb-4"
        :class="{'sm:ml-1 mt-2 sm:mt-1 sm:-mb-2': tipo =='Ficha'}">IMAGENES</p>          
        <div class="inline-flex h-40 border border-gray-400 rounded-lg w-full sm:w-32" :class="{'sm:w-full mt-0 sm:mt-2': tipo =='Ficha'}">
            <div class="w-2/3 grid p-2 gap-4 overflow-auto" :class="{'grid-cols-2': tipo == 'Actividades', 'grid-cols-3': tipo == 'Ficha' }">                                                                                                                
                <div class="relative border" v-for="(item) in arrayImagenes" :key="item.name">
                    <span @click="eliminar_imagen(item.name)" class="absolute border rounded-full top-0 right-0">
                        <img  src="../assets/img/closeCircle.png" class="w-4 cursor-pointer " />
                    </span>   
                    <div class="p-2 mx-auto">      
                        <lazy-image v-if="item.imgbase.length < 200" :src="`${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>     
                        <lazy-image v-else :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>
                    </div>
                </div>
            </div>
            <div class="w-1/3 border-2 relative border-gray-600 inline-block border-dashed text-center rounded-lg">
                <div class="">
                    <input @change="recibir_imagenes" type="file" multiple class="h-40 w-full inset-0 absolute opacity-0 cursor-pointer">
                    <img src="../assets/img/more.png" class="p-5 w-auto mx-auto h-32 sm:w-10 sm:h-10 sm:p-1 sm:mt-12" :class="{'sm:h-16 sm:w-16 ': tipo=='Ficha'}" alt/>
                    <span class="text-sm text-gray-500 mb-0 sm:hidden">Agregar imagenes</span>
                </div>
            </div>
        </div>
        <span class="text-gray-500 text-sm sm:-mt-6 ">{{ num }}/36 (Máximo 36 fotografías)</span>
    </div>
</template>

<script>
import Axios from 'axios'
import ServiceImagenes from '../services/ImagenesService'
import EventBus from "../services/EventBus.js";
import CookiesService from '../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    props:{
        referenceNumber: {
            type: String,
            default: () => ''
        },
        tipo: {
            type: String,
            default: () => 'Actividades'
        }
    },
    data(){
        return{
            arrayImagenes: []
        }
    },
    created(){
        EventBus.$on("guardar_imagenes", objImagenes => {                                          
            this.enviar_imagenes(objImagenes)
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
                        console.log(response.data)
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
        enviar_imagenes: async function(objReporte){                       
            let boolValidacion = this.arrayImagenes.some(item => item.name.split('_')[0] != this.referenceNumber) 
            if(boolValidacion){                                           
                let contador = 0     
                let rutaInsertImagenes = ''
                if(this.tipo == 'Actividades')
                    rutaInsertImagenes = `${API}/ReporteFotografico/MantenimientoPreventivo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                else{
                    if(this.tipo == 'Diagnostico')
                        rutaInsertImagenes = `${API}/DiagnosticoFalla/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                    else
                        rutaInsertImagenes = `${API}/FichaTecnicaAtencion/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                }                
                for(let imagenes of this.arrayImagenes){                
                    if(imagenes.name.split('_')[0] != this.referenceNumber){          
                        contador++         
                        let imgagen = ServiceImagenes.base64_to_file(imagenes.imgbase, imagenes.name)                    
                        let formData = new FormData();
                        formData.append("image", imgagen);
                        await Axios.post(rutaInsertImagenes, formData, CookiesService.obtener_bearer_token())
                            .then((response) => {   
                                console.log(response)                                                                                                         
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
            if(this.tipo == 'Actividades')
                this.$emit('ocutar-modal-loading', objReporte)                     
        },
        eliminar_imagenes(nombreImagen){                
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
                            console.log('Se borró')                                                                               
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
