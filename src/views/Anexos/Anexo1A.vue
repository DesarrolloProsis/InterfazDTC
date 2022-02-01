<template>

    <div class="container mx-auto">
        <HeaderGenerico :titulo="'ACTA ADMINISTRATIVA INFORMATIVA (ENTREGA-RECEPCIÓN)'" :subtitulo="'FORMATO 1-A'" :tipo="'anexo1A'" />
        <div class="mt-1 mb-1 flex flex-col sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md md:w-auto text-justify p-6">
        <p class="">SE LEVANTA LA PRESENTE ACTA,
        PARA HACER CONSTAR EL SERVICIO DE MANTENIMIENTO <label class="font-bold">CORRECTIVO (SINIESTRO, ACCIDENTE VEHICULAR, DESCARGA ELÉCTRICA, ETC.)</label> 
        </p>
        <p>
        REALIZADO AL EQUIPO DE CONTROL DE TRANSITO DE <label class="font-bold">CARRIL A09</label>, 
        EN LA PLAZA DE COBRO <label class="font-bold"> No. 103, PALO BLANCO,</label>
        PERTENECIENTE A LA <label class="font-bold">UNIDAD REGIONAL CUERNAVACA.</label>
        </p>
        <p>
        EN LA CIUDAD DE <label class="font-bold ml-1">PALO BLANCO, GUERRERO</label>, SIENDO 
        <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio"></datetime>
        EL <label class="font-bold">C. CARLOS JANE LOUI PULIDO MEJIA</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> C.OMAR SÁNCHEZ MORELOS</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
                
            
        
        
        <div class="flex w-full gap-4 p-2">
             <multiselect
                :disabled="blockInput"
                v-model="testigos"  
                :custom-label="label_multi_select"                                                  
                :close-on-select="false"
                :clear-on-select="true"
                :hideSelected="false"                               
                placeholder="Selecciona un testigo"
                :options="testigos_plaza"
                :multiple="false"      
                select-label=""
                class="w-full"                 
                >
        </multiselect>
        <multiselect
                :disabled="blockInput"
                v-model="testigos"  
                :custom-label="label_multi_select"                                                  
                :close-on-select="false"
                :clear-on-select="true"
                :hideSelected="false"
                placeholder="Selecciona un testigo"
                :options="testigos_plaza"
                :multiple="false"      
                select-label=""
                class="w-full"                 
                >
        </multiselect>
        </div>
        <p class="">
        PARA HACER CONSTAR QUE LA FALLA DEL EQUIPO DEL <span class="font-bold">CARRIL A02, CARRIL A07</span>,REPORTADA CON No. DE ACUSE / FOLIO <span class="font-bold">403</span>, DE FECHA <span class="font-bold">13 DE JUNIO DE 2021</span>; FUE REPARADA
        EL DÍA <datetime v-model="date" class="inline-flex"></datetime>, DICHA FALLA CONSISTIÓ EN DAÑO A COMPONENTE
        (<span class="font-bold">BARRERA DE SALIDA COMPLETA, INCLUYE PLUMA DE CARBONO 3.30 MTS.</span>) Y FUÉ PROVOCADA POR <span class="font-bold">GOLPE DE USUARIO</span>, OCURRIDO EL <span class="font-bold">13 DE JUNIO DE 2021</span>; PARA 
        CUYO EFECTO FUÉ NECESARIO REPONER LAS PARTES QUE A CONTINUACIÓN SE DETALLAN.
        </p>
        <p class="text-sm">
        LOS EQUIPOS/COMPONENTES DAÑADOS QUEDAN BAJO RESGUARDO DEL ADMINISTRADOR DEBIÉNDOSE IDENTIFICAR CON EL No. SINIESTRO Y FECHA;
        ESPERAR AVISO DE LA GERENCIA DE SEGUROS A QUE LA ASEGURADORA EMITA EL CHEQUE (REEMBOLSO) QUEDANDO LOS EQUIPOS Y COMPONENTES A DISPOSICIÓN DE LA ASEGURADORA DE NO RECOGERLOS EN UN PLAZO DE 30 DÍAS, 
        LA SUBGERENCIA DE ALMACENES E INVENTARIOS INSTRUIRÁ EL DESTINO FINAL CONFORME LA NORMA
        </p>
        <p class="text-sm">
        LOS TRABAJOS, INSTALACIÓN Y OPERACIÓN DE LA PLAZA DE COBRO QUEDAN A ENTERA SATISFACCIÓN DEL ADMINISTRADOR DE LA PLAZA DE COBRO Y/O ENCARGADO DE TURNO.
        <span class="font-bold">NO. SINIESTRO</span> Y/O <span class="font-bold">NO. DE REPORTE 04</span> DE FECHA <span class="font-bold">13 DE JUNIO DE 2021.</span>
        </p>
        <h3 class="font-bold text-sm mt-2">COMPONENTES Y/O REFACCIONES DAÑADAS:</h3>
        <TablaEquipoMalo
        :listaComponentes="listaComponentes"
        :dateSinester="datosSinester.SinisterDate"
        ></TablaEquipoMalo>
        <p class="mb-4">Se cierra la presente acta en fecha 10 de diciembre de 2021 siendo las 18:00 horas.</p>
        <div class="w-1/2 p-2 mb-10 flex justify-center w-full">
            <button @click="dtc_validaciones(2)" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Generar anexo 1-A</span>
            </button>
          </div>
        </div>
        
       
    </div>
</template>

<script>
import HeaderGenerico from "../../components/Header/HeaderGenerico.vue";
import TablaEquipoMalo from "../../components/Anexo/TablaEquipoMaloAnexo.vue";
import moment from "moment";
import { Datetime } from 'vue-datetime';
import Multiselect from "vue-multiselect";

    export default {
    name: "Anexo1-A",
    components:{
        HeaderGenerico,
        TablaEquipoMalo,
        Datetime,
        Multiselect,
    },
     data() {
    return {
      datosSinester: {
        ReferenceNumber: "",
        SinisterNumber: "",
        ReportNumber: "",
        SinisterDate: "",
        FailureDate: "",
        FailureNumber: "",
        ShippingElaboracionDate: '',  
        Diagnosis: "",
        Observation: "",
        TypeDescriptionId: 1,
        UserId: null,
        AgremmentInfoId: null,
        Descripcion: null,
        Observaciones: null,
      },
      listaComponentes: [],
      fechaSiniestoEdit: false,
      sizeSmall: false,      
      boolCambiarPlaza: false,
      fecha_validacion: '',
      modalReferencia: false,
      arrayReference: [],
      referenceSelected: '',      
      tipoPlazaSelect: '', 
      testigos_plaza: ['C.AGUSTIN DAVID FIGUEROA SOTELO','C.JONATHAN EDMUNDO MARQUEZ MARES']    
    };
    },
    beforeMount: async function () {    
    let f = new Date()
    this.tipoPlazaSelect = 'insersion'        
    this.datosSinester.ShippingElaboracionDate = moment(f,"DD-MM-YYYY").format("YYYY-MM-DD");
    this.fecha_validacion = moment(f, "DD-MM-YYYY").add('days', 1).format("YYYY-MM-DD");  
    let value = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];
    await this.$store.dispatch("Refacciones/BUSCAR_COMPONETES", value);
    this.listaComponentes = await this.$store.state.Refacciones.listaRefacciones
    console.log(this.listaComponentes);
    await this.$store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
    this.listaDescripciones = await this.$store.state.DTC.listaDescriptions
    if (JSON.stringify(this.headerEdit) != "{}") {    
        this.tipoPlazaSelect = 'edicion'      
        this.boolCambiarPlaza = true
        this.datosSinester.ReferenceNumber = this.headerEdit.referenceNumber;
        this.datosSinester.SinisterNumber = this.headerEdit.sinisterNumber;
        this.datosSinester.ReportNumber = this.headerEdit.reportNumber;
        this.datosSinester.SinisterDate = await moment(this.headerEdit.sinisterDate).format("YYYY-MM-DD");
        this.datosSinester.FailureNumber = this.headerEdit.failureNumber;
        this.datosSinester.FailureDate = moment(this.headerEdit.failureDate).format("YYYY-MM-DD");
        this.datosSinester.ShippingElaboracionDate = moment(this.headerEdit.shippingDate).format("YYYY-MM-DD");
        this.datosSinester.TypeDescriptionId = this.headerEdit.typeDescriptionId;
        this.fechaSiniestoEdit = true;    
    }  
    }
    }
</script>
