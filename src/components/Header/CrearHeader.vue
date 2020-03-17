<template>
  
  <div class="m-0 bg-white">
      <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center">
        <div
          class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <!-- TituloyReferencia -->
          <div class="flex">
            <div class="w-1/5 h-14">
              <img src="" height="150" width="150" class="m-4" />
            </div>
            <div class="w-3/5 h-14">
              <h1 class="title">Dictamen Tecnico y Cotizacion</h1>
            </div>
            <div class="w-1/5 h-14">
              <br />
              <label class="m-16" style="font-weight: normal">Referencia:</label>
              <label style="font-weight: bold">{{data}}</label>
            </div>
          </div>

          <!-- SubTitulo -->
          <div class="flex">
            <div class="w-1/5 h-14 pt-4">
              <br />
              <label class for="inline-full-name" style="font-weight: normal">Contrato / Oferta:</label>
              <label style="font-weight: bold; padding-left: 0.5vw">{{datosUser.agrement}}</label>
            </div>
            <div class="divtitle2 h-14">
              <br />
              <h6 class="title2">En caso de Siniestro</h6>
            </div>
            <div class="w-1/5 h-14">
              <br />
              <label class for="inline-full-name" style="font-weight: normal">Tipo de Dictamen:</label>
              <label class for="inline-full-name" style="padding-left: 0.5vw">CORRECTIVO</label>
            </div>
          </div>
          <div class="divtitle2"></div>
          <hr />
          <br />

          <div class="flex items-center mb-4">
            <div class="w-1/4 h-8">
              <label class="atntn" for="inline-full-name">Atencion:</label>
              <label style="font-weight: normal; padding-left: 1.7vw">{{datosUser.managerName}}</label>
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">No. Siniestro:</label>
              <input
                v-model="datosSinester.SinisterNumber"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: 1.6vw"
                placeholder
              />
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Reporte:</label>
              <input
                v-model="datosSinester.ReportNumber"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: .6vw"
                placeholder="10301/3030099"
              />
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Tipo de Descripcion:</label>
              <select
                v-model="datosSinester.TypeDescriptionId"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                id="convenios"
                style="margin-left:1vw; width: 10vw;"
                type="text"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(desc, index) in descripciones"
                  v-bind:value="desc.value"
                  :key="index"
                >{{desc.text}}</option>
              </select>
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-14 content-center" style="align-items: center; font-size: 15px">
              <label class="atntn" for="inline-full-name">Cargo:</label>
              <label style="font-weight: normal; padding-left: 2.7vw">{{datosUser.position}}</label>
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha Siniestro:</label>
              <input
                v-model="datosSinester.SinisterDate"
                class="fecha appearance-none bg-grey-lighter text-grey-darker border border-black h-8"
                type="date"
                style="margin-left: .6vw"
              />
            </div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha de Envio:</label>
              <input
                @change="crearReferencia()"
                v-model="datosSinester.ShippingElaboracionDate"
                class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black h-8"
                type="date"
                style="margin-left: 2.9vw"
              />
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center" style="align-items: center">
              <label class="atntn" for="inline-full-name">Correo:</label>
              <label style="color: blue; padding-left: 2.5vw">{{datosUser.mail}}</label>
            </div>
            <div class="w-1/4 h-8">
              <label class="h-8" for="inline-full-name">Folio Falla:</label>
              <input
                v-model="datosSinester.FailureNumber"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: 2.6vw"
                placeholder="S/M"
              />
            </div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha Elaboracion:</label>
              <input
                v-model="datosSinester.ShippingElaboracionDate"
                class="fecha appearance-none w-40 bg-grey-lightertext-grey-darker border border-black h-8"
                type="date"
                style="margin-left: 1.7vw"
              />
            </div>
          </div>

          <!--***********************************************************-->
          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center" style="align-items: center">
              <label class="atntn" for="inline-full-name">Plaza Cobro:</label>
              <label
                class
                for="inline-full-name"
                style="padding-left: 0.2vw; font-weight: normal"
              >{{datosUser.plaza}}</label>   
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha Falla:</label>
              <input     
                v-model="datosSinester.FailureDate"           
                class="fecha appearance-none w-40 bg-grey-lightertext-grey-darker border border-black h-8"
                type="date"
                style="margin-left: 2.2vw"
              />
            </div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Tecnico Responsable:</label>    
              <label style="font-weight: normal;"> {{datosUser.nombre}} </label>       
            </div>
          </div>
          <!--***********************************************************-->
          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Coordinacion Regional: ----------</label>
            </div>
          </div>
          <!--***********************************************************-->
          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Centro de Servicio:</label>
              <label class="staticLabel" for="inline-full-name h-8" style="margin-left: 1.8vw">CDMX</label>
            </div>
          </div>
          <!--***********************************************************-->

          <div class="grid-container2 mb-8">
            <div></div>

            <div></div>

            <div></div>

            <div class="labelInput3 mb-3">
              <label class for="inline-full-name">Correo:</label>
              <label
                class="staticLabel"
                for="inline-full-name"
                style="margin-left: 1.8vw"
              >hguzman@grupo-prosis.com</label>
            </div>
            <br />
          </div>
          <br />
          <br />
        </div>
      </form>

      <!-- COMPONENTE TABLA EQUIPO DAÑANDA -->
      <TablaEquipoMalo :listaComponentes="listaComponentes"></TablaEquipoMalo>

    </div>  
</template>

<script>

import TablaEquipoMalo from '../DTC/TablaEquipoMalo'

export default {
  name: "CrearHeader", 
  props: {
      descripciones:{
        type: Array,
        default: () => []
      },
      datosUser:{

          type: Object,
          default: () => {}
      },
      descripcion: {
        type: String,
        default: ''
      },
      observaciones: {
        type: String,
        default: ''
      }
  },
  components: { 
    TablaEquipoMalo       
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
              ShippingElaboracionDate: "",
              Diagnosis: "",
              Observation: "",
              TypeDescriptionId: null,
              UserId: null,
              AgremmentInfoId: null,
              descripcion: '',
              observaciones: ''          
          },
          listaComponentes: []
    }
  },
  watch:{
      datosUser: function(newValue){

          this.datosSinester.UserId = newValue['userId']
          this.datosSinester.AgremmentInfoId = newValue['agremmentInfoId']
      },
      descripcion: function(newValue){
        this.datosSinester.descripcion = newValue
      },
      observaciones: function(newValue){
        this.datosSinester.observaciones = newValue
      }


  },
  async beforeMount(){              
    await this.$store.dispatch("Refacciones/buscarComponentes")
    this.listaComponentes = await this.$store.getters["Refacciones/getListaRefacciones"]
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 2vw;
  border: 2px solid black;
}

.divtitle {
  margin: 0 auto;
}

.divtitle2 {
  margin: 0 auto;
}

.title2 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20%;
  margin-top: 30%;
  font-size: 1.2vw;
  border: 2px solid black;
}

.imgRefNum {
  display: grid;
  grid-template-columns: 20% 80%;
}

.input {
  text-align: end;
  padding-top: 5vh;
}

.fecha {
  width: 12.1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
}

.grid-container3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
  padding-left: 3vw;
}

label {
  font-weight: bold;
  color: black;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}

.grid-container2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -4vh;
  overflow: hidden;
}

.staticLabel {
  font-weight: normal;
}

.lastContainer {
  display: flex;
  flex-direction: row;
}

.divDescription {
  display: inline-block;
  padding-left: 2vw;
  width: 10vw;
}

.divLastTable {
  display: inline-block;
  padding-bottom: 1vh;
}

.inputDesc {
  height: 10vh;
  width: 18vw;
}

.divLastTable {
  border-spacing: 10px;
  border-collapse: separate;
  display: inline-block;
}

.relleno {
  display: inline-block;
}

@media (max-width: 750px) {
  .grid-container {
    margin-bottom: 0;
  }
  .grid-container2 {
    margin-bottom: 0;
  }
}
</style>
