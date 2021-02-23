<template>
  <div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
      <div class="grid gap-4 grid-cols-1 py-3 px-3">
        <HeaderGenerico :titulo="'INVENTARIO'" :contadorInventario="listEditados.length"
            @cambiar-orden="cambiar_ordern_inventario"
            @cancelar-filtros="cancelar_filtros" 
            @filtra-palabra="guardar_palabra_busqueda"
            @guardar-cambios="guardar_cambios_inventario" :tipo="'INV'">               
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
              <tr class="h-12 text-gray-900 text-sm" v-for="(item, key) in listComponent" :key="key">                
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
                  <button @click="mostrar_mas(item)" class="botonIconCrear">
                    <img src="../../assets/img/more.png" class="mr-2 sm:m-0" width="15" height="15" />
                    <span class="text-xs">Mas</span>
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
            @click="cambiar_pagina(item)"
            class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg focus:shadow-outline"
            v-for="(item, key) in arrayPaginacion"
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
import EventBus from "../../services/EventBus.js";
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
      buscarPalabra: "",
      arrayPaginacion: [],
      listComponent: [],
      listEditados: [],
      boolUbicacion: true,
      boolComponente: false,            
      tipoUsuario: 0,
      disableInputs: false
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
  created: function(){
    EventBus.$on("ACTUALIZAR_INVENTARIO", () => {              
        this.listComponent = this.$store.getters["Refacciones/getPaginationComponent"](1);
        console.log(this.listComponent.length)
        this.crear_array_paginacion("inicio");    
        this.full_Component.sort((a, b) => {
          if (a.lane < b.lane) return -1;
          if (a.lane > b.lane) return 1;
          return 0;
        });  
    });
  },
  beforeMount: function () {           
    this.tipoUsuario = this.$store.getters['Login/getTypeUser']
    this.disableInputs = this.tipoUsuario == 7 || this.tipoUsuario == 4  ? true : false    
    this.listComponent = this.$store.getters["Refacciones/getPaginationComponent"](1);
    this.crear_array_paginacion("inicio");    
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
    cambiar_pagina: function (value) {
      if (value == "Anterior") {
        if (this.arrayPaginacion[2] == 4) {
          this.listComponent = this.$store.getters["Refacciones/getPaginationComponent"](3);
          this.crear_array_paginacion("inicio");
        } else if (this.arrayPaginacion[2] != 2) {
          this.listComponent = this.$store.getters["Refacciones/getPaginationComponent"](this.array_paginacion[2] - 1);
          this.crear_array_paginacion("anterior");
        }
      } else if (value == "Mas") {
        let pagina = this.arrayPaginacion[this.arrayPaginacion.length - 2];
        if (pagina < Math.ceil(this.full_Component.length / 10)) {
          this.listComponent = this.$store.getters["Refacciones/getPaginationComponent"](pagina + 1);
          this.crear_array_paginacion("mas");
        }
      } else {
        this.listComponent = this.$store.getters["Refacciones/getPaginationComponent"](value);
        if (value == 1) this.crear_array_paginacion("inicio");
      }
    },
    crear_array_paginacion: function (tipo) {
      if (tipo === "inicio") {
        this.arrayPaginacion = ["Anterior", 1, 2, 3, "Mas"];
      } else if (tipo === "mas") {
        let new_array = ["Anterior", 1];
        let ultima_pagina = this.arrayPaginacion[this.arrayPaginacion.length - 2];
        let i = ultima_pagina + 1;
        while (i <= ultima_pagina + 3) {
          if (i <= Math.ceil(this.full_Component.length / 10)) {
            new_array.push(i);
            i++;
          } 
          else {
            break;
          }
        }
        new_array.push("Mas");
        this.arrayPaginacion = new_array;
      } else if (tipo == "anterior") {
        let new_array = [];
        if (this.arrayPaginacion[2] > 2) {
          new_array.push("Anterior");
          new_array.push(1);
        } else {
          new_array.push("Anterior");
        }
        let primera_pagina = this.arrayPaginacion[2];
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
        this.arrayPaginacion = new_array;
      }
    },
    cambiar_ordern_inventario: function (orden) {
      if (orden == "ubicacion") { 
        this.full_Component.sort((a, b) => {
          if (a.lane < b.lane) return -1;
          if (a.lane > b.lane) return 1;
          return 0;
        });
        this.cambiar_pagina(1);
      } else if (orden == "componente") {
        this.full_Component.sort((a, b) => {
          if (a.component < b.component) return -1;
          if (a.component > b.component) return 1;
          return 0;
        });
        this.cambiar_pagina(1);
      }
    },
    guardar_editado: function (value) {
      if (this.listEditados.length == 0)
        this.listEditados.push(Object.assign({}, value));
      else {
        if (this.listEditados.some((item) =>item["lane"] == value["lane"] && item["component"] == value["component"])) {
          for (let i = 0; i < this.listEditados.length; i++) {
            if (this.listEditados[i]["lane"] == value["lane"] && this.listEditados[i]["component"] == value["component"]) {
              this.listEditados[i] = Object.assign({}, value);
            }
          }
        } else {
          this.listEditados.push(Object.assign({}, value));
        }        
      }
    },
    guardar_cambios_inventario: function () {
      if (this.listEditados.length > 0) {
        this.$store.dispatch("Refacciones/EDIT_COMPONETE_QUICK",this.listEditados);
        this.cambiar_pagina(1);
        this.listEditados = [];
        this.$notify.success({
          title: "Ok!",
          msg: `SE ACTUALIZARON ${this.listEditados.length} COMPONENTES.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
        this.listEditados = [];
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
    mostrar_mas: function (item) {
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
    cancelar_filtros: function () {      
      let plaza = this.$store.getters["Header/GET_CONVENIO_PLAZA"];
      this.$store.dispatch("Refacciones/FULL_COMPONETES", plaza);
      this.cambiar_pagina(1);
      this.listEditados = [];
    },    
    guardar_palabra_busqueda: function(palabra){
      this.buscarPalabra = palabra
    }
  },
/////////////////////////////////////////////////////////////////////
////                         OBSERVADORES                        ////
/////////////////////////////////////////////////////////////////////
  watch: {
    buscarPalabra: function (newValue) {
      this.buscarPalabra.toUpperCase();      
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
        this.arrayPaginacion = [];
        this.listComponent = array_filtrado;
      } else {
        this.cambiar_pagina(1);
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


