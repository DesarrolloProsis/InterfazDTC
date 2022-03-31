<template>
  <div class=" static">
    <div class="">    
      <!--////////////////////////////////////////////////////////////////////
      ////                      MODAL ERROR                              ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="inset-0" :class="{'modal-container': modalError}">
        <div v-if="modalError" class="modalAgregarActPre mt-64  sm:w-64">
          <div class="text-center">
            <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
              <img src="../../assets/img/warning.png" class="ml-2 sm:-ml-6" width="35" height="35" />
              <p class="-mt-10 text-black sm:ml-6 ml-8 sm:-mt-6">Advertencia</p>
              <img src="../../assets/img/warning.png" class="ml-61 -mt-12 sm:-mt-10 sm:ml-49" width="35" height="35" />
            </h1>
          </div>
          <div>
            <p v-for="(item, key) in datos" :key="key">{{ item }}</p>
          </div>
          <div class="justify-center ml-8 mt-5 sm:grid grid-cols-1 sm:ml-0">
            <button @click="modalError = false" class="botonIconCrear font-boton sm:mb-2"><span class="ml-1 sm:mx-auto">Aceptar</span></button>
          </div>
        </div>
      </div>
      <!--////////////////////////////////////////////////////////////////////
      ////                      MODAL AGREGAR                            ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="inset-0" :class="{'modal-container': modalAgreagrActividad}">
        <div v-if="modalAgreagrActividad" class="modalAgregarActPre mt-64 sm:w-64">
          <h class="text-grey-darkest text-2xl font-titulo sm:text-sm">Agregar Actividad</h>
          <h1 class="mt-5 font-titulo text-sm">{{ fechaModal | formatModal }}</h1>
          <div>
            <div>
              <div class="mt-5 font-titulo">
                <span class="text-sm -ml-32 text-gray-500 sm:ml-0">Seleccione Frecuencia de Actividad</span>
                <select v-model="actividadSelect" class="w-full text-gray-600 h-10 border-gray-300 sm:text-sm sm:h-5" type="text">
                    <option disabled value="">Selecionar...</option>
                    <option v-for="(item, index) in listaActividades" :value="item.value" :key="index">{{ item.text }}</option>
                  </select>
              </div>
              <div class="mt-1 font-titulo sm:text-sm" v-if="actividadSelect">
                <span class="text-sm -ml-33 text-gray-500 sm:ml-0">Seleccione Ubicación Carril/Plaza</span>
                <multiselect
                  v-model="laneSelect"   
                  :custom-label="label_multi_select"                                                                     
                  :close-on-select="false"
                  :clear-on-select="true"
                  :hideSelected="false"
                  placeholder="Selecciona..."
                  :options="carriles_filtrados"
                  track-by="text"
                  class=" shadow-md hover:border-gray-700 h-5"
                  :multiple="true">   
                  <template slot="selection" slot-scope="{ values, search, isOpen }">
                    <span class="multiselect__single font-titulo" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                  </template>   
                </multiselect>
              </div>
            </div>
            <div>
            </div>
          </div>
          <div class="justify-center ml-8 mt-5 sm:grid grid-cols-1 sm:ml-0">
            <button @click="agregar_actividad_dia" class="botonIconCrear font-boton sm:mb-2"><span class="ml-1 sm:mx-auto">Aceptar</span></button>
            <button @click="modalAgreagrActividad = false, laneSelect = [], fechaModal = ''" class="botonIconCancelar font-boton sm:w-full sm:ml-0"><span class="ml-1 sm:mx-auto">Cancelar</span></button>
          </div>
        </div>
      </div>
      <!--////////////////////////////////////////////////////////////////////
      ////            MODAL LISTA DE CARRILES                            ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="inset-0 " :class="{'modal-container': modalActividades}">
        <div v-if="modalActividades" class="modalAgregarActPre mt-64 sm:w-64">        
          <div class="text-center">                    
            <div class="mb-4">
              <h1 class="text-grey-darkest text-2xl font-titulo sm:text-sm">Lista de Carriles</h1>    
              <h1 class="mt-5 font-titulo text-sm">{{ fechaModal | formatModal }}</h1>
            </div>
            <div class="overflow-y-auto" style="height:120px;">
              <div class="inputBorrarActPre "  v-for="(item, key) in this.carrilesModal" :key="key" >
                <p class="w-full text-grey-darkest font-titulo text-xs">{{`Carril: ${item.lane}, CapufeNum: ${item.capufeLaneNum}`}}</p>                
                <button @click="borrar_carril_evento(item, key)" class="botonBorrarActPre" v-if="item.referenceNumber == '---'">
                  <img src="../../assets/img/close.png" class="" width="14" height="1"/>
                </button>
                <button @click="borrar_carril_evento(item, key)" class="botonOkActPre" disabled v-else>
                  <img src="../../assets/img/comprobado.png" class="" width="14" height="1"/>
                </button>
              </div>          
            </div>    
          </div>
          <div class="justify-center flex mt-5">          
            <button @click="modal = false, modalActividades = false, this.carrilesModal = []" class="botonIconCancelar font-boton text-sm">Cancelar</button>
          </div>
        </div>
      </div>
      <HeaderCalendario 
      @actualizar-actividad="actualizar_actividades" 
      @generar-pdf="generar_pdf_calendario" 
      @actualizar-comentario="actualizar_comentario_header"
      :comentario="comentario" 
      :mes="mes" 
      :calendarioEscaneado="calendarioEscaneado"
      :año="año" 
      :numeroActividades="numeroActividades"
      :plazaSelect="plazaSelect">
      </HeaderCalendario>            
      <div class="pl-1 pr-1 mt-10 mb-32 font-titulo sm:mb-20 " :class="{' pointer-events-none': modal,' scroll': modalAgreagrActividad}">              
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
          name="CalendarioActividades"
          :on-event-click="modal_actividades_dia"
          >
            <template v-slot:title="{ view }">
              <span v-if="view.id === 'years'">Years</span>            
              <span v-else-if="view.id === 'month'">{{ view.startDate.format('MMMM YYYY') }}</span>    
              <span v-else-if="view.id === 'day'">{{ view.startDate.format('dddd D MMMM (YYYY)') }}</span>
              <font-awesome-icon icon="fa-solid fa-calendar-day" class="text-blue-800 ml-4"/>
            </template>
            <template v-slot:day>Nothing here 👌</template>                         
        </vue-cal>
        <span class="text-gray-700 font-titulo font-bold sm:text-xs">*El horario del mantenimiento esta comtemplado de las 9:00 a las 19:00 hrs de cada dia.</span>      
      </div>      
    </div>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import Multiselect from "vue-multiselect";
import HeaderCalendario from '../Header/CrearHeaderCalendario'
import ServiceActividades from '../../services/ActividadesService'
import ServicePDF from '../../services/ReportesPDFService'
import 'vue-cal/dist/i18n/es.js'
import { mapState } from 'vuex';
import moment from "moment";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  components:{
    VueCal,
    Multiselect,
    HeaderCalendario,    
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
      numeroActividades: 0,
      tipoUsuario: 0,
      calendarioEscaneado: false,
      modalError: false,
      datos:[],
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
    this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId   
    this.validar_calendario_escaneado()     
  },  
  computed:{     
    ...mapState("Refacciones", ["carriles"]),
    carriles_filtrados() {
      if (this.actividadSelect == "") {                
        return ['Sin Actividad']
      }
      else if (this.actividadSelect == 1) { 
        let  carrilesInvalidos = []
        let fechaModal = moment(this.fechaModal).format('YYYY-MM-DD')
        this.events.forEach(evento => {
          if(evento.start == fechaModal){
            if(evento.tipoActividad == 'Semanal'){
              evento.carriles.forEach(carril => {
                carrilesInvalidos.push(carril)
              })
            }
          }
        })        
        let carrilesReturn = []
        this.carriles.forEach(carril => {
          let existLane = carrilesInvalidos.findIndex(item => item.capufeLaneNum == carril.capufeLaneNum && item.idGare == carril.idGare)
          if(existLane == -1) {
            carrilesReturn.push({
              value: {
                capufeLaneNum: carril.capufeLaneNum,
                idGare: carril.idGare,
                lane: carril.lane,
              },
              text: carril.lane,
            });
          }
        })                  
        if(this.tipoUsuario == 1)
          carrilesReturn = carrilesReturn.filter(item => item.value.capufeLaneNum != '0000')             
        return carrilesReturn
      } 
      else if (this.actividadSelect > 1) {
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
        if(this.tipoUsuario == 1)
          carrilesReturn = carrilesReturn.filter(item => item.value.capufeLaneNum != '0000')             
        return carrilesReturn
      }
      return ['no entre en ninguno']
    },
    idUser(){
      return this.$store.state.Login.cookiesUser.userId
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
      let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']  
      let actividadInsert = ServiceActividades.objeto_actividad_insertar(
        listaCarril,
        { day: this.fechaModal.toLocaleDateString(),  frequencyId: this.actividadSelect }, 
        this.comentario, 
        this.$store.state.Header.headerSeleccionado.adminSquareId
      )               
      await this.$http.post(`${API}/Calendario/Actividad/${refPlaza}`,actividadInsert)
        .then(async (response) => {                     
              if(response.data.result.length > 0){
                let arrayNew = []
                response.data.result.forEach(item => {                  
                  if(item != 'Insertado'){
                    arrayNew.push(item)
                  }
                })                
                if(arrayNew.length > 0){
                  this.modalError = true 
                  this.datos = arrayNew           
                }
              }                            
              await this.actualizar_actividades(this.plazaSelect)                                    
        })
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
      this.validar_calendario_escaneado()
    }, 
    cambiar_mes: async function(item){ 
      let fecha = item.startDate.toLocaleDateString().split('/')
      let result = await ServiceActividades.filtrar_actividades_mensuales(fecha[1], fecha[2], true) 
      this.events = result.listaActividadesMensuales
      this.comentario = result.comentario         
      this.mes = parseInt(fecha[1]) 
      this.año = parseInt(fecha[2])   
      this.validar_calendario_escaneado()   
    },    
    generar_pdf_calendario: function(comentario){        
      if(this.events.length > 0 & comentario != ''){ 
        let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
        let adminId = this.$store.state.Login.plazaSelecionada.administradorId
        let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']
        let objComentario = {
          UserId: user.idUser,
          Month: this.mes,
          Comment: comentario,
          SquareId: user.numPlaza,
          AdminId: adminId,
          Year: this.año
        }                
        this.$http.post(`${API}/Calendario/ObservacionesInsert/${refPlaza}`,objComentario)
        .then(() => {                              
          ServicePDF.generar_pdf_calendario(refPlaza, {
              mes: this.mes,
              año: this.año
          })          
        })
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
      this.$http.delete(`${API}/Calendario/DeleteCalendar/${refPlaza}/${item.calendarId}`)
        .then(async () => {                 
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
        .catch(() => {  
          this.$notify.warning({
            title: "Ups!",
            msg: `NO PUEDES BORRAR ESTA ACTIVIDAD YA HAY UN REPORTE GENERADO`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },          
          });                                       
        });
    },
    validar_calendario_escaneado(){
      let referenciaPlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
      this.$http.get(`${API}/Calendario/Exists/${referenciaPlaza}/${this.año}/${this.mes}/${this.idUser}`)
      .then(() => {        
        this.calendarioEscaneado = true
      })
      .catch(() => {                                                         
          this.calendarioEscaneado = false
      })
    }
  },
  watch: {
    events: function(newActividad){
        this.numeroActividades = newActividad.length
    },
    isModalVisible: function() {
      if(this.modalAgreagrActividad){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
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
  position: static;
  background-color: #48bb78;
  height: 35px;
  border: 2px solid gray;
  border-radius: 15px 50px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadMensual{
  position: static;
  background-color: #f56565;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadTrimestral{
  position: static;
  background-color: #4299e1;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadSemestral{
  position: static;
  background-color: #ed64a6;
  height: 35px;
  height: 35px;
  border: 2px solid grey;
  border-radius: 15px 50px 30px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: white;
}
.vuecal__event.ActividadAnual{
  position: static;
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
.vuecal__cell--today{
  z-index: auto;
}
.vuecal__cell--selected{
  z-index: auto;
}
.multiselect{
  position: none;
}
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>