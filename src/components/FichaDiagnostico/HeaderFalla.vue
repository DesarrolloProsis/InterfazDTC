<template>
    <div>    
<!--/////////////////////////////////////////////////////////////////////
        /////                   DATOS DEL REPORTE                           ////
        ////////////////////////////////////////////////////////////////////--> 
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mb-2">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA UNO                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 ml-5 w-full sm:grid grid-cols-1 sm:ml-4">
                <div class="grid grid-cols-2 sm:grid grid-cols-1 md:grid grid-cols-1">
                    <span class="">No. De Reporte:</span>
                    <p class="-ml-66 sm:ml-0 sm:w-24">{{ datosDiagnostico.referenceNumber }}</p>
                </div>
                <div class="mt-5 grid grid-cols-2 sm:grid grid-cols-2">
                    <div>
                        <span>Plaza de Cobro:</span>
                    </div>
                    <div class="-ml-66 sm:ml-0">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza"  :fullPlazas="true" :tipo="'edicion'" :forma="'diagnostico'"></SelectPlaza>
                    </div>
                </div>
                <div class="mt-5 grid grid-cols-2 sm:grid grid-cols-2">
                    <div>
                        <span class="mr-20 sm:mr-0">Ubicación:</span>
                    </div>
                    <div class="-ml-66 sm:ml-0">
                        <select class="w-56 sm:w-20" v-model="datosDiagnostico.ubicacion" type="text">
                            <option value="">Selecionar...</option>
                            <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA DOS                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 ml-65 sm:ml-4">
                <div>
                    <span class="">Fecha:</span>
                    <input class="ml-16 bg-white border-gray-400" 
                    type="date" 
                    v-model="datosDiagnostico.fechaDiagnostico"
                    @change="crear_referencia"/>
                </div>
                <div class="mt-5">
                    <span class="">Hora INICIO:</span>
                    <input class="ml-4 bg-white border-gray-400 mr-4 sm:ml-8" type="time" v-model="datosDiagnostico.horaInicio"/>
                </div>
                <div class="mt-5">
                    <span class="">Hora FIN:</span>
                    <input class="ml-10 bg-white border-gray-400 sm:ml-12" type="time" v-model="datosDiagnostico.horaFin"/>
                </div>
            </div>
        </div>    
        <!--/////////////////////////////////////////////////////////////////////
        /////                             FOLIOS                            ////
        ////////////////////////////////////////////////////////////////////--> 
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-3 mb-10 sm:mt-0">
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
                    <input class="bg-white border-gray-400 w-full text-center" v-model="datosDiagnostico.folioFalla" />
                </div>
                <div class="mt-5 -ml-69 sm:-ml-16">
                    <input class="bg-white border-gray-400 w-full text-center" v-model="datosDiagnostico.numeroReporte"  />
                </div>
                <div class="mt-5 -ml-69 sm:-ml-16">
                    <p class="border-gray-400 w-full text-center">{{ nombre_usuario }}</p>
                </div>
            </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////////
        /////                       DECSRIPCION                             ////
        ////////////////////////////////////////////////////////////////////-->      
        <div class="mt-2 sm:text-xs sm:ml-3 mb-16 mr-5 ml-5" v-if="tipo == 'DIAG'">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA TRES                           ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 w-full grid grid-cols-2 ">
                <div class=" mr-10">
                    <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                    <textarea
                        v-model="datosDiagnostico.descripcionFalla"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="Observaciones"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-gray-500">{{ restante_desc }}/300</span>
                </div>
                <div class="mr-10">
                    <span class="">DIAGNOSTICO DE LA FALLA REPORTADA:</span>
                    <textarea
                        v-model="datosDiagnostico.diagnosticoFalla"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="Observaciones"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-gray-500">{{ restante_diag }}/300</span>
                </div>
                <div class="mt-5 mr-10">
                    <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                    <textarea
                        v-model="datosDiagnostico.causaFalla"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="CausaDeLaFalla"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-gray-500">{{ restante_causa }}/300</span>
                </div>
                <!-- /////////////////////////////////////////////////////////////////////
                ////                         IMAGENES                             ////
                ///////////////////////////////////////////////////////////////////// -->
            </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////////
        ////                            FICHA                             ///////
        //////////////////////////////////////////////////////////////////// -->
        <div v-if="tipo == 'FICHA'"> 
            <div class="grid grid-cols-2 ml-5">
                <div class="">
                    <span>TIPO DE FALLA:</span>
                </div>
                <div class="grid grid-cols-3 -ml-69">
                    <div class="text-center">
                        <p>POR OPERACIÓN</p>
                        <input type="checkbox">
                    </div>
                    <div class="text-center">
                        <p>POR SINIESTRO</p>
                        <input type="checkbox">
                    </div>
                    <div class="text-center">
                        <p>POR FIN DE VIDA ÚTIL</p>
                        <input type="checkbox">
                    </div>
                </div>
            </div>
            <div class="ml-5">   
                <div class="mt-6 w-full grid grid-cols-2 ">
                    <div class="mr-10">
                        <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="datosDiagnostico.descripcionFalla"
                            class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                            placeholder="jane@example.com"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_desc }}/300</span>
                    </div>
                    <div class="mr-10">
                        <span class="">SOLUCIÓN y/o INTERVENCION REALIZADA PARA LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="solucion"
                            class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                            placeholder="jane@example.com"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_sol }}/300</span>
                    </div>
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import SelectPlaza from '../../components/Header/SelectPlaza'
import ServiceReportePDF from '../../services/ReportesPDFService';
import moment from "moment";

export default {
name: "Diagnostico",
props:{
    tipo: {
        type: String,
        default: () => ''
    } 
},
components:{
    SelectPlaza,
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
        solucion:'',
        listaPlazas: [],
        arrayReference: [],
        headerSelecionado: {},
        plazaSeleccionada:"",
        arraySelect:{},
        type:"DIAG"
    }
},
beforeMount: function(){           
    this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
    this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
    this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
    this.$emit('actualizar-header', this.datosDiagnostico)
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
        return this.solucion.length
    },
},
watch:{
    datosDiagnostico: {
        deep: true,
        handler(datosDiagnostico) {
            this.$emit('actualizar-header', datosDiagnostico)
        },
    }
},
methods:{    
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
},
}
</script>

<style>

</style>