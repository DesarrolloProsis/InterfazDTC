<template>
  <div class="m-0 bg-white">
    <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
      >
        <!-- ************************************************************** -->

        <div class="divtitle2 h-14 mt-48">
          <h6 class="title2">Equipo Dañado</h6>
        </div>
        <br />

        <!-- ************************************************************** -->

        <!-- <div class="grid-container3" style="text-align: center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div class="labelInput">
              <label class="atntn" for="inline-full-name">Ultimo Mantenimiento</label>
            </div>
            <div class="labelInput2">
              <label class for="inline-full-name">Tiempo de Vida:</label>
            </div>
          </div>
        <br />-->

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
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row1}}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row2 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row3 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row4 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row5 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row6 }}</td>
            <td class="border-b border-black border-2" style="
 max-width: 7vw;
 height: auto;
 overflow: hidden;
 text-align: center;
  "><p>{{ equipo.row7+"\n"  }}</p></td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row8 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row9 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row10 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row11 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row12 }}</td>
            <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row13 }}</td>

            <td class="border-b border-black md:p-3 border-2">
            <div >
              <button
                @click="deleteItem(index)"
                class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
              >
                Eliminar
              </button>
              <br/>
              <br/>
              <button
                @click="updateItem(index)"
                class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-indigo-400 hover:bg-indigo-500"
              >
                Actualizar
              </button>
            </div>
            </td>
          </tr>

          <tr style="text-align: center">
            <td class="border-b border-black p-2 md:p-1 border-2">{{'*'}}</td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosDisable.unity"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 6vw"
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
                >{{item.text}}</option>
              </select>
            </td>
            <td class="border-b border-black p-2 md:p-1 border-2">
              <input
                v-model="datosManuales.cantidad"
                disabled
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                type="text"
                style="width: 6vw"
              />
            </td>

            <!-- MARCA -->
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
                <template slot="selection" slot-scope="{ values, search, isOpen }">
                  <span
                    class="multiselect__single"
                    v-if="values.length &amp;&amp; !isOpen"
                  >{{ values.length }} Carriles</span>
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
              >Validar Partida</button>
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
      updtComp: "",
      datosDisable: {},
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
        intLifeTimeExpected: 0,
        dateLifeTimeReal: ""
      },
      datosManuales: {
        cantidad: 0,
        dateMantenimiento: "",
        folioMantenimiento: "",
        tiempoVidaReal: ""
      },
      //Multiselect
      listLane: [],
      laneSelect: null,

      idGareSelect: [],
      capufeLaneSelect: [],
      numSerieSelect: [],

      listaComponentesSelect: []
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

    deleteItem(index) {
            
      this.listaComponentesSelect.splice(index, 1)      

      for(let i = 0; i < this.listaComponentesSelect.length; i++)
        this.listaComponentesSelect[i]['row1'] = i + 1
      
      this.$store.commit('DTC/listaDmgMutationDelete', index)
            
    },
    // updateItem(index){

    // },
    
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
        row14: this.datosDisable.unitaryPrice
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

      console.log(this.datosDmgComponent)
      

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
      } else {
        for (let i = 0; i < newValue.length; i++) {
          let item = equipoMalo.filter(x => x.lane == newValue[i]);
          console.log(item[0]);
          this.numSerieSelect.push(item[0]["serialNumber"]);
          this.capufeLaneSelect.push(item[0]["capufeLaneNum"]);
          this.idGareSelect.push(item[0]["idGare"]);
        }
      }
    }
  }
};
</script>


<style scoped>
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


