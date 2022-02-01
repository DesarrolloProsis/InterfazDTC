<template>

    <div class="container mx-auto">
        <HeaderGenerico :titulo="'ACTA ADMINISTRATIVA INFORMATIVA (ENTREGA-RECEPCIÓN)'" :subtitulo="'FORMATO 1-A'" :tipo="'anexo1A'" />
        <div class="mt-1 mb-1 flex flex-col sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md md:w-auto text-justify p-6">
        <p>SE LEVANTA LA PRESENTE ACTA,
        PARA HACER CONSTAR EL SERVICIO DE MANTENIMIENTO CORRECTIVO (SINIESTRO, ACCIDENTE VEHICULAR, DESCARGA ELÉCTRICA, ETC.) 
        REALIZADO AL EQUIPO DE CONTROL DE TRANSITO DE CARRIL A09, 
        EN LA PLAZA DE COBRO No. 103, PALO BLANCO,
        PERTENECIENTE A LA UNIDAD REGIONAL CUERNAVACA.
        </p>
        <p>
        EN LA CIUDAD DE PALO BLANCO, GUERRERO, SIENDO LAS 16:30 HRS. DEL DÍA 10 DE DICIEMBRE DE 2021, EL LIC. JESÚS GERMAIN GONZÁLEZ MORALES, ADMINISTRADOR DE LA PLAZA DE COBRO, EL C. JHOVANY MOHAMED ISAURO GARCIA,
        TÉCNICO REPRESENTANTE DE LA EMPRESA PRESTADORA DE SERVICIOS PROYECTOS Y SISTEMAS INFORMÁTICOS S.A. DE C.V. Y LOS C. FRANCISCO VALENTE MIRANDA Y C. JUAN SANTOS JIMENEZ, 
        TESTIGOS DE ASISTENCIA, PARA HACER CONSTAR QUE LA FALLA DEL EQUIPO DE CARRIL B06, REPORTADA CON No. DE ACUSE/FOLIO 266, DE FECHA 18 DE JUNIO DE 2021;
        FUE REPARADA EL DÍA 10 DE DICIEMBRE DE 2021, DICHA FALLA CONSISTIÓ EN EL DAÑO A MONITOR TOUCH, Y FUE PROVOCADA POR VANDALISMO, OCURRIDO EL 18 DE JUNIO DE 2021;
        PARA CUYO EFECTO FUE NECESARIO REPONER LAS PARTES QUE A CONTINUACIÓN SE DETALLAN. 
        </p>
        <p>
        LOS EQUIPOS/COMPONENTES DAÑADOS QUEDAN BAJO RESGUARDO DEL ADMINISTRADOR DEBIÉNDOSE IDENTIFICAR CON EL No. SINIESTRO Y FECHA;
        ESPERAR AVISO DE LA GERENCIA DE SEGUROS A QUE LA ASEGURADORA EMITA EL CHEQUE (REEMBOLSO) QUEDANDO LOS EQUIPOS Y COMPONENTES A DISPOSICIÓN DE LA ASEGURADORA DE NO RECOGERLOS EN UN PLAZO DE 30 DÍAS, 
        LA SUBGERENCIA DE ALMACENES E INVENTARIOS INSTRUIRÁ EL DESTINO FINAL CONFORME LA NORMA
        </p>
        <p>
        LOS TRABAJOS, INSTALACIÓN Y OPERACIÓN DE LA PLAZA DE COBRO QUEDAN A ENTERA SATISFACCIÓN DEL ADMINISTRADOR DE LA PLAZA DE COBRO Y/O ENCARGADO DE TURNO.
        </p>
        <h3>COMPONENTES Y/O REFACCIONES DAÑADAS:</h3>
        <TablaEquipoMalo
        :listaComponentes="listaComponentes"
        :dateSinester="datosSinester.SinisterDate"
        ></TablaEquipoMalo>
        <p class="mb-4">Se cierra la presente acta en fecha 10 de diciembre de 2021 siendo las 18:00 horas.</p>
        <div class="p-4 mb-20">
            <h3 class="txt-black text-xl">TESTIGOS</h3>
            <select name="select">
                <option value="value1">Value 1</option>
                <option value="value2" selected>Value 2</option>
                <option value="value3">Value 3</option>
            </select>
            <select name="select">
                <option value="value1">Value 1</option>
                <option value="value2" selected>Value 2</option>
                <option value="value3">Value 3</option>
            </select>
        </div>
        <div class="w-1/2 p-2 mb-10">
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

    export default {
    name: "Anexo1-A",
    components:{
        HeaderGenerico,
        TablaEquipoMalo,
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
