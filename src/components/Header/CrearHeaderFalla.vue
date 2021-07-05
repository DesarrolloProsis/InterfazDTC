<template>
    <div class="sm:w-56">    
        <ValidationObserver ref="observer">             
            <!--/////////////////////////////////////////////////////////////////////
            /////                   DATOS DEL REPORTE                           ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-0 mb-10 sm:mb-2">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA UNO                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 ml-10 w-full sm:grid grid-cols-1 sm:ml-1 font-titulo">
                <div class="grid grid-cols-2 sm:grid md:grid">
                    <span class="sm:ml-2">No. De Reporte:</span>
                    <p class="-ml-34 sm:-ml-1 sm:w-32" >{{ datosDiagnostico.referenceNumber }}</p>
                </div>
                <div class="mt-5 grid grid-cols-2 sm:grid">
                    <div>
                        <span class="sm:ml-2">Plaza de Cobro:</span>
                    </div>
                    <div class="-ml-34 -mt-1 sm:-ml-1" :class="{'hidden': blockInput == true || $route.params.tipoVista != 'Crear'}">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'tipoPlazaSelect'" ></SelectPlaza>
                    </div>
                    <div class="-ml-34 -mt-1 sm:-ml-1" :class="{'hidden': blockInput == true || $route.params.tipoVista == 'Crear' }">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'editDTC'"></SelectPlaza>
                    </div>
                    <div class="-ml-34 -mt-1 sm:-ml-1" :class="{'hidden': blockInput == false}">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'editDTC'"></SelectPlaza>
                        <div class="sm:-ml-8 sm:w-66">
                            <span v-if="blockInput" class="block -ml-44 text-red-400 text-xs font-titulo font-normal sm:-ml-20">Este dato no se puede modificar, viene del Diagnóstico de Falla</span>
                        </div>
                        
                    </div>
                </div>
                <div class="mt-1 grid sm:grid grid-cols-2">
                    <div>
                        <span class="mr-20 sm:mr-0 sm:ml-8">Ubicación:</span>
                    </div>
                    <div class="-ml-34 w-64 sm:-ml-1 sm:w-40" :class="{'cursor-not-allowed':blockInput==true}">
                        <ValidationProvider name="Carriles" rules="required"  v-slot="{ errors }">                            
                            <multiselect
                                :disabled="blockInput"
                                v-model="datosDiagnostico.ubicacion"  
                                :custom-label="label_multi_select"                                                  
                                :close-on-select="false"
                                :clear-on-select="true"
                                :hideSelected="false"
                                track-by="lane"                        
                                placeholder="Selecciona..."
                                :options="carriles_plaza"
                                :multiple="true"   
                                name="Carriles"                     
                            >
                                <template slot="selection" slot-scope="{ values, isOpen }">
                                    <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                                </template>
                            </multiselect>
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA DOS                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 ml-48 sm:ml-4 font-titulo">
                <div>
                    <ValidationProvider name="FechaDiagnostico" rules="required"  v-slot="{ errors }">                   
                        <span :class="{'ml-24 sm:-ml-1':tipo == 'FICHA'}">Fecha:</span>
                        <!-- <input v-model="datosDiagnostico.fechaDiagnostico" @change="crear_referencia" :class="{'fechaFicha':blockInput == true || $route.params.tipoVista != 'Crear'}" class="ml-16 fechaDiag sm:ml-4"  type="date" :disabled="blockInput || $route.params.tipoVista != 'Crear'" name="FechaDiagnostico"/> -->
                        <input v-model="datosDiagnostico.fechaDiagnostico" @change="crear_referencia" class="ml-16 fechaDiag sm:ml-4"  type="date" name="FechaDiagnostico"/>
                        <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="mt-5">
                    <ValidationProvider name="HoraInicio" :rules="{required: true, maxTime: datosDiagnostico.horaFin}" :custom-messages="{ maxTime: 'La HoraInicio debe ser menor que la HoraFin' }"  v-slot="{ errors }">
                        <span :class="{'ml-24 sm:-ml-1':tipo == 'FICHA'}">Hora INICIO:</span>
                        <datetime v-model="datosDiagnostico.horaInicio"  use12-hour :max-datetime="datosDiagnostico.horaFin" type="datetime" name="HoraInicio"></datetime>
                        <!-- <input v-model="datosDiagnostico.horaInicio" class="ml-4 fechaDiag mr-4 sm:ml-3" :class="{'fechaFicha':blockInput == true}" :disabled="blockInput"  type="time" name="HoraInicio"/> -->
                        <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="mt-5">
                    <ValidationProvider name="HoraFin" :rules="{required: true}" v-slot="{ errors }">
                        <span :class="{'ml-24 sm:-ml-1':tipo == 'FICHA'}">Hora FIN:</span>
                        <datetime v-model="datosDiagnostico.horaFin" use12-hour type="datetime" name="HoraFin"></datetime>
                        <!-- <input v-model="datosDiagnostico.horaFin" class="ml-10 fechaDiag sm:ml-8" :class="{'fechaFicha':blockInput == true}" :disabled="blockInput" name="HoraFin" type="time" /> -->
                        <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
            </div>
            </div>    
            <!--/////////////////////////////////////////////////////////////////////
            /////                             FOLIOS                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div v-if="blockInput" class="ml-69 -mb-6 sm:-ml-1 sm:w-69 text-xs sm:-mb-1"><span class="text-red-400">Este dato no se puede modificar, vienen del Diagnóstico de Falla</span></div>
            <div class="ml-48 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mt-0 font-titulo">
                <div class="mt-6 -ml-32 w-full sm:-ml-6">
                    <div class="text-center w-32 ml-64 mr-40 sm:ml-1 sm:-mt-1">
                        <span class="">Folio de FALLA:</span>                    
                    </div>
                    <div class="mt-5 text-center w-32 ml-64 sm:ml-2 sm:mt-1">
                        <span class="">No. De Siniestro:</span>
                    </div>
                    <div class="mt-5 text-center w-56 ml-40 sm:-ml-12 sm:mt-1">
                        <span class="sm:hidden">Técnico Responsable PROSIS:</span>
                        <span class="sm:show sm:ml-4 md:show lg:hidden xl:hidden">Tec.Res. PROSIS:</span>
                    </div>
                </div>
                <div class="mt-5 mr-16 ml-56 grid grid-cols-1 sm:mr-2" :class="{'w-10':tipo == 'FICHA'}">
                    <div class="-ml-69 sm:-ml-56">
                        <ValidationProvider name="Folio de Falla" rules="required|max:20" v-slot="{ errors }" :class="{'-ml-1':tipo == 'FICHA'}">                   
                            <input v-model="datosDiagnostico.folioFalla" :class="{'inputFicha':blockInput == true}" class="inputDiag sm:w-48 text-center" :disabled="blockInput" name="FolioFalla" :maxlength="20" />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span><span class="text-gray-500 text-xs ml-56 sm:hidden" :class="{'ml-33':tipo == 'FICHA'}">{{ restante_folio }}/20</span>
                        </ValidationProvider>
                    </div>
                    <div class="-mt-1 -ml-69 sm:-ml-56 sm:mt-1">
                        <ValidationProvider name="Numero de Reporte" rules="max:30" v-slot="{ errors }" :class="{'-ml-1':tipo == 'FICHA'}">    
                            <input v-model="datosDiagnostico.numeroReporte" :class="{'inputFicha':blockInput == true}" class="inputDiag sm:w-48 text-center" :disabled="blockInput" name="NumeroReporte" :maxlength="30"/>
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span><span class="text-gray-500 text-xs ml-56 sm:hidden" :class="{'ml-33':tipo == 'FICHA'}">{{ restante_siniestro }}/30</span>
                        </ValidationProvider>                    
                    </div>
                    <div class="-mt-1 -ml-69 sm:-ml-49 sm:mt-1">
                        <p class="border-gray-400 w-69 text-center sm:w-35">{{ nombre_usuario }}</p>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
            /////                       DECSRIPCION                             ////
            ////////////////////////////////////////////////////////////////////-->      
            <div class="mt-2 sm:text-xs sm:ml-3 mb-16 mr-5 ml-5 font-titulo" v-if="tipo == 'DIAG'">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA TRES                           ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-16 w-full ml-5 grid grid-cols-3 sm:grid-cols-2">
                    <div class="mr-10 sm:w-32 sm:mb-10 sm:-ml-6">
                        <ValidationProvider name="DescripcionFalla" rules="required|max:300" v-slot="{ errors }">
                            <span>DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                            <textarea
                                v-model="datosDiagnostico.descripcionFalla"
                                class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                                placeholder="Descripción de la Falla Reportada"
                                name="DescripcionFalla"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 ml-33 sm:ml-12">{{ restante_desc }}/300</span>
                        </ValidationProvider>
                    </div>
                    <div class="mr-10 sm:w-32 sm:ml-16">
                        <ValidationProvider name="DiagnosticoFalla" rules="required|max:300" v-slot="{ errors }">
                            <span>DIAGNÓSTICO DE LA FALLA REPORTADA:</span>
                            <textarea
                                v-model="datosDiagnostico.diagnosticoFalla"
                                class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                                placeholder="Diagnostico de la Falla Reportada"
                                name="DiagnosticoFalla"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 ml-33 sm:ml-12">{{ restante_diag }}/300</span>
                        </ValidationProvider>
                    </div> 
                    <div class="mr-10 sm:w-32 sm:mt-0 sm:mb-10 sm:-ml-6">
                        <ValidationProvider name="CausaFalla" rules="required|max:300" v-slot="{ errors }">
                            <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                            <textarea
                                v-model="datosDiagnostico.causaFalla"
                                class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                                placeholder="Causa de la Falla Reportada"
                                name="CausaFalla"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 ml-33 sm:ml-12">{{ restante_causa }}/300</span>
                        </ValidationProvider>
                    </div>         
                </div>
            </div>
            <!-- /////////////////////////////////////////////////////////////////////
            ////                            FICHA                             ///////
            //////////////////////////////////////////////////////////////////// -->
            <div class="font-titulo sm:-mt-6" v-if="tipo == 'FICHA'"> 
            <div v-if="modalAdvertencia && this.$route.params.tipoVista != 'Crear'" class="absolute justify-items-center rounded-lg border border-gray-400 shadow-xl inset-x-0 bg-white w-74 h-69 sm:h-73 sm:w-66 mx-auto px-10 py-5 text-gray-600">
                <div>
                    <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
                        <img src="../../assets/img/warning.png" class="ml-20 sm:-ml-6" width="35" height="35" />
                        <p class="-mt-10 text-black sm:ml-6 sm:-mt-6">Advertencia</p>
                        <img src="../../assets/img/warning.png" class="ml-68 -mt-12 sm:-mt-10 sm:ml-49" width="35" height="35" />
                    </h1>
                    <div>
                        <p>*Si cambia el tipo de falla para este diagnostico es necesario eliminar el DTC con referencia {{ referenciaDtc }}</p>                                   
                    </div>
                </div>
                <div class="flex justify-center">
                    <ValidationObserver ref="observerModal">                        
                        <ValidationProvider immediate name="comentarioBorrar" rules="required:max:300"  v-slot="{ errors }">    
                            <p class="text-md mb-1 font-semibold text-gray-900 mt-5">Motivo</p>
                            <textarea v-model="comentarioBorrarDtc" class="bg-white is_valid appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 w-69 mb-0 h-20 placeholder-gray-500 border" name="comentarioBorrar"/>              
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <div class="mt-10 text-center">
                            <button @click="aceptar_borrar_dtc" class="botonIconCrear">Confirmar</button>
                            <button @click="cancelar_borrado_dtc" class="botonIconCancelar font-boton">Cancelar</button>
                        </div>
                    </ValidationObserver>                
                </div>
            </div>
            <div class="grid sm:grid-cols-1 grid-cols-2 ml-5 sm:text-xs sm:ml-1">
                <div class="sm:ml-2">
                    <span>TIPO DE FALLA:</span>
                </div>
                <div class="grid grid-cols-1 sm:mx-auto -ml-62 sm:w-20 sm:ml-56">
                    <ValidationProvider name="TipoFalla" rules="required" v-slot="{ errors }" class="grid grid-cols-3 sm:grid-cols-2">    
                        <div class="text-center -ml-66 sm:mr-8">
                            <p>POR OPERACIÓN</p>                        
                            <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="1" false-value="0" @change="bloquear_checboxes(1)" name="TipoFalla" :disabled="blockCheckBox[0]">
                        </div>
                        <div class="text-center -ml-66 sm:-ml-32">
                            <p>POR SINIESTRO</p>
                            <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="2" false-value="0" @change="bloquear_checboxes(2)" name="TipoFalla" :disabled="blockCheckBox[1]">
                        </div>
                        <div class="text-center -ml-66 sm:-ml-67">
                            <p>POR FIN DE VIDA ÚTIL</p>
                            <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="3" false-value="0" @change="bloquear_checboxes(3)" name="TipoFalla" :disabled="blockCheckBox[2]">
                        </div>
                        <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>   
            </div>
            <div class="ml-5 sm:text-xs sm:ml-1">   
                <div class="mt-6 w-full grid sm:grid-cols-1 grid-cols-2">
                    <div class="mr-10 sm:mr-1 sm:mb-6 w-74">
                        <ValidationProvider name="DescripcionFalla" rules="required|max:300" v-slot="{ errors }">    
                            <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                            <textarea
                                v-model="datosDiagnostico.descripcionFalla"
                                class="mx-auto py-4 mb-0 h-40 textareaFicha ph-center-observaciones sm:w-66 sm:ml-1"
                                placeholder="jane@example.com"
                                name="DescripcionFalla"
                                :maxlength="limite"
                                readonly
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 sm:ml-33">{{ restante_desc }}/300 <span class="text-red-400 ml-1 sm:hidden md:hidden">Este dato no se puede modificar, viene del Diagnóstico de Falla</span></span>            
                            <div class="text-red-400 sm:-ml-2 lg:hidden xl:hidden">Este dato no se puede modificar, viene del Diagnóstico de Falla</div>
                        </ValidationProvider>
                    </div>
                    <div class="mr-10 ml-1 sm:mr-1 w-73">
                        <ValidationProvider name="SolucionFallas" rules="required|max:300" v-slot="{ errors }">    
                            <span class=" sm:hidden">SOLUCIÓN y/o INTERVENCION REALIZADA PARA LA FALLA REPORTADA:</span>
                            <span class="xl:hidden lg:hidden md:hidden">SOLUCIÓN y/o INTERVENCION REALIZADA:</span>
                            <textarea
                                v-model="datosDiagnostico.solucionFalla"
                                class="mx-auto py-4 mb-0 h-40 is_valid ph-center-observaciones sm:w-66 sm:-ml-1"
                                placeholder="Intervencion Realizada"
                                name="SolucionFallas"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 sm:ml-32">{{ restante_sol }}/300</span>
                        </ValidationProvider>
                    </div>                                  
                </div>                 
            </div>            
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
import SelectPlaza from '../../components/Header/SelectPlaza'
import ServiceReportePDF from '../../services/ReportesPDFService';
import moment from "moment";
import Multiselect from "vue-multiselect";
import EventBus from '../../services/EventBus'
import CookiesService from '../../services/CookiesService';
import { Datetime } from 'vue-datetime';
export default {
name: "Diagnostico",
props:{
    tipo: {
        type: String,
        default: () => ''
    },
    reporteInsertado: {
        type: Boolean,
        default: () => false
    } 
},
components:{
    SelectPlaza,
    Multiselect, 
    Datetime   
},
///////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data(){
    return{
        limite:300, 
        boolCambiarPlaza: false,                                                                                     
        datosDiagnostico:{
            referenceNumber: "",
            ubicacion: '',
            fechaDiagnostico: '',
            horaInicio: '',
            horaFin: '',
            folioFalla: '',
            numeroReporte: '',
            descripcionFalla: '',
            diagnosticoFalla:'',
            causaFalla:''
        },
        listaPlazas: [],
        arrayReference: [],
        headerSelecionado: {},
        plazaSeleccionada:"",
        arraySelect:{},
        type:"DIAG",
        blockInput: false,
        blockCheckBox: [false, false, false],     
        referenciaDtc: '',
        modalAdvertencia: false,
        comentarioBorrarDtc: '',
        tipoFallaOriginal: '',  
        prueba: '2021-06-01T1:27:00'          
    }
},
created(){
    EventBus.$on('validar_header_diagnostico', (value) => this.validar_campos_header(value))
},
beforeMount: async function(){      
    //Bloque para editar
    if(this.$route.params.tipoVista != 'Crear'){   
        //Editar Ficha            
        if(this.$route.query.data != undefined){      
            this.referenciaDtc = this.$route.query.referenciaDtc                                  
            this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
            this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
            this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)                               
            this.datosDiagnostico = this.$route.query.data        
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.tipoFallaOriginal = this.datosDiagnostico.tipoFalla       
            this.blockInput = true
            this.boolCambiarPlaza = true
        }     
        //Editar Diagnostico 
        else{                          
            let paramRoute = this.$route.query.item                       
            let { plazaSelect } = await CookiesService.actualizar_plaza(paramRoute.adminSquareId)        
            this.plazaSeleccionada = plazaSelect.numeroPlaza;
            this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
            this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
            let todosCarriles = await this.$store.getters["Refacciones/GET_CARRILES_STATE"];                  
            let ubicacion = []
            if(paramRoute.lanes != 'Sin lineas asignadas'){
                ubicacion = paramRoute.lanes
                    .split(',')
                    .map(carril => {                        
                        return todosCarriles.find(item => item.lane == carril)                        
                })     
            }
            let fecha = moment(paramRoute.diagnosisDate).format('YYYY-MM-DD')    
            this.datosDiagnostico = {
                referenceNumber: paramRoute.referenceNumber,
                ubicacion: ubicacion,
                fechaDiagnostico: fecha,
                horaInicio: paramRoute.start,
                horaFin: paramRoute.end,
                folioFalla: paramRoute.failuerNumber,
                numeroReporte: paramRoute.siniesterNumber,
                descripcionFalla: paramRoute.failureDescription,
                diagnosticoFalla:paramRoute.failureDiagnosis,
                causaFalla:paramRoute.causeFailure
            }
        }        
    }
    //Bloque para crear
    else{                               
        this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)          
        //Bloque para crear Ficha      
        if(this.$route.query.data != undefined){                                
            this.datosDiagnostico = this.$route.query.data  
            alert(this.datosDiagnostico.horaFin)       
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.blockInput = true
        }   
    }               
    this.$emit('actualizar-header', { header: this.datosDiagnostico, value: undefined, crear: false })
    //25-06-2021 1:27:00
    //this.datosDiagnostico.horaFin = new Date().toISOString()
},
destroyed(){
    if(this.tipo == 'FICHA')
        EventBus.$off('validar_header_diagnostico')
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
    nombre_usuario(){
        return this.$store.getters["Header/GET_HEADER_SELECCIONADO"].nombre;    
    },
    carriles_plaza(){
        return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
    },
    restante_desc(){
        return  this.datosDiagnostico.descripcionFalla.length
    },
    restante_diag(){
        return this.datosDiagnostico.diagnosticoFalla.length
    },
    restante_causa(){
        return this.datosDiagnostico.causaFalla.length
    },
    restante_sol(){
        if(this.datosDiagnostico.solucionFalla != undefined)
            return this.datosDiagnostico.solucionFalla.length
        return 0
    },
    restante_folio(){
        return this.datosDiagnostico.folioFalla.trim().length
    },
    restante_siniestro(){
        return this.datosDiagnostico.numeroReporte.trim().length
    }
},
watch:{
    tipo(newValue){
        if(newValue == 'FICHA'){
            delete this.datosDiagnostico["descripcionFalla"]
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.blockInput = true
        }
    }, 
},
methods:{  
    aceptar_borrar_dtc: async function(){
        let userId = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']         
        let obj = { "refNum": this.referenciaDtc, "userId": userId.idUser, comentario: this.comentarioBorrarDtc }                                                      
        await this.$store.dispatch("DTC/BORRAR_DTC",obj)
            .then(() => {
                this.$notify.success({
                    title: "Ok!",
                    msg: `EL DTC CON LA REFERENCIA ${this.referenciaDtc} SE ELIMINO CORRECTAMENTE.`,
                    position: "bottom right",
                    styles: {
                    height: 100,
                    width: 500,
                    },
                })    
            })
            .catch(() => {
                this.$notify.error({
                    title: "Ups!",
                    msg: `EL DTC CON LA REFERENCIA ${this.referenciaDtc} NO SE PUDO ELIMINAR.`,
                    position: "bottom right",
                    styles: {
                    height: 100,
                    width: 500,
                    },
                })
            }) 
        this.referenciaDtc = '--'
        this.modalAdvertencia = false                                                                                                                        
    },
    cancelar_borrado_dtc(){
        this.modalAdvertencia = false
        this.comentarioBorrarDtc = ''
        this.datosDiagnostico.tipoFalla = this.tipoFallaOriginal
    },
    bloquear_checboxes(tipo){        
        if(tipo == 1){
            this.blockCheckBox = [true, false, false]    
            if(this.referenciaDtc != '--')  
                this.modalAdvertencia = true
        }    
        if(tipo == 2)
            this.blockCheckBox = [false, true, false]
        if(tipo == 3)
            this.blockCheckBox = [false, false, true]            
    },
    crear_referencia: async function () {                   
        if(this.$route.params.tipoVista == 'Crear') {   
            let objReference  = await ServiceReportePDF.crear_referencia(
                moment(this.datosDiagnostico.fechaDiagnostico,"YYYY-MM-DD").format("DD-MM-YYYY"), 
                this.headerSelecionado.referenceSquare, true
            )    
            this.datosDiagnostico.referenceNumber = objReference.referenceNumber   
        }                
    },
    async cambiar_plaza(numeroPlaza) {                 
        this.plazaSeleccionada = numeroPlaza 
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.arrayCarriles = this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
        this.crear_referencia()               
    },
    validar_campos_header: async function(value){      
        try {         
            console.log(this.datosDiagnostico)                        
            let validacion = false
            Object.entries(this.datosDiagnostico).forEach(item => {
                if(item[0] != 'numeroReporte'){
                    if(item[1] == ""){
                        validacion = true
                    }                                        
                }
            })                       
            if(!validacion){                                                                      
                    this.$emit('actualizar-header', { header: this.datosDiagnostico, value: value, crear: true })
            }  
            else{                
                this.$notify.warning({
                    title: "Ops!!",
                    msg: "NO SE PUDO INSERTAR EL DIAGNOSTICO PORFAVOR VERIFIQUE SUS DATOS.",
                    position: "bottom right",
                    styles: { height: 100, width: 500 },
                });
            } 
        }
        catch(error){            
            console.log(error)
        }
    },
    label_multi_select(value){            
        if(value != 'Sin Actividad')
            return value.lane
        else 
            return [{ "capufeLaneNum": '',  'idGare': '', 'lane': ''}]
    }
}
}
</script>

<style>
.vdatetime-popup__header{
    background: #2c5282;
}

</style>