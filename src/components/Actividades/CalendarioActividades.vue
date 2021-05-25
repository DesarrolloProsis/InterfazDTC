<template>
<div class=" static">
  <div class="relative">    
    <!--////////////////////////////////////////////////////////////////////
    ////                      MODAL AGREGAR                            ////
    ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 z-50">
      <div v-if="modalAgreagrActividad" class="modalAgregarActPre sm:w-64">
        <h class="text-grey-darkest text-2xl font-titulo">Agregar Actividad</h>
        <h1 class="mt-5 font-titulo">{{ fechaModal | formatModal }}</h1>
        <div>
          <div>
            <div class="mt-5 font-titulo">
              <span class="text-sm -ml-32 text-gray-500">Seleccione Frecuencia de Actividad</span>
              <select v-model="actividadSelect" class="w-full text-gray-600 h-10 border-gray-300 " type="text">
                  <option disabled value="">Selecionar...</option>
                  <option v-for="(item, index) in listaActividades" :value="item.value" :key="index">{{ item.text }}</option>
                </select>
            </div>
            <div class="mt-1 font-titulo" v-if="actividadSelect">
              <span class="text-sm -ml-33 text-gray-500">Seleccione Ubicación Carril/Plaza</span>
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
                  <span class="multiselect__single font-titulo" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                </template>   
              </multiselect>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div class="justify-center ml-8 sm:grid grid-cols-1 mt-5">
          <button @click="agregar_actividad_dia" class="botonIconCrear sm:mb-2">Aceptar</button>
          <button @click="modalAgreagrActividad = false, laneSelect = [], fechaModal = ''" class="botonIconCancelar sm:w-full sm:ml-0">Cancelar</button>
        </div>
      </div>
    </div>
    <!--////////////////////////////////////////////////////////////////////
    ////            MODAL LISTA DE CARRILES                            ////
    ////////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 z-50">
      <div v-if="modalActividades" class="modalAgregarActPre sm:w-64">        
        <div class="text-center">                    
        <div class="mb-4">
            <h1 class="text-grey-darkest text-2xl font-titulo">Lista de Carriles</h1>    
            <h1 class="mt-5 font-titulo">{{ fechaModal | formatModal }}</h1>
        </div>
        <div class="overflow-y-auto" style="height:120px;">
            <div class="inputBorrarActPre "  v-for="(item, key) in this.carrilesModal" :key="key" >
                <p class="w-full text-grey-darkest font-titulo">{{`Carril: ${item.lane}, CapufeNum: ${item.capufeLaneNum}`}}</p>                
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
      :calendarioEscaneado="calendarioEscaneado"
      :año="año" 
      :numeroActividades="numeroActividades"
      :plazaSelect="plazaSelect">
    </HeaderCalendario>  
    <div class="pl-10 pr-10 mt-10 mb-32 font-titulo" :class="{' pointer-events-none': modal}">
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
        <span class="text-gray-700 font-titulo">*El horario del mantenimiento esta comtemplado de las 9:00 a las 19:00 hrs de cada dia.</span>
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
import Axios from 'axios'
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
      calendarioEscaneado: false 
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
        console.log(carrilesInvalidos);
        let carrilesReturn = []
        this.carriles.forEach(carril => {
          let existLane = carrilesInvalidos.findIndex(item => item.capufeLaneNum == carril.capufeLaneNum)
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
        this.comentario
      )              
      await Axios.post(`${API}/Calendario/Actividad/${refPlaza}`,actividadInsert)
        .then(async () => {                 
            await this.actualizar_actividades(this.plazaSelect)                                                    
        })
        .catch(error => {                        
          console.log(error)                          
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
        Axios.post(`${API}/Calendario/ObservacionesInsert/${refPlaza}`,objComentario)
        .then(() => {                              
          ServicePDF.generar_pdf_calendario(refPlaza, {
              mes: this.mes,
              año: this.año
          })          
        })
        .catch((error) => {          
          console.log(error);                      
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
      Axios.delete(`${API}/Calendario/DeleteCalendar/${refPlaza}/${item.calendarId}`)
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
        .catch(error => {  
          this.$notify.warning({
            title: "Ups!",
            msg: `NO PUEDES BORRAR ESTA ACTIVIDAD YA HAY UN REPORTE GENERADO`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },          
          });          
          console.log(error);                      
        });
    },
    validar_calendario_escaneado(){
      let referenciaPlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
      Axios.get(`${API}/Calendario/Exists/${referenciaPlaza}/${this.año}/${this.mes}/${this.idUser}`)
      .then(() => {        
        this.calendarioEscaneado = true
      })
      .catch((error) => {
          console.log(error)                                                    
          this.calendarioEscaneado = false
      })
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
</style>


