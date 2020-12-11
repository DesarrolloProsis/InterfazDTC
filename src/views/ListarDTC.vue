  <template>
  <div>
    <Nav></Nav>
    <div class="relative">
    <!--/////////////////////////////////////////////////////////////////
        ////                        FILTROS                              ////
        ////////////////////////////////////////////////////////////////////-->
      <div :class="{ 'pointer-events-none': modal }" class="flex justify-center mt-2">      
        <div class="border-2 px-16 shadow-lg z-10 justify-center sm:w-66">
          <div class="flex sm:inline-block">
            <div class="m-3" v-if="tipoUsuario == 2">
              <p class="font-bold sm:text-sm mb-5">Selecciones el Tramo</p>
                <select class="w-full" type="text"                    >
                  <option disabled value="">Selecionar...</option>                  
                </select>
            </div>
            <div class="m-3">
              <p class="font-bold sm:text-sm mb-5">Selecciones la Plaza</p>
                <select class="w-full" type="text"                    >
                  <option disabled value="">Selecionar...</option>                  
                </select>
            </div>          
            <div class="m-3">
              <p class="font-bold mb-5 sm:text-sm">Seleccione una fecha</p>
              <input                
                :disabled="validaReferencia"
                v-model="fechaFiltro"
                class="border w-40"
                type="date"
              />
            </div>
            <div class="m-3">
              <p class="font-bold sm:text-sm mb-5">Escriba la Referencia</p>
              <input                
                v-model="referenciaFiltro"
                :disabled="validaFecha"
                class="border w-40"
                placeholder="PM-000000"
              />
            </div>            
            <div class="m-3">
              <p class="font-bold mb-3 sm:text-sm">Status DTC</p>
              <div class="sm:inline-flex">
                <div class="flex">
                  <input v-model="tipoStatusConcluido" id="concluido" name="concluido" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="concluido" class="ml-2 block text-sm text-gray-900">Concluidos</label>
                </div>   
                <div class="flex sm:ml-5">
                  <input v-model="tipoStatusInconcluso" id="inconcluso" name="inconcluso" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="inconcluso" class="ml-2 block text-sm text-gray-900">Inconcluso</label>
                </div>   
              </div>                          
            </div>
          </div>
          <div class="m-3 text-center">
            <button
              @click.prevent="limpiar_filtros"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-center border border-red-700 m-1"
            >
              <img
                src="../assets/img/bin.png"
                class="mr-2"
                width="25"
                height="2"
              />
              <span>Limpiar</span>
            </button>
            <button
              @click.prevent="filtro_Dtc"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-center border border-blue-700 m-1"
            >
              <img
                src="../assets/img/lupa.png"
                class="mr-2"
                width="25"
                height="2"
              />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////
      ////                      MODAL ELIMINAR                         ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="flex absolute justify-center inset-x-0">
        <div v-if="modal" class="rounded-lg border border-gray-700 bg-white px-12 py-10 shadow-2xl">
          <p class="text-gray-900 font-thin text-md">Seguro que quiere eliminar este DTC {{ refNum }}</p>
          <div class="justify-center flex mt-5">
            <button @click="borrar(true)" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
            <button @click="(modal = false), (refNum = '')" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////
      ////                      TARJETAS DE DTC                        ////
      ////////////////////////////////////////////////////////////////////-->
      <div :class="{ 'pointer-events-none': modal }" class="flex justify-center w-full">
        <div class="flex-no-wrap grid grid-cols-3 gap-4 sm:grid-cols-1">
          <div class="shadow-2xl inline-block focus m-4 p-3 sm:m-6" v-for="(dtc, index) in lista_dtc" :key="index">
            <CardListDTC
              @borrar-card="confimaBorrar"
              :infoCard="dtc"              
            ></CardListDTC>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navbar";
import moment from "moment";
import CardListDTC from "../components/DTC/CardListaDTC.vue";
export default {
  data() {
    return {
      infoDTC: [],
      fechaFiltro: "",
      referenciaFiltro: "",
      modal: false,
      refNum: "",
      tipoStatusConcluido: false,
      tipoStatusInconcluso: false,
      tipoUsuario: ''
    };
  },
  components: {
    Nav,
    CardListDTC,
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];  
  this.tipoUsuario = this.$store.getters['Login/getTypeUser'];
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  borrar: function (value) {
      console.log(value)
      if (value) {
        this.modal = false;
        this.$store.dispatch("DTC/BORRAR_DTC", this.refNum);
        (this.menosMas = true),
          (this.showmenosMas = false),
          this.$notify.default({
            title: "Ok!",
            msg: `EL DTC CON LA REFERENCIA ${this.refNum} SE ELIMINO CORRECTAMENTE.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
      }
      this.refNum = "";
  },
  confimaBorrar: function (refNum) {
      this.refNum = refNum;
      this.modal = true;
  },
  limpiar_filtros() {
      this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];
      this.fechaFiltro = " ";
      this.referenciaFiltro = " ";
      this.tipoStatusConcluido = false;
      this.tipoStatusInconcluso = false
  },
  sinFiltro: function () {
      if (this.fechaFiltro == "" && this.referenciaFiltro == "") {
        this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];
      }
  },
  filtro_Dtc: function () {
    this.infoDTC  = []
    let _lista_completa  = this.$store.getters["DTC/getlistaInfoDTC"]; 
    if (this.fechaFiltro != "") {        
      let formatFecha = moment(this.fechaFiltro).format("DD/MM/YYYY");
      let newArray = [];
      for (let item of _lista_completa) {
        if (moment(item.elaborationDate).format("DD/MM/YYYY") == formatFecha) {
          newArray.push(item);
        }
      }        
      this.filtro_status(newArray)        
    } else if (this.referenciaFiltro != "") {        
      let newArray = [];
      for (let item of _lista_completa) {          
        if (item.referenceNumber.includes(this.referenciaFiltro.toUpperCase())) {
          newArray.push(item);
        }
      }
      this.filtro_status(newArray)        
    } 
    else {          
        this.filtro_status(_lista_completa) 
    }
  },
  filtro_status(lista){
    if(this.tipoStatusConcluido){            
        if(this.tipoStatusInconcluso){        
          this.$nextTick().then(() => {      
            this.infoDTC = lista            
          })  
        }
        else{    
          this.$nextTick().then(() => {             
            this.infoDTC = lista.filter(item => item.statusId == 2)    
          })                                                   
        }
    } 
    else {          
        if(this.tipoStatusInconcluso == false){  
          this.$nextTick().then(() => {             
            this.infoDTC = lista        
          })    
        }
        else{         
          this.$nextTick().then(() => {      
            this.infoDTC = lista.filter(item => item.statusId == 1)  
          })                        
        }
    }
  }
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADOS                         ////
/////////////////////////////////////////////////////////////////////
computed: {
  validaFecha: function () {
      if (this.fechaFiltro != "") return true;
      else return false;
  },
  validaReferencia: function () {
      if (this.referenciaFiltro != "") return true;
      else return false;
  },
  lista_dtc(){
    return this.infoDTC
  }
},

};
</script>

<style>
