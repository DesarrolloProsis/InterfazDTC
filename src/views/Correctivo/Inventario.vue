<template>
  <div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
      <div class="grid gap-4 grid-cols-1 py-3 px-3">
        <HeaderGenerico :titulo="'INVENTARIO'" :tipo="'INV'">
          <template v-slot:botones-inventario>
            <div class="mb-3 text-center sm:mt-3 sm:mb-4 sm:ml-4 sm:text-xs mt-5 mr-5 sm:inline-flex">
              <button @click="Cancelar" class="w-32 botonIconBorrarCard ml-4 mr-4">
                  <img src="../../assets/img/borrar.png" class="mr-2 sm:m-0" width="25" height="25"/>
                  <span class="text-xs">Cancelar</span>
              </button>
              <button class="w-32 botonIconNext">
                  <img src="../../assets/img/save.png" class="mr-2 sm:mr-0" width="25" height="25" />
                  <span class="text-xs">Guardar</span>
              </button>
            </div>
          </template>
        </HeaderGenerico>
          <!--/////////////////////////////////////////////////////////////////
            ////                           MODAL INVENTARIO                  ////
            ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="showModal" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
            <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Seguro que quiere eliminar este DTC</p>
            <div>
              Maquetarias lo que falta
            </div>
            <div class="justify-center flex mt-5">
              <button class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
              <button @click="showModal = false" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
            </div>
          </div>
        </div>  
        <div class="overflow-x-auto sm:m-2 sm:text-xs rounded-lg shadow">
          <table class="border-collapse  table-fixed">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
              <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                <th class="cabeceraTable">Componete</th>
                <th class="cabeceraTable">Ubicación</th>
                <th class="cabeceraTable">Numero Serie</th>
                <th class="cabeceraTable">Fecha Instalacion</th>
                <th class="cabeceraTable">Fecha Mantenimiento</th>
                <th class="cabeceraTable">Folio Mantenimiento</th>
                <th class="cabeceraTable">Acciones</th>
              </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody>
              <tr class="h-12 text-gray-900 text-sm" v-for="(item, key) in list_Component" :key="key">                
                <td class="cuerpoTable">{{ item.component }}</td>
                <td class="cuerpoTable">{{ item.lane }}</td>
                <td class="cuerpoTable">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.serialNumber" type="text"/>
                </td>
                <td class="cuerpoTable">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.installationDate" type="date"/>
                </td>
                <td class="cuerpoTable">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.maintenanceDate" type="date"/>
                </td>
                <td class="cuerpoTable">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.maintenanceFolio" type="text"/>
                </td>
                <td class="cuerpoTable">
                  <button @click="Mostrar_Mas(item)" class="botonIconCrear">
                    <img src="../../assets/img/more.png" class="mr-2 sm:m-0" width="15" height="15" />
                    <span class="text-xs sm:hidden">Mas</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                 PAGINACION DE LA TABLA                      ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="flex justify-center mt-2 mb-32 sm:mb-5">
          <button
            @click="cambiar_Pagina(item)"
            class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg focus:shadow-outline"
            v-for="(item, key) in array_paginacion"
            :key="key"
          >
            {{ item }}
          </button>
        </div>                        
      </div>
    </div>  
  </div>
</template>

<script>
import { mapState } from "vuex";
import Nav from "../../components/Navbar";
import HeaderGenerico from "../../components/Header/HeaderGenerico";

export default {
  name: "EditarComponente",
  components: {
    Nav,
    HeaderGenerico
  },
  data: function () {
    return {
      showModal: false,
      buscar_palabra: "",
      array_paginacion: [],
      list_Component: [],
      list_Editados: [],
      boolUbicacion: true,
      boolComponente: false,
      listaPlazas: [],
      plazaSelect: '',
      tipoUsuario: 0,
      disableInputs: false
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
  beforeMount: function () {
    let index = this.$store.getters['Header/getUSERSELECT']    
    this.listaPlazas = this.$store.state.Login.cookiesUser.plazasUsuario
    this.tipoUsuario = this.$store.getters['Login/getTypeUser']
    this.disableInputs = this.tipoUsuario == 7 || this.tipoUsuario == 4  ? true : false    
    this.list_Component = this.$store.getters["Refacciones/getPaginationComponent"](1);
    this.crear_array_paginacion("inicio");
    this.plazaSelect = this.listaPlazas[index].numeroPlaza;
    this.full_Component.sort((a, b) => {
      if (a.lane < b.lane) return -1;
      if (a.lane > b.lane) return 1;
      return 0;
    });    
  },
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
  methods: {
    cambiar_Pagina: function (value) {
      if (value == "Anterior") {
        if (this.array_paginacion[2] == 4) {
          this.list_Component = this.$store.getters["Refacciones/getPaginationComponent"](3);
          this.crear_array_paginacion("inicio");
        } else if (this.array_paginacion[2] != 2) {
          this.list_Component = this.$store.getters["Refacciones/getPaginationComponent"](this.array_paginacion[2] - 1);
          this.crear_array_paginacion("anterior");
        }
      } else if (value == "Mas") {
        let pagina = this.array_paginacion[this.array_paginacion.length - 2];
        if (pagina < Math.ceil(this.full_Component.length / 10)) {
          this.list_Component = this.$store.getters["Refacciones/getPaginationComponent"](pagina + 1);
          this.crear_array_paginacion("mas");
        }
      } else {
        this.list_Component = this.$store.getters["Refacciones/getPaginationComponent"](value);
        if (value == 1) this.crear_array_paginacion("inicio");
      }
    },
    crear_array_paginacion: function (tipo) {
      if (tipo === "inicio") {
        this.array_paginacion = ["Anterior", 1, 2, 3, "Mas"];
      } else if (tipo === "mas") {
        let new_array = ["Anterior", 1];
        let ultima_pagina = this.array_paginacion[this.array_paginacion.length - 2];
        let i = ultima_pagina + 1;
        while (i <= ultima_pagina + 3) {
          if (i <= Math.ceil(this.full_Component.length / 10)) {
            new_array.push(i);
            i++;
          } else {
            break;
          }
        }
        new_array.push("Mas");
        this.array_paginacion = new_array;
      } else if (tipo == "anterior") {
        let new_array = [];
        if (this.array_paginacion[2] > 2) {
          new_array.push("Anterior");
          new_array.push(1);
        } else {
          new_array.push("Anterior");
        }
        let primera_pagina = this.array_paginacion[2];
        let i = primera_pagina - 3;
        while (i < primera_pagina) {
          if (i <= Math.ceil(this.full_Component.length / 10)) {
            new_array.push(i);
            i++;
          } else {
            break;
          }
        }
        new_array.push("Mas");
        this.array_paginacion = new_array;
      }
    },
    change_orden: function (orden) {
      if (orden == "ubicacion") {
        this.boolUbicacion == true
          ? (this.boolComponente = false)
          : (this.boolComponente = true);
        this.full_Component.sort((a, b) => {
          if (a.lane < b.lane) return -1;
          if (a.lane > b.lane) return 1;
          return 0;
        });
        this.cambiar_Pagina(1);
      } else if (orden == "componente") {
        this.boolComponente == true
          ? (this.boolUbicacion = false)
          : (this.boolUbicacion = true);
        this.full_Component.sort((a, b) => {
          if (a.component < b.component) return -1;
          if (a.component > b.component) return 1;
          return 0;
        });
        this.cambiar_Pagina(1);
      }
    },
    guardar_editado: function (value) {
      if (this.list_Editados.length == 0)
        this.list_Editados.push(Object.assign({}, value));
      else {
        if (this.list_Editados.some((item) =>item["lane"] == value["lane"] && item["component"] == value["component"])) {
          for (let i = 0; i < this.list_Editados.length; i++) {
            if (this.list_Editados[i]["lane"] == value["lane"] && this.list_Editados[i]["component"] == value["component"]) {
              this.list_Editados[i] = Object.assign({}, value);
            }
          }
        } else {
          this.list_Editados.push(Object.assign({}, value));
        }        
      }
    },
    actualizar: function () {
      if (this.list_Editados.length > 0) {
        this.$store.dispatch("Refacciones/EDIT_COMPONETE_QUICK",this.list_Editados);
        this.cambiar_Pagina(1);
        this.list_Editados = [];
        this.$notify.success({
          title: "Ok!",
          msg: `SE ACTUALIZARON ${this.list_Editados.length} COMPONENTES.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
        this.list_Editados = [];
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA EDITADO NINGUN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    Mostrar_Mas: function (item) {
      this.$router.push({
        path: "/InventarioDetalle",
        query: {
          infoComponent: {
            component: item.component,
            idComponent: item.tableFolio,
            lane: item.lane,
            serialNumber: item.serialNumber,
          },
        },
      });
    },
    Cancelar: function () {
      alert()
      let plaza = this.$store.getters["Header/getConvenioPlaza"];
      this.$store.dispatch("Refacciones/FULL_COMPONETES", plaza);
      this.cambiar_Pagina(1);
      this.list_Editados = [];
    },    
  },
/////////////////////////////////////////////////////////////////////
////                         OBSERVADORES                        ////
/////////////////////////////////////////////////////////////////////
  watch: {
    buscar_palabra: function (newValue, oldValue) {
      this.buscar_palabra.toUpperCase();
      console.log(oldValue);
      if (newValue != "") {
        let array_filtrado = [];
        if (this.boolUbicacion) {
          for (const item of this.full_Component) {
            if (item.lane.toUpperCase().includes(newValue.toUpperCase())) {
              array_filtrado.push(item);
            }
          }
        }
        if (this.boolComponente) {
          for (const item of this.full_Component) {
            if (item.component.toUpperCase().includes(newValue.toUpperCase())) {
              array_filtrado.push(item);
            }
          }
        }
        this.array_paginacion = [];
        this.list_Component = array_filtrado;
      } else {
        this.cambiar_Pagina(1);
      }
    },
  },
/////////////////////////////////////////////////////////////////////
////                          COMPUTADOS                         ////
/////////////////////////////////////////////////////////////////////
  computed: {
    ...mapState("Refacciones", ["full_Component"]),
  },
};
</script>


