<template>
<div class=" static">
  <div class="relative">
    <Nav></Nav>
    <!--/////////////////////////////////////////////////////////////////
      ////                      MODAL ELIMINAR                         ////
      ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 z-50">
      <div v-if="modalAgreagrActividad" class="rounded-lg mt-64 justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
        <p class="text-gray-900 font-thin text-md sm:text-sm text-center">Agregar Actividad</p>
        <div>
          <div>
            <div class="mt-5">
              <select v-model="actividadSelect" class="w-full text-gray-600 h-10 border-gray-300" type="text">
                  <option disabled value="">Selecionar...</option>
                  <option v-for="(item, index) in listaActividades" :value="item.value" :key="index">{{ item.text }}</option>
                </select>
            </div>
            <div class="mt-5">
              <multiselect
                        v-model="laneSelect"                                                                       
                        :close-on-select="false"
                        :clear-on-select="true"
                        :hideSelected="false"
                        placeholder="Selecciona..."
                        :options="listaCarriles"
                        class=" shadow-md hover:border-gray-700"
                        :multiple="true"
                      >                       
                      </multiselect>
              </div>
          </div>
          <div>

          </div>
        </div>
        <div class="justify-end flex mt-5">
          <button @click="modalAgreagrActividad = false" class="text-white px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
          <button @click="modalAgreagrActividad = false" class="text-white px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
        </div>
      </div>
    </div>
    <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL ELIMINAR                         ////
        ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 z-50">
      <div v-if="modalActividades" class="rounded-lg justify-center border absolute inset-x-0 mt-40 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">        
        <div class="text-center">          
          
        <div class="mb-4">
            <h1 class="text-grey-darkest text-2xl">Lista de Carriles</h1>
            <!-- <div class="flex mt-4">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo">
                <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div> -->
        </div>
        <div>
            <div class="flex mb-1 items-center h-10 text-sm border-gray-200 border" v-for="(item, key) in this.carrilesModal" :key="key" >
                <p class="w-full text-grey-darkest">{{`Lane: ${item.lane} IdGare: ${item.idGare} CapufeNum: ${item.capufeLaneNum}`}}</p>                
                <button class="p-1 ml-4 mr-2 w-6 rounded-xl border-gray-800 text-xs font-medium bg-red-500 text-gray-800  hover:bg-red-400">
                  <img src="../../assets/img/bin.png" class="mr-2" width="12" height="1"/>
                </button>
            </div>          
        </div>    
        </div>
        <div class="justify-end flex mt-5">
          <button @click="(modal = false, modalActividades = false)" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
          <button @click="modal = false, modalActividades = false" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
        </div>
      </div>
    </div>
    <div class="pl-10 pr-10 mt-10 mb-32 " :class="{' pointer-events-none': modal}">
        <vue-cal 
          :time="false"
          selected-date="2020-12-19"         
          :disable-views="['years', 'year','week', 'day']"
          active-view="month"
          locale="es"                                   
          @cell-click="agregar_evento_dia"
          events-on-month-view="short"
          :events="events"
          :on-event-click="modal_actividades_dia">
        
          <template v-slot:title="{ title, view }">
            🎉
            <span v-if="view.id === 'years'">Years</span>
            <!-- Using Vue Cal injected Date prototypes -->    
            <span v-else-if="view.id === 'month'">{{ view.startDate.format('MMMM YYYY') }}</span>    
            <span v-else-if="view.id === 'day'">{{ view.startDate.format('dddd D MMMM (YYYY)') }}</span>
            🎉
          </template>
          <template v-slot:day>Nothing here 👌</template>                         
        </vue-cal>
    </div>
  </div>
</div>
</template>

<script>
import Nav from "../../components/Navbar";
import VueCal from 'vue-cal'
import Multiselect from "vue-multiselect";
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/es.js'
import { mapState } from 'vuex';

export default {
  components:{
    VueCal,
    Multiselect,
    Nav
  },
  data() {
    return{
      events: [],
      modal: false,
      modalActividades: false,
      modalAgreagrActividad: false,
      carrilesModal: [],
      laneSelect: [] ,
      listLane: [],
      actividadSelect: '',
      listaActividades: [],
      carrilesDisable: false,
      listaCarriles: []      
      
    }
  },
  beforeMount(){
    let cargaInicial = this.$route.params.cargaInicial
    this.events = cargaInicial.listaActividadesMensuales
    this.listaActividades = this.$store.state.Actividades.catalogoActividades
    
    console.log(cargaInicial)
  },
  computed:{     
    ...mapState("Refacciones", ["carriles"]),
  },
  methods: {
    modal_actividades_dia(e){
      console.log(e)
      this.modal = true
      this.modalActividades = true
      this.carrilesModal = e.carriles
    },
    agregar_evento_dia(item){
      this.modalAgreagrActividad = true
      console.log(item)
    },
    carriles_filtrados() {
      if (this.actividadSelect == "") {
        this.carrilesDisable = true;
      } else if (this.actividadSelect == 1) {
        this.carrilesDisable = false;
        return this.carriles.map((item) => ({
          value: {
            capufeLaneNum: item.capufeLaneNum,
            idGare: item.idGare,
            lane: item.lane,
          },
          text: item.lane,
        }));
      } else if (this.actividadSelect > 1) {
        let rolUser = this.$store.getters['Login/getTypeUser']
        console.log(rolUser)
        let carriles_prohibidos = [];
        for (let evento of this.events) {
          if (evento.tipoActividad != "Semanal") {
            for (let carril of evento.carriles) {                                                     
                if(rolUser == 1){
                  carriles_prohibidos.push(carril);
                }
                else{
                  if(carril.lane != 'Plaza' && carril.lane != "Plaza-M"){
                    carriles_prohibidos.push(carril);
                  }                                  
                }                                
            }
          }
        }
        let carrilesReturn = [];
        for (let carrilesFull of this.carriles) {
          let map = carriles_prohibidos.findIndex(
            (item) =>
              item.capufeLaneNum == carrilesFull.capufeLaneNum &&
              item.idGare == carrilesFull.idGare
          );
          if (map == -1) {
            carrilesReturn.push({
              value: {
                capufeLaneNum: carrilesFull.capufeLaneNum,
                idGare: carrilesFull.idGare,
                lane: carrilesFull.lane,
              },
              text: carrilesFull.lane,
            });
          }
        }
        this.carrilesDisable = false;
        this.listaCarriles = carrilesReturn;
        //return carrilesReturn
      }
    },
  }
}
</script>

<style >

.vuecal--month-view .vuecal__cell {height: 100px;}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;  
  height: 100%;
  align-items: flex-end;
  
}
.vuecal__menu, .vuecal__cell-events-count { background-color :  #42b983 ;} 


</style>