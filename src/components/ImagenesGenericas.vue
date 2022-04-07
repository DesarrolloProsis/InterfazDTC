<template>
    <div class="mr-10 -mt-3 sm:mr-0 sm:ml-4 sm:mt-0 w-full font-titulo" :class="{'sm:ml-1 sm:mt-18': tipo =='Diagnostico', 'sm:-ml-1': tipo =='Ficha'}">        
        <p class="text-gray-800 font-titulo mt-2 mb-1 sm:text-sm sm:mb-4"
        :class="{'sm:ml-1 sm:mt-2 -mb-1 mt-4 ml-12 w-20': tipo =='Diagnostico', 'ml-5 mb-2 mt-6 lg:ml-73 sm:-ml-48 sm:-mb-1' : tipo == 'Ficha', 'sm:-mt-16' :$route.params.tipoVista == 'Editar'}">IMAGENES</p>
        <div v-if="reporteDataInsertada" class="sm:-ml-4" :class="{'w-75 ml-4 mr-4 mt-4 sm:w-auto border border-white -mb-4 sm:-mt-18' : tipo == 'Diagnostico', 
            'w-75 ml-1 sm:ml-10 sm:w-66 sm:-mb-10' : tipo == 'Ficha', 'w-1/3 ml-5 sm:ml-1 sm:w-66 sm:mb-10 lg:ml-73' :$route.params.tipoVista == 'Editar' }">
            <div class="inline-flex h-40 border border-gray-400 rounded-lg w-full sm:w-66" :class="{'sm:w-66 mt-0 sm:mt-1 sm:-ml-1': tipo =='Diagnostico', 'sm:w-full mt-0 sm:mt-2 sm:ml-4': tipo =='Ficha'}" v-if="!cargandoImagen">
                <div class="w-2/3 grid grid-cols-2 p-2 gap-4 overflow-auto" :class="{'grid-cols-2': tipo == 'Actividades', 'grid-cols-1': tipo == 'Diagnostico', 'grid-cols-1': tipo == 'Ficha' }">                                                                                                                
                    <div class="relative border " v-for="(item) in arrayImagenes" :key="item.name">
                        <span @click="eliminar_imagen(item.name)" class="absolute border rounded-full top-0 right-0">
                            <img  src="../assets/img/close.png" class="w-4 cursor-pointer " />
                        </span>   
                        <div class="p-2 mx-aut">      
                            <lazy-image v-if="item.imgbase.length < 200" :src="`${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="../assets/img/load.gif"/>     
                            <lazy-image v-else :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-32', 'h-32']" placeholder="../assets/img/load.gif"/>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 border-2 relative border-gray-600 inline-block border-dashed text-center rounded-lg"
                    :class="{'' : tipo == 'Diagnostico'}">
                    <div class="sm:-mt-4">
                        <input @change="recibir_imagenes" type="file" multiple class="h-40 w-full inset-0 absolute opacity-0 cursor-pointer">
                        <img src="../assets/img/more.png" class="p-5 w-auto mx-auto h-32 sm:w-10 sm:h-10 sm:p-1 sm:mt-16" :class="{'sm:h-16 sm:w-16': tipo =='Diagnostico' || tipo == 'Ficha'}" alt/>
                        <span class="text-sm text-gray-500 mb-0 sm:hidden">Agregar imagenes</span>
                    </div>
                </div>
            </div>
            <div class=" text-center font-serif text-xs h-40 border border-gray-400 rounded-lg w-full sm:w-66" :class="{'sm:w-auto mt-0 sm:mt-2 sm:ml-1 sm:mr-1': tipo =='Diagnostico', 'sm:w-full mt-0 sm:mt-2 sm:ml-3': tipo =='Ficha'}" v-else>
                <div class="mt-5">                
                    <div class="p-10">
                        <p class="mb-2">Cargando imagen</p>
                        <BarraProgreso :color="'blue'" :percentage="progress" ></BarraProgreso>
                    </div>
                </div>
            </div>
            <span class="text-gray-500 text-sm border border-white sm:-mt-6 sm:ml-0 sm:w-32">{{ num }}/{{ limiteFotos }} (Máximo {{ limiteFotos }} fotografías)</span>     
        </div> 
        <div v-else :class="{'w-1/3 ml-5 lg:ml-73' : tipo == 'Diagnostico', 'w-1/3 ml-5 sm:ml-48 lg:ml-73' :tipo == 'Ficha'}">
            <button class="inline-flex h-40 border border-gray-400 bg-gray-300 rounded-lg w-full sm:w-66" :class="{'bg-gray-400' : reporteDataInsertada}">
                <div class="w-2/3 grid p-2 gap-4 overflow-auto bg-gray-300"></div>
                <div class="w-1/3 border-2 relative border-gray-600 bg-gray-300 inline-block border-dashed text-center rounded-lg sm:h-40">
                    <button class="bg-gray-300" :disabled="reporteDataInsertada" :class="{'' : tipo == 'Diagnostico'}">
                        <img src="../assets/img/more.png" class="p-5 w-auto mx-auto h-31 sm:w-10 sm:h-10 sm:p-1 sm:mt-16" :class="{'sm:h-10 sm:mb-16' : tipo == 'Diagnostico'}"/>
                        <span class="text-sm text-gray-500 mb-0 sm:hidden">Agregar imagenes</span>
                    </button>
                </div>
            </button>
            <p class="-mt-1 text-1xl sm:text-sm  text-red-700" v-if="tipo == 'Diagnostico'" :class="{'text-center mb-4' :tipo == 'Diag'}">Primero debe enviar la información del Reporte</p>
            <p class="mt-1 text-sm text-center text-red-700" v-else>Para agregar imagenes primero debe crear el reporte</p>
        </div>       
    </div>
</template>

<script>
import ServiceImagenes from '../services/ImagenesService'
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
        },
        maximofotosanexo:{
            type: Number,
            default: 0
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
            limiteFotos: 0,
        }
    },
    created(){

    },
    destroyed(){
        this.arrayImagenes = []           
        clearInterval(this.interval);            
    },
    beforeMount() { 
        if(this.tipo == 'Anexo'){
            let urlImgPaths = ''
            this.limiteFotos = this.maximofotosanexo                
            urlImgPaths = `${API}/ReporteFotografico/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
            this.$http.get(urlImgPaths).then((response) => 
                {
                    if (response.data.length == 0)
                       this.$emit('bloquear-boton-diagnostico', true)  
                });
            this.$http.get(urlImgPaths)
            .then((response)=>{
                let urlImgDescarga = `${API}/ReporteFotografico/EquipoNuevo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                if(response.status != 404){                          
                        let newArrayImg = []                      
                        response.data.forEach(item => {
                            newArrayImg.push({
                                "name": item, 
                                "imgbase": `${urlImgDescarga}/${item}`
                            })
                        })
                        this.arrayImagenes = newArrayImg                                       
                    }    
            })       
        }       
        else{
            setTimeout(() => {               
            let urlImgPaths = ''                                
            if(this.tipo == 'Actividades'){
                this.limiteFotos = 36
                urlImgPaths = `${API}/ReporteFotografico/MantenimientoPreventivo/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
            }
            else if(this.tipo == 'Diagnostico'){
                this.limiteFotos = 4                
                urlImgPaths = `${API}/DiagnosticoFalla/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
            }
            else if(this.tipo == 'Anexo'){
                this.limiteFotos = this.maximofotosanexo                
                urlImgPaths = `${API}/ReporteFotografico/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
            }
            else{
                this.limiteFotos = 4                                
                urlImgPaths = `${API}/FichaTecnicaAtencion/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
            }            
            this.$http.get(urlImgPaths)
                .then((response) => {                                              
                    let urlImgDescarga = ''
                    if(this.tipo == 'Actividades')
                        urlImgDescarga = `${API}/ReporteFotografico/MantenimientoPreventivo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                    else if(this.tipo == 'Diagnostico'){
                        urlImgDescarga = `${API}/DiagnosticoFalla/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                    }
                    else{
                        urlImgDescarga = `${API}/FichaTecnicaAtencion/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`   
                    }
                    if(response.status != 404){                          
                        let newArrayImg = []                      
                        response.data.forEach(item => {
                            newArrayImg.push({
                                "name": item, 
                                "imgbase": `${urlImgDescarga}/${item}`
                            })
                        })
                        this.arrayImagenes = newArrayImg                                       
                    }    
                })                
            }, 500)
        }         
    },
    computed:{
        num (){
            return this.arrayImagenes.length
        }
    },
    methods: {
        recibir_imagenes: async function (e){  
            this.$emit('bloquear-boton-diagnostico', true)                    
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
                    this.$emit('bloquear-boton-diagnostico', false)
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
            let objGetImagen = ''
            if(boolValidacion ==     true || this.arrayImagenes.length == 0){                                                 
                let rutaInsertImagenes = {};
                if(this.tipo == 'Actividades'){
                    rutaInsertImagenes = `${API}/ReporteFotografico/MantenimientoPreventivo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                    objGetImagen = { rutaGetImagen: `${API}/ReporteFotografico/MantenimientoPreventivo/Images`, tipo: 1 }                    
                }
                else if (this.tipo == 'ConcentradoDTC'){
                        this.limiteFotos = 100
                        rutaInsertImagenes = `${API}/dtcData/EquipoDañado/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                        objGetImagen = { rutaGetImagen: `${API}/dtcData/EquipoDañado/Images`, tipo: 4}                        
                }
                else if (this.tipo == 'Anexo'){
                        this.limiteFotos = this.maximofotosanexo
                        rutaInsertImagenes = `${API}/ReporteFotografico/EquipoNuevo/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                        objGetImagen = { rutaGetImagen: `${API}/ReporteFotografico/EquipoNuevo/Images`, tipo: 4}
                }
                else{                    
                    if(this.tipo == 'Diagnostico'){                        
                        rutaInsertImagenes = `${API}/DiagnosticoFalla/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                        objGetImagen = { rutaGetImagen: `${API}/DiagnosticoFalla/Images`, tipo: 2 }
                    }
                    else{
                        rutaInsertImagenes = `${API}/FichaTecnicaAtencion/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`
                        objGetImagen = { rutaGetImagen: `${API}/FichaTecnicaAtencion/Images`, tipo: 3 }
                    }
                }                                 
                for(let imagenes of value.target.files){                      
                    if(this.arrayImagenes.length + 1 <= this.limiteFotos){                                                          
                        let formData = new FormData();
                        if(this.tipo != 'ConcentradoDTC')
                            formData.append("image", imagenes);
                        else{
                            let objPlaza = this.$store.state.Login.cookiesUser.plazasUsuario.find(plaza => plaza.refereciaPlaza = this.referenceNumber.split('-')[0])                            
                            formData.append("id", this.referenceNumber);
                            formData.append("plaza", objPlaza.plazaNombre);
                            formData.append("image",imagenes);  
                        }
                        if(imagenes.type == 'image/png' || imagenes.type == 'image/jpeg'){                            
                            await this.$http.post(rutaInsertImagenes, formData)
                                .then((response) => {                                                                                                   
                                    this.arrayImagenes = ServiceImagenes.obtener_array_imagenes_agregadas(response.data, this.arrayImagenes, objGetImagen)
                                })                                
                        }  
                        else{
                            this.$notify.warning({
                                title: "Error!",
                                msg: `SOLO PUEDE SUBIR IMAGENES.`,
                                position: "bottom right",
                                styles: {
                                    height: 100,
                                    width: 500,
                                },
                            }); 
                        }                  
                    }                      
                }                                
            }                 
        },
        eliminar_imagen(nombreImagen){                
            if(this.arrayImagenes.length > 1){                 
                if(nombreImagen.split('_')[0] == this.referenceNumber){
                    let urlDeleteImg = ''
                    if(this.tipo == 'Actividades'){                        
                        urlDeleteImg = `${API}/ReporteFotografico/MantenimientoPreventivo/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`
                    }
                    else if(this.tipo == 'Diagnostico'){                               
                        urlDeleteImg = `${API}/DiagnosticoFalla/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`
                    }
                    else if(this.tipo == 'Anexo'){
                        urlDeleteImg = `${API}/ReporteFotografico/EquipoNuevo/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`
                    }
                    else{                                           
                        urlDeleteImg = `${API}/FichaTecnicaAtencion/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${nombreImagen}`
                    }
                    this.$http.get(urlDeleteImg)
                        .then(() => {                                                                 
                            this.$notify.success({
                                title: "Ok!",
                                msg: `SE ELIMINO LA IMAGEN CORRECTAMENTE.`,
                                position: "bottom right",
                                styles: { height: 100, width: 500 },
                            });                                                                                                           
                        })                    
                }        
                this.$nextTick(() => {                                     
                    let arrayIMG = this.arrayImagenes.filter(imagen => imagen.name != nombreImagen)
                    this.arrayImagenes = []
                    this.arrayImagenes = arrayIMG                    
                })               
            }
            else{
                this.$notify.warning({
                    title: "Ok!",
                    msg: `SIEMPRE DEBE TENER MINIMO UNA FOTO.`,
                    position: "bottom right",
                    styles: { height: 100, width: 500 },
                });  
            }
        }
    }
}
</script>
