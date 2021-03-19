<template>
  <div>
    <Nav></Nav>
    <!-- //////////////////////////////////////////////////////////////////
    ////                    COMPONENTE HEADER                         ////
    ///////////////////////////////////////////////////////////////////// -->
    <Header
      :descripciones="descripcionHeaders"
      :datosUser="datosUser"
      :headerEdit="headerEdit"
      :observaciones="observaciones"      
    ></Header>
    <div class="md:border border-black" style=" margin-left: 1vw; margin-right: 1vw; margin-bottom: 2vw">
      <div class="mt-8 mx-4 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
    <!-- //////////////////////////////////////////////////////////////////
    ////                      FILA NUMERO 1                            ////
    /////////////////////////////////////////////////////////////////////// -->
        <div class="border border-black">
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
            <span style="font-weight: bold">Precios en USCY:</span>
            No incluyen IVA, el cual se cargará al momentode facturarse.
          </p>
        </div>
        <div></div>
    <!-- //////////////////////////////////////////////////////////////////
    ////                        OBSERVACIONES                         ////
    ///////////////////////////////////////////////////////////////////// -->
        <div class="items-center">
          <p class="text-center">
            <span class="text-center font-bold text-xl text-gray-800">Observaciones</span>
          </p>
          <textarea
            v-model="observaciones"
            v-validate="'max:300'"
            :class="{ 'is_valid': !errors.first('Observaciones'), 'is_invalid': errors.first('Observaciones')}"
            class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
            placeholder="jane@example.com"
            name="Observaciones"
            v-bind:maxlength="limite"
          />
          <span class="text-gray-500">{{ restante }}/300</span>
          <p class="text-xs">{{ errors.first("Observaciones") }}</p>
        </div>
    <!-- //////////////////////////////////////////////////////////////////
    ////                        FILA NUMERO 2                         ////
    ///////////////////////////////////////////////////////////////////// -->
        <div class="border border-black items-center">
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
        <div class="border border-black">
          <p style="text-align: center">
            <br />
            <br />
            <br />
            <br />
            <span style="font-weight: bold">{{ datosUser.adminName }}</span>
          </p>
          <hr />
          <p style="text-align: center">
            <span>Administrador Plaza de Cobro</span>
            <br />
            <span>{{ datosUser.adminMail }}</span>
          </p>
        </div>
    <!-- //////////////////////////////////////////////////////////////////
    ////                           BOTONES                            ////
    ///////////////////////////////////////////////////////////////////// -->
        <div class="flex flex-grow content-start flex-wrap bg-gray-100 border border-gray-700 sm:mb-20" style="padding: 3vw;">
          <div class="w-1/2 p-2">
            <button @click="crearDTCTecnico(1)"
              class="botonIconBuscar"
            >
              <img src="../../assets/img/save.png" class="mr-2" width="35" height="35" />
              <span>Guardar</span>
            </button>
          </div>
          <div class="w-1/2 p-2">
            <button
              @click="crearDTCTecnico(2)"
              class="botonIconCrear"
            >
              <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Crear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Navbar";
import Header from "../../components/Header/CrearHeader";
import EventBus from "../../services/EventBus.js";
import Axios from 'axios'
import ServiceReporte from '../../services/ReportesPDFService'
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  name: "CrearDTC",
  props: {
    method: { type: Function },
  },
  components: {
    Nav,
    Header,
  },
  data() {
    return {
      descripcionHeaders: [],
      datosUser: {},
      observaciones: "",
      referenciaDtc: "",
      headerEdit: {},
      flagCreate: true,
      listaComponentes: "",
      dateSinester: "",      
      limite: 300
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
},
beforeMount: async function() {    
    this.datosUser = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
    this.descripcionHeaders = this.$store.state.DTC.listaDescriptions
    this.flagCreate = true;
    if (JSON.stringify(this.$route.query) != "{}") {              
      this.headerEdit = this.$route.query.headerInfo;                 
      this.observaciones = this.headerEdit.observation;
      this.$store.commit("Header/REFERENCIA_DTC_MUTATION",this.headerEdit.referenceNumber);
      this.$store.commit("Header/DIAGNOSTICO_MUTATION",this.headerEdit.diagnosis);
      this.flagCreate = false;         
      Axios.get(`${API}/dtcData/${this.$store.getters["Login/GET_REFERENCIA_ACTUAL_PLAZA"]}/${this.headerEdit.referenceNumber}`, CookiesService.obtener_bearer_token())
        .then(response => {    
          CookiesService.refrescar_bearer_token()      
          this.datosUser = response.data.result[0]
        })
        .catch(Ex => {
          console.log(Ex);
          if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
        });             
    }
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
  restante(){
    return this.observaciones.length
  }
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  crearDTCTecnico: async function (status) {
      await EventBus.$emit("validar_header");
      this.referenciaDtc = this.$store.state.Header.referenciaDtc          
      let header =   this.$store.getters["Header/GET_HEADER_SELECCIONADO"];      
      await this.$store.dispatch("Header/CREAR_HEADER_DTC", {
        header: header,
        status: status,
        flag: this.flagCreate,
        openFlag: false
      });
      let insertHeader = this.$store.getters["Header/getInsertHeaderComplete"];
      if (insertHeader) {
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
          if(status == 1)
          {
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
        let value_insert = {
          refNum: this.referenciaDtc,
          flagCreate: this.flagCreate,
        };
        await this.$store.dispatch("DTC/CREAR_LISTA_DTC_DAÑADO", value_insert);
        let insertDmg = this.$store.getters["DTC/getInsertDmgComplete"];
        if (insertDmg) {
          console.log('Los componentes se insertaron correctamente')
          if (status == 2) {
            ServiceReporte.generar_pdf_correctivo(
              this.referenciaDtc, 
              status, 
              true
            ) 
              console.log('Creado el reporte')       
          }
          await this.$store.commit("DTC/LIMPIAR_LISTA_DTC_DAÑADO_MUTATION");
          await this.$store.commit("DTC/insertDmgCompleteMutation", false);
          await this.$store.commit("Header/insertHeaderCompleteMutation",false);
          await this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
          await this.$store.commit("Header/clearDatosSinesterMutation");
          this.$router.push("Home");
        } else {
          this.$notify.warning({
            title: "Ups!",
            msg: `NO SE INSERTARON LOS COMPONENTES.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `NO SE CREO EL DTC CON LA REFERENCIA ${this.refNum}.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
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



