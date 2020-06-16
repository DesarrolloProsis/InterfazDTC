<template>
  <div>
    <Nav></Nav>
    <Header
      :descripciones="descripcionHeaders"
      :datosUser="datosUser"
      :observaciones="observaciones"
      :descripcion="descripcion"
    ></Header>    
    <div
      class="md:border border-black"
      style="margin-left: 1vw; margin-right: 1vw; margin-bottom: 2vw"
    >
      <div class="flex" style="padding: 2vw">
        <div class="w-1/3 h-56 border border-black">
          <p>
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
        <div class="w-1/3"></div>
        <div class="w-1/3 items-center">
          <span style="font-weight: bold">Observaciones</span>
          <br />
          <textarea
            v-model="observaciones"
            v-validate="'max:120'"
            class="appearance-none block bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0 h-40"            
            style="width: 23vw;"
            name="Observaciones"
          />
          <p class="text-red-600 text-xs">{{ errors.first('Observaciones') }}</p>
        </div>
      </div>

      <div>
        <div class="flex" style="padding: 2vw">
          <div class="w-1/3 border border-black items-center">
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
          <div class="w-1/3"></div>
          <div class="w-1/3 border border-black">
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
        </div>
      </div>

      <div class="mt-6 mb-6 md:mb-0 " style="padding: 3vw;">
      
        <button @click="crearDTCTecnico(1)" class=" hidden bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-blue-700">
            <img src="../assets/img/save.png" class="mr-2" width="50" height="50">
            <span>Guardar</span>
        </button>    
         <button @click="crearDTCTecnico(2)" class="bg-gray-300 ml-5 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded inline-flex items-center border border-blue-700">
            <img src="../assets/img/add.png" class="mr-2" width="50" height="50">
            <span>Crear</span>
        </button>   
      </div>
      </div>      
  </div>
</template>

<script>
import Nav from "../components/Navbar";
import Header from "../components/Header/CrearHeader";
import saveAs from "file-saver";

export default {
  name: "CrearDTC",
  props: {
    method: { type: Function }
  },
  components: {
    Nav,
    Header
  },
  data() {
    return {
      descripcionHeaders: [],
      datosUser: {},
      descripcion: "",
      observaciones: "",
      refNum: ""
    };
  },
  mounted() {},
  created() {
    this.datosUser = this.$store.getters["Header/getHeaders"];
    this.descripcionHeaders = this.$store.getters["DTC/getListaDescriptions"];
    this.refNum = this.$store.getters["Header/getreferenceNum"];
  },
  methods: {
    crearDTCTecnico: async function(status) {      
              
        this.refNum = this.$store.getters["Header/getreferenceNum"];
        await this.$store.dispatch("Header/crearHeaders",{ datosUser: this.datosUser, status: status});
        let insertHeader = this.$store.getters[
          "Header/getInsertHeaderComplete"
        ];        
        if (insertHeader) {

          this.$notify.success({
            title: "Ok!",
            msg: `EL HEDER CON LA REFERENCIA ${this.refNum} SE INSERTO CORRECTAMENTE.`,
            position: "bottom right",
            styles: {              
              height: 100,
              width: 500
            }
          })

          await this.$store.dispatch("DTC/crearDmg", this.refNum);
          let insertDmg = this.$store.getters["DTC/getInsertDmgComplete"];          
          if (insertDmg) {

            this.$notify.success({
              title: "Ok!",
              msg: `LOS COMPONENTES SE INSERTARON CORRECTAMENTE.`,
              position: "bottom right",
              styles: {              
                height: 100,
                width: 500
              }
            })
            
            if(status == 2){
              var oReq = new XMLHttpRequest();
              // The Endpoint of your server
              let urlTopdf = `http://prosisdev.sytes.net:88/api/pdf/${this.refNum}`;
              let namePdf = `ReportDTC-${this.refNum}.pdf`;
              // Configure XMLHttpRequest
              oReq.open("GET", urlTopdf, true);
              // Important to use the blob response type
              oReq.responseType = "blob";
              // When the file request finishes
              // Is up to you, the configuration for error events etc.
              oReq.onload = function() {
                // Once the file is downloaded, open a new window with the PDF
                // Remember to allow the POP-UPS in your browser
                var file = new Blob([oReq.response], {
                  type: "application/pdf"
                });
                // Generate file download directly in the browser !
                saveAs(file, namePdf);
              };
  
              oReq.send();

              this.$notify.success({
                title: "Ok!",
                msg: `CREANDO EL REPORTE ${this.refNum}.`,
                position: "bottom right",
                styles: {              
                  height: 100,
                  width: 500
                }
              })

            } 
  

            
            await this.$store.commit('DTC/listaDmgClearMutation')
            await this.$store.commit("DTC/insertDmgCompleteMutation", false);
            await this.$store.commit("Header/insertHeaderCompleteMutation", false);
            await this.$store.dispatch("Header/buscarListaUnique");
            await this.$store.commit("Header/clearDatosSinesterMutation");

            this.$router.push("Home");
          }
          else{

            this.$notify.error({
              title: "Ups!",
              msg: `NO SE INSERTARON LOS COMPONENTES.`,
              position: "bottom right",
              styles: {              
                height: 100,
                width: 500
              }
            })

          }
        }
        else{
            
          this.$notify.error({
            title: "Ups!",
            msg: `NO SE INSERTO EL HEDER CON LA REFERENCIA ${this.refNum}.`,
            position: "bottom right",
            styles: {              
              height: 100,
              width: 500
            }
          })          
        }
    }
  },
  computed: {
  

  }
};
</script>
