<template>
  <div>
    <div class="flex w-full">
      <div>
        <div class="text-center mb-5 font-titulo">
          <h6 class="font-bold text-xl text-gray-800">Equipo Dañado</h6>
        </div>
        <div class="flex justify-center p-8 sm:p-4">
          <div class="grid gap-4 grid-cols-1 sm:gap-0">
            <div class="divtabla sm:mb-24 sm:text-xs" :class="{ hidden: modal }">
              <table class="table font-titulo">
                <!--/////////////////////////////////////////////////////////////////
                ////                 CABECERA DE LA TABLA                       ////
                ////////////////////////////////////////////////////////////////////-->
                <thead>
                  <tr class="text-sm trTable sm:text-xs">
                    <th class="cabeceraTable font-medium sm:w-20">Partida</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden">Unidad</th>
                    <th class="text-red-600 font-medium cabeceraTable sm:w-48">Componente</th>
                    <th class="text-red-600 font-medium sm:hidden md:hidden cabeceraTable">Cantidad</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden xl:w-32">Marca</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden xl:w-32">Modelo</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden xl:w-32">Numero de Serie</th>
                    <th class="cabeceraTable font-medium text-red-600 sm:w-48">Ubicacion<br />(carril/cuerpo)</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden">Fecha de Instalacion</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden">Fecha<br />(Ultimo Mantenimiento)</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden">Folio<br />(Ultimo Mantenimiento)</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden">Real</th>
                    <th class="cabeceraTable font-medium sm:hidden md:hidden w-20">Fabricante</th>
                    <th class="cabeceraTable font-medium sm:w-48">Acciones</th>
                  </tr>
                </thead>
                <!--/////////////////////////////////////////////////////////////////
                ////                 CUERPO DE LA TABLA                          ////
                ////////////////////////////////////////////////////////////////////-->
                <tbody name="table" is="transition-group">    
                  <tr class="hover:bg-blue-200 text-center" v-for="(equipo, index) in arrayPartidas" :key="index">
                    <td class="cuerpoTable"><!-- Partida -->
                      <div v-if="equipo.rowUp">{{ equipo.row1.toString() }}</div>
                      <div v-else>{{ objectEditar.rowUpd1 }}</div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Unidad -->
                      <div v-if="equipo.rowUp">{{ equipo.row2.toString() }}</div>
                      <div v-else>{{ objectEditar.rowUpd2 }}</div>
                    </td>
                    <td class="cuerpoTable"><!-- Componente -->
                      <div v-if="equipo.rowUp">{{ equipo.row3.description.toString() }}</div>
                      <div v-else></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Cantidad -->
                      <div v-if="equipo.rowUp">{{ equipo.row4 }}</div>
                      <div v-else>{{ objectEditar.rowUpd4 }}</div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Marca -->
                      <div v-if="equipo.rowUp">{{ equipo.row5.toString() }}</div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd5" :key="key">{{ item }}</p></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Modelo -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row6" :key="key">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd6" :key="key">{{ item }}</p>
                      </div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Numero de Serio -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row7" :key="key">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd7" :key="key">{{ item }}</p>
                      </div>
                    </td>
                    <td class="cuerpoTable"><!-- Ubicacion -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row8" :key="key">{{ item | formatPlaza }}</p></div>
                      <div v-else></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Instalacion -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row9" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd9" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Mantenimiento -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row10" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd10" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Folio Mantenimiento -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row11" :key="key" class="text-sm">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd11" :key="key" class="text-sm">{{ item }}</p></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Real -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row12" :key="key" class="text-sm">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd12" :key="key" class="text-sm">{{ item }}</p></div>
                    </td>
                    <td class="cuerpoTable sm:hidden md:hidden"><!-- Fabricante -->
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row13" :key="key" class="text-sm">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd13" :key="key" class="text-sm">{{ item }}</p></div>
                    </td>
                    <td class="cuerpoTable pb-2 "><!-- Acciones -->
                      <div v-if="equipo.rowUp" class="sm:mr-5">
                        <button v-on:click.stop.prevent="eliminar_partida (index)" class="botonIconBorrarCard font-boton sm:w-auto w-20 sm:h-8 ">
                          <img src="../../assets/img/bin.png" class="mr-2 sm:m-1" width="15" height="15"/>
                          <span class="sm:hidden">Borrar</span>
                        </button>
                        <button v-on:click.stop.prevent="infoModal(index)" class="botonIconMas ml-1 lg:hidden xl:hidden sm:h-8 sm:mr-1">
                          <img src="../../assets/img/mas.png" width="15" height="15"/>
                        </button>         
                      </div>
                      <div v-else>
                        <button v-on:click.stop.prevent="abortUpdateRowTable(index)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2">
                          <img src="../../assets/img/cerrar.png" class="mr-2 sm:m-1" width="15" height="15"/>
                          <span>Cancelar</span>
                        </button>
                        <button v-on:click.stop.prevent="confirmRowTable(index)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2">
                          <img src="../../assets/img/garrapata.png" class="mr-2 sm:m-1" width="20" height="20"/>
                          <span>Confirmar</span>
                        </button>
                      </div>
                    </td>
                  </tr>           
                </tbody>
                  <!--/////////////////////////////////////////////////////////////////
                    ////           FOOTER DE LA TABLA + PARTIDA                      ////
                  ////////////////////////////////////////////////////////////////////-->      
                    <tr class="text-center">
                      <td class="cuerpoTable">{{ "*" }}</td>
                      <td class="cuerpoTable sm:text-sm sm:hidden">
                        <template v-if="statusMetro">
                          <input v-model="cantidadMetro" type="number" class="w-24" placeholder="Cantidad">
                        </template>
                        <template v-else>
                          {{ datosPrePartida.rowCantidad }}
                        </template>  
                        
                      </td>
                      <td class="cuerpoTable w-1">
                        <button @click="modalAgregarComp">
                          <img src="../../assets/img/more.png" width="15" height="15"/>
                        </button>
                        <multiselect
                            @open="UnClick"                          
                            @select="cambiar_componente"
                            v-model="componenteSeleccionado"
                            :options="listaComponentes"
                            :multiple="false"
                            group-values="secundarios"
                            group-label="componentePrincipal"
                            :close-on-select="true"
                            :group-select="false"
                            placeholder="Buscar componentes"
                            track-by="name"
                            openDirection="below"
                            class="hidden"
                            label="description"
                        ><span slot="noResult"></span>
                        </multiselect>                     
                      </td>
                      <td class="cuerpoTable sm:hidden">{{ datosPrePartida.rowMarca.toString() }}</td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowModelo" :key="key" class="text-sm">{{ item }}</p></td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowNumSerie" :key="key" class="text-sm">{{ item }}</p></td>
                      <td class="cuerpoTable sm:hidden">
                        <multiselect
                            v-model="laneSelect"                                                  
                            :close-on-select="false"
                            :clear-on-select="true"
                            :hideSelected="false"
                            placeholder="Selecciona..."
                            :options="listLane"
                            :multiple="true"
                            class="hidden"
                          >
                          <template v-if="componenteSeleccionado != 'Servidor de Video' && componenteSeleccionado != 'Servidor de Plaza'" slot="selection" slot-scope="{ values, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                          </template>
                        </multiselect>
                      </td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowDateInstalacion" :key="key" class="text-sm">{{ item | formatDate }}</p></td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowDateMantenimiento" :key="key" class="text-sm">{{ item | formatDate }}</p></td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowFolioMantenimiento" :key="key" class="text-sm">{{ item }}</p></td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowDateReal" :key="key" class="text-sm">{{ item }}</p></td>
                      <td class="cuerpoTable sm:hidden"><p v-for="(item, key) in datosPrePartida.rowDateFabricante" :key="key" class="text-sm">{{ item }}</p></td>
                      <td class="cuerpoTable sm:hidden p-2">
                        <button v-on:click.stop.prevent="agregarPartida()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 w-24 hidden">
                          <img src="../../assets/img/more.png" width="20" height="20" />
                          <span class="text-xs">Agregar Partida</span>
                        </button>
                      </td>
                  </tr>
              </table>
            </div>
          </div>               
          <!--////////////////////////////////////////////////////////////////////
          ////              MODAL INFORMACION CELULAR                        ////
          ////////////////////////////////////////////////////////////////////-->
          <div class="font-titulo" v-if="modal">
            <div class="text-xs text-center contenedor z-40">
              <div class="flex justify-end">
                <button v-on:click.stop.prevent="(modal = false), (objectModal = {})" class="">
                  <img src="../../assets/img/close.png" class="mr-2 sm:m-1" width="25" height="25"/>
                  <span class="text-sm hidden">Cerrar</span>
                </button>
              </div>
              <div class="inline-flex m-2">
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Componete</p>
                  <p>{{ objectModal.row3.description }}</p>
                </div>
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Carriles</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row8" :key="id">{{ item | formatPlaza }}</p>
                </div>
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Marca</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row5" :key="id">{{ item }}</p>
                </div>
              </div>
              <div class="inline-flex m-2">
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Numero Serie</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row7" :key="id">{{ item }}</p>
                </div>
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Modelo</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row6" :key="id">{{ item }}</p>
                </div>
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Folio</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row11" :key="id">{{ item }}</p>
                </div>
              </div>
              <div class="inline-flex m-2">
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Fecha de Instalacion</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row9" :key="id">{{ item | formatDate }}</p>
                </div>
                <div class="w-24 m-1">
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Fecha Ultimo Mantenimiento</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row10" :key="id">{{ item | formatDate }}</p>
                </div>
                <div class="w-24 m-1">
                  <p></p>
                  <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Tiempo de Vida Real</p>
                  <p class="border-b-2" v-for="(item, id) in objectModal.row12" :key="id">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
    </div> 
    <!--//////////////////////////////////////////////////////////////////
    ////                         MODAL AGREGAR COMPONENTE            ////
    //////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 font-titulo">
            <div v-if="showModal" class="rounded-lg justify-center absolute inset-x-0  md:w-69 lg:w-69 xl:w-80 mx-auto px-2">
                <div class="rounded-lg border bg-white border-gray-700 px-4 py-10 shadow-2xl">
                  <!--////////////////////////////////////////////////////////////////////
                  ////                        BOTONES MODAL AGREGAR COMP             ////
                  ////////////////////////////////////////////////////////////////////-->
                    <multiselect
                        @select="cambiar_componente"
                        @open="UnClick,scrollBool = false"
                        @close="scrollBool = true"
                        v-model="componenteSeleccionado"
                        :options="listaComponentes"
                        :multiple="false"
                        group-values="secundarios"
                        group-label="componentePrincipal"
                        :close-on-select="true"
                        :group-select="false"
                        placeholder="Componente"
                        track-by="name"
                        class="w-full"
                        label="description"
                        ><span slot="noResult"
                          >Oops! No elements found. Consider changing the search
                          query.</span
                        >
                      </multiselect>
                      <br>
                      <multiselect
                        v-model="laneSelect"
                        @open="scrollBool = false"                        
                        @close="scrollBool = true"
                        :close-on-select="false"
                        :clear-on-select="true"
                        :hideSelected="false"
                        placeholder="Carril/Cuerpo"
                        :options="listLane"
                        :multiple="true"
                      >
                        <template v-if="componenteSeleccionado != 'Servidor de Video' && componenteSeleccionado != 'Servidor de Plaza'" slot="selection" slot-scope="{ values, isOpen }">
                          <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                        </template>
                      </multiselect>
                    <div v-if="statusMetro">
                      <input v-model="cantidadMetro" type="number" class="w-24" placeholder="Cantidad">
                    </div>                      
                    <div class="justify-center flex mt-5">
                        <button v-on:click.stop.prevent="agregarPartida()" class="botonIconCrear m-6">Agregar</button>
                        <button @click="botoncancelar_modal" class="botonIconCancelar font-boton m-6">Cancelar</button>
                    </div>
                </div>
            </div>
    </div>
    <TablaEquipoPropuesto :listaEquipo="arrayPartidas"></TablaEquipoPropuesto>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import TablaEquipoPropuesto from "../DTC/TablaEquipoPropuesto.vue";
import Service from "../../services/EquipoMaloService.js";
import EventBus from '../../services/EventBus'
import moment from "moment";
import { mapState } from 'vuex';
export default {
  name: "TablaEquipoMalo",
  components: {
    Multiselect,
    TablaEquipoPropuesto,
  },
  data() {
    return {
      showModal: false,
      datosPrePartida: {
        rowPartida: [],
        rowUnidad: [],
        rowName: "",
        rowCantidad: 0,
        rowMarca: [],
        rowModelo: [],
        rowNumSerie: [],
        rowUbicacion: [],
        rowDateInstalacion: [],
        rowDateMantenimiento: [],
        rowFolioMantenimiento: [],
        rowDateReal: [],
        rowDateFabricante: [],
        rowPrecio: [],
        rowUp: true,
      },
      arrayPartidas: [],
      //nombre del Compoente    
      componenteSeleccionado: "",     
      scrollBool: true,
      statusMetro: false,
      cantidadMetro: 0,
      //Multiselect Normal
      listLane: [],
      laneSelect: [],
      //datos para editar Componente
      saveObjectEdiar: [],
      objectEditar: {},
      updtCompEditar: "",
      listLaneEditar: [],
      laneSelectEditar: [],
      //Modal atributos
      modal: false,
      objectModal: {},
      pruebasMultiselect: [],
      //Cambios Inserte RelationShip
      relationShipPrincipal: "",
      arrayDmg: []
    };
  },
/////////////////////////////////////////////////////////////////////
////                          PROPS                              ////
/////////////////////////////////////////////////////////////////////
props: {
  listaComponentes: {
      type: Array,
      default: () => [],
  },
  dateSinester: {
      type: String,
      required: true,
      default: "",
  },
},
//////////////////////////////////////////////////////////////////////
////                    CICLOS DE VIDA                            ////
/////////////////////////////////////////////////////////////////////
created(){
  EventBus.$on('insertar-componetes-dañados', (objInsert) => {
    this.mapear_componetes_dañados(objInsert)    
  })
},
beforeMount: async function () {
    let componetesEdit = await this.$store.state.DTC.componetesEdit
    if (JSON.stringify(componetesEdit) != "{}") {   
      let newObject = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];                  
      for (const item of componetesEdit.items) {                     
        newObject["attachedId"] = item.attachedId;
        newObject["componentsRelationship"] = item.relationship;
        newObject["componentsRelationshipId"] = item.mainRelationship;                    
        await this.$store.dispatch("Refacciones/buscarComponenteId",newObject);          
        let array_ubicacion = [];
        let array_carril = [];
        let array_cantidad = [];
        componetesEdit.serialNumbers.map((lane) => {            
          if (item.item == lane.item) {
            array_ubicacion.push(lane.tableFolio);
            array_carril.push(lane.lane);
            array_cantidad.push(lane.amount)
          }
        });                  
        let cantidad = array_cantidad.every(ammont => ammont == 0) == true
        ? array_cantidad.length
        : parseInt(array_cantidad[0])          
                                                  
        let new_partida = Service.lane_select(
          array_ubicacion,
          undefined, //Key_partidas
          this.listaRefaccionesValid,
          this.dateSinester,
          item.mainRelationship,
          true,
          cantidad            
        );                   
        new_partida["row1"] = this.arrayPartidas.length + 1;
        new_partida["row3"] = {
          description: item.name,
          attachedId: item.attachedId,
          componentsRelationship: item.relationship,
          componentsRelationshipId: item.mainRelationship,
          vitalComponent: item.vitalComponent,
        };            
        this.arrayPartidas.push(new_partida);
        
      }
    } 
},
destroyed: function () {
    this.arrayPartidas = [];
    this.$store.commit("DTC/LIMPIAR_LISTA_DTC_DAÑADO_MUTATION");
    this.$store.commit("DTC/insertDmgCompleteMutation", false);
    this.$store.commit("Header/insertHeaderCompleteMutation", false);
    this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
    this.$store.commit("Header/clearDatosSinesterMutation");
    this.$store.commit("DTC/COMPONENTES_EDIT", {});
    this.$store.commit("Header/DIAGNOSTICO_MUTATION", "");
    EventBus.$off('insertar-componetes-dañados')
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  mapear_componetes_dañados:  function(objInsert){    
    let new_promise = new Promise((resolve, reject) => {
    let newObjectConvenio = this.$store.getters["Header/GET_CONVENIO_PLAZA"];        
    let arrayDmg = []
    this.arrayPartidas.forEach(async(partida, index) => {      
      newObjectConvenio["attachedId"] = partida.row3.attachedId;
      newObjectConvenio["componentsRelationship"] = partida.row3.componentsRelationship;
      newObjectConvenio["componentsRelationshipId"] = partida.row3.componentsRelationshipId;        
      await this.$store.dispatch("Refacciones/buscarComponenteId", newObjectConvenio);      
      let nuevaPartidaInsert = await Service.obj_partida(partida.row8, this.listaRefaccionesValid, this.dateSinester, partida.row3.componentsRelationshipId, undefined, partida.row4)          
      let nuevoArray = nuevaPartidaInsert.map((item) => {
        item["IntPartida"] = index + 1
        item["ReferenceNumber"] = objInsert.refNum   
        return item  
      })
      nuevoArray.forEach(item => {
        arrayDmg.push(item)
      }) 
      if(arrayDmg.length == 0)
        reject('Mal')
      else       
        resolve(arrayDmg)              
    }) 
    })
    setTimeout(() => {
      new_promise.then((array) => {        
        EventBus.$emit('enviar-componete', { arrayDmg: array, refNum: objInsert.refNum, flagCreate: objInsert.flagCreate, status: objInsert.status })
      })
      
    }, 2000)
  },
  eliminar_partida(index){
    this.arrayPartidas.splice(index, 1)
  },
  UnClick() { this.componenteSeleccionado = "" },
  modalAgregarComp: function (){ this.showModal = true },  
  botoncancelar_modal: function (){ this.showModal = false; this.laneSelect = ''; this.componenteSeleccionado = ''},  
  cambiar_componente: async function (value) {        
    this.listLane = []; this.laneSelect = []; this.statusMetro = false; this.cantidadMetro = 0;
    for(const propiedades in this.datosPrePartida) {
      this.datosPrePartida[propiedades] = [];            
    }
    const clousere_validar_componete = () => {            
      let componeteRepetido = this.arrayPartidas
        .find(partida => { 
          return partida.row3.description == value.description && 
          partida.row3.componentsRelationship == value.componentsRelationship
        }
      )          
      if(componeteRepetido == undefined) return true
      else{
        if(componeteRepetido.row2 == 'METRO'){
          this.statusMetro
          return true
        }
      } 
    }                              
    if (clousere_validar_componete()) {
      let newObject = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];        
      newObject["attachedId"] = this.componenteSeleccionado.attachedId;
      newObject["componentsRelationship"] = this.componenteSeleccionado.componentsRelationship;
      newObject["componentsRelationshipId"] = this.componenteSeleccionado.componentsRelationshipId;        
      await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      this.listLane = await this.$store.state.Refacciones.listaLane
      this.relationShipPrincipal = this.componenteSeleccionado.componentsRelationship;      
      if (this.listLane.length == 0) {
        this.$notify.warning({
          title: "Ups!",
          msg: `EL COMPONENTE NO ESTA INSTALADO.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    } else {        
      this.$notify.warning({
        title: "Ups!",
        msg: `EL COMPONENTE ESTA REPETIDO.`,
        position: "bottom right",
        styles: {
          height: 100,
          width: 500,
        },
      });
      this.componenteSeleccionado = '';        
    }
  },
  agregarPartida: async function () {
      if (this.componenteSeleccionado != "") {
        if (this.laneSelect.length > 0) {                
          let new_partida = Service.lane_select(
            this.laneSelect,
            undefined,//key_partidas
            this.listaRefaccionesValid,
            this.dateSinester,
            this.relationShipPrincipal,
            null,
            this.statusMetro == true ? this.cantidadMetro : this.laneSelect.length
          );
          new_partida["row1"] = this.arrayPartidas.length + 1;
          new_partida["row3"] = this.componenteSeleccionado;
          new_partida["row8"] = this.laneSelect;          
          this.arrayPartidas.push(new_partida);
          //LIMPIA LA LISTA PRE_PARTIDA
          for (const propiedades in this.datosPrePartida) {
            if (propiedades == "rowCantidad")
              this.datosPrePartida[propiedades] = 0;
            else this.datosPrePartida[propiedades] = [];
          }
          //LIMPIAMOS COMPONENTE Y LANE
          this.componenteSeleccionado = ""; this.laneSelect = []; this.listLane = []; this.statusMetro = false; this.showModal= false        
        } else {
          this.$notify.warning({
            title: "Ups!",
            msg: `FALTA AGREGAR LA UBICACION.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `FALTA AGREGAR UN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
  infoModal: function (value) {
      this.modal = true;
      this.objectModal = Object.assign(this.arrayPartidas[value]);
  },
},
/////////////////////////////////////////////////////////////////////
////                     OBSERVADORES                            ////
/////////////////////////////////////////////////////////////////////
watch: {
  laneSelect: async function (newValue) {
      //Limpiar los datos pre partida
      for (const propiedades in this.datosPrePartida) {
        if (propiedades == "rowCantidad") this.datosPrePartida[propiedades] = 0;
        else this.datosPrePartida[propiedades] = [];
      }      
      if (newValue.length > 0) {        
        this.datosPrePartida = Service.lane_select(
          newValue,
          this.datosPrePartida,
          this.listaRefaccionesValid,
          this.dateSinester,
          this.relationShipPrincipal,
          undefined,//Editar 
          newValue.length         
        );
        if(this.datosPrePartida.rowUnidad == 'METRO')
          this.statusMetro = true
      }    
  },
},
computed: {
    ...mapState({
        listaRefaccionesValid: state => state.Refacciones.listaRefaccionesValid,
        convenioActual: state => state.Header.convenioActual
    })  
},
/////////////////////////////////////////////////////////////////////
////                          FILTROS                            ////
/////////////////////////////////////////////////////////////////////
filters: {
  formatDate: function (value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
  },
  formatPlaza: function (value) {
      return value;
  },
},
};
</script>

