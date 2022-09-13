<template>
  <div>    
    <!-- //////////////////////////////////////////////////////////////////
    ////                    COMPONENTE HEADER                         ////
    ///////////////////////////////////////////////////////////////////// -->
    <Header :descripciones="descripcionHeaders" :datosUser="datosUser" :headerEdit="headerEdit" :observaciones="observaciones" @crear-dtc="crear_dtc"></Header>
      
    
    
    <!--Div Principal-->
      <div class="md:border border-black" style=" margin-left: 1vw; margin-right: 1vw; margin-bottom: 4vw">
        <div class="mt-8 mx-35 gap-4">
          
          <!--Primer Div-->
          <div class="flex justify-between">
            <div class="border border-gray-300 shadow-md rounded-lg font-titulo w-1/3">
              <p class="text-align: justify; p-4">
              <span class="">Costo unitario del componente con base en <b>ANEXO 16. "PRECIOS UNITARIOS REFACCIONAMIENTO Y MANTENIMIENTO CORRECTIVO".</b>"</span> 
              <br /><br />
              <span>El importe a considerar será sin el Impuesto al Valor Agregado.</span>
              <br /><br />
              <span>Los precios unitarios de las refacciones y servicios de mantenimiento correctivo son en <b>PESOS MEXICANOS.</b></span>
              <br /><br />
              <span>Los componentes relacionados en este formato son los <b>MÍNIMOS</b> requeridos.</span>
              <br /><br />
              <span>Vigencia de la Oferta: <b>90 días</b> naturales a partir de la presentacion de la misma.</span>
              </p>
            </div>
          
          </div>
          <!--Segundo Div-->
          <div class="flex justify-between my-6">
            <div class="border border-gray-300 shadow-md rounded-lg items-center font-titulo p-10 w-1/3">
              <p style="text-align: center">
                <span style="font-weight: bold">Autorizacion Tecnica y Comercial:</span>
                <br /><br /><br /><br /><br />
                <span>Autorización Comercial Director Comercial</span>
                <br />
                <span style="font-size: 0.7vw">C.P Hermilia Guzman Añorve</span>
              </p>
            </div>
            <div class="border border-gray-300 shadow-md rounded-lg font-titulo w-1/3">
              <p style="text-align: center">
                <br /><br /><br /><br />
                <span style="font-weight: bold">{{ headerSelecionado.adminName }}</span>
                </p>
                <hr />
                <p style="text-align: center">
                <span>Administrador Plaza de Cobro</span>
                <br />
                <span>{{ headerSelecionado.adminMail }}</span>
              </p>
            </div>
          </div>
          <!--Tercer Div-->
          <div class="flex justify-center shadow-md rounded-lg sm:mb-20 mb-8 p-2">
            <div class="w-1/2 p-2 flex justify-center">
              <button @click="dtc_validaciones(1)" class="botonIconBuscar" :class="{'BuscarDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
                <!-- <img src="@/assets/img/save.png" class="mr-2 sm:-ml-1" width="35" height="35" /> -->
                <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-2 text-blue-800 h-8"/>
                <span>Guardar</span>
              </button>
            </div>
            <div class="w-1/2 p-2 flex justify-center">
              <button @click="dtc_validaciones(2)" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
                <!-- <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" /> -->
                <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="mr-2 text-green-800 h-8"/>
                <span>Crear</span>
              </button>
            </div>
          </div>

        </div>
      </div>


<!--
    <div class="md:border border-black" style=" margin-left: 1vw; margin-right: 1vw; margin-bottom: 2vw">
      <div class="mt-8 mx-4 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <!- //////////////////////////////////////////////////////////////////
        ////                      FILA NUMERO 1                            ////
        /////////////////////////////////////////////////////////////////////// -
        <div class="border border-gray-300 shadow-md rounded-lg font-titulo">
          <p class="text-align: justify; p-4">
            <span class="">Costo unitario del componente con base en <b>ANEXO 16. "PRECIOS UNITARIOS REFACCIONAMIENTO Y MANTENIMIENTO CORRECTIVO".</b>"</span> 
            <br /><br />
            <span>El importe a considerar será sin el Impuesto al Valor Agregado.</span>
            <br /><br />
            <span>Los precios unitarios de las refacciones y servicios de mantenimiento correctivo son en <b>PESOS MEXICANOS.</b></span>
            <br /><br />
            <span>Los componentes relacionados en este formato son los <b>MÍNIMOS</b> requeridos.</span>
            <br /><br />
            <span>Vigencia de la Oferta: <b>90 días</b> naturales a partir de la presentacion de la misma.</span>
          </p>
        </div>
        <div></div>
      -->
        <!--
                  ////                        OBSERVACIONES                         ////
        /////////////////////////////////////////////////////////////////////
        <ValidationObserver ref="observer"> 
          <div class="items-center font-titulo">
            <ValidationProvider class="hidden" name="Observaciones2" rules="max:300"  v-slot="{ errors }">
              <p class="text-center"><span class="text-center font-bold text-xl text-gray-800">Observaciones</span></p>
              <textarea v-model="observaciones" value="NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL." class="rounded-lg py-4 mb-1 h-40 w-full textAreaCalendario placeholder-gray-500 ph-center-observaciones text-center" 
                        placeholder="NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL." name="Observaciones" :maxlength="limite" readonly/>
              <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              <span class="text-gray-500 ml-64 sm:ml-32">{{ restante }}/300</span>   
            </ValidationProvider>       
          </div>
        </ValidationObserver>
         //////////////////////////////////////////////////////////////////
        ////                        FILA NUMERO 2                         ////
        ///////////////////////////////////////////////////////////////////// 
          <div class="border border-gray-300 shadow-md rounded-lg items-center font-titulo">
          <p style="text-align: center">
            <span style="font-weight: bold">Autorizacion Tecnica y Comercial:</span>
            <br />
            <br />
            <br />
            <br />
            <br />
            <span>Autorización Comercial Director Comercial</span>
            <br />
            <span style="font-size: 0.7vw">C.P Hermilia Guzman Añorve</span>
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
        <!- //////////////////////////////////////////////////////////////////
        ////                           BOTONES                            ////
        ///////////////////////////////////////////////////////////////////// -
        <div class="flex flex-grow content-start flex-wrap bg-gray-100 border border-gray-300 shadow-md rounded-lg sm:mb-20 mb-8 ml-" style="padding: 3vw;">
          <div class="w-1/2 p-2">
            <button @click="dtc_validaciones(1)" class="botonIconBuscar sm:-ml-2 font-boton" :class="{'BuscarDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <!- <img src="@/assets/img/save.png" class="mr-2 sm:-ml-1" width="35" height="35" /> --
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-2 text-blue-800 h-8"/>
              <span>Guardar</span>
            </button>
          </div>
          <div class="w-1/2 p-2">
            <button @click="dtc_validaciones(2)" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <-- <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" /> --
              <font-awesome-icon icon="fa-solid fa-file-circle-plus" class="mr-2 text-green-800 h-8"/>
              <span>Crear</span>
            </button>
          </div>
        </div>-->
        <!--////////////////////////////////////////////////////////////////////
        ////            MODAL NO SE PUEDE ACTUALIZAR HEADER                ////
        ////////////////////////////////////////////////////////////////////-->
        <Error :error="error" :tipo="'CrearDTC'" @cerrar="cerrar"/>
        <!--////////////////////////////////////////////////////////////////////
        ////            MODAL NO SE PUEDE ACTUALIZAR HEADER                ////
        ////////////////////////////////////////////////////////////////////-->
        <Spinner :modalLoading="modalLoading"/>
      </div>
</template>

<script>
import Header from "@/components/Header/CrearHeader";
import EventBus from "@/services/EventBus.js";
import ServiceReporte from '@/services/ReportesPDFService'
import Spinner from '../../../components/Sppiner.vue'
import Error from '../../../components/ModalError.vue'
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  name: "CrearDTC",
  props: {
    method: { type: Function },
  },
  components: {    
    Header,
    Spinner,
    Error,
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
      numeroComponentesDmg: 0,
      idDescripcion:0,
      error: false,
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
created(){
    EventBus.$on("ACTUALIZAR_HEADER", () => {      
        this.datosUser = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        /* let descripcion = this.$store.state.DTC.listaDescriptions
        console.log(this.$route.params.tipoFalla == 3);
        if (this.$route.params.tipoFalla == 3) {
          this.descripcionHeaders = descripcion.filter(tipo => tipo.id >= 3)
          console.log('if', this.descripcionHeaders);
        }else{
          this.descripcionHeaders = descripcion
          console.log('else', this.descripcionHeaders);
        } */
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
  if(this.$route.query.headerInfo != undefined)
  {
    this.modalLoading = true
    setTimeout(() => {
      this.modalLoading = false
    }, 2000);
  }
  let refenciaFichaTecnica = this.$route.params.referenciaFicha     
  this.referenciaFicha = refenciaFichaTecnica
  this.datosUser = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
  //this.descripcionHeaders = this.$store.state.DTC.listaDescriptions
  let descripcion = this.$store.state.DTC.listaDescriptions
  if (this.$route.params.tipoFalla == 3) {
    this.descripcionHeaders = descripcion.filter(tipo => tipo.id >= 3)
  }else{
    this.descripcionHeaders = descripcion.filter(tipo => tipo.id < 3)
  }
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
  EventBus.$off(['ACTUALIZAR_HEADER', 'enviar-componete', 'conteo_componetes_dmg', 'tipo-descripcion'])
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
  tipodescripcion(id){
    this.idDescripcion = id
  },
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
        window.scrollTo(0,550);
    }
  },
  cerrar(){
    this.error = false
  },
  crear_dtc: async function (status) {     
      window.scrollTo(0, top); 
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
        this.error = false
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
            styles: { height: 100, width: 500 },
            });  
          }
        }
        let value_insert = { refNum: this.referenciaDtc, flagCreate: this.flagCreate, status: status, adminId: adminId };        
        await EventBus.$emit('insertar-componetes-dañados', value_insert)        
      } 
      else {
        if((this.$store.state.Header.datosSinester.SinisterNumber.trim().length != this.$store.state.Header.datosSinester.SinisterNumber.length) || (!this.$store.state.Header.insertHeaderComplete)){
          window.scrollTo(0, top);
          this.error = true
          /*this.modalLoading = false
          this.$notify.error({
            title: "Ups!",
            msg: `NO SE CREO EL DTC, NÚMERO DE SINIESTRO REPETIDO`,
            position: "top right",
            marginY: 250,
            styles: {
              height: 100,
              width: 500,
            },
            closeOnClick: true,
            timeout: 15000,
          });  */
        }else{
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
      }
  },
  enviar_dmg_componentes(objInsert){
    /*console.log(`${API}/requestedComponent/${objInsert.refNum.split('-')[0]}/${objInsert.flagCreate}/${this.numeroComponentesDmg}/${objInsert.arrayDmg.length}`, objInsert.arrayDmg);  */
    let new_promise = new Promise((resolve, reject) => { 
    let arrayOrdenado = []
      objInsert.arrayDmg.sort(((a,b)=> a.IntPartida - b.IntPartida)).forEach(element => {
        arrayOrdenado.push(element)
      });
      if(arrayOrdenado.length == objInsert.arrayDmg.length){
        resolve(arrayOrdenado)
      }else{
        reject('Bad')
      }
    })
    new_promise.then((arrayOrdenado)=> {
      this.$http.post(`${API}/requestedComponent/${objInsert.refNum.split('-')[0]}/${objInsert.flagCreate}/${this.numeroComponentesDmg}/${arrayOrdenado.length}`, arrayOrdenado)
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
    }) 
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
<style>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>