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
                <template v-if="equipo.rowUp"></template>
                <template v-else>{{ equipo.partida }}</template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <select v-model="editComponent.unidad">
                    <option value>Seleccion</option>
                    <option value="Pza">Pza</option>
                  </select>
                </template>
                <template v-else>{{ equipo.unidad }}</template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <input class="w-32" type="text" v-model="editComponent.componente" />
                </template>
                <template v-else>{{equipo.componente}}</template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <input class="w-32" type="text" v-model="editComponent.cantidad" />
                </template>
                <template v-else>{{ equipo.cantidad }}</template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.marca"></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.marca.split(`\n`)" :key="key">{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.modelo"></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.modelo.split(`\n`)" :key="key">{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.numserie"></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.numserie.split(`\n`)" :key="key">{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.ubicacion"></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.ubicacion.split(`\n`)" :key="key">{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.fechaInstalacion"></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.fechaInstalacion.split(`\n`)"
                    :key="key"
                  >{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.fechaMantenimiento"></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.fechaMantenimiento.split(`\n`)"
                    :key="key"
                  >{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.folioMantenimiento"></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.folioMantenimiento.split(`\n`)"
                    :key="key"
                  >{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.fechaReal"></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.fechaReal.split(`\n`)" :key="key">{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <textarea class="w-20" type="text" v-model="editComponent.fechaFabricante"></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.fechaFabricante.split(`\n`)" :key="key">{{ item }}</p>
                </template>
              </td>
              <td class="border">
                <template v-if="equipo.rowUp">
                  <button
                    @click="cancelar_edicion(index)"
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
                    @click="confirmar_componente(index)"
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
                </template>
                <template v-else>
                  <button
                    @click="borrar_componente(index)"
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
                    @click="editar_componente(index)"
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
                </template>
              </td>
            </tr>
            <!--/////////////////////////////////////////////////////////////////
              ////           FOOTER DE LA TABLA + PARTIDA                    ////
            ////////////////////////////////////////////////////////////////////-->
            <tr class="text-center">
              <td class="border">{{ "*" }}</td>
              <td class="border">
                <select v-model="objectMalo.unidad" :disabled="disable_agregar">
                  <option value>Seleccion</option>
                  <option value="Pza">Pza</option>
                </select>
              </td>
              <td class="border">
                <input
                  class="w-32"
                  type="text"
                  v-model="objectMalo.componente"
                  :disabled="disable_agregar"
                />
              </td>
              <td class="border">
                <input
                  class="w-12"
                  type="text"
                  v-model="objectMalo.cantidad"
                  :disabled="disable_agregar"
                />
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.marca"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.modelo"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.numserie"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.ubicacion"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.fechaInstalacion"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.fechaMantenimiento"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.folioMantenimiento"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.fechaReal"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border">
                <textarea
                  class="w-20"
                  type="text"
                  v-model="objectMalo.fechaFabricante"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border p-2">
                <button
                  v-on:click.stop.prevent="agregar_componente()"
                  :disabled="disable_agregar"
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
    <TablaEquipoPropuesto @desbloquear_partida="desbloquear_partida" :listaEquipo="listaequipoMalo"></TablaEquipoPropuesto>
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
        rowUpPropuesto: "",
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
      editComponent: {},
      disable_agregar: false,
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
  watch: {
    listaequipoMalo: {
      deep: true,
      handler(newValue) {
        console.log(newValue);

        this.$store.commit("DTC/LISTA_DMG_LIBRE_MUTATION", newValue);
      },
    },
  },
  methods: {
    borrar_componente: function (index) {
      this.listaequipoMalo.splice(index, 1);

      let partida = 1;

      for (let item of this.listaequipoMalo) {
        item.partida = partida;
        partida += 1;
      }
    },
    desbloquear_partida: function () {
      this.disable_agregar = false;
    },
    cancelar_edicion: function (index) {
      this.listaequipoMalo[index].rowUp = false;
      this.editComponent = {};
    },
    confirmar_componente: function (index) {
      this.listaequipoMalo[index].partida = this.editComponent.partida;
      this.listaequipoMalo[index].unidad = this.editComponent.unidad;
      this.listaequipoMalo[index].componente = this.editComponent.componente;
      this.listaequipoMalo[index].cantidad = this.editComponent.cantidad;
      this.listaequipoMalo[index].marca = this.editComponent.marca;
      this.listaequipoMalo[index].modelo = this.editComponent.modelo;
      this.listaequipoMalo[index].numserie = this.editComponent.numserie;
      this.listaequipoMalo[index].ubicacion = this.editComponent.ubicacion;
      this.listaequipoMalo[
        index
      ].fechaInstalacion = this.editComponent.fechaInstalacion;
      this.listaequipoMalo[
        index
      ].fechaMantenimiento = this.editComponent.fechaMantenimiento;
      this.listaequipoMalo[
        index
      ].folioMantenimiento = this.editComponent.folioMantenimiento;
      this.listaequipoMalo[index].fechaReal = this.editComponent.fechaReal;
      this.listaequipoMalo[
        index
      ].fechaFabricante = this.editComponent.fechaFabricante;

      this.listaequipoMalo[index].rowUp = false;
      this.editComponent = {};
    },
    editar_componente: function (index) {
      this.editComponent = { ...this.listaequipoMalo[index] };
      this.listaequipoMalo[index].rowUp = true;
    },
    agregar_componente: function () {
      this.disable_agregar = true;
      this.objectMalo.partida = this.listaequipoMalo.length + 1;
      this.objectMalo.rowUp = false;
      this.objectMalo.rowUpPropuesto = true;
      this.listaequipoMalo.push(Object.assign({}, this.objectMalo));
      for (const propiedades in this.objectMalo) {
        this.objectMalo[propiedades] = "";
      }
    },
  },
};
</script>
