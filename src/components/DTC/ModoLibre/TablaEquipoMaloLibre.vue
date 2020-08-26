<template>
  <div>
    <div class="flex justify-center sm:hidden">
      <div class="p-4">
        <div class="text-center mb-5">
          <h6 class>Equipo Dañado</h6>
        </div>
        <table class="border-collapse">
          <!--/////////////////////////////////////////////////////////////////
            ////                 CABECERA DE LA TABLA                       ////
          ////////////////////////////////////////////////////////////////////-->
          <thead>
            <tr class="border text-sm">
              <th class="px-1">Partida</th>
              <th class="px-1">Unidad</th>
              <th class="px-4 text-red-600">Componente</th>
              <th class="px-4 text-red-600 text-xs">Cantidad</th>
              <th class="px-4">Marca</th>
              <th class="px-4">Modelo</th>
              <th class="px-4">Numero de Serie</th>
              <th class="px-4 text-red-600">
                Ubicacion
                <br />(carril/cuerpo)
              </th>
              <th class="px-4 text-xs">Fecha de Instalacion</th>
              <th class="px-4 text-xs">
                Fecha
                <br />(Ultimo Mantenimiento)
              </th>
              <th class="px-4 text-xs">
                Folio
                <br />(Ultimo Mantenimiento)
              </th>
              <th class="px-12">Real</th>
              <th class="px-1">Fabricante</th>
              <th class="px-4"></th>
            </tr>
          </thead>
          <!--/////////////////////////////////////////////////////////////////
            ////                 CUERPO DE LA TABLA                          ////
          ////////////////////////////////////////////////////////////////////-->
          <tbody>
            <tr
              class="hover:bg-blue-200 text-center"
              v-for="(equipo, index) in listaequipoMalo"
              :key="index"
            >
              <td class="border">
                <div v-if="equipo.rowUp">{{ equipo.partida }}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{ equipo.unidad }}</div>
              </td>
              <td class="border">
                {{equipo.componente}}
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{ equipo.cantidad }}</div>
              </td>
              <td class="border">
                {{equipo.marca}}
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">
                  {{equipo.modelo}}
                </div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">
                  {{equipo.numserie}}
                </div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{equipo.ubicacion}}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{equipo.fechaInstalacion}}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{equipo.fechaMantenimiento }}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{ equipo.folioMantenimiento }}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{equipo.fechaReal}}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">{{equipo.fechaReal}}</div>
              </td>
              <td class="border">
                <div v-if="equipo.rowUp">
                  <button
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
                  >
                    <img
                      src="../../../assets/img/bin.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Borrar</span>
                  </button>

                  <button
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-yellow-500 m-2"
                  >
                    <img
                      src="../../../assets/img/pencil.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Editar</span>
                  </button>
                </div>
                <div v-else>
                  <button
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
                  >
                    <img
                      src="../../../assets/img/cerrar.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Cancelar</span>
                  </button>
                  <button
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
                  >
                    <img
                      src="../../../assets/img/garrapata.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Confirmar</span>
                  </button>
                </div>
              </td>
            </tr>
            <!--/////////////////////////////////////////////////////////////////
              ////           FOOTER DE LA TABLA + PARTIDA                    ////
            ////////////////////////////////////////////////////////////////////-->
            <tr class="text-center">
              <td class="border">{{ "*" }}</td>
              <td class="border">
                <select v-model="objectMalo.unidad">
                  <option value>Seleccion</option>
                  <option value="Pza">Pza</option>
                </select>
              </td>
              <td class="border">
                <input class="w-32" type="text" v-model="objectMalo.componente" />
              </td>
              <td class="border">
                <input class="w-12" type="text" v-model="objectMalo.cantidad" />
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.marca"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.modelo"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.numserie"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.ubicacion"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.fechaInstalacion"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.fechaMantenimiento"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.folioMantenimiento"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.fechaReal"></textarea>
              </td>
              <td class="border">
                <textarea class="w-20" type="text" v-model="objectMalo.fechaFabricante"></textarea>
              </td>
              <td class="border p-2">
                <button
                  v-on:click.stop.prevent="agregar_componente()"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700"
                >
                  <img src="../../../assets/img/more.png" width="20" height="20" />
                  <span class="ml-2 text-xs">Agregar Partida</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <TablaEquipoPropuesto :listaEquipo="listaequipoMalo"></TablaEquipoPropuesto>
  </div>
</template>

<script>
import TablaEquipoPropuesto from "../ModoLibre/TablaEquipoPropuestoLibre";

export default {
  name: "TablaEquipoMalo",
  components: {
    TablaEquipoPropuesto,
  },
  data() {
    return {
      listaequipoMalo: [],
      objectMalo: {
        rowUp: "",
        partida: "",
        unidad: "",
        componente: "",
        cantidad: "",
        marca: "",
        modelo: "",
        numserie: "",
        ubicacion: "",
        fechaInstalacion: "",
        fechaMantenimiento: "",
        folioMantenimiento: "",
        fechaReal: "",
        fechaFabricante: "",
      },
    };
  },
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
  methods: {
    agregar_componente: function () {

      this.objectMalo.partida = this.listaequipoMalo.length + 1
      this.objectMalo.rowUp = true;
      this.listaequipoMalo.push(Object.assign({}, this.objectMalo));
      for (const propiedades in this.objectMalo) {
        this.objectMalo[propiedades] = "";
      }
    },
  },
};
</script>
