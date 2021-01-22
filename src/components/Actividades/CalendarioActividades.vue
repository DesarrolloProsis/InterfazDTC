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
          @cell-click="cellclick"
          events-on-month-view="short"
          :events="events"
          :on-event-click="onEventClick">
        
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
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/es.js'

export default {
  components:{
    VueCal,
    Nav
  },
  data() {
    return{
      events: [],
      modal: false,
      modalActividades: false,
      modalAgreagrActividad: false,
      carrilesModal: []      
    }
  },
  beforeMount(){
    let cargaInicial = this.$route.params.cargaInicial
    this.events = cargaInicial.listaActividadesMensuales
    console.log(cargaInicial)
  },
  methods: {
    onEventClick(e){
      console.log(e)
      this.modal = true
      this.modalActividades = true
      this.carrilesModal = e.carriles
    },
    cellclick(item){
      this.modalAgreagrActividad = true
      console.log(item)
    }
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