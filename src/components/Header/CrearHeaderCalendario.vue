<template>
    <div>
    <!--///////////////////////////////////////////////////////////////////
          ////                             HEADER                          ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="text-2xl text-center inline-flex sm:inline-block w-full mt-1">
            <div class=" w-auto mx-auto flex justify-center sm:ml-16 sm:-mb-6">
                <div class="border-gray-800 w-66 border-none p-5">
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-48"/>
                </div>
            </div>
            <div class="w-2/3 sm:w-auto sm:mt-3 sm:text-sm sm:-mb-6 flex justify-start sm:justify-center">
                <div class="border-gray-200 p-5 pt-0 -ml-20 sm:ml-0">
                    <h1 class="mt-5 border-purple-800 w-72 sm:w-full font-titulo font-bold">{{ `Calendario de Actividades` }}</h1>            
                </div>
            </div>
        </div>
        <div class="inline-flex sm:inline-block mb-10 w-full sm:w-48">
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA IZQUIERDA                        ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-2/3 sm:w-full inline-flex sm:inline-block text-base sm:text-sm">
                <div class="w-1/2 sm:w-full p-8 sm:p-2 -mb-12">
                    <div class="flex justify-starts m-5 w-full sm:w-66">
                        <p class="font-titulo font-semibold">Correspondiente al mes de:</p>
                        <h2 class="ml-5 font-titulo">{{ `${mesNombre} del ${año}` }}</h2>
                    </div>                    
                    <div class="md:flex lg:flex grid grid-cols-1 justify-start sm:grid-cols-1 ml-5">
                        <span class="font-titulo font-semibold mr-4">Plaza/Encargado: </span>
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'tipoPlazaSelect'" class="w-66"></SelectPlaza>                                                    
                    </div>
                    <div class="grid grid-cols-1 sm:mb-8">
                        <multiselect v-model="value"  @close="acciones_mapper()" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel" :show-labels="false">
                            <template slot="singleLabel" slot-scope="props">
                                <div class=" inline-flex">
                                    <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                                    <span class="option__title">{{ props.option.title }}</span>
                                </div>
                            </template>
                            <template slot="option" slot-scope="props">                                                
                                <div class="option__desc"><span class="option__title inline-flex">
                                    <img :src="props.option.img" class="mr-5" width="15" height="15">    
                                    {{ props.option.title }}</span>
                                </div>
                            </template>
                        </multiselect>    
                        <!-- <div class="flex justify-start m-5 mt-10">
                            <button @click="generar_pdf" class="botonIconCrear">
                                <img src="../../assets/img/add.png" class="mr-2" width="25" height="25" />
                                <span class="">Crear</span>
                            </button>
                        </div>
                        <div class="grid grid-cols-2 justify-center h-12 w-full mt-1 ml-6 sm:ml-3" >
                            <div class="ml-32 -mt-1 sm:ml-33">
                                <button @click="obtener_escaneado_calendario" class="botonIconDescargar w-auto h-12 font-bold mb-1" :disabled="!calendarioEscaneado" :class="{'bg-gray-400 border-b-2 hidden border-black hover:bg-gray-400 hover:border-black hover:text-black cursor-not-allowed': !calendarioEscaneado}">
                                    <img src="../../assets/img/pdf.png"  class="mr-2 -ml-4 sm:-ml-3" width="25" height="25" />
                                        <span class="mr-2">Descargar</span>
                                </button>
                            </div>
                            <div class="-ml-48 sm:-ml-24">
                                <div  class="grid grid-cols-2 -mt-3 sm:ml-8" v-if="escaneadoBool"> 
                                    <div class="inline-flex">
                                        <img src="../../assets/img/pdf.png" class="w-6 h-8 mt-5 border opacity-75" alt/>    
                                        <p class="ml-2 mt-3 mr-1 text-sm font-bold">Calendario Escaneado</p>
                                        <button @click="enviar_calendario_escaneado" Class="botonEnviarPDF mt-16 mr-2 -ml-32 px-2 py-2 h-10 text-sm justify-center w-24 sm:mt-16 sm:w-12 sm:-mr-2 sm:-ml-24">Subir</button>
                                        <button @click="escaneadoBool = false, calendar_escaneado = ''" class="botonIconCancelar mt-16 ml-4 h-10 text-sm justify-center px-1 sm:ml-4 sm:mt-16">Cancelar</button>
                                    </div>                                
                                </div>                        
                                <div v-else class="justify-center ml-2 botonIconDescargar font-bold">
                                    <input type="file" @change="recibir_calendario_escaneado" class="opacity-0 w-32 h-10 absolute" multiple/>
                                        <img src="../../assets/img/pdf-sellado.png" class="mr-2" width="25" height="25" />
                                        <span>Cargar</span>                                                                       
                                </div>
                            </div>
                        </div> -->
                    </div>          
                </div>
                <ValidationObserver ref="observer" class="-ml-16">  
                    <div class="w-69 ml-20 sm:ml-20 sm:m-0 sm:mt-10 sm:w-62 p-8 sm:p-2">
                        <ValidationProvider name="ComentarioCalendario" rules="required:max:500"  v-slot="{ errors }">
                            <span class="text-center font-titulo font-bold text-sm text-gray-800 sm:-ml-16">Observaciones</span>          
                            <textarea
                                v-model="comentario"                                                               
                                class="block container placeholder-gray-500 sm:mt-2 sm:mb-1 sm:-ml-16 textAreaCalendario mt-6"
                                placeholder="jane@example.com"
                                name="ComentarioCalendario"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-xs text-gray-500 sm:ml-20">{{ restante }}/500</span>    
                        </ValidationProvider>                    
                    </div>  
                </ValidationObserver>            
            </div>
            <!--///////////////////////////////////////////////////////////////////
              ////                     COLUMNA INDICACIONES                    ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/4 ml-16 sm:-ml-1 sm:w-67 uppercase text-xs p-10 sm:p-5">
                <p class="font-titulo font-semibold">Codigo de Colores:</p>
                <div class="flex justify-between mt-2 ml-2">
                    <p class="font-titulo">Semanal</p>
                    <div class="bg-green-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center is_valid -mt-1">
                        <p class="mt-1 font-titulo">Verde</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p class="font-titulo">Mensual</p>
                    <div class="bg-red-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center is_valid -mt-1">
                        <p class="mt-1 font-titulo">Rojo</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p class="font-titulo">Trimestral</p>
                    <div class="bg-blue-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center is_valid -mt-1">
                        <p class="mt-1 font-titulo">Azul</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p class="font-titulo">Semestral</p>
                    <div class="bg-pink-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center is_valid -mt-1">
                        <p class="mt-1 font-titulo">Rosa</p>
                    </div>
                </div>
                <div class="flex justify-between mt-2 ml-2">
                    <p class="font-titulo">Anual</p>
                    <div class="bg-orange-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center is_valid -mt-1">
                        <p class="mt-1 font-titulo">NARANJA</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceActividades from '../../services/ActividadesService'
import SelectPlaza from '../Header/SelectPlaza'
import Multiselect from "vue-multiselect";
const API = process.env.VUE_APP_URL_API_PRODUCCION
import ReportesPDFService from '../../services/ReportesPDFService'

export default {
    components:{
        SelectPlaza,
        Multiselect
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
            escaneadoBool: false,
            value: ''                  
        }
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
        acciones_mapper(){            
            if(this.value.title == 'Crear Calendario'){
                this.generar_pdf()
            }
            if(this.value.title == 'Cargar Sellado'){
                this.obtener_escaneado_calendario()
            }
            if(this.value.title == 'Descargar Sellado'){
                this.obtener_escaneado_calendario()
            }
            this.value = ''
        },
        opticones_select_acciones(){
            let options = [
                { title: 'Crear Calendario', img: '/img/nuevoDtc.90090632.png' },                                                
                { title: 'Cargar Sellado', img: '/img/upload.8d26bb4f.png'},
                { title: 'Descargar Sellado', img: '/img/download.ea0ec6db.png' }
            ]
            if(!this.calendarioEscaneado){
                return options.splice(0,2)
            }
            else{
                return options
            }         
        },
        customLabel ({ title }) {
            return `${title}`
        },
        cambiar_plaza(numeroPlaza){                  
            this.$emit("actualizar-actividad", numeroPlaza);
        },
        generar_pdf:  async function(){     
            let isValid = await this.$refs.observer.validate();    
            if(isValid){      
                this.$emit('generar-pdf', this.comentario)
            }
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
            //let idPlazaUser = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
            let  formFile = new FormData()
            formFile.append('file', calendarioEscaneadoFile)                     
            this.$http.post(`${API}/calendario/CalendarioEscaneado/${referenciaPlaza}/${this.mes}/${this.año}/${this.idUser}`, formFile)
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
            ReportesPDFService.generar_pdf_calendario_escaneado(this.año, this.mes)
        }
},
    computed:{
        idUser(){
            return this.$store.state.Login.cookiesUser.userId
        },
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