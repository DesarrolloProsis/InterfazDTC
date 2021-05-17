<template>
  <div class="relative">    
    <div class="flex justify-center">
      <div class="grid gap-4 grid-cols-1 py-3 px-3">
        <HeaderGenerico :titulo="'INVENTARIO'" :contadorInventario="listEditados.length"
            @cambiar-orden="cambiar_ordern_inventario"
            @cancelar-filtros="cancelar_filtros" 
            @filtra-palabra="guardar_palabra_busqueda"
            @guardar-cambios="guardar_cambios_inventario" :tipo="'INV'">               
        </HeaderGenerico> 
        <!--/////////////////////////////////////////////////////////////////
        ////                         MODAL LOADER                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="modalLoading" class="rounded-lg border w-64 justify-center absolute  inset-x-0 bg-white mx-auto border-gray-700 px-12 py-10 shadow-2xl">          
            <div class="justify-center text-center block">            
                <img src="https://media.giphy.com/media/jAYUbVXgESSti/source.gif"  class="h-48 w-48" />
                <p class="text-gray-900 font-thin text-md">Espere ... </p>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 mb-1" style="height:650px;">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
              <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                <th class="cabeceraTable font-medium">Componete</th>
                <th class="cabeceraTable font-medium">Ubicación</th>
                <th class="cabeceraTable font-medium">Numero Serie</th>
                <th class="cabeceraTable font-medium">Fecha Instalacion</th>
                <th class="cabeceraTable font-medium">Fecha Mantenimiento</th>
                <th class="cabeceraTable font-medium">Folio Mantenimiento</th>
                <th class="cabeceraTable font-medium">Acciones</th>
              </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody name="table" is="transition-group">  
              <tr class="h-12 text-gray-900 text-sm" v-for="(item, key) in listComponent" :key="key">                
                <td class="cuerpoTable">{{ item.component }}</td>
                <td class="cuerpoTable">{{ item.lane }}</td>
                <td class="cuerpoTable">
                  <input class="is_valid" :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.serialNumber" type="text"/>
                </td>
                <td class="cuerpoTable">
                  <input class="is_valid" :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.installationDate" type="date" onkeydown="return false"/>
                </td>
                <td class="cuerpoTable">
                  <input class="is_valid" :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.maintenanceDate" type="date" onkeydown="return false"/>
                </td>
                <td class="cuerpoTable">
                  <input class="is_valid" :disabled="disableInputs" @change="guardar_editado(item)" v-model="item.maintenanceFolio" type="text"/>
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
      </div>
    </div>  
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "../../services/EventBus.js";
import HeaderGenerico from "../../components/Header/HeaderGenerico";

export default {
  name: "EditarComponente",
  components: {    
    HeaderGenerico
  },
  data: function () {
    return {
      buscarPalabra: "",
      arrayPaginacion: [],
      listComponent: [],
      listEditados: [],      
      objCheckoBox: {},      
      tipoUsuario: 0,
      disableInputs: false,
      modalLoading: false
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
  created: function(){
    //Escucha Evento SelectPlaza Component
    EventBus.$on("ACTUALIZAR_INVENTARIO", () => {              
        this.listComponent = this.$store.getters["Refacciones/GET_PAGINACION_COMPONENTES"](1);        
        this.crear_array_paginacion("inicio");    
        this.full_Component.sort((a, b) => {
          if (a.lane < b.lane) return -1;
          if (a.lane > b.lane) return 1;
          return 0;
        });  
    });
  },
  beforeMount: async function () {    
    let numeroPlaza = this.$store.state.Login.plazaSelecionada.numeroPlaza             
    await this.$store.dispatch('Refacciones/FULL_COMPONETES',{ numPlaza: numeroPlaza})          
    this.tipoUsuario = await this.$store.state.Login.cookiesUser.rollId
    this.disableInputs = this.tipoUsuario == 7 || this.tipoUsuario == 4  ? true : false    
    this.listComponent = await this.$store.getters["Refacciones/GET_PAGINACION_COMPONENTES"];
  },
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
  methods: {

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
    guardar_cambios_inventario: async function () {
      if (this.listEditados.length > 0) {
        this.modalLoading = true
        let numeroPlaza = this.$store.state.Login.plazaSelecionada.numeroPlaza                 
        await this.$store.dispatch("Refacciones/EDIT_COMPONETE_QUICK",this.listEditados);
        await this.$store.dispatch("Refacciones/FULL_COMPONETES", { numPlaza: numeroPlaza });
        this.cambiar_pagina(1);
        this.listEditados = [];
        setTimeout(() => {
          this.modalLoading = false
          this.$notify.success({
            title: "Ok!",
            msg: `SE ACTUALIZARON ${this.listEditados.length} COMPONENTES.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          }); 
        }, 2000)       
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
      let convenio = this.$store.getters["Header/GET_CONVENIO_PLAZA"];
      this.$store.dispatch("Refacciones/FULL_COMPONETES", convenio);
      this.listEditados = [];
    },    
    guardar_palabra_busqueda: function(newPalabra){      
      if (newPalabra != "") {
        let array_filtrado = this.full_Component.filter(item => {
          return item.lane.toUpperCase().includes(newPalabra.toUpperCase()) || item.component.toUpperCase().includes(newPalabra.toUpperCase()) || item.serialNumber.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.arrayPaginacion = [];
        this.listComponent = array_filtrado;
      } else {
        this.cambiar_pagina(1);
      }
    }
  },
/////////////////////////////////////////////////////////////////////
////                         OBSERVADORES                        ////
///////////////////////////////////////////////////////////////////// ,
/////////////////////////////////////////////////////////////////////
////                          COMPUTADOS                         ////
/////////////////////////////////////////////////////////////////////
  computed: {
    ...mapState("Refacciones", ["full_Component"]),
  },
};
</script>


