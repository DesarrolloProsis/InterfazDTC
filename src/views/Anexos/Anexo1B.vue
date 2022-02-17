<template>

    <div class="container mx-auto">
        <HeaderGenerico :titulo="'ACTA ADMINISTRATIVA INFORMATIVA (ENTREGA-RECEPCIÓN)'" :subtitulo="'FORMATO 1-B'" :tipo="'anexo1A'" />
        <div class="mt-1 mb-1 text-sm flex flex-col leading-7 sm:block sm:p-1 sm:pr-2 sm:text-xs border sm:m-1 shadow-md md:w-auto text-justify p-6">
        <p class="">SE LEVANTA LA PRESENTE ACTA,
        PARA HACER CONSTAR LA SUSTITUCIÓN DE COMPONENTES <label class="font-bold">POR FÍN DE VIDA ÚTIL/REUBICACIÓN/ACONDICIONAMIENTO, </label> 
        </p>
        <p>
        REALIZADO AL EQUIPO DE CONTROL DE TRANSITO DE <label class="font-bold">CARRIL A09</label>, 
        EN LA PLAZA DE COBRO <label class="font-bold"> No. 103, PALO BLANCO,</label>
        PERTENECIENTE A LA COORDINACION REGIONAL<label class="font-bold">CUERNAVACA.</label>
        </p>
        <p>
        EN LA CIUDAD DE <label class="font-bold ml-1">PALO BLANCO, GUERRERO</label>, SIENDO 
        <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio" input-class="inputanexo"></datetime>
        EL <label class="font-bold">C. CARLOS JANE LOUI PULIDO MEJIA</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> C.OMAR SÁNCHEZ MORELOS</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
        <div class="flex w-full gap-4 p-2">
             <multiselect
                :disabled="blockInput"
                v-model="testigo1"  
                :custom-label="label_multi_select"                                                  
                :close-on-select="false"
                :clear-on-select="true"
                :hideSelected="false"                               
                placeholder="Selecciona un testigo"
                :options="testigos_plaza"
                select-label=""
                class="w-full"                 
                >
        </multiselect>
        <multiselect
                :disabled="blockInput"
                v-model="testigo2"  
                :custom-label="label_multi_select"                                                  
                :close-on-select="false"
                :clear-on-select="true"
                :hideSelected="false"
                placeholder="Selecciona un testigo"
                :options="testigos_plaza"
                select-label=""
                class="w-full"                 
                >
        </multiselect>
        </div>
        <p class="">
        PARA HACER CONSTAR QUE LA SUSTITUCIÓN DE COMPONENTES DEL EQUIPO DEL<span class="font-bold">CARRIL A02, CARRIL A07</span>,
        DE ACUERDO A LA SOLICITUD <input type="text" placeholder="URC-SOC.2314-2021" class="inputanexo">, 
        DE FECHA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime> FUE REPARADA
        EL DÍA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime>, Y AUTORIZADA EN OFICIO <input type="text" placeholder="DO/3741/2021" class="inputanexo">
        DE FECHA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime> POR LA GERENCIA DE MANTENIMIENTO Y MODERNIZACIÓN DE EQUIPOS DE PEAJE; PARA CUYO EFECTÓ FUÉ NECESARIO REPONER EN FECHA
        <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime> LAS PARTES QUE A CONTINUACIÓN SE DETALLAN.
        </p>
        <p class="text-sm">
        LOS EQUIPOS/COMPONENTES DAÑADOS EL ADMINISTRADOR DEBERÁ IDENTIFICAR Y EMBALAR, ENVIANDOLOS EN UN PERÍODO DE 5 DÍAS MÁXIMO AL ÁLMACÉN DE LA 
        COORDINACION REGIONAL POR OFICIO, PARA SU DESTINO FINAL CONFORME LA NORMA CAPUFE
        </p>
        <p class="text-sm">
        LOS TRABAJOS, INSTALACIÓN Y OPERACIÓN DE LA PLAZA DE COBRO QUEDAN A ENTERA SATISFACCIÓN DEL ADMINISTRADOR DE LA PLAZA DE COBRO Y/O ENCARGADO DE TURNO.
        </p>
        <h3 class="font-bold text-sm mt-2">COMPONENTES Y/O REFACCIONES DAÑADAS:</h3>
        <TablaEquipoMalo
        :listaComponentes="listaComponentes"
        :dateSinester="datosSinester.SinisterDate"
        ></TablaEquipoMalo>
        <p class="mb-4">SE CIERRA LA PRESENTE ACTA EN FECHA <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio" input-class="inputanexo"></datetime></p>
        <p class="mb-2">ENCARGADO DE PLAZA: 
          <select class="">
          <option value="">Selecciona un encargado de plaza</option>
          <option value="">Carlos</option>
          <option value="">Daniel</option>
          </select>
        </p>
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full">
            <button @click="dtc_validaciones(2)" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Generar anexo 1-B</span>
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
      testigo1: '',
      testigo2: '',
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
