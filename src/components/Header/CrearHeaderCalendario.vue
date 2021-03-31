<template>
    <div>
    <!--///////////////////////////////////////////////////////////////////
          ////                             HEADER                          ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="text-2xl text-center inline-flex sm:inline-block w-full mt-10">
            <div class=" w-auto mx-auto flex justify-center">
                <div class="border-gray-800 w-66 border-2 p-5">
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-48"/>
                </div>
            </div>
            <div class="w-2/3 sm:w-auto sm:mt-3 sm:text-sm flex justify-start sm:justify-center">
                <div class="border-gray-800 border-2 p-5 pt-0">
                    <h1 class="mt-5 border-purple-800 w-72 sm:w-full">{{ `Calendario de Actividades` }}</h1>            
                </div>
            </div>
        </div>
        <div class="inline-flex sm:inline-block  w-full">
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA IZQUIERDA                        ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-2/3 sm:w-full inline-flex sm:inline-block text-base sm:text-sm">
                <div class="w-1/2 sm:w-full p-8 sm:p-2">
                    <div class="flex justify-starts m-5">
                        <p class=" font-bold">Correspondiente al mes de:</p>
                        <h2 class="ml-5">{{ `${mesNombre} del ${año}` }}</h2>
                    </div>                    
                    <div class="md:flex lg:flex xl:flex justify-start sm:grid-cols-1 ml-5">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'insercion'"></SelectPlaza>                                                    
                    </div>
                    <div class="grid grid-cols-2">
                    <div class="flex justify-start m-5">
                        <button @click="generar_pdf" class="botonIconCrear">
                            <img src="../../assets/img/add.png" class="mr-2" width="25" height="25" />
                            <span>Crear</span>
                        </button>
                    </div>
                    <div class="flex-col justify-center h-12 w-full mt-5 " >
                        <div v-if="calendarioEscaneado">
                            <button @click="obtener_escaneado_calendario" class="botonIconDescargar mb-1 sm:mt-2">
                                <img src="../../assets/img/pdf.png"  class="mr-2 sm:m-1" width="15" height="15" />
                                    <span class="text-xs sm:hidden">Descargar Calendario Escaneado</span>
                            </button>
                        </div>
                        <div v-else>
                            <div  class="grid grid-cols-2" v-if="escaneadoBool"> 
                                <div class="inline-flex">
                                    <img src="../../assets/img/pdf.png" class="w-6 h-8 mt-5 border opacity-75" alt/>    
                                    <p class="ml-2 mt-3 mr-1 text-sm font-bold">Calendario Escaneado</p>
                                    <button @click="enviar_calendario_escaneado" Class="botonEnviarPDF mt-2 mr-2 ml-2 px-2 py-2 h-10 text-sm justify-center w-24">Subir</button>
                                    <button @click="escaneadoBool = false, calendar_escaneado = ''" class="botonIconCancelar mt-2 ml-4 h-10 text-sm justify-center px-1">Cancelar</button>
                                </div>                                
                            </div>                        
                            <div v-else class=" justify-center botonIconDescargar">
                                <input type="file" @change="recibir_calendario_escaneado" class="opacity-0 w-12 h-12 absolute" multiple/>
                                    <img src="../../assets/img/pdf-sellado.png" class="mr-2" width="25" height="25" />
                                    <span>Subir Escaneado</span>                                                                       
                            </div>
                        </div>
                    </div>
                    </div>          
                </div>
                <div class=" w-1/2 sm:w-full p-8 sm:p-2">
                    <span class="text-center font-bold text-sm text-gray-800 sm:ml-5">Observaciones</span>          
                    <textarea
                        v-model="comentario"
                        v-validate="'max:500|required'"
                        :class="{ 'is_valid': !errors.first('comentario'), 'is_invalid': errors.first('comentario')}"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-32 w-full placeholder-gray-500 border sm:mt-2 sm:mb-1"
                        placeholder="jane@example.com"
                        name="comentario"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-xs text-gray-500 sm:ml-4">{{ restante }}/500</span>
                    <p class="text-xs">{{ errors.first("comentario") }}</p>
                </div>              
            </div>
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA INDICACIONES                    ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/4 sm:w-full uppercase text-xs p-10 sm:p-5">
                <p class=" font-bold">Codigo de Colores:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Semanal</p>
                    <div class="bg-green-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Verde</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Mensual</p>
                    <div class="bg-red-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Rojo</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Trimestral</p>
                    <div class="bg-blue-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Azul</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Semestral</p>
                    <div class="bg-pink-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Rosa</div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p>Anual</p>
                    <div class="bg-orange-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center">Naranja</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceActividades from '../../services/ActividadesService'
import SelectPlaza from '../Header/SelectPlaza'
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Axios from "axios";
import ReportesPDFService from '../../services/ReportesPDFService'

export default {
    components:{
        SelectPlaza
    },
    props:{
        comentario:{
            type: String,
            default: () => ''
        },
        mes: {
            type: Number,
            default: () => 0
        },
        año: {
            type: Number,
            default: () => 0
        },
        numeroActividades: {
            type: Number,
            default: () => 0
        },
        calendarioEscaneado: {
            type: Boolean,
            default: () => false
        }
    },
    data(){
        return {                        
            limite:500,
            calendarEscaneado: null,      
            escaneadoBool: false                  
        }
    },
    beforeMount(){

    },
    destroyed(){        
        if(this.comentario == '' && this.numeroActividades > 0){
            this.$router.push({ path: 'CalendarioActividades' })
            this.$notify.warning({
                title: "Ups!",
                msg: `NO PUEDES TENER CALENDARIO SIN COMENTARIO`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },          
            });          
        }
        else if(this.numeroActividades == 0 && this.comentario != ''){
            this.$router.push({ path: 'CalendarioActividades' })
            this.$notify.warning({
                title: "Ups!",
                msg: `NO PUEDES TENER CALENDARIO SIN ACTIVIDADES`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },          
            });  
        }                                    
    },    
    methods: {
        cambiar_plaza(numeroPlaza){                  
            this.$emit("actualizar-actividad", numeroPlaza);
        },
        generar_pdf(){           
            this.$emit('generar-pdf', this.comentario)
        },         
        recibir_calendario_escaneado(e) {                  
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            else {
                this.escaneadoBool = true
                for (let item of files) {        
                if(this.crearImage(item) == false)
                    this.escaneadoBool = false
                }        
            }
        },
        crearImage(file) {
        if(file.type.split('/')[1] == 'pdf'){
            var reader = new FileReader(); 
            reader.onload = (e) => {
            this.$nextTick().then(() => {
                this.calendarEscaneado = e.target.result.split(',')[1]
                })        
            };
            reader.readAsDataURL(file);   
            return true
        }
        else{
            this.$notify.warning({
                title: "Ups!",
                msg: `SOLO SE PUEDEN SUBIR ARCHIVOS .PDF`,
                position: "bottom right",
                styles: {
                height: 100,
                width: 500,
            },          
            });
            this.pdfSellado = {}
            return false
            }         
        },
        enviar_calendario_escaneado(){
            let calendarioEscaneadoFile = this.base64ToFile(this.calendarEscaneado, "CalendarioEscaneado" + this.mes + this.año)            
            let referenciaPlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
            let  formFile = new FormData()
            formFile.append('file', calendarioEscaneadoFile)                     
            Axios.post(`${API}/calendario/CalendarioEscaneado/${referenciaPlaza}/${this.mes}/${this.año}`, formFile)
                .then(() => {                                   
                    this.escaneadoBool = false
                    this.calendarioEscaneado = false
                    let numPlaza = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID'].numPlaza
                    this.$emit("actualizar-actividad", numPlaza);                    
                    this.$notify.success({
                    title: "Ok!",
                    msg: `SE SUBIO CORRECTAMENTE EL CALENDARIO.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                        },
                    });                                                                                                     
                })
                .catch((ex) => {
                    console.log(ex)
                    if(ex.response.status == 401)
                        CookiesService.token_no_autorizado()
                })

        },
        base64ToFile(dataurl, fileName) {                    
            let url = "data:text/pdf;base64," + dataurl;  
            var arr = url.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
            return new File([u8arr], fileName + '.pdf', { type: mime });
        }, 
        obtener_escaneado_calendario(){
            ReportesPDFService.generar__pdf_calendario_escaneado(this.año, this.mes)
        }
},
    computed:{
        restante(){
            return  this.comentario.length
        },
        mesNombre(){
            return ServiceActividades.numero_to_nombre(this.mes)
        }
    },
    watch: {
        comentario(newValue){            
            this.$emit('actualizar-comentario', newValue)
        }
    }

}
</script>