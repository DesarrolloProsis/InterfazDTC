<template>
  <div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
      <div class="grid gap-4 grid-cols-1 pl-3 pr-3">                
        <h1 class="text-black text-center text-4xl mt-3 mb-10 sm:mb-1">Inventario</h1>
        <!--/////////////////////////////////////////////////////////////////
        ////                     BOTONES NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-5 flex justify-between sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md">
          <div class="inline-flex mt-2 sm:text-xs sm:ml-3 m-6">
            <div class="mr-3 sm:mr-1 mt-5">
              <span class="mr-2">Buscar</span>
              <input v-model="buscar_palabra" class="bg-white sm:w-24" />
            </div>
            <div class="mr-3 mt-5">
              <span class="mr-2">Ubicación</span>
              <input
                v-model="boolUbicacion"
                @change="change_orden('ubicacion')"
                class="bg-white"
                type="checkbox"
              />
            </div>
            <div class="mr-4 mt-5">
              <span class="mr-4">Componente</span>
              <input
                v-model="boolComponente"
                @change="change_orden('componente')"
                class="bg-white"
                type="checkbox"
              />
            </div>
            <!--<div>           
            <div class="mt-4">
              <button
                  @click="modal_inventario"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-blue-700"
                >
                  <span class="mr-2">Registrar</span>
                </button> 
            </div>
            </div>-->
          </div>
          <div class=" text-sm mt-2 mx-auto">
            <p class="text-md font-semibold mb-1 text-gray-900 ml-2">Cambiar Plaza</p>
            <select v-model="plazaSelect" @change="cambiarPlaza" class="w-48" type="text" name="TipoDescripcion">
              <option disabled value>Selecionar...</option>
              <option v-for="(item, index) in listaPlazasUser" :value="item.numPlaza" :key="index">{{ item.plazaName }}</option>
            </select>
          </div>
          <div class="sm:mt-1 sm:mb-4 sm:ml-4 sm:text-xs mt-5 mr-5 sm:inline-flex" v-if="!(tipoUsuario == 7)">
            <button
              @click="Cancelar"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 mr-3"
            >
              <img src="../../assets/img/bin.png" class="mr-2 sm:m-0" width="25" height="25"/>
              <span class="text-xs">Cancelar</span>
            </button>
            <button
              @click="actualizar"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-blue-700"
            >
              <img src="../../assets/img/save.png" class="mr-2 sm:mr-0" width="25" height="25" />
              <span class="text-xs">Guardar</span>
            </button>
            <span class="ml-5 text-gray-800">{{"Editados: " + list_Editados.length}}</span>
          </div>
        </div>
          <!--/////////////////////////////////////////////////////////////////
            ////                           MODAL INVENTARIO                  ////
            ////////////////////////////////////////////////////////////////////-->
          <div class="sticky inset-0">
            <div v-if="showModal" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Registrar Mantenimiento</p>
              <div>
                <div class="m-3 text-center">
                  <p class="font-bold mb-5 sm:text-sm">Carril</p>
                  <select v-model="carrilSelect" class="w-48" type="text" name="TipoDescripcion">
                    <option disabled value>Selecionar...</option>
                    <option v-for="(item, index) in listaCarriles" :value="item" :key="index">{{ item.lane }}</option>
                  </select>

                  <p class="font-bold mb-5 sm:text-sm">Fecha Mantenimiento</p>
                  <input v-model="fehcaMantenimientoEdit" class="border w-40" type="date"/>

                  <p class="font-bold mb-5 sm:text-sm">Hora Inicio</p>
                  <input v-model="Horainicio" class="border w-40" type="time"/>

                  <p class="font-bold mb-5 sm:text-sm">Hora Fin</p>
                  <input v-model="Horafin" class="border w-40" type="time"/>

                  <p class="font-bold mb-5 sm:text-sm">Folio</p>
                  <input v-model="folioMantenimiento" class="border w-40" type="text"/>

                </div>
              </div>
              <div class="justify-center flex mt-5">
                <button @click="guardar_modal" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Aceptar</button>
                <button @click="showModal = false" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">Cancelar</button>
              </div>
            </div>
        </div>  

        <div class="overflow-x-auto sm:m-2 sm:text-xs">
          <table class="border-2 border-gray-800 table-fixed">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
              <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                <th class="w-56 border-2 border-gray-800">Componete</th>
                <th class="w-24 border-2 border-gray-800">Ubicación</th>
                <th class="w-56 border-2 border-gray-800">Numero Serie</th>
                <th class="w-40 border-2 border-gray-800">Fecha Instalacion</th>
                <th class="w-40 border-2 border-gray-800">Fecha Mantenimiento</th>
                <th class="w-32 border-2 border-gray-800">Folio Mantenimiento</th>
                <th class="w-32 border-2 border-gray-800">Acciones</th>
              </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody>
              <tr class="h-12 text-gray-900 text-sm" v-for="(item, key) in list_Component" :key="key">                
                <td class="text-center border-2 border-gray-800">{{ item.component }}</td>
                <td class="text-center border-2 border-gray-800">{{ item.lane }}</td>
                <td class="text-center border-2 border-gray-800">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.serialNumber" type="text"/>
                </td>
                <td class="text-center border-2 border-gray-800">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.installationDate" type="date"/>
                </td>
                <td class="text-center border-2 border-gray-800">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.maintenanceDate" type="date"/>
                </td>
                <td class="text-center border-2 border-gray-800">
                  <input :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.maintenanceFolio" type="text"/>
                </td>
                <td class="text-center border-2 border-gray-800">
                  <button @click="Mostrar_Mas(item)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700">
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
            class="py-1 px-3 bg-gray-400 m-1 border-black border rounded-lg focus:shadow-outline"
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

export default {
  name: "EditarComponente",
  components: {
    Nav,
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
      listaPlazasUser: [],
      plazaSelect: '',
      tipoUsuario: 0,
      disableInputs: false,
      carrilSelect: '',
      list_Carriles:[],
      fehcaMantenimientoEdit: '',
      folioMantenimiento: '',
      Horainicio: '',
      Horafin: ''
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
  beforeMount: async function () {
    let index = await this.$store.getters['Header/getUSERSELECT']    
    this.listaPlazasUser = await this.$store.getters["Login/getListaPlazasUser"]
    this.plazaSelect = this.listaPlazasUser[index].numPlaza;
    this.tipoUsuario = await this.$store.getters['Login/getTypeUser']
    this.disableInputs = await this.tipoUsuario == 7 ? true : false
    this.list_Component = await this.$store.getters["Refacciones/getPaginationComponent"](1);
    this.crear_array_paginacion("inicio");
    //this.plazaSelect = this.listaPlazasUser[index].numPlaza;
    this.listaCarriles = await this.$store.getters['Refacciones/GET_CARRILES_STATE']
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
          this.list_Component = this.$store.getters[
            "Refacciones/getPaginationComponent"
          ](3);
          this.crear_array_paginacion("inicio");
        } else if (this.array_paginacion[2] != 2) {
          this.list_Component = this.$store.getters[
            "Refacciones/getPaginationComponent"
          ](this.array_paginacion[2] - 1);
          this.crear_array_paginacion("anterior");
        }
      } else if (value == "Mas") {
        let pagina = this.array_paginacion[this.array_paginacion.length - 2];

        if (pagina < Math.ceil(this.full_Component.length / 10)) {
          this.list_Component = this.$store.getters[
            "Refacciones/getPaginationComponent"
          ](pagina + 1);
          this.crear_array_paginacion("mas");
        }
      } else {
        this.list_Component = this.$store.getters[
          "Refacciones/getPaginationComponent"
        ](value);

        if (value == 1) this.crear_array_paginacion("inicio");
      }
    },
    crear_array_paginacion: function (tipo) {
      if (tipo === "inicio") {
        this.array_paginacion = ["Anterior", 1, 2, 3, "Mas"];
      } else if (tipo === "mas") {
        let new_array = ["Anterior", 1];

        let ultima_pagina = this.array_paginacion[
          this.array_paginacion.length - 2
        ];
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
    //this.$store.getter['Modulo/']()
    //this.$store.state.DTC.
    //this.dispatch('Modulo/')
    //this.commit(Modulo/)
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
        if (
          this.list_Editados.some(
            (item) =>
              item["lane"] == value["lane"] &&
              item["component"] == value["component"]
          )
        ) {
          for (let i = 0; i < this.list_Editados.length; i++) {
            if (
              this.list_Editados[i]["lane"] == value["lane"] &&
              this.list_Editados[i]["component"] == value["component"]
            ) {
              this.list_Editados[i] = Object.assign({}, value);
            }
          }
        } else {
          this.list_Editados.push(Object.assign({}, value));
        }

        console.log(JSON.stringify(this.list_Editados));
      }
    },
    actualizar: function () {
      if (this.list_Editados.length > 0) {
        this.$store.dispatch(
          "Refacciones/EDIT_COMPONETE_QUICK",
          this.list_Editados
        );
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
      let plaza = this.$store.getters["Header/getConvenioPlaza"];
      this.$store.dispatch("Refacciones/FULL_COMPONETES", plaza);
      this.cambiar_Pagina(1);
      this.list_Editados = [];
    },
    cambiarPlaza: function(){
      let index = this.listaPlazasUser.findIndex((item) => item.numPlaza == this.plazaSelect);
      this.plazaSelect = this.listaPlazasUser[index].numPlaza;
      this.$store.commit("Header/PLAZAELEGIDAMUTATION", index);
      this.$store.commit("Login/PLAZAELEGIDAMUTATION", index);
      let plaza = this.$store.getters['Header/getConvenioPlaza']
      this.$store.dispatch('Refacciones/FULL_COMPONETES', plaza)
      this.list_Component = this.$store.getters["Refacciones/getPaginationComponent"](1);
    },
    //Funcion para mostrar el modal y para enlistar los carriles 
    modal_inventario: async function(){
      
      this.showModal = true //se muestra el modal, se cambia su valor a tru
      await this.$store.dispatch('Refacciones/GET_CARRILES', this.plazaSelect);//Manda una peticion al store, cindicando la ruta, y el parametro
      this.listaCarriles = await this.$store.getters['Refacciones/GET_CARRILES_STATE']//Se guarda en una variable los resultados
      //Ordenamiento de la lista de Carriles
      this.listaCarriles.sort(function (a, b) {
        if (a.lane > b.lane) {
          return 1;
        }
        if (a.lane < b.lane) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    },
    guardar_modal: async function()
    {
        if(this.carrilSelect && this.fehcaMantenimientoEdit && this.folioMantenimiento && this.Horainicio && this.Horafin != ''){
        let carrilesFind = await this.$store.getters['Refacciones/GET_CARRILES_LANE'](this.carrilSelect.lane)//Se guarda en una variable local la peticion al store para obtener el lane, se indica el parametro
        //let array = []                                                                                     Muestra todas las coincidencias con el numero de carril seleccionado
        console.log(carrilesFind)//Mostramos el resultado de la coincidencia
        for(let item of carrilesFind){//Se recorre el arrat del resultado anterior
          item.maintenanceDate = this.fehcaMantenimientoEdit//Se cambia el valor del array por el valor indicado en el modal
          item.maintenanceFolio = this.folioMantenimiento//Se cambia el valor del array por el valor indicado en el modal
          item.serialNumber = this.Horainicio  
        // let obj = {
        //   "Nombre": this.fehcaMantenimientoEdit,
        //   "Lane": item
        // }
        // array.push(obj)
        }
        }
        else{
          this.$notify.warning({
          title: "Ops!!",
          msg: "NO SE SELECCIONO ALGUNO DE LOS DATOS NECESARIOS",
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
        }
      
      //console.log(array)
    }
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


