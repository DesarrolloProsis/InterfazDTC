<template>
  <div>    
    <!-- //////////////////////////////////////////////////////////////////
    ////                    COMPONENTE HEADER                         ////
    ///////////////////////////////////////////////////////////////////// -->
    <Header
      :descripciones="descripcionHeaders"
      :datosUser="datosUser"
      :headerEdit="headerEdit"
      :observaciones="observaciones" 
      @crear-dtc="crear_dtc"     
    ></Header>
    <div class="md:border border-black" style=" margin-left: 1vw; margin-right: 1vw; margin-bottom: 2vw">
      <div class="mt-8 mx-4 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
    <!-- //////////////////////////////////////////////////////////////////
    ////                      FILA NUMERO 1                            ////
    /////////////////////////////////////////////////////////////////////// -->
        <div class="border border-gray-300 shadow-md rounded-lg font-titulo">
          <p class="text-align: justify;">
            <span style="font-weight: bold">Tiempo de entrega:</span>
            <br />
            <span style="font-weight: bold">Vigencia de la Cotización:</span> 15
            días calendario, a partir de la fecha del presente.
            <br />
            <span style="font-weight: bold">Forma de Pago:</span> 100% al
            término de los trabajos.
            <br />
            <span style="font-weight: bold">Precios en M.N:</span> No incluyen
            IVA, el cual se cargara al momento de facturarse. En caso de una
            variación de la paridad Peso/Dólar mayor al 5%, se revisarán los
            precios.
            <br />
            <span style="font-weight: bold">Precios en USD:</span>
            No incluyen IVA, el cual se cargará al momentode facturarse.
          </p>
        </div>
        <div></div>
    <!-- //////////////////////////////////////////////////////////////////
    ////                        OBSERVACIONES                         ////
    ///////////////////////////////////////////////////////////////////// -->
      <ValidationObserver ref="observer"> 
        <div class="items-center font-titulo">
          <ValidationProvider name="Observaciones2" rules="max:300"  v-slot="{ errors }">
            <p class="text-center"><span class="text-center font-bold text-xl text-gray-800">Observaciones</span></p>
            <textarea v-model="observaciones" value="NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL." class="rounded-lg py-4 mb-1 h-40 w-full textAreaCalendario placeholder-gray-500 ph-center-observaciones text-center" 
                      placeholder="NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL." name="Observaciones" :maxlength="limite" readonly/>
            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
            <span class="text-gray-500 ml-64 sm:ml-32">{{ restante }}/300</span>   
          </ValidationProvider>       
        </div>
      </ValidationObserver>
    <!-- //////////////////////////////////////////////////////////////////
    ////                        FILA NUMERO 2                         ////
    ///////////////////////////////////////////////////////////////////// -->
        <div class="border border-gray-300 shadow-md rounded-lg items-center font-titulo">
          <p style="text-align: center">
            <span style="font-weight: bold">Autorizacion Tecnica y Comercial:</span>
            <br />
            <br />
            <br />
            <br />
            <br />
            <span>Autorizacion comercial Director de Comercializacion</span>
            <br />
            <span style="font-size: 0.7vw">C.P. Hermilia Guzman</span>
          </p>
        </div>
        <div></div>
        <div class="border border-gray-300 shadow-md rounded-lg font-titulo">
          <p style="text-align: center">
            <br />
            <br />
            <br />
            <br />
            <span style="font-weight: bold">{{ headerSelecionado.adminName }}</span>
          </p>
          <hr />
          <p style="text-align: center">
            <span>Administrador Plaza de Cobro</span>
            <br />
            <span>{{ headerSelecionado.adminMail }}</span>
          </p>
        </div>
    <!-- //////////////////////////////////////////////////////////////////
    ////                           BOTONES                            ////
    ///////////////////////////////////////////////////////////////////// -->
        <div class="flex flex-grow content-start flex-wrap bg-gray-100 border border-gray-300 shadow-md rounded-lg sm:mb-20 mb-8 ml-" style="padding: 3vw;">
          <div class="w-1/2 p-2">
            <button @click="dtc_validaciones(1)" class="botonIconBuscar sm:-ml-2 font-boton" :class="{'BuscarDeshabilitado' :modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/save.png" class="mr-2 sm:-ml-1" width="35" height="35" />
              <span>Guardar</span>
            </button>
          </div>
          <div class="w-1/2 p-2">
            <button @click="dtc_validaciones(2)" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Crear</span>
            </button>
          </div>
        </div>
      <div v-if="modalLoading" class=" inset-0 font-titulo -mt-66 mb-8">
        <div class="rounded-lg w-66 justify-center absolute  inset-x-0 bg-white mx-auto px-12 py-10 ">          
          <div class="justify-center text-center block">            
            <img src="@/assets/img/load.gif"  class="h-48 w-48" />
            <p class="text-gray-900 font-thin text-md">Espere ... </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/CrearHeader";
import EventBus from "@/services/EventBus.js";
import ServiceReporte from '@/services/ReportesPDFService'
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  name: "CrearDTC",
  props: {
    method: { type: Function },
  },
  components: {    
    Header,
  },
  data() {
    return {
      descripcionHeaders: [],
      datosUser: {},
      observaciones: "NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL.",
      referenciaDtc: "",
      headerEdit: {},
      flagCreate: true,
      listaComponentes: "",
      dateSinester: "",      
      limite: 300,
      modalLoading: false,
      referenciaFicha: '',
      numeroComponentesDmg: 0
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
created(){
    EventBus.$on("ACTUALIZAR_HEADER", () => {      
        this.datosUser = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.descripcionHeaders = this.$store.state.DTC.listaDescriptions
    });
    EventBus.$on("enviar-componete", (objInsert) => {
      this.enviar_dmg_componentes(objInsert)
    })
    EventBus.$on("conteo_componetes_dmg", (num) => {
      this.numeroComponentesDmg = num
    })
},
beforeMount: async function() {
    let refenciaFichaTecnica = this.$route.params.referenciaFicha     
    this.referenciaFicha = refenciaFichaTecnica
    this.datosUser = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
    this.descripcionHeaders = this.$store.state.DTC.listaDescriptions
    this.flagCreate = true;
    if (JSON.stringify(this.$route.query) != "{}") {              
      this.headerEdit = this.$route.query.headerInfo;                 
      this.observaciones = this.headerEdit.observation;
      this.$store.commit("Header/REFERENCIA_DTC_MUTATION",this.headerEdit.referenceNumber);
      this.$store.commit("Header/DIAGNOSTICO_MUTATION",this.headerEdit.diagnosis);
      this.flagCreate = false;        
      this.datosUser = this.$route.query.datosDtc           
    }
},
destroyed(){
  EventBus.$off(['ACTUALIZAR_HEADER', 'enviar-componete', 'conteo_componetes_dmg'])
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
  restante(){
    return this.observaciones.length
  },
    headerSelecionado(){    
    return this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
  }
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {  
  dtc_validaciones(value){
    if(this.numeroComponentesDmg > 0)
      EventBus.$emit("validar_header_dtc", value);
    else{
      this.$notify.warning({
          title: "Ups!",
          msg: `FALTA AGREGAR COMPONENTES DAÑADOS.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
    }
  },
  crear_dtc: async function (status) {      
      this.referenciaDtc = this.$store.state.Header.referenciaDtc          
      let header =   this.$store.getters["Header/GET_HEADER_SELECCIONADO"];  
      let adminId = this.$store.state.Login.plazaSelecionada.administradorId 
      let referenceFicha = this.referenciaFicha
      let tipoFalla = this.$route.params.tipoFalla      
      //Inserta Header
      await this.$store.dispatch("Header/CREAR_HEADER_DTC", {
        header: header,
        status: status,
        flag: this.flagCreate,
        openFlag: false,
        adminIdPlaza: adminId,   
        referenceFicha,
        tipoFalla    
      });
      //Valida si se inserto header
      if (this.$store.getters["Header/getInsertHeaderComplete"]) {
        this.modalLoading = true 
        if(status == 2){
          this.$notify.success({
            title: "Ok!",
            msg: `DTC CON REFERENCIA ${this.referenciaDtc} CREADO CORRECTAMENTE.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });  
        }
        else{
          if(status == 1){
            this.$notify.success({
            title: "Ok!",
            msg: `DTC CON REFERENCIA ${this.referenciaDtc} GUARDADO CORRECTAMENTE.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
              },
            });  
          }
        }
        let value_insert = { refNum: this.referenciaDtc, flagCreate: this.flagCreate, status: status, adminId: adminId };        
        await EventBus.$emit('insertar-componetes-dañados', value_insert)        
      } 
      else {
        window.scrollTo(0, top);
        this.modalLoading = false
        this.$notify.warning({
          title: "Ups!",
          msg: `NO SE CREO EL DTC, VERIFIQUE LOS DATOS`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
  enviar_dmg_componentes(objInsert){       
      this.$http.post(`${API}/requestedComponent/${objInsert.refNum.split('-')[0]}/${objInsert.flagCreate}`, objInsert.arrayDmg)
      .then(() => {                                
          if (objInsert.status == 2) {
            ServiceReporte.generar_pdf_correctivo(
              objInsert.refNum, 
              objInsert.status, 
              true,
              objInsert.adminId              
            );
            setTimeout(()=>{
              ServiceReporte.generar_pdf_fotografico_correctivo(objInsert.refNum);               
            },1000)
          }          
          this.$store.commit("DTC/LIMPIAR_LISTA_DTC_DAÑADO_MUTATION");
          this.$store.commit("DTC/insertDmgCompleteMutation", false);
          this.$store.commit("Header/insertHeaderCompleteMutation",false);
          this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
          this.$store.commit("Header/clearDatosSinesterMutation");
          this.$router.push("/Home");     
        
      })     
      .catch(() => {                
        this.$notify.warning({
          title: "Ups!",
          msg: `NO SE INSERTARON LOS COMPONENTES.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });         
      });            
  }  
},
/////////////////////////////////////////////////////////////////////
////                       OBSERVADORES                          ////
/////////////////////////////////////////////////////////////////////
watch: {
  observaciones: function (newValue) {
      this.$store.commit("Header/OBSERVACION_MUTATION", newValue);
  },
},
};
</script>



