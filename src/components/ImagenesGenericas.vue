<template>
    <div class="mr-10 -mt-3 sm:mr-0 sm:ml-4 sm:mt-0 w-full" :class="{'sm:-ml-1': tipo =='Ficha'}">        
        <p class="text-gray-800 mt-2 mb-1 sm:text-sm sm:mb-4"
        :class="{'sm:ml-1 mt-2 sm:mt-1 sm:-mb-2': tipo =='Ficha'}">IMAGENE</p>
        <div v-if="reporteDataInsertada">
            <div class="inline-flex h-40 border border-gray-400 rounded-lg w-full sm:w-32" :class="{'sm:w-full mt-0 sm:mt-2': tipo =='Ficha'}" v-if="!cargandoImagen">
                <div class="w-2/3 grid p-2 gap-4 overflow-auto" :class="{'grid-cols-2': tipo == 'Actividades', 'grid-cols-3': tipo == 'Ficha' }">                                                                                                                
                    <div class="relative border " v-for="(item) in arrayImagenes" :key="item.name">
                        <span @click="eliminar_imagen(item.name)" class="absolute border rounded-full top-0 right-0">
                            <img  src="../assets/img/closeCircle.png" class="w-4 cursor-pointer " />
                        </span>   
                        <div class="p-2 mx-aut">      
                            <lazy-image v-if="item.imgbase.length < 200" :src="`${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>     
                            <lazy-image v-else :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 border-2 relative border-gray-600 inline-block border-dashed text-center rounded-lg">
                    <div class="">
                        <input @change="recibir_imagenes" type="file" multiple class="h-40 w-full inset-0 absolute opacity-0 cursor-pointer" >
                        <img src="../assets/img/more.png" class="p-5 w-auto mx-auto h-32 sm:w-10 sm:h-10 sm:p-1 sm:mt-12" :class="{'sm:h-16 sm:w-16 ': tipo=='Ficha'}" alt/>
                        <span class="text-sm text-gray-500 mb-0 sm:hidden">Agregar imagenes</span>
                    </div>
                </div>
            </div>
            <div class=" text-center font-serif text-xs h-40 border border-gray-400 rounded-lg w-full sm:w-32" :class="{'sm:w-full mt-0 sm:mt-2': tipo =='Ficha'}" v-else>
                <div class="mt-5">                
                    <div class="p-10">
                        <p class="mb-2">Cargando imagen</p>
                        <BarraProgreso :color="'blue'" :percentage="progress" ></BarraProgreso>
                    </div>
                </div>
            </div>
            <span class="text-gray-500 text-sm sm:-mt-6 ">{{ num }}/36 (Máximo 36 fotografías)</span>     
        </div> 
        <div v-else>
            <button class="inline-flex h-40 border border-gray-400 bg-gray-300 rounded-lg w-full sm:w-32" :class="{'bg-gray-400' : reporteDataInsertada}">
                <div class="w-2/3 grid p-2 gap-4 overflow-auto bg-gray-300">                                                                                                                
                </div>
                <div class="w-1/3 border-2 relative border-gray-600 bg-gray-300 inline-block border-dashed text-center rounded-lg">
                    <button class="bg-gray-300" :disabled="reporteDataInsertada">
                        <img src="../assets/img/more.png" class="p-5 w-auto mx-auto h-32 sm:w-10 sm:h-10 sm:p-1 sm:mt-12" :class="{'sm:h-16 sm:w-16 ': tipo=='Ficha'}" alt/>
                        <span class="text-sm text-gray-500 mb-0 sm:hidden">Agregar imagenes</span>
                    </button>
                </div>
            </button>
            <p class="-mt-1 text-1xl  text-red-700">Primero debe crear el reporte</p>
        </div>       
    </div>
</template>

<script>
import Axios from 'axios'
import ServiceImagenes from '../services/ImagenesService'
import EventBus from "../services/EventBus.js";
import BarraProgreso from '../components/BarraProgreso'
const API = process.env.VUE_APP_URL_API_PRODUCCION
import moment from 'moment'

export default {
    props:{
        referenceNumber: {
            type: String,
            default: () => ''
        },
        tipo: {
            type: String,
            default: () => 'Actividades'
        },
        reporteDataInsertada: {
            type: Boolean,
            default: () => false
        }
    },
    components: {
        BarraProgreso
    },
    data(){
        return{
            arrayImagenes: [],
            cargandoImagen: false,
            progress: 20,
            //Imagene Timer
            seconds: 6,
            countdown: 5,
            expires_in: null,
            interval: null,
        }
    },
    created(){
        EventBus.$on("debloquear_imagenes", () => { 
            this.reporteDataInsertada = true                                                
        });
    },
    destroyed(){
        this.arrayImagenes = []           
        clearInterval(this.interval);            
    },
    beforeMount() {       
        if(this.referenceNumber != '') {
            setTimeout(() => {            
                Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`)
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
                    .catch(error => {                    
                        console.log(error);                     
                });
            }, 1000)
        }
    },
    computed:{
        num (){
            return this.arrayImagenes.length
        }
    },
    methods: {
        recibir_imagenes: async function (e){                      
            await this.enviar_imagenes(e)
            this.cargandoImagen = true            
            this.countdown = moment.utc(this.seconds).format('HH:mm:ss');
            this.expires_in = this.seconds;
            this._setInterval()                               
        },
        _setInterval: function() {
            this.interval = setInterval(() => {
                if(this.expires_in === 1){
                    this.progress = 20
                    this.cargandoImagen = false
                }
                else if (this.expires_in === 0) {                    
                    clearInterval(this.interval);
                } else {
                    this.expires_in -= 1;
                    this.progress += 15
                    this.countdown = moment.utc(this.expires_in * 1000).subtract(1, 'seconds').format('HH:mm:ss');
                }
            }, 1000);
        },
        enviar_imagenes: async function(value){                                       
            let boolValidacion = this.arrayImagenes.some(item => item.name.split('-')[0] != this.referenceNumber) 
            console.log(boolValidacion)
            if(boolValidacion == true || this.arrayImagenes.length == 0){                                
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
                this.arrayImagenes.forEach((item) => console.log(item))              
                for(let imagenes of value.target.files){            
                    //console.log(imagenes)    
                    //if(imagenes.name.split('_')[0] != this.referenceNumber){          
                        //contador++         
                        //let imgagen = ServiceImagenes.base64_to_file(imagenes.imgbase, imagenes.name)                    
                        let formData = new FormData();
                        formData.append("image", imagenes);
                        await Axios.post(rutaInsertImagenes, formData)
                            .then((response) => {                                   
                                console.log(response)
                                this.arrayImagenes = ServiceImagenes.obtener_array_imagenes_agregadas(response.data,this.arrayImagenes)
                            })
                            .catch(error => {                                                      
                                console.log(error)                                    
                        });                       
                    //}                      
                }                
                console.log(contador)
            }                 
        },
        eliminar_imagen(nombreImagen){                
            if(this.arrayImagenes.length > 1){ 
                //console.log(nombreImagen)               
                if(nombreImagen.split('_')[0] == this.referenceNumber){
                    Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`)
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
                        .catch(error => {                                                                 
                            console.log(error)                                
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
                    Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`)
                        .then(() => {                                                                                                              
                        })
                        .catch(error => {                    
                            console.log(error)
                        });  
                } 
            }
        }
    }
}
</script>
