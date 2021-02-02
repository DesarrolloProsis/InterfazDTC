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
                :custom-label="label_multi_select"                                                                     
                :close-on-select="false"
                :clear-on-select="true"
                :hideSelected="false"
                placeholder="Selecciona..."
                :options="carriles_filtrados"
                track-by="text"
                class=" shadow-md hover:border-gray-700"
                :multiple="true"
              >   
                <template slot="selection" slot-scope="{ values, search, isOpen }">
                  <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                </template>   
              </multiselect>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div class="justify-end flex mt-5">
          <button @click="agregar_actividad_dia" class="text-white px-5 py-3 rounded-lg m-2 bg-green-600">Aceptar</button>
          <button @click="modalAgreagrActividad = false, laneSelect = [], fechaModal = ''" class="text-white px-4 py-3 rounded-lg m-2 bg-red-700">Cancelar</button>
        </div>
      </div>
    </div>
    <!--/////////////////////////////////////////////////////////////////
        ////            MODAL LISTA DE CARRILES                         ////
        ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 z-50">
      <div v-if="modalActividades" class="rounded-lg justify-center border absolute inset-x-0 mt-40 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">        
        <div class="text-center">                    
        <div class="mb-4">
            <h1 class="text-grey-darkest text-2xl">Lista de Carriles</h1>       
        </div>
        <div>
            <div class="flex mb-1 items-center h-10 text-sm border-gray-200 border" v-for="(item, key) in this.carrilesModal" :key="key" >
                <p class="w-full text-grey-darkest">{{`Lane: ${item.lane} IdGare: ${item.idGare} CapufeNum: ${item.capufeLaneNum}`}}</p>                
                <button @click="borrar_carril_evento(item, key)" class="p-1 ml-4 mr-2 w-6 rounded-xl border-gray-800 text-xs font-medium bg-red-500 text-gray-800  hover:bg-red-400">
                  <img src="../../assets/img/bin.png" class="mr-2" width="12" height="1"/>
                </button>
            </div>          
        </div>    
        </div>
        <div class="justify-end flex mt-5">
          <!-- <button @click="(modal = false, modalActividades = false)" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button> -->
          <button @click="modal = false, modalActividades = false" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">Cancelar</button>
        </div>
      </div>
    </div>
    <HeaderCalendario 
      @actualizar-actividad="actualizar_actividades" 
      @generar-pdf="generar_pdf_calendario" 
      :comentario="comentario" 
      :mes="mes" 
      :año="año" 
      :plazaSelect="plazaSelect">
    </HeaderCalendario>  
    <div class="pl-10 pr-10 mt-10 mb-32 " :class="{' pointer-events-none': modal}">
        <vue-cal 
          ref="vuecal"
          :time="false"
          :selected-date="fechaActual"         
          :disable-views="['years', 'year','week', 'day']"
          active-view="month"
          locale="es"   
          @view-change="cambiar_mes"                                
          @cell-click="modal_agregar_actividad"          
          events-on-month-view="short"
          :events="events"
          :on-event-click="modal_actividades_dia"
          >
            <template v-slot:title="{ title, view }">
              🎉
              <span v-if="view.id === 'years'">Years</span>            
              <span v-else-if="view.id === 'month'">{{ view.startDate.format('MMMM YYYY') }}</span>    
              <span v-else-if="view.id === 'day'">{{ view.startDate.format('dddd D MMMM (YYYY)') }}</span>
              🎉
            </template>
            <template v-slot:day>Nothing here 👌</template>                         
        </vue-cal>
        <span class="text-gray-700">*El horario del mantenimiento esta comtemplado de las 9:00 a las 19:00 hrs de cada dia.</span>
    </div>    
  </div>
</div>
</template>

<script>
import Nav from "../../components/Navbar";
import VueCal from 'vue-cal'
import Multiselect from "vue-multiselect";
import HeaderCalendario from '../Header/CrearHeaderCalendario'
import ServiceActividades from '../../services/ActividadesService'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/es.js'
import { mapState } from 'vuex';
import Axios from 'axios'
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  components:{
    VueCal,
    Multiselect,
    HeaderCalendario,
    Nav,    
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
      fechaModal: '',
      comentario: '',
      plazaSelect: '',
      nombrePlaza: '',
      año: '',
      mes: '',   
      fechaActual: ''
    }
  },
  beforeMount(){
    let cargaInicial = this.$route.params.cargaInicial    
    this.events = cargaInicial.listaActividadesMensuales
    this.comentario = cargaInicial.comentario
    this.año = cargaInicial.año    
    this.plazaSelect = cargaInicial.plazaSelect
    this.mes = cargaInicial.mes
    this.nombrePlaza = cargaInicial.plazaNombre
    this.listaActividades = this.$store.state.Actividades.catalogoActividades
  },
  computed:{     
    ...mapState("Refacciones", ["carriles"]),
    carriles_filtrados() {
      if (this.actividadSelect == "") {                
        return ['Sin Actividad']
      } else if (this.actividadSelect == 1) {
        
        let carrilesReturn = this.carriles.map((item) => ({
          value: {
            capufeLaneNum: item.capufeLaneNum,
            idGare: item.idGare,
            lane: item.lane,
          },
          text: item.lane,
        }));        
        return carrilesReturn
      } else if (this.actividadSelect > 1) {
        let rolUser = this.$store.getters['Login/getTypeUser']        
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
        return carrilesReturn
      }
      return ['no entre en ninguno']
    },     
  },  
  methods: {
    modal_actividades_dia(e){         
      this.modal = true
      this.modalActividades = true
      this.carrilesModal = e.carriles
    },
    modal_agregar_actividad(item){
      this.modalAgreagrActividad = true
      this.fechaModal = item      
    },   
    agregar_actividad_dia: async function() {      
      let listaCarril = this.laneSelect.map((item) => {
        return { ...item.value }
      })      
      let objActividad = await ServiceActividades.construir_objeto_actividad(
        listaCarril,
        { day: this.fechaModal.toLocaleDateString(), frequencyId: this.actividadSelect } 
      )      
      this.events.push(objActividad)           
      this.modalAgreagrActividad = false
      this.laneSelect = []            
      //Mandar a la DB       
      let actividadInsert = ServiceActividades.objeto_actividad_insertar(
        listaCarril,
        { day: this.fechaModal.toLocaleDateString(),  frequencyId: this.actividadSelect }, 
        this.comentario
      )      
      await Axios.post(`${API}/Calendario/Actividad/CALENDARIO`,actividadInsert)
        .then((response) => {     
            console.log(response)                                                    
        })
        .catch(Ex => {            
            console.log(Ex);
        });
      this.actividadSelect = ''
      
    },
    label_multi_select(value){            
      if(value != 'Sin Actividad')
        return value.value.lane
      else 
        return [{ "capufeLaneNum": '',  'idGare': '', 'lane': ''}]
    },
    actualizar_actividades: async function(plaza){                
      this.plazaSelect = plaza.numPlaza
      let result = await ServiceActividades.filtrar_actividades_mensuales(this.mes, this.año, true) 
      this.events = result.listaActividadesMensuales
      this.comentario = result.comentario      
    }, 
    cambiar_mes: async function(item){
      let fecha = item.startDate.toLocaleDateString().split('/')
      let result = await ServiceActividades.filtrar_actividades_mensuales(fecha[1], fecha[2], true) 
      this.events = result.listaActividadesMensuales
      this.comentario = result.comentario         
      this.mes = parseInt(fecha[1]) 
      this.año = parseInt(fecha[2])      
    },    
    generar_pdf_calendario(comentario){      
        let user = this.$store.getters['Login/getUserForDTC']
        let objComentario = {
          UserId: user.idUser,
          Month: this.mes,
          Comment: comentario,
          SquareId: user.numPlaza,
          Year: this.año
        }        
        Axios.post(`${API}/Calendario/ObservacionesInsert/CALENDARIO`,objComentario)
        .then((response) => {                    
          console.log(response)
        })
        .catch((ex) => {          
          console.log(ex);
        });  
    },
    borrar_carril_evento(item, index){
      console.log(item)
      Axios.delete(`${API}/Calendario/DeleteCalendar/CALENDARIO/${item.calendarId}`)
        .then((response) => {     
            console.log(response)    
            this.carrilesModal = this.carrilesModal.slice(index,1)                                                
        })
        .catch(Ex => {            
            console.log(Ex);
        });
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
/* .vuecal__menu, .vuecal__cell-events-count { background-color :  #42b983 ;}  */


</style>