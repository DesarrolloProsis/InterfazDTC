<template>
  <div>
    <div class="flex flex-wrap border border-black justify-center sm:p-4 md:m-5">
      <div class="inline">
        <!-- ************************************************************** -->

        <div class="text-center text-2xl font-bold mb-6">
          <h6>Equipo Dañado</h6>
        </div>
        <br />

        <!-- ************************************************************** -->
        <div class="overflow-x-scroll">
          <table class="border-gray-700 border-solid w-auto">
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
              v-for="(equipo, index) in arrayPartidas"
              :key="index"
            >
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row1.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd1 }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row2.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd2.toString() }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row3.toString() }}</div>
                <div v-else>
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
                      v-bind:value="item.description"
                      :key="index"
                    >{{ item.description }}</option>
                  </select>
                </div>
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row4.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd4.toString() }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row5.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd5.toString() }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row6.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd6.toString() }}</div>
              </td>
              <td
                class="border-b border-black border-2"
                style="max-width: 7vw; height: auto; overflow: hidden; text-align: center;"
              >
                <div v-if="equipo.rowUp">
                  <p v-for="(item, key) in equipo.row7" :key="key">{{ item }}</p>
                </div>
                <div v-else>
                  <p v-for="(item, key) in objectEditar.rowUpd7" :key="key">{{ item }}</p>
                </div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">
                  <p v-for="(item, key) in equipo.row8" :key="key">{{ item }}</p>
                </div>
                <div v-else>
                  <multiselect
                    v-model="laneSelectEditar"
                    :close-on-select="false"
                    :clear-on-select="true"
                    :hideSelected="false"
                    placeholder="Selecciona..."
                    :options="listLaneEditar"
                    :multiple="true"
                  >
                    <template
                      v-if="updtCompEditar != 'Servidor de Video' && updtCompEditar != 'Servidor de Plaza'"
                      slot="selection"
                      slot-scope="{ values, isOpen }"
                    >
                      <span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                      >{{ values.length }} Carriles</span>
                    </template>
                  </multiselect>
                </div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row9.toString().substring(0,10) }}</div>
                <div v-else>{{ objectEditar.rowUpd9.toString().substring(0,10) }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row10.toString().substring(0,10) }}</div>
                <div v-else>{{ objectEditar.rowUpd10.toString().substring(0,10) }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row11.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd11.toString() }}</div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row12.toString() }}</div>
                <div v-else>
                  <input
                    v-model="objectEditar.rowUpd12"
                    class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                    style="width: 7vw"
                    type="date"
                  />
                </div>
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">
                <div v-if="equipo.rowUp">{{ equipo.row13.toString() }}</div>
                <div v-else>{{ objectEditar.rowUpd13.toString() }}</div>
              </td>

              <td class="border-b border-black md:p-3 border-2">
                <div v-if="equipo.rowUp">
                  <button
                    v-on:click.stop.prevent="deleteItem(equipo.row3, index)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                  >Eliminar</button>
                  <br />
                  <br />
                  <button
                    v-on:click.stop.prevent="updateRowTable(index, equipo)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-yellow-400 hover:bg-yellow-500"
                  >Editar</button>
                </div>
                <div v-else>
                  <button
                    v-on:click.stop.prevent="abortUpdateRowTable(index)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                  >Cancelar</button>
                  <br />
                  <br />
                  <button
                    v-on:click.stop.prevent="confirmRowTable(index, equipo)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-green-400 hover:bg-green-500"
                  >Aceptar</button>
                </div>
              </td>
            </tr>

            <tr style="text-align: center">
              <td class="border-b border-black p-2 md:p-1 border-2">{{ "*" }}</td>
              <td
                class="border-b border-black p-2 md:p-1 border-2"
              >{{ datosPrePartida.rowUnidad.toString() }}</td>
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
                    v-bind:value="item.description"
                    :key="index"
                  >{{ item.description }}</option>
                </select>
              </td>
              <td
                class="border-b border-black p-2 md:p-1 border-2"
              >{{ datosPrePartida.rowCantidad }}</td>
              <td
                class="border-b border-black p-2 md:p-1 border-2 w-32"
              >{{ datosPrePartida.rowMarca.toString() }}</td>
              <td
                class="border-b border-black p-2 md:p-1 border-2 w-32"
              >{{ datosPrePartida.rowModelo.toString() }}</td>
              <td class="border-b border-black p-2 md:p-1 border-2 text-justify">
                <p
                  v-for="(item, key) in datosPrePartida.rowNumSerie"
                  :key="key"
                  class="text-sm"
                >{{ item }}</p>
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <multiselect
                  v-model="laneSelect"
                  :close-on-select="false"
                  :clear-on-select="true"
                  :hideSelected="false"
                  placeholder="Selecciona..."
                  :options="listLane"
                  :multiple="true"
                >
                  <template
                    v-if="updtComp != 'Servidor de Video' && updtComp != 'Servidor de Plaza'"
                    slot="selection"
                    slot-scope="{ values, isOpen }"
                  >
                    <span
                      class="multiselect__single"
                      v-if="values.length &amp;&amp; !isOpen"
                    >{{ values.length }} Carriles</span>
                  </template>
                </multiselect>
              </td>
              <td
                class="border-b border-black p-2 md:p-1 border-2 w-32"
              >{{datosPrePartida.rowDateInstalacion.toString().substring(0,10) }}</td>
              <td
                class="border-b border-black p-2 md:p-1 border-2 w-32"
              >{{ datosPrePartida.rowDateMantenimiento.toString().substring(0,10) }}</td>
              <td
                class="border-b border-black p-2 md:p-1 border-2"
              >{{ datosPrePartida.rowFolioMantenimiento.toString() }}</td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 7vw"
                  type="date"
                />
              </td>
              <td
                class="border-b border-black p-2 md:p-1 border-2"
              >{{datosPrePartida.rowDateFabricante.toString()}}</td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <button
                  v-on:click.stop.prevent="agregarPartida()"
                  :disabled="validBotonPartida"
                  class="appearance-none bg-green-400 w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 6vw"
                >Validar Partida</button>
              </td>
            </tr>
          </table>
        </div>
        <br />
      </div>
    </div>

    <TablaEquipoPropuesto :listaEquipo="arrayPartidas"></TablaEquipoPropuesto>
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
      datosPrePartida: {
        rowPartida: [],
        rowUnidad: [],
        rowCantidad: 0,
        rowMarca: [],
        rowModelo: [],
        rowNumSerie: [],
        rowDateInstalacion: [],
        rowDateMantenimiento: [],
        rowFolioMantenimiento: [],
        rowDateReal: [],
        rowDateFabricante: [],
        rowPrecio: [],
        rowUp: true
      },
      arrayPartidas: [],
      //nombre del Compoente
      updtComp: "",
      //Multiselect Normal
      listLane: [],
      laneSelect: [],
      //datos para editar Componente
      saveObjectEdiar: [],
      objectEditar: {},
      updtCompEditar: "",
      listLaneEditar: [],
      laneSelectEditar: []
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
      let componentrepetido = false;
      this.listLane = [];

      for (let i = 0; i < this.arrayPartidas.length; i++) {
        if (this.arrayPartidas[i]["row3"] == this.updtComp) {
          componentrepetido = true;
        }
      }
      if (!componentrepetido) {
        let newObject = await this.$store.getters["Header/getConvenioPlaza"];
        newObject["id"] = this.updtComp;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);

        this.listLane = await this.$store.getters["Refacciones/getListaLane"];
      } else {
        this.updtComp = "";
        alert("COMPONENTE REPETIDO!!!");
      }
    },
    UpdateCompEditado: async function() {
      let componentrepetido = false;      

      for (let i = 0; i < this.arrayPartidas.length; i++) {
        if (this.arrayPartidas[i]["row3"] == this.updtCompEditar) {
          componentrepetido = true;
        }
      }
      if (!componentrepetido) {
        this.laneSelectEditar = [];

        let newObject = await this.$store.getters["Header/getConvenioPlaza"];
        newObject["id"] = this.updtCompEditar;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLaneEditar = await this.$store.getters[
          "Refacciones/getListaLane"
        ];
        console.log(this.listLaneEditar);
      } else {
        if (this.updtCompEditar == this.saveObjectEdiar[2]) {
          
          alert("ESTA EDITANDO ESE ELEMENTO!!!")

          let newObject = await this.$store.getters["Header/getConvenioPlaza"];
          newObject["id"] = this.updtCompEditar;
          await this.$store.dispatch(
            "Refacciones/buscarComponenteId",
            newObject
          );
          this.listLaneEditar = await this.$store.getters[
            "Refacciones/getListaLane"
          ];
        }
        else{
            
            this.updtCompEditar = ''
             this.laneSelectEditar = [];
             this.listLaneEditar = []
            for (const propiedades in this.objectEditar) {
                this.objectEditar[propiedades] = [];
              }
            alert("COMPONETE REPETIDO!!!");

        }

     
      }
    },
    deleteItem(value, index) {
      
      console.log(index)
      this.arrayPartidas = this.arrayPartidas.filter(
        partida => partida.row3 != value
      );

      for(let i = 0; i < this.arrayPartidas.length; i++){
          this.arrayPartidas[i]['row1'] = i + 1
      }

      this.$store.commit("DTC/listaDmgMutationDelete", value);


    },
    updateRowTable: async function(index, datos) {
      this.arrayPartidas[index]["rowUp"] = false;

      this.saveObjectEdiar = Object.values(datos);

      let newObjEdit = {
        rowUpd1: [],
        rowUpd2: [],
        rowUpd3: "",
        rowUpd4: 0,
        rowUpd5: [],
        rowUpd6: [],
        rowUpd7: [],
        rowUpd8: [],
        rowUpd9: [],
        rowUpd10: [],
        rowUpd11: [],
        rowUpd12: [],
        rowUpd13: [],
        rowUpd14: [],
      };

      this.objectEditar = newObjEdit;
      this.updtCompEditar = this.saveObjectEdiar[2];
      this.laneSelectEditar = this.saveObjectEdiar[7];
      let newObject = await this.$store.getters["Header/getConvenioPlaza"];
      newObject["id"] = this.updtCompEditar;
      await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      this.listLaneEditar = await this.$store.getters[
        "Refacciones/getListaLane"
      ];
    },
    confirmRowTable: async function(index) {
      if (this.updtCompEditar != "") {
        if (this.laneSelectEditar.length > 0) {          
          let equipoValid = await this.$store.getters["Refacciones/getEquipoMalo"];
          await this.$store.commit("DTC/listaDmgMutationDelete", this.saveObjectEdiar[2]);

          for (const lane of this.laneSelectEditar) {
              let component = equipoValid.find(component => component.lane === lane);
            await this.$store.commit("DTC/newlistaDmgMutationPush", component);
          }          

          this.arrayPartidas[index]["row1"] = this.objectEditar.rowUpd1;
          this.arrayPartidas[index]["row2"] = this.objectEditar.rowUpd2;
          this.arrayPartidas[index]["row3"] = this.updtCompEditar;
          this.arrayPartidas[index]["row4"] = this.objectEditar.rowUpd4;
          this.arrayPartidas[index]["row5"] = this.objectEditar.rowUpd5;
          this.arrayPartidas[index]["row6"] = this.objectEditar.rowUpd6;
          this.arrayPartidas[index]["row7"] = this.objectEditar.rowUpd7;
          this.arrayPartidas[index]["row8"] = this.laneSelectEditar;
          this.arrayPartidas[index]["row9"] = this.objectEditar.rowUpd9;
          this.arrayPartidas[index]["row10"] = this.objectEditar.rowUpd10;
          this.arrayPartidas[index]["row11"] = this.objectEditar.rowUpd11;
          this.arrayPartidas[index]["row12"] = this.objectEditar.rowUpd12;
          this.arrayPartidas[index]["row13"] = this.objectEditar.rowUpd13;
          this.arrayPartidas[index]["row14"] = this.objectEditar.rowUpd14
          this.arrayPartidas[index]["rowUp"] = true;
          this.objectEditar = {};
          this.saveObjectEdiar = [];
          this.laneSelectEditar = [];
          this.updtCompEditar = "";


        } else {
          alert("SELECIONE LA UBICACION!!!");
        }
      } else {
        alert("ELIGA UN COMPONENTE!!!");
      }
    },
    abortUpdateRowTable: function(index) {
      this.arrayPartidas[index]["row1"] = this.saveObjectEdiar[0];
      this.arrayPartidas[index]["row2"] = this.saveObjectEdiar[1];
      this.arrayPartidas[index]["row3"] = this.saveObjectEdiar[2];
      this.arrayPartidas[index]["row4"] = this.saveObjectEdiar[3];
      this.arrayPartidas[index]["row5"] = this.saveObjectEdiar[4];
      this.arrayPartidas[index]["row6"] = this.saveObjectEdiar[5];
      this.arrayPartidas[index]["row7"] = this.saveObjectEdiar[6];
      this.arrayPartidas[index]["row8"] = this.saveObjectEdiar[7];
      this.arrayPartidas[index]["row9"] = this.saveObjectEdiar[8];
      this.arrayPartidas[index]["row10"] = this.saveObjectEdiar[9];
      this.arrayPartidas[index]["row11"] = this.saveObjectEdiar[10];
      this.arrayPartidas[index]["row12"] = this.saveObjectEdiar[11];
      this.arrayPartidas[index]["row13"] = this.saveObjectEdiar[12];
      this.arrayPartidas[index]["row14"] = this.saveObjectEdiar[13]
      this.arrayPartidas[index]["rowUp"] = true;
      this.saveObjectEdiar = [];
      this.objectEditar = {};
    },
    agregarPartida: async function() {
      let newObject = {
        row1: this.arrayPartidas.length + 1,
        row2: this.datosPrePartida.rowUnidad,
        row3: this.updtComp,
        row4: this.datosPrePartida.rowCantidad,
        row5: this.datosPrePartida.rowMarca,
        row6: this.datosPrePartida.rowModelo,
        row7: this.datosPrePartida.rowNumSerie,
        row8: this.laneSelect,
        row9: this.datosPrePartida.rowDateInstalacion,
        row10: this.datosPrePartida.rowDateMantenimiento,
        row11: this.datosPrePartida.rowFolioMantenimiento,
        row12: this.datosPrePartida.rowDateReal,
        row13: this.datosPrePartida.rowDateFabricante,
        row14: this.datosPrePartida.rowPrecio,
        rowUp: true
      };

      this.arrayPartidas.push(newObject);

      let equipoValid = await this.$store.getters["Refacciones/getEquipoMalo"];

      for (const lane of this.laneSelect) {
        let component = equipoValid.find(component => component.lane === lane);
        await this.$store.commit("DTC/newlistaDmgMutationPush", component);
      }

      for (const propiedades in this.datosPrePartida) {
        if (propiedades == "rowCantidad") this.datosPrePartida[propiedades] = 0;
        else this.datosPrePartida[propiedades] = [];
      }
      this.updtComp = "";
      this.laneSelect = [];
      this.listLane = [];
    }
  },
  watch: {
    laneSelect: async function(newValue) {
      for (const propiedades in this.objectEditar) {
        this.datosPrePartida[propiedades] = [];
      }

      let equipoValid = await this.$store.getters["Refacciones/getEquipoMalo"];

      if (newValue != null) {
        this.datosPrePartida.rowCantidad = this.laneSelect.length;

        for (const lane of this.laneSelect) {
          let component = equipoValid.find(
            component => component.lane === lane
          );

          if (
            this.datosPrePartida.rowUnidad.includes(component.unity) == false
          ) {
            this.datosPrePartida.rowUnidad.push(component.unity);
          }
          if (
            this.datosPrePartida.rowMarca.includes(component.brand) == false
          ) {
            this.datosPrePartida.rowMarca.push(component.brand);
          }
          if (
            this.datosPrePartida.rowModelo.includes(component.model) == false
          ) {
            this.datosPrePartida.rowModelo.push(component.model);
          }
          if (
            this.datosPrePartida.rowNumSerie.includes(component.serialNumber) ==
            false
          ) {
            this.datosPrePartida.rowNumSerie.push(component.serialNumber);
          }
          if (
            this.datosPrePartida.rowDateInstalacion.includes(
              component.instalationDate
            ) == false
          ) {
            this.datosPrePartida.rowDateInstalacion.push(
              component.instalationDate
            );
          }
          if (
            this.datosPrePartida.rowDateMantenimiento.includes(
              component.maintenanceDate
            ) == false
          ) {
            this.datosPrePartida.rowDateMantenimiento.push(
              component.maintenanceDate
            );
          }
          if (
            this.datosPrePartida.rowFolioMantenimiento.includes(
              component.maintenanceFolio
            ) == false
          ) {
            this.datosPrePartida.rowFolioMantenimiento.push(
              component.maintenanceFolio
            );
          }
          if (
            this.datosPrePartida.rowDateFabricante.includes(
              component.lifeTime
            ) == false
          ) {
            this.datosPrePartida.rowDateFabricante.push(component.lifeTime);
          }
          if(this.datosPrePartida.rowPrecio.includes(component.unitaryPrice) == false){
            this.datosPrePartida.rowPrecio.push(component.unitaryPrice);
          }
        }
      }
    },
    laneSelectEditar: async function(newValue) {
      for (const propiedades in this.objectEditar) {
        this.objectEditar[propiedades] = [];
      }

      let equipoValid = await this.$store.getters["Refacciones/getEquipoMalo"];

      if (newValue != null) {
        this.objectEditar.rowUpd4 = this.laneSelectEditar.length;
        this.objectEditar.rowUpd1 = this.saveObjectEdiar[0];

        for (const lane of this.laneSelectEditar) {
          let component = equipoValid.find(
            component => component.lane === lane
          );

          if (this.objectEditar.rowUpd2.includes(component.unity) == false) {
            this.objectEditar.rowUpd2.push(component.unity);
          }
          if (this.objectEditar.rowUpd5.includes(component.brand) == false) {
            this.objectEditar.rowUpd5.push(component.brand);
          }
          if (this.objectEditar.rowUpd6.includes(component.model) == false) {
            this.objectEditar.rowUpd6.push(component.model);
          }
          if (
            this.objectEditar.rowUpd7.includes(component.serialNumber) == false
          ) {
            this.objectEditar.rowUpd7.push(component.serialNumber);
          }
          if (
            this.objectEditar.rowUpd9.includes(component.instalationDate) ==
            false
          ) {
            this.objectEditar.rowUpd9.push(component.instalationDate);
          }
          if (
            this.objectEditar.rowUpd10.includes(component.maintenanceDate) ==
            false
          ) {
            this.objectEditar.rowUpd10.push(component.maintenanceDate);
          }
          if (
            this.objectEditar.rowUpd11.includes(component.maintenanceFolio) ==
            false
          ) {
            this.objectEditar.rowUpd11.push(component.maintenanceFolio);
          }
          if (
            this.objectEditar.rowUpd13.includes(component.lifeTime) == false
          ) {
            this.objectEditar.rowUpd13.push(component.lifeTime);
          }
          if (
            this.objectEditar.rowUpd14.includes(component.unitaryPrice) == false
          ) {
            this.objectEditar.rowUpd14.push(component.unitaryPrice);
          }
        }
      }
    }
  },
  computed: {
    validBotonPartida: function() {
      return this.laneSelect.length > 0 ? false : true;
    }
  }
};
</script>

<style scoped>
.blur-content {
  filter: blur(5px);
}
</style>
