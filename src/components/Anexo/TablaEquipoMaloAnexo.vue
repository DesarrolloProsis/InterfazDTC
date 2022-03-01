<template>
  <div>
      <div class="flex justify-center">
        <div class="shadow-sm rounded w-full flex flex-col">
        <div class="inline-flex font-titulo">
            <div class="overflow-x-auto bg-white rounded-lg overflow-y-auto sm:mb-24 sm:text-xs hidden md:block lg:block xl:block 2xl:block" :class="{ hidden: modal }">
              <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                <!--/////////////////////////////////////////////////////////////////
                ////                 CABECERA DE LA TABLA                       ////
                ////////////////////////////////////////////////////////////////////-->
                <thead>
                  <tr class="text-sm text-center text-white trTable sm:text-xs">
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Cantidad</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Componente</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Marca</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Modelo</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">No. de Serie</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Ubicacion(carril/cuerpo)</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Observaciones</th>
                    <th class="md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium">Acciones</th>
                  </tr>
                </thead>
                <!--/////////////////////////////////////////////////////////////////
                ////                 CUERPO DE LA TABLA                          ////
                ////////////////////////////////////////////////////////////////////-->
                <tbody name="table" is="transition-group">    
                  <tr class="hover:bg-blue-200 text-center" v-for="(componentesel, index) in componentes" :key="componentesel.requestedComponentId">
                    <td class="cuerpoTable"><!-- Cantidad -->1</td>
                    <td class="cuerpoTable"><!-- Componente -->{{componentesel.nameComponent}}</td>
                    <td class="cuerpoTable"><!-- Marca -->{{componentesel.brand}}</td>
                    <td class="cuerpoTable"><!-- Modelo -->{{componentesel.model}}</td>
                    <td class="cuerpoTable"><!-- Numero de Serie -->{{componentesel.serialNumber}}</td>
                    <td class="cuerpoTable"><!-- Ubicacion -->{{componentesel.lane}}</td>
                    <td class="cuerpoTable"><!-- Observaciones -->Dañada</td>
                    <td class="cuerpoTable pb-2 "><!-- Acciones -->
                      <div  class="sm:mr-5">
                        <button v-on:click.stop.prevent="remove(index)" class="botonIconBorrarCard font-boton sm:w-auto w-20 sm:h-8 ">
                          <img src="../../assets/img/bin.png" class="mr-2 sm:m-1" width="15" height="15"/>
                          <span class="sm:hidden">Borrar</span>
                        </button>        
                      </div>
                    </td>
                  </tr>           
                </tbody>
                  <!--/////////////////////////////////////////////////////////////////
                    ////           FOOTER DE LA TABLA + PARTIDA                      ////
                  ////////////////////////////////////////////////////////////////////-->      
                    <tr class="text-center">
                      <td class="cuerpoTable w-1">
                        <button @click="modalAgregarComp">
                          <img src="../../assets/img/more.png" width="15" height="15"/>
                        </button>
                                            
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
        <div class="mt-1 bg-green-100 border rounded-xl border-gray-300 shadow-lg text-center md:hidden lg:hidden xl:hidden">
          <button @click="modalAgregarComp">
            <span class="flex p-1 text-md font-bold text-green-800">
              Añadir componentes
              <img src="../../assets/img/more.png" width="25" height="15" class="ml-2"/>
            </span>
            
          </button>
        </div> 
        <div class="grid grid-cols-1 gap-4 mt-2 mb-6 md:hidden lg:hidden xl:hidden">
              <div class="bg-gray-50 space-y-3 p-4 rounded-lg shadow-xl">
                <div>
                  <div class="text-lg font-bold">ARMARIO TECNICO CARRIL MULTIMODAL</div>
                  <div class="mb-2">
                    <span class="text-xs font-bold tracking-tight text-blue-800 bg-blue-200 rounded-xl bg-opacity-50 p-1"><span class="text-blue-800">Ubicacion: </span> A01-13070451</span> 
                  </div>
                  <div class="mb-2">
                    <span class="text-xs font-bold tracking-tight text-blue-800 bg-blue-200 rounded-xl bg-opacity-50 p-1"><span class="text-blue-800">No. Serie: </span> 13070451</span>
                    </div>
                  <div class="text-xs mt-1 bg-gray-100 border rounded-lg p-2 text-gray-800 font-semibold">
                    OBSERVACIONES: NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL.
                     </div>
                </div>
                <div class="grid grid-cols-2 place-items-stretch gap-4 text-xs ">
                  <div class="text-left text-gray-800 p-1">
                    <div>MODELO: S/M</div>
                    <div>MARCA: PROSIS</div>
                    <div>CANTIDAD: 1</div>
                  </div>
                  <div class="place-self-center p-2">
                    <button v-on:click.stop.prevent="eliminar_partida(index)" class="botonIconBorrarCard font-boton sm:w-auto w-20 sm:h-8 ">
                      <img src="../../assets/img/bin.png" class="mr-2 sm:m-1" width="20" height="20"/>
                      <span class="">Borrar</span>
                    </button>
                  </div>
                </div>
              </div>
        </div>     
      </div>
    </div>
    
    <!--//////////////////////////////////////////////////////////////////
    ////                         MODAL AGREGAR COMPONENTE            ////
    //////////////////////////////////////////////////////////////////-->
    <div class="sticky inset-0 font-titulo " :class="{'modal-container': showModal}">
            <div v-if="showModal" class="rounded-lg p-2 grid grid-cols-1 content-center h-full">
                <div class="container mx-auto rounded-lg border bg-white border-gray-400 px-4 py-10">
                    <h1 class="text-center text-4xl font-bold sm:text-2xl">Componentes del DTC</h1>
                    <div class="flex justify-center w-full sm:overflow-auto sm:h-60 md:overflow-auto md:h-60 lg:overflow-auto lg:h-60 xl:overflow-auto xl:h-70">
                        <table class="tablaf mt-6">
                            <thead>
                                <tr class="text-sm text-center text-white trTable sm:text-xs">
                                    <th class="w-24 md:w-34 lg:w-49  xl:w-54 cabeceraTable font-medium sticky top-0">Seleccionar componente</th>
                                    <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0">Componente</th>
                                    <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sm:hidden sticky top-0">No. Serie</th>
                                    <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0">Carril</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="componente in arraycomponentes" :key="componente.requestedComponentId" :class="{'hidden': componente.useInAnexo == true}">
                                    <td class="text-center"><input type="checkbox" v-model="componentes" :value="componente"></td>
                                    <td class="p-2 text-justify text-xs">{{componente.nameComponent}}</td>
                                    <td class="p-2 text-center text-xs sm:hidden">{{componente.serialNumber}}</td>
                                    <td class="p-2 text-center text-xs">{{componente.lane}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  <!--////////////////////////////////////////////////////////////////////
                  ////                        BOTONES MODAL AGREGAR COMP             ////
                  ////////////////////////////////////////////////////////////////////-->    
                  <div class=" flex justify-center mt-8">          
                    <div class="inline-flex">
                        <button @click="agregarcomponentes" class="botonIconCrear">Agregar</button>
                        <button @click="botoncancelar_modal" class="botonIconCancelar font-boton">Cancelar</button>
                    </div>
                  </div>
                </div>
            </div>
    </div>
    <h3 class="font-bold text-sm">COMPONENTES Y/O REFACCIONES NUEVAS:</h3>
    <TablaEquipoPropuesto :listaEquipo="componentes"></TablaEquipoPropuesto>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import TablaEquipoPropuesto from "../../components/Anexo/TablaEquipoPropuestoAnexo.vue";
const API = process.env.VUE_APP_URL_API_PRODUCCION

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
      arraycomponentes: [],
      componentes: [],
      arraycarriles: [],
      arraynombrecomponentes: [],
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
  plazareferencia:{
    type: String,
    default: ""
  },
  dtcreference:{
    type: String,
    default: ""
  }
},
//////////////////////////////////////////////////////////////////////
////                    CICLOS DE VIDA                            ////
/////////////////////////////////////////////////////////////////////
created(){
  
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  modalAgregarComp: function (){
     this.showModal = true 
     document.body.classList.add("modal-open");
     this.TraercomponentesDTC(); 
     },
  async TraercomponentesDTC(){
    try {
      const data = await fetch(`${API}/AnexoDTC/ComponentesRequest/${this.$route.params.referenceSquare}/${this.$route.params.referencenumber}`)
      const objeto = await data.json();
      this.arraycomponentes = objeto.result;
      console.log(this.arraycomponentes);
    } catch (error) {
      console.log(error);
    }
  },     
  botoncancelar_modal: function (){ 
    this.showModal = false; 
    this.laneSelect = ''; 
    this.componenteSeleccionado = '';
    this.componentes = [];
    document.body.classList.remove("modal-open");
    },  
  infoModal: function (value) {
      this.modal = true;
      this.objectModal = Object.assign(this.arrayPartidas[value]);
  },
  agregarcomponentes(){
    this.showModal = false;
    document.body.classList.remove("modal-open");
    this.arraycarriles = [];
    this.componentes.forEach(e => this.arraycarriles.push(e.lane));
    this.arraynombrecomponentes = [];
    this.componentes.forEach(e => this.arraynombrecomponentes.push(e.nameComponent));
    this.$emit('listacarriles',this.arraycarriles)
    this.$emit('listanombrecom',this.arraynombrecomponentes)
  },
  remove(index){
    this.componentes.splice(index, 1);
    this.agregarcomponentes();
  },
}
};
</script>

<style scoped>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>
