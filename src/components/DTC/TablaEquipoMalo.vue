<template>
  <div class="m-0 bg-white">
    <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center" :class="{'blur-content': modal}">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
      >
        <!-- ************************************************************** -->

        <div class="divtitle2 h-14 mt-48">
          <h6 class="title2">Equipo Dañado</h6>
        </div>
        <br />

        <!-- ************************************************************** -->

        <table class="border-gray-700 border-solid" style="width:100%">
          <tr>
            <th>Partida</th>
            <th>Unidad</th>
            <th style="color: red;">Componente</th>
            <th style="width: 2vw; color: red;">Cantidad</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Numero de Serie</th>
            <th style="color: red">
              Ubicacion
              <br />(carril/cuerpo)
            </th>
            <th>Fecha de Instalacion</th>
            <th class="text-xs">
              Fecha
              <br />(Ultimo Mantenimiento)
            </th>
            <th class="text-xs">
              Folio
              <br />(Ultimo Mantenimiento)
            </th>
            <th>Real</th>
            <th>Fabricante</th>
            <th></th>
          </tr>

          <tr
            style="text-align: center"
            class="hover:bg-blue-200 text-center"
            v-for="(equipo, index) in listaComponentesSelect"
            :key="index"
          >
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row1 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd1 }}
              </template>              
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row2 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd2 }}
              </template>              
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row3 }}
              </template>
              <template v-else>
                <select
                  @change="UpdateCompEditado()"
                  v-model="updtCompEditar"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 10vw;"
                  type="text"
                >
                  <option disabled value>Selecionar...</option>
                  <option
                    v-for="(item, index) in listaComponentes"
                    v-bind:value="item.text"
                    :key="index"
                    >{{ item.text }}</option
                  >
                </select></template
              >
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row4 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd4 }}
              </template>  
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row5 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd5 }}
              </template>  
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
                 <template v-if="equipo.rowUp">
                {{ equipo.row6 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd6 }}
              </template>  
            </td>
            <td
              class="border-b border-black border-2"
              style="
 max-width: 7vw;
 height: auto;
 overflow: hidden;
 text-align: center;
  "
            >
            <tenplete v-if="equipo.rowUp">
                <p>{{ equipo.row7 + "\n" }}</p>
            </tenplete>
            
            <tenplete v-else>
                <p>{{ numSerieSelectEditar + "\n" }}</p>
            </tenplete>
              
              
            
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">{{ equipo.row8 }}</template
              ><template v-else>
                <multiselect
                  v-model="laneSelectEditar"
                  :close-on-select="false"
                  :clear-on-select="true"
                  :hideSelected="false"
                  placeholder="Selecciona..."
                  :options="listLaneEditar"
                  multiple="true"
                >
                  <template
                    slot="selection"
                    slot-scope="{ values, search, isOpen }"
                  >
                    <span
                      class="multiselect__single"
                      v-if="values.length &amp;&amp; !isOpen"
                      >{{ values.length }} Carriles</span
                    >
                  </template>
                </multiselect></template
              >
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row9 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd9 }}
              </template>
           
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">{{ equipo.row10 }}</template
              ><template v-else>
                 <input
                v-model="objectEditar.rowUpd10"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                placeholder="Folio"
                type="date"
              />
             </template>
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">{{ equipo.row11 }}</template
              ><template v-else>
                <input
                v-model="objectEditar.rowUpd11"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                type="text"
              />
              </template>
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">{{ equipo.row12 }}</template
              ><template v-else>
                   <input
                v-model="objectEditar.rowUpd12"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                type="date"
              />
                
              </template>
            </td>
            <td class="border-b border-black p-2 md:p-3 border-2">
              <template v-if="equipo.rowUp">
                {{ equipo.row13 }}
              </template>
              <template v-else>
                {{ objectEditar.rowUpd13 }}
              </template>
            </td>

            <td class="border-b border-black md:p-3 border-2">
              <template v-if="equipo.rowUp">                
                <button
                  @click="deleteItem(index)"
                  class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                >
                  Eliminar
                </button>
                <br />
                <br />
                <button
                  @click="updateRowTable(index, equipo)"
                  class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-yellow-400 hover:bg-yellow-500"
                >
                  Editar
                </button>
              
              </template>
              <template v-else>
                <button
                  @click="abortUpdateRowTable(index)"
                  class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                >
                  Cancelar
                </button>
                <br />
                <br />
                <button
                  @click="confirmRowTable(index, equipo)"
                  class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-green-400 hover:bg-green-500"
                >
                  Aceptar
                </button>
              
              </template>
            </td>
          </tr>

          <tr style="text-align: center">
            <td class="border-b border-black p-2 md:p-1 border-2">{{ "*" }}</td>
            <td class="border-b  border-black p-2 md:p-1 border-2">
              <input
                v-model="datosDisable.unity"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 4vw"
                placeholder="Pza"
              />
            </td>

            <td class="border-b border-black p-2 md:p-1 border-2">
              <select
                @change="UpdateComp()"
                v-model="updtComp"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 10vw;"
                type="text"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(item, index) in listaComponentes"
                  v-bind:value="item.text"
                  :key="index"
                  >{{ item.text }}</option
                >
              </select>
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosManuales.cantidad"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 4vw"
              />
            </td>            
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosDisable.brand"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 6vw"
                placeholder="M60-31"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosDisable.model"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 6vw"
                placeholder="FD1103"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="numSerieSelect"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 6vw"
                placeholder="S/N"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <multiselect
                v-model="laneSelect"
                :close-on-select="false"
                :clear-on-select="true"
                :hideSelected="false"
                placeholder="Selecciona..."
                :options="listLane"
                multiple="true"
              >
                <template
                  slot="selection"
                  slot-scope="{ values, search, isOpen }"
                >
                  <span
                    class="multiselect__single"
                    v-if="values.length &amp;&amp; !isOpen"
                    >{{ values.length }} Carriles</span
                  >
                </template>
              </multiselect>
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosDisable.instalationDate"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                type="text"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosManuales.dateMantenimiento"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                type="date"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosManuales.folioMantenimiento"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                placeholder="Folio"
                type="text"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosManuales.tiempoVidaReal"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 7vw"
                type="date"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosDisable.lifeTime"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 6vw"
                placeholder="Numero de años"
              />
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <button
                @click="agregarPartida()"
                class="appearance-none bg-green-400 w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                style="width: 6vw"
              >
                Validar Partida
              </button>
            </td>
          </tr>
        </table>

        <br />
      </div>
    </form>
    <TablaEquipoPropuesto :listaEquipo="listaComponentesSelect"></TablaEquipoPropuesto>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import TablaEquipoPropuesto from "../DTC/TablaEquipoPropuesto.vue";

export default {
  name: "TablaEquipoMalo",
  components: {
    Multiselect,
    TablaEquipoPropuesto
  },
  data() {
    return {

      boolUodateTable: true,
      //nombre del Compoente
      updtComp: "",
      //datos ninamico Compnente
      datosDisable: {},
      //datos de Tabla Principal      
      datosDmgComponent: {
        ComponentsStockId: "",
        ReferenceNumber: "",
        CapufeLaneNum: [],
        IdGare: [],
        Marca: "",
        Modelo: "",
        NumSerie: [],
        Unity: "",
        dateInstallationDate: "",
        dateMaintenanceDate: "",
        intLifeTimeExpected: "",
        dateLifeTimeReal: ""
      },
      datosManuales: {
        cantidad: 0,
        dateMantenimiento: "",
        folioMantenimiento: "",
        tiempoVidaReal: ""
      },
      //Multiselect Normal
      listLane: [],
      laneSelect: null,

      idGareSelect: [],
      capufeLaneSelect: [],
      numSerieSelect: [],

      //lista que se paso por prop
      listaComponentesSelect: [],

      //datos para editar Componente
      saveObjectEdiar:[],
      objectEditar: {},

      updtCompEditar: "",
      listLaneEditar: [],
      laneSelectEditar: [],

      idGareSelectEditar: [],
      capufeLaneSelectEditar: [],
      numSerieSelectEditar: [],

      
    };
  },
  props: {
    listaComponentes: {
      type: Array,
      default: () => []
    },
    numReference: {
      type: String,
      default: ""
    }
  },
  methods: {
    UpdateComp: async function() {
      let newObject = await this.$store.getters["Header/getConvenioPlaza"];
      newObject["id"] = this.updtComp;
      await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      this.datosDisable = await this.$store.getters[
        "Refacciones/getComponentDisable"
      ];
      this.listLane = await this.$store.getters["Refacciones/getListaLane"];
    },
    UpdateCompEditado:async function() {      
      this.laneSelectEditar = []
      this.numSerieSelectEditar = []
      this.idGareSelectEditar = []
      this.capufeLaneSelectEditar =  []
      this.objectEditar.rowUpd10 = ''
      this.objectEditar.rowUpd11 = ''
      this.objectEditar.rowUpd12 = ''
      let newObject = await this.$store.getters["Header/getConvenioPlaza"];
      newObject["id"] = this.updtCompEditar;
      await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      let datosDisable = await this.$store.getters[
        "Refacciones/getComponentDisable"
      ];
      this.listLaneEditar = await this.$store.getters["Refacciones/getListaLane"];
      this.objectEditar.rowUpd3 = this.updtCompEditar
      this.objectEditar.rowUpd2 = datosDisable.unity
      this.objectEditar.rowUpd5 = datosDisable.brand
      this.objectEditar.rowUpd6 = datosDisable.model
      this.objectEditar.rowUpd9 = datosDisable.instalationDate
      this.objectEditar.rowUpd13 = datosDisable.lifeTime
      this.objectEditar.rowUpd14 = datosDisable.unitaryPrice 
      this.objectEditar.rowIdComponent = datosDisable.componentsStockId 
      
      
    },
    deleteItem(index) {
      this.listaComponentesSelect.splice(index, 1);

      for (let i = 0; i < this.listaComponentesSelect.length; i++)
        this.listaComponentesSelect[i]["row1"] = i + 1;

      this.$store.commit("DTC/listaDmgMutationDelete", index);
    },
    updateRowTable: async function(index, datos) {      
      this.UpdateCompEditado()
      this.listaComponentesSelect[index]["rowUp"] = false;

      this.saveObjectEdiar = Object.values(datos)

      let newObjectEdit = {
        rowUpd1: this.saveObjectEdiar[0],
        rowUpd2: this.saveObjectEdiar[1],
        rowUpd3: this.saveObjectEdiar[2],
        rowUpd4: this.saveObjectEdiar[3],
        rowUpd5: this.saveObjectEdiar[4],
        rowUpd6: this.saveObjectEdiar[5],
        rowUpd7: this.saveObjectEdiar[6],
        rowUpd8: this.saveObjectEdiar[7],
        rowUpd9: this.saveObjectEdiar[8],
        rowUpd10: this.saveObjectEdiar[9],
        rowUpd11: this.saveObjectEdiar[10],
        rowUpd12: this.saveObjectEdiar[11],
        rowUpd13: this.saveObjectEdiar[12],
        rowUpd14: this.saveObjectEdiar[13],
        rowIdComponent: null        
      }

      this.objectEditar = newObjectEdit      
      this.updtCompEditar = datos.row3
      this.laneSelectEditar = datos.row8.split(",")
      this.numSerieSelectEditar = datos.row7.split(",")
    },   
    confirmRowTable: function(index){

      this.listaComponentesSelect[index]["row1"] = this.objectEditar.rowUpd1
      this.listaComponentesSelect[index]["row2"] = this.objectEditar.rowUpd2
      this.listaComponentesSelect[index]["row3"] = this.objectEditar.rowUpd3
      this.listaComponentesSelect[index]["row4"] = this.objectEditar.rowUpd4
      this.listaComponentesSelect[index]["row5"] = this.objectEditar.rowUpd5
      this.listaComponentesSelect[index]["row6"] = this.objectEditar.rowUpd6
      this.listaComponentesSelect[index]["row7"] = this.numSerieSelectEditar
      this.listaComponentesSelect[index]["row8"] = this.laneSelectEditar
      this.listaComponentesSelect[index]["row9"] = this.objectEditar.rowUpd9
      this.listaComponentesSelect[index]["row10"] = this.objectEditar.rowUpd10
      this.listaComponentesSelect[index]["row11"] = this.objectEditar.rowUpd11
      this.listaComponentesSelect[index]["row12"] = this.objectEditar.rowUpd12
      this.listaComponentesSelect[index]["row13"] = this.objectEditar.rowUpd13
      this.listaComponentesSelect[index]["rowUp"] = true;
      this.saveObjectEdiar = []
      this.objectEditar = {}

      
    },
    abortUpdateRowTable: function(index) {             
      
      this.listaComponentesSelect[index]["row1"] = this.saveObjectEdiar[0]
      this.listaComponentesSelect[index]["row2"] = this.saveObjectEdiar[1]
      this.listaComponentesSelect[index]["row3"] = this.saveObjectEdiar[2]
      this.listaComponentesSelect[index]["row4"] = this.saveObjectEdiar[3]
      this.listaComponentesSelect[index]["row5"] = this.saveObjectEdiar[4]
      this.listaComponentesSelect[index]["row6"] = this.saveObjectEdiar[5]
      this.listaComponentesSelect[index]["row7"] = this.saveObjectEdiar[6]
      this.listaComponentesSelect[index]["row8"] = this.saveObjectEdiar[7]
      this.listaComponentesSelect[index]["row9"] = this.saveObjectEdiar[8]
      this.listaComponentesSelect[index]["row10"] = this.saveObjectEdiar[9]
      this.listaComponentesSelect[index]["row11"] = this.saveObjectEdiar[10]
      this.listaComponentesSelect[index]["row12"] = this.saveObjectEdiar[11]
      this.listaComponentesSelect[index]["row13"] = this.saveObjectEdiar[12]
      this.listaComponentesSelect[index]["rowUp"] = true;
      this.saveObjectEdiar = []
      this.objectEditar = {}
    },
    agregarPartida: function() {
      let newObject = {
        row1: this.listaComponentesSelect.length + 1,
        row2: this.datosDisable.unity,
        row3: this.updtComp,
        row4: this.datosManuales.cantidad,
        row5: this.datosDisable.brand,
        row6: this.datosDisable.model,
        row7: this.numSerieSelect.toString(),
        row8: this.laneSelect.toString(),
        row9: this.datosDisable.instalationDate,
        row10: this.datosManuales.dateMantenimiento,
        row11: this.datosManuales.folioMantenimiento,
        row12: this.datosManuales.tiempoVidaReal,
        row13: this.datosDisable.lifeTime,
        row14: this.datosDisable.unitaryPrice,
        rowUp: true
      };

      console.log(newObject);
      this.listaComponentesSelect.push(newObject);

      //Se LLena el objeto Dmg para Insertar Componentes
      this.datosDmgComponent.ComponentsStockId = this.datosDisable.componentsStockId;
      this.datosDmgComponent.ReferenceNumber = this.numReference;
      this.datosDmgComponent.CapufeLaneNum = this.capufeLaneSelect;
      this.datosDmgComponent.IdGare = this.idGareSelect;
      this.datosDmgComponent.Marca = this.datosDisable.brand;
      this.datosDmgComponent.Modelo = this.datosDisable.model;
      this.datosDmgComponent.NumSerie = this.numSerieSelect;
      this.datosDmgComponent.Unity = this.datosDisable.unity;
      this.datosDmgComponent.dateInstallationDate = this.datosDisable.instalationDate;
      this.datosDmgComponent.dateMaintenanceDate = this.datosManuales.dateMantenimiento;
      this.datosDmgComponent.intLifeTimeExpected = this.datosDisable.lifeTime;
      this.datosDmgComponent.dateLifeTimeReal = this.datosManuales.tiempoVidaReal;

      console.log(this.datosDmgComponent);

      this.$store.commit("DTC/listaDmgMutationPush", this.datosDmgComponent);

      this.datosDmgComponent = {};
      this.datosDisable = {};
      this.datosManuales = {};
      this.numSerieSelect = [];
      this.idGareSelect = [];
      this.capufeLaneSelect = [];
      this.laneSelect = [];
      this.updtComp = "";
    }
  },
  watch: {
    updtComp: function() {
      this.laneSelect = null;
      this.datosDisable = {};
      this.numSerieSelect = [];
      this.idGareSelect = [];
      this.capufeLaneSelect = [];
    },  
    laneSelect: async function(newValue) {
      let equipoMalo = await this.$store.getters["Refacciones/getEquipoMalo"];
      this.datosManuales.cantidad = newValue.length;
      this.numSerieSelect = [];
      this.idGareSelect = [];
      this.capufeLaneSelect = [];
      if (newValue.length === 1) {
        let item = equipoMalo.filter(x => x.lane == newValue[0]);
        console.log(item[0]);
        this.numSerieSelect.push(item[0]["serialNumber"]);
        this.capufeLaneSelect.push(item[0]["capufeLaneNum"]);
        this.idGareSelect.push(item[0]["idGare"]);
      } 
      else {
          for (let i = 0; i < newValue.length; i++) {
            let item = equipoMalo.filter(x => x.lane == newValue[i]);          
            this.numSerieSelect.push(item[0]["serialNumber"]);
            this.capufeLaneSelect.push(item[0]["capufeLaneNum"]);
            this.idGareSelect.push(item[0]["idGare"]);
         }
      }
    },
    laneSelectEditar: async function(newValue) {
      let equipoMalo = await this.$store.getters["Refacciones/getEquipoMalo"];
      this.objectEditar.rowUpd4 = newValue.length;
      this.numSerieSelectEditar = [];
      this.idGareSelectEditar = [];
      this.capufeLaneSelectEditar = [];
      if (newValue.length === 1) {
        let item = equipoMalo.filter(x => x.lane == newValue[0]);
        console.log(item[0]);
        this.numSerieSelectEditar.push(item[0]["serialNumber"]);
        this.capufeLaneSelectEditar.push(item[0]["capufeLaneNum"]);
        this.idGareSelectEditar.push(item[0]["idGare"]);
      } 
      else {
          for (let i = 0; i < newValue.length; i++) {
            let item = equipoMalo.filter(x => x.lane == newValue[i]);          
            this.numSerieSelectEditar.push(item[0]["serialNumber"]);
            this.capufeLaneSelectEditar.push(item[0]["capufeLaneNum"]);
            this.idGareSelectEditar.push(item[0]["idGare"]);
         }
      }
    }
  }
};
</script>

<style scoped>

.blur-content{
  filter: blur(5px); 
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 2vw;
  border: 2px solid black;
}

.divtitle {
  margin: 0 auto;
}

.divtitle2 {
  margin: 0 auto;
}

.title2 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20%;
  margin-top: 30%;
  font-size: 1.2vw;
  border: 2px solid black;
}

.imgRefNum {
  display: grid;
  grid-template-columns: 20% 80%;
}

.input {
  text-align: end;
  padding-top: 5vh;
}

.fecha {
  width: 12.1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
}

.grid-container3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
  padding-left: 3vw;
}

label {
  font-weight: bold;
  color: black;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}

.grid-container2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -4vh;
  overflow: hidden;
}

.staticLabel {
  font-weight: normal;
}

.lastContainer {
  display: flex;
  flex-direction: row;
}

.divDescription {
  display: inline-block;
  padding-left: 2vw;
  width: 10vw;
}

.divLastTable {
  display: inline-block;
  padding-bottom: 1vh;
}

.inputDesc {
  height: 10vh;
  width: 18vw;
}

.divLastTable {
  border-spacing: 10px;
  border-collapse: separate;
  display: inline-block;
}

.relleno {
  display: inline-block;
}

@media (max-width: 750px) {
  .grid-container {
    margin-bottom: 0;
  }
  .grid-container2 {
    margin-bottom: 0;
  }
}
</style>
