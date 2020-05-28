  <template>
  <div>
    <Nav></Nav>
    <div class="p-5 sm:ml-2 mt-5 items-center flex flex-col">
      <div class="flex flex-wrap border border-black flex justify-center">
        <div class="md:w-1/3 mt-3 mb-3 md:mr-24 sm:mr-0">
          <p class="font-bold mb-3">Seleccione una fecha</p>
          <input @change="sinFiltro" :disabled="validaReferencia" v-model="fechaFiltro" class="border" type="date" />
        </div>
        <div class="md:w1/3 mt-3 mb-3">
          <p class="font-bold mb-3">Escriba la Referencia</p>
          <input
            @change="sinFiltro"
            v-model="referenciaFiltro"
            :disabled="validaFecha"
            class="border"
            placeholder="PM-000000"
          />
        </div>
        <div class="md:w-1/3 mt-5 mb-3">
          <button
            @click.prevent="filtro_Dtc"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 ml-14 rounded inline-flex items-center border border-blue-700"
          >
            <img src="../assets/img/filter.png" class="mr-2" width="25" height="2" />
            <span>Filtrar</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex w-full sm:ml-24 lg:ml-32" v-if="numCard">
      <div class="grid grid-cols-3" >
        <div
          class="ml-10 shadow-2xl lg:w-1/4 rounded-lg p-4 m-3 md:m-5 bg-gray-100 inline-block"
          v-for="(dtc, index) in infoDTC"
          :key="index"
        >
          <CardListDTC :infoCard="dtc"></CardListDTC>
        </div>
      </div>     
    </div>
    <div class="flex w-full ml-4" v-else>
       <div class="mx-auto">
        <div
          class="shadow-2xl lg:max-w-2xl  rounded-lg p-4 m-3 md:m-5 bg-gray-100 inline-flex"
          v-for="(dtc, index) in infoDTC"
          :key="index"
        >
          <CardListDTC :infoCard="dtc"></CardListDTC>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import Nav from "../components/Navbar";
import CardListDTC from "../components/DTC/CardListaDTC.vue";
import moment from "moment";

export default {
  data() {
    return {
      infoDTC: [],
      fechaFiltro: "",
      referenciaFiltro: "",
      numCard: true
    };
  },
  components: {
    Nav,
    CardListDTC
  },
  beforeMount: function() {
    this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];

    this.numCard = this.infoDTC.length > 2 ? true : false
  },
  computed: {
    validaFecha: function() {
      if (this.fechaFiltro != "") return true;
      else return false;
    },

    validaReferencia: function() {
      if (this.referenciaFiltro != "") return true;
      else return false;
    }
  },
  methods: {

    sinFiltro: function(){

        if(this.fechaFiltro == ''  && this.referenciaFiltro == ''){
           this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];
           this.numCard = this.infoDTC.length > 2 ? true : false
        }
    },
    filtro_Dtc: function() {
      if (this.fechaFiltro != "") {
        let dtc = this.$store.getters["DTC/getlistaInfoDTC"];
        let formatFecha = moment(this.fechaFiltro).format("DD/MM/YYYY");

        let newArray = [];
        for (let item of dtc) {
          if (
            moment(item.elaborationDate).format("DD/MM/YYYY") == formatFecha
          ) {
            newArray.push(item);
          }
        }
        this.numCard =  newArray.length > 2 ? true : false
        this.infoDTC = newArray;
      } else if (this.referenciaFiltro != "") {
        let dtc = this.$store.getters["DTC/getlistaInfoDTC"];

        let newArray = [];
        for (let item of dtc) {
          if (this.referenciaFiltro == item.referenceNumber) {
            newArray.push(item);
          }
        }
        console.log(newArray);
        this.numCard =  newArray.length > 2 ? true : false
        this.infoDTC = newArray;
      } else {
        let dtc = this.$store.getters["DTC/getlistaInfoDTC"];
        this.numCard = dtc.length > 2 ? true : false
        this.infoDTC = dtc;
      }
    }
  }
};
</script>
