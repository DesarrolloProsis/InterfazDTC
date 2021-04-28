<template>
    <div>    
<!--/////////////////////////////////////////////////////////////////////
        /////                   DATOS DEL REPORTE                           ////
        ////////////////////////////////////////////////////////////////////--> 
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mb-2">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA UNO                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 ml-5 w-full sm:grid grid-cols-1 sm:ml-4 font-titulo">
                <div class="grid grid-cols-2 sm:grid md:grid">
                    <span class="">No. De Reporte:</span>
                    <p class="-ml-66 sm:-ml-16 sm:w-24">{{ datosDiagnostico.referenceNumber }}</p>
                </div>
                <div class="mt-5 grid grid-cols-2 sm:grid">
                    <div>
                        <span>Plaza de Cobro:</span>
                    </div>
                    <div class="-ml-66 sm:-ml-16">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'tipoPlazaSelect'" ></SelectPlaza>
                    </div>
                </div>
                <div class="mt-5 grid sm:grid grid-cols-2">
                    <div>
                        <span class="mr-20 sm:mr-0">Ubicación:</span>
                    </div>
                    <div class="-ml-66 sm:-ml-16 sm:w-40">                  
                        <multiselect
                            :disabled="blockInput"
                            v-model="datosDiagnostico.ubicacion"  
                            :custom-label="label_multi_select"                                                  
                            :close-on-select="false"
                            :clear-on-select="true"
                            :hideSelected="false"
                            placeholder="Selecciona..."
                            :options="carriles_plaza"
                            :multiple="true"              
                        >
                            <template slot="selection" slot-scope="{ values, isOpen }">
                                <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                            </template>
                        </multiselect>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA DOS                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 ml-65 sm:ml-4 font-titulo">
                <div>
                    <span class="">Fecha:</span>
                    <input class="ml-16 fechaDiag" 
                    type="date" 
                    :disabled="blockInput"
                    v-model="datosDiagnostico.fechaDiagnostico"
                    @change="crear_referencia"/>
                </div>
                <div class="mt-5">
                    <span class="">Hora INICIO:</span>
                    <input :disabled="blockInput" class="ml-4 fechaDiag mr-4 sm:ml-8" type="time" v-model="datosDiagnostico.horaInicio"/>
                </div>
                <div class="mt-5">
                    <span class="">Hora FIN:</span>
                    <input :disabled="blockInput" class="ml-10 fechaDiag sm:ml-12" type="time" v-model="datosDiagnostico.horaFin"/>
                </div>
            </div>
        </div>    
        <!--/////////////////////////////////////////////////////////////////////
        /////                             FOLIOS                            ////
        ////////////////////////////////////////////////////////////////////--> 
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mt-0 font-titulo">
            <div class="mt-6 ml-5 w-full sm:-ml-6">
                <div class="text-center w-32 ml-64 mr-40 sm:ml-0">
                    <span class="">Folio de FALLA:</span>
                </div>
                <div class="mt-5 text-center w-32 ml-64 sm:ml-0">
                    <span class="">No. De Reporte:</span>
                </div>
                <div class="mt-5 text-center w-56 ml-40 sm:-ml-12">
                    <span class="sm:hidden">Técnico Responsable PROSIS:</span>
                    <span class="sm:show md:show lg:hidden xl:hidden">Tec.Res. PROSIS:</span>
                </div>
            </div>
            <div class="mt-5 mr-16 grid grid-cols-1 sm:mr-2">
                <div class="-ml-69 sm:-ml-16">
                    <input :disabled="blockInput" class="inputDiag text-center" v-model="datosDiagnostico.folioFalla" />
                </div>
                <div class="mt-5 -ml-69 sm:-ml-16">
                    <input :disabled="blockInput" class="inputDiag text-center" v-model="datosDiagnostico.numeroReporte"  />
                </div>
                <div class="mt-5 -ml-69 sm:-ml-16">
                    <p class="border-gray-400 w-full text-center">{{ nombre_usuario }}</p>
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
            <div class="mt-6 w-full grid grid-cols-3 sm:grid-cols-2">
                    <div class="mr-10 sm:w-32 sm:mb-10">
                        <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="datosDiagnostico.descripcionFalla"
                            class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                            placeholder="Descripción de la Falla Reportada"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_desc }}/300</span>
                    </div>
                    <div class="mr-10 sm:w-32">
                        <span class="">DIAGNOSTICO DE LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="datosDiagnostico.diagnosticoFalla"
                            class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                            placeholder="Diagnostico de la Falla Reportada"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_diag }}/300</span>
                    </div> 
                    <div class="mr-10 sm:w-32 sm:mt-0 sm:mb-10 sm:ml-4">
                        <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="datosDiagnostico.causaFalla"
                            class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                            placeholder="Causa de la Falla Reportada"
                            name="CausaDeLaFalla"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_causa }}/300</span>
                    </div>         
            </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////////
        ////                            FICHA                             ///////
        //////////////////////////////////////////////////////////////////// -->
        <div class="font-titulo" v-if="tipo == 'FICHA'"> 
            <div class="grid sm:grid-cols-1 grid-cols-2 ml-5">
                <div class="">
                    <span>TIPO DE FALLA:</span>
                </div>
                <div class="grid grid-cols-3 sm:grid-cols-3 sm:mx-auto -ml-69">
                    <div class="text-center">
                        <p>POR OPERACIÓN</p>                        
                        <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="1" false-value="0" @change="bloquear_checboxes(1)" :disabled="blockCheckBox[0]">
                    </div>
                    <div class="text-center">
                        <p>POR SINIESTRO</p>
                        <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="2" false-value="0" @change="bloquear_checboxes(2)" :disabled="blockCheckBox[1]">
                    </div>
                    <div class="text-center">
                        <p>POR FIN DE VIDA ÚTIL</p>
                        <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="3" false-value="0" @change="bloquear_checboxes(3)" :disabled="blockCheckBox[2]">
                    </div>
                </div>
            </div>
            <div class="ml-5">   
                <div class="mt-6 w-full grid sm:grid-cols-1 grid-cols-2">
                    <div class="mr-10">
                        <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="datosDiagnostico.descripcionFalla"
                            class="mx-auto py-4 mb-0 h-40 is_valid ph-center-observaciones"
                            placeholder="jane@example.com"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_desc }}/300</span>
                    </div>
                    <div class="mr-10">
                        <span class="">SOLUCIÓN y/o INTERVENCION REALIZADA PARA LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="datosDiagnostico.solucionFalla"
                            class="mx-auto py-4 mb-0 h-40 is_valid ph-center-observaciones"
                            placeholder="Intervencion Realizada"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_sol }}/300</span>
                    </div>                                  
                </div>                 
            </div>            
        </div>
        
    </div>
</template>

<script>
import SelectPlaza from '../../components/Header/SelectPlaza'
import ServiceReportePDF from '../../services/ReportesPDFService';
import moment from "moment";
import Multiselect from "vue-multiselect";
import CookiesService from '../../services/CookiesService';
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
},
///////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data(){
    return{
        limite:300,                                                                                      
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
        blockCheckBox: [false, false, false]
    }
},
beforeMount: async function(){  
    if(this.$route.params.tipoVista != 'Crear'){        
        let paramRoute = this.$route.query.item         
        let { plazaSelect } = await CookiesService.actualizar_plaza(paramRoute.adminSquareId)        
        this.plazaSeleccionada = plazaSelect.numeroPlaza;
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
        let todosCarriles = await this.$store.getters["Refacciones/GET_CARRILES_STATE"];          
        let ubicacion = paramRoute.lanes
            .split(',')
            .map(carril => {                        
                return todosCarriles.find(item => item.lane == carril)                        
        })                        
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
    else{
        this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
        this.$emit('actualizar-header', this.datosDiagnostico)          
        if(this.$route.query.data != undefined){        
            this.datosDiagnostico = this.$route.query.data        
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.blockInput = true
        }
    }       
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
    datosDiagnostico: {
        deep: true,
        handler(datosDiagnostico) {
            this.$emit('actualizar-header', datosDiagnostico)
        },
    },
},
methods:{  
    bloquear_checboxes(tipo){        
        if(tipo == 1)
            this.blockCheckBox = [true, false, false]        
        if(tipo == 2)
            this.blockCheckBox = [false, true, false]
        if(tipo == 3)
            this.blockCheckBox = [false, false, true]    
    },
    crear_referencia: async function () {      
        let _arrayReference  = await ServiceReportePDF.crear_referencia(
            moment(this.datosDiagnostico.fechaDiagnostico,"YYYY-MM-DD").format("DD-MM-YYYY"), 
            this.headerSelecionado.referenceSquare, true
        )    
        if(typeof(_arrayReference) == 'object'){
            return this.arrayReference = _arrayReference
        }
        else{
            return this.datosDiagnostico.referenceNumber = _arrayReference
        }          
    },
    async cambiar_plaza(numeroPlaza) {  
        this.plazaSeleccionada = numeroPlaza 
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.arrayCarriles = this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
        this.crear_referencia()      
        if (JSON.stringify(this.headerEdit) != "{}") {
            this.datosDiagnostico.referenceNumber = this.headerEdit.referenceNumber;
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

</style>