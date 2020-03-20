<template>
  <div>
    <Nav></Nav>
    <Header
      :descripciones="descripcionHeaders"
      :datosUser="datosUser"
      :observaciones="observaciones"
      :descripcion="descripcion"
    ></Header>
    <br />
    <div
      class="md:border border-black"
      style="margin-left: 1vw; margin-right: 1vw; margin-bottom: 2vw"
    >
      <div>
        <div class="flex mb-4" style="padding: 2vw">
          <div class="w-1/4 h-56 border border-black">
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

          <div class="w-1/4 h-12"></div>
          <div class="w-1/4 h-48">
            <span style="font-weight: bold">Observaciones</span>
            <br />
            <textarea
              v-model="observaciones"
              class="appearance-none block bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0 h-40"
              style="width: 23vw;"
              id="grid-last-name"
            />
          </div>
          <div class="w-1/4 h-12"></div>
        </div>
      </div>

      <br />
      <div>
        <div class="flex mb-4" style="padding: 2vw">
          <div class="w-1/4 h-40 border border-black items-center">
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
          <div class="w-1/4 h-12"></div>
          <div class="w-1/4 h-12"></div>
          <div class="w-1/4 h-40 border border-black">
            <p style="text-align: center">
              <br />
              <br />
              <br />
              <br />
              <span style="font-weight: bold">Jose Juan Iturbide Espin</span>
            </p>
            <hr />
            <p style="text-align: center">
              <span>Administrador Plaza de Cobro</span>
              <br />
              <span>c102adm@capufe.gob.mx</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6" style="width:20vw; border: black">
      <div class="mt-6 mb-6 md:mb-0" style="padding: 3vw;">
        <button
          @click="crearDTCTecnico()"
          disabled="validaHeader()"
          class="text-grey-lighter py-3 md:py-8 w-full md:w-64 font-bold rounded text-xs bg-green-400 hover:bg-green-500"
        >Crear</button>
        <multiselect></multiselect>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navbar";
import Header from "../components/Header/CrearHeader";
// import DTC from "../components/DTC/TablaEquipoMalo";

export default {
  name: "CrearDTC",
  components: {
    Nav,
    Header
  },
  data() {
    return {
      descripcionHeaders: [],
      datosUser: {},
      descripcion: "",
      observaciones: ""
    };
  },
  beforeMount() {
    this.$store.dispatch("DTC/buscarDescriptions");
    this.datosUser = this.$store.getters["Header/getHeaders"];
    this.descripcionHeaders = this.$store.getters["DTC/getListaDescriptions"];
  },
  methods: {
    crearDTCTecnico: async function() {
      console.log(this.datosUser);
      await this.$store.dispatch("Header/crearHeaders", this.datosUser);
      console.log(this.listaDmg);
      await this.$store.dispatch("DTC/crearDmg");
      await this.$store.commit("DTC/listaDmgClearMutation");
      this.$router.push("Home");
    }
  },
  computed: {
    validaHeader: function() {
      return false;
    }
  }
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
