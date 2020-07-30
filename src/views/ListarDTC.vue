  <template>
  <div>
    <Nav></Nav>    
    <div class=" relative">
      <div :class="{ 'pointer-events-none': modal }"  class="flex justify-center mt-2">
        <div class="border-2 px-16 shadow-lg z-10">          
          <div class="flex sm:inline-block">
            <div class="m-3">
              <p class="font-bold mb-3 sm:text-sm">Seleccione una fecha</p>
              <input @change="sinFiltro" :disabled="validaReferencia" v-model="fechaFiltro" class="border w-48" type="date" />
            </div>
            <div class="m-3">
              <p class="font-bold mb-3 sm:text-sm">Escriba la Referencia</p>
              <input
                @change="sinFiltro"
                v-model="referenciaFiltro"
                :disabled="validaFecha"
                class="border w-48"
                placeholder="PM-000000"
              />
            </div>          
          </div>  
            <div class="m-3 text-center">
              <button
                @click.prevent="filtro_Dtc"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-center border border-blue-700"
              >
                <img src="../assets/img/filter.png" class="mr-2" width="25" height="2" />
                <span>Filtrar</span>
              </button>
            </div>    
        </div>
      </div>

      <div class="flex absolute justify-center inset-x-0">
        <div v-if="modal" class="rounded-lg border border-gray-700 bg-white px-12 py-10 shadow-2xl">   
          <p class=" text-gray-900 font-thin text-md">Seguro que quiere eliminar este DTC  {{ refNum }}</p>     
          <div class=" justify-center flex mt-5">         
            <button @click="borrar" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
            <button @click="modal = false, refNum = ''" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
          </div>
        </div>
      </div>

      <div :class="{ 'pointer-events-none': modal }"  class="flex w-full">
         <div class="mx-auto p-1">
          <div          
            class="shadow-2xl inline-block focus m-4 p-3 sm:m-6"
            v-for="(dtc, index) in infoDTC"
            :key="index"
          >        
            <CardListDTC  @borrar-card="confimaBorrar" :infoCard="dtc"></CardListDTC>        
          </div>
        </div>
      </div>
       
      <!-- <div :class="{ 'pointer-events-none': modal }"  class="flex justify-center" v-if="numCard">
        <div class="grid grid-cols-3" >
          <div          
            class="shadow-2xl inline-block m-5 p-5"
            v-for="(dtc, index) in infoDTC"
            :key="index"
          >
            <CardListDTC @borrar-card="confimaBorrar" :infoCard="dtc"></CardListDTC>
          </div>
        </div>     
      </div>

      <div :class="{ 'pointer-events-none': modal }"  class="flex w-full" v-else>
         <div class="mx-auto">
          <div          
            class="shadow-2xl inline-block"
            v-for="(dtc, index) in infoDTC"
            :key="index"
          >        
            <CardListDTC  @borrar-card="confimaBorrar" :infoCard="dtc"></CardListDTC>        
          </div>
        </div>
      </div> -->

                          
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
      numCard: true,
      modal: false,
      refNum: ''
    };
  },
  components: {
    Nav,
    CardListDTC
  },
  beforeMount: function() {
    this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];    
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
  watch: {
    
      infoDTC: function(newValue){
          this.numCard = newValue.length > 2 ? true : false
      }
  },
  methods: {

    borrar: function(){

        this.modal = false
        this.$store.dispatch('DTC/BORRAR_DTC', this.refNum)     
        this.menosMas = true,
        this.showmenosMas =  false,   
        this.$notify.default({
          title: "Ok!",
          msg: `EL DTC CON LA REFERENCIA ${this.refNum} SE ELIMINO CORRECTAMENTE.`,
          position: "bottom right",
          styles: {              
            height: 100,
            width: 500
          }
        })

        this.refNum = ''

    },
    confimaBorrar: function(refNum){

        this.refNum = refNum
        this.modal = true;     

    },
    sinFiltro: function(){

        if(this.fechaFiltro == ''  && this.referenciaFiltro == ''){
           this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];           
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
        this.infoDTC = newArray;
      } else {
        let dtc = this.$store.getters["DTC/getlistaInfoDTC"];        
        this.infoDTC = dtc;
      }
    }
  }
};
</script>

<style>
