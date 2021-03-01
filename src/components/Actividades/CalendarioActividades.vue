<template>
<div class=" static">
  <div class="relative">
    <Nav></Nav>
    <!--/////////////////////////////////////////////////////////////////
      ////                      MODAL ELIMINAR                         ////
      ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 z-50">
      <div v-if="modalAgreagrActividad" class="rounded-lg mt-64 justify-center text-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
        <h class="text-grey-darkest text-2xl">Agregar Actividad</h>
        <h1 class="mt-5">{{ fechaModal | formatModal }}</h1>
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
        <div class="justify-end  flex sm:grid grid-cols-1 mt-5">
          <button @click="agregar_actividad_dia" class="botonIconCrear sm:mb-2">Aceptar</button>
          <button @click="modalAgreagrActividad = false, laneSelect = [], fechaModal = ''" class="botonIconCancelar sm:w-full sm:ml-0">Cancelar</button>
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
            <h1 class="mt-5">{{ fechaModal | formatModal }}</h1>
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
          <button @click="modal = false, modalActividades = false, this.carrilesModal = []" class="botonIconCancelar">Cancelar</button>
        </div>
      </div>
    </div>
    <HeaderCalendario 
      @actualizar-actividad="actualizar_actividades" 
      @generar-pdf="generar_pdf_calendario" 
      @actualizar-comentario="actualizar_comentario_header"
      :comentario="comentario" 
      :mes="mes" 
      :año="año" 
      :numeroActividades="numeroActividades"
      :plazaSelect="plazaSelect">
    </HeaderCalendario>  
    <div class="pl-10 pr-10 mt-10 mb-32" :class="{' pointer-events-none': modal}">
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
import ServicePDF from '../../services/ReportesPDFService'
import 'vue-cal/dist/i18n/es.js'
import { mapState } from 'vuex';
import Axios from 'axios'
import moment from "moment";
import CookiesService from '../../services/CookiesService'

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
      fechaActual: '',   
      numeroActividades: ''   
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
        let rolUser = this.$store.state.Login.cookiesUser.rollId
        let actividadNombre = this.listaActividades.find(item => item.value == this.actividadSelect).text
        let carriles_prohibidos = [];
        for (let evento of this.events) {
          if (evento.tipoActividad == actividadNombre) {
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
    actualizar_comentario_header(comentario){
      this.comentario = comentario
    },
    modal_actividades_dia(e){          
      this.fechaModal = e.start
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
      let objActividad = await ServiceActividades.construir_objeto_actividad(listaCarril,
        { day: this.fechaModal.toLocaleDateString(), frequencyId: this.actividadSelect } 
      )      
      this.events.push(objActividad)           
      this.modalAgreagrActividad = false
      this.laneSelect = []            
      //Mandar a la DB     
      let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']  
      let actividadInsert = ServiceActividades.objeto_actividad_insertar(
        listaCarril,
        { day: this.fechaModal.toLocaleDateString(),  frequencyId: this.actividadSelect }, 
        this.comentario
      )           
      await Axios.post(`${API}/Calendario/Actividad/${refPlaza}`,actividadInsert, CookiesService.obtener_bearer_token())
        .then(async (response) => {     
            console.log(response)
            await this.actualizar_actividades(this.plazaSelect)                                                    
        })
        .catch(Ex => {            
            console.log(Ex);
            if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
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
      this.plazaSelect = plaza
      let result = await ServiceActividades.filtrar_actividades_mensuales(this.mes, this.año, true) 
      this.events = result.listaActividadesMensuales
      this.comentario = this.comentario != '' ? this.comentario : result.comentario      
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
      if(this.events.length != 0 & comentario != ''){ 
        let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
        let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']
        let objComentario = {
          UserId: user.idUser,
          Month: this.mes,
          Comment: comentario,
          SquareId: user.numPlaza,
          Year: this.año
        }        
        console.log(objComentario)
        Axios.post(`${API}/Calendario/ObservacionesInsert/${refPlaza}`,objComentario, CookiesService.obtener_bearer_token())
        .then((response) => {                    
          console.log(response)
          ServicePDF.generar_pdf_calendario(refPlaza, {
              mes: this.mes,
              año: this.año
          })          
        })
        .catch((ex) => {          
          console.log(ex);
          if(ex.response.status == 401)
            CookiesService.token_no_autorizado()
        });
      }
      else{        
        this.$notify.warning({
            title: "Ups!",
            msg: `FALTAN LLENAR CAMPOS PARA EL CALENDARIO 'COMENTARIO O ACTIVIDADES'`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },          
          });          
      }  
    },
    borrar_carril_evento(item, index){      
      let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']  
      Axios.delete(`${API}/Calendario/DeleteCalendar/${refPlaza}/${item.calendarId}`, CookiesService.obtener_bearer_token())
        .then(async (response) => {     
            console.log(response) 
            if(this.carrilesModal.length == 1){ 
              this.modal = false             
              this.modalActividades = false
              this.carrilesModal = []              
              await this.actualizar_actividades(this.plazaSelect)
            }
            else{ 
              this.carrilesModal.splice(index,1)               
            }                                                           
        })
        .catch(Ex => {  
          this.$notify.warning({
            title: "Ups!",
            msg: `NO PUEDES BORRAR ESTA ACTIVIDAD YA HAY UN REPORTE GENERADO`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },          
          });          
          console.log(Ex);
          if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
        });
    }
  },
  watch: {
    events: function(newActividad){
        this.numeroActividades = newActividad.length
    }
  },
  filters:{
    formatModal(fecha){
      return moment(fecha).format('DD/MM/YYYY')   
    }
  }
}
</script>
<style >

.vuecal__cell {
  height: 180px;
  padding: 10px;
}
.vuecal__event.ActividadSemanal{
  background-color: #48bb78;
  height: 35px;
  border: 2px solid gray;
  border-radius: 15px 50px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadMensual{
  background-color: #f56565;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadTrimestral{
  background-color: #4299e1;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadSemestral{
  background-color: #ed64a6;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadAnual{
  background-color: #ed8936;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white; 
}
.vuecal__menu{
    background-color: #2a4365;
    height: 35px;  
}


</style>


