<template>
  <div class="relative">    
    <div class="flex justify-center">
      <div class="grid gap-4 grid-cols-1 py-3 px-3">
        <HeaderGenerico :titulo="'Inventario'" :contadorInventario="listEditados.length"
            @cancelar-filtros="cancelar_filtros" 
            @filtra-palabra="guardar_palabra_busqueda"
            @guardar-cambios="guardar_cambios_inventario" 
            @abrir-modal="abrirModal"
            :tipo="'INV'">               
        </HeaderGenerico> 
        <!--/////////////////////////////////////////////////////////////////
        ////                         MODAL LOADER                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="modalLoading" class="rounded-lg w-66 justify-center absolute  inset-x-0 bg-white mx-auto px-12 py-10">          
            <div class="justify-center text-center block">            
                <img src="@/assets/img/load.gif"  class="h-48 w-48" />
                <p class="text-gray-900 font-thin text-md">Espere ... </p>
            </div>
          </div>
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                         MODAL INVENTARIO                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div v-if="modalmtto" class="mt-32 absolute justify-items-center rounded-lg shadow-xl border border-gray-300 inset-x-0 bg-white w-74 h-69 sm:w-66 mx-auto px-10 py-5">
          <ValidationObserver ref="observer">      
            <div><h1 class="text-center font-titulo text-4xl sm:text-md">Mantenimiento</h1></div>
                <div class="grid grid-cols-2 mt-10 sm:grid-cols-1">
                    <div class="ml-2 sm:-ml-4">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true"></SelectPlaza>
                    </div>
                    <div class="mt-8 ml-4">
                      <!-- <ValidationProvider name="Carriles" rules="required" v-slot="{ errors }">  -->
                        <p class="sm:text-sm text-gray-900 -ml-1 font-bold sm:-ml-8">Carril:</p>
                        <p class="w-32 input ml-16 -mt-6 sm:ml-8">
                        <select v-model="datosmtto.ubicacion" class="w-32 border-none" name="Carriles" type="text">
                            <option value="">Selecionar...</option>
                            <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                        </select></p>
                        <!-- <span class="text-red-600 text-xs block">{{ errors[0] }}</span> -->
                      <!-- </ValidationProvider> -->
                    </div>
                </div>
                <div class="mt-6">
                  <ValidationProvider name="FechaMantenimiento" rules="required" v-slot="{ errors }"> 
                    <p class="text-sm mb-1 font-semibold text-gray-700">Fecha de Mantenimineto</p>
                    <input  class="w-full is_valid" type="date" name="FechaMantenimiento" v-model="datosmtto.fecha"/>
                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mt-3">
                  <ValidationProvider name="FolioMantenimiento" rules="required" v-slot="{ errors }"> 
                    <p class="text-sm mb-1 font-semibold text-gray-700">Folio de Mantenimiento</p>
                    <input v-model="datosmtto.folio" class="w-full is_valid" type="text" name="FolioMantenimiento" />
                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mt-8 flex justify-center sm:ml-6">
                    <button class="botonIconCrear font-boton" @click="modalAdver">
                        <span class="">Aceptar</span>
                    </button>
                    <button class="botonIconCancelar font-boton" @click="modalmtto = false, datosmtto.folio = '', datosmtto.ubicacion = ''">
                        <span class="">Cancelar</span>
                    </button>
                </div>
          </ValidationObserver>
        </div> 
        <div v-if="modalAdv" class="mt-32 absolute justify-items-center is_valid shadow-xl inset-x-0 bg-white w-74 h-69 sm:h-73 sm:w-66 mx-auto px-10 py-5 text-gray-600">
            <div>
                <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
                  <img src="../../assets/img/warning.png" class="ml-20 sm:-ml-6" width="35" height="35" />
                  <p class="-mt-10 text-black sm:ml-6 sm:-mt-6">Advertencia</p>
                  <img src="../../assets/img/warning.png" class="ml-68 -mt-12 sm:-mt-10 sm:ml-49" width="35" height="35" />
                </h1>
                <div>
                  <p class="w-69 ml-12 sm:ml-0 sm:w-full text-justify">
                    Se van a actualizar Folios y Fechas de Mantenimiento en todos los componentes de la plaza
                    <span class="text-black font-bold">{{ $store.state.Login.plazaSelecionada.plazaNombre }}</span>
                    del carril <span class="text-black font-bold">{{ datosmtto.ubicacion.lane }}</span>
                    con fehca de Mantenimineto <span class="text-black font-bold">{{ datosmtto.fecha|formato_Fecha }}</span> y folio de Mantenimiento <span class="text-black font-bold">{{ datosmtto.folio }}</span>
                    a excepción de: 
                  </p>
                  <ul class="mt-10 font-bold">
                    <li class="ml-4 sm:ml-0 sm:text-sm">• SEMÁFORO DE ESTADO DE CARRIL FULLMATRIX LED (ASPA/FLECHA)</li> 
                    <li class="ml-4 sm:ml-0 sm:text-sm">• SEMÁFORO DE TELEPEAJE FULLMATRIX LED (AUTOPAGO)</li>
                    <li class="ml-4 sm:ml-0 sm:text-sm">• SEMÁFORO MODO DE PAGO FULLMATRIX LED (CAJERO)</li>
                  </ul>
                </div>
                
            </div>
            <div class="mt-12 flex justify-center">
                <button class="botonIconCrear font-boton" >
                    <span class="" @click="boton_modal_aceptar">Aceptar</span>
                </button>
                <button class="botonIconCancelar font-boton" @click="modalAdv = false, datosmtto.folio = '', datosmtto.ubicacion = '' ">
                    <span class="">Cancelar</span>
                </button>
            </div>
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                             TABLA                               ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 mb-1 font-titulo" style="height:650px;">
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
            <tbody name="table">  
              <template v-if="listComponent.length == 0 && loadingTabla != true"> 
                  <tr>
                      <td class="w-full text-center text-red-500 m-10" colspan="10">                                    
                          <div class="mt-8 mb-8">Sin Informacion</div>
                      </td>
                  </tr>  
              </template> 
              <template v-if="loadingTabla">  
                  <tr>
                      <td class="w-full" colspan="10">                                    
                          <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                      </td>                          
                  </tr>  
              </template>  
              <template v-if="listComponent.length > 0">
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
                      <img src="../../assets/img/more.png" class="mr-2 sm:-ml-4 sm:mr-1" width="15" height="15" />
                      <span class="text-xs">Mas</span>
                    </button>
                  </td>
                </tr>
              </template>
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
import SelectPlaza from '../../components/Header/SelectPlaza'
const API = process.env.VUE_APP_URL_API_PRODUCCION
import moment from 'moment'

export default {
  name: "EditarComponente",
  components: {    
    HeaderGenerico,
    SelectPlaza
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
      modalLoading: false,
      loadingTabla: false,
      datosmtto: {
        plaza:'',
        ubicacion: '',
        fecha: '',
        folio: '',
      },
      plazaSeleccionada: '',
      arrayCarriles: {},
      modalmtto: false,
      modalAdv: false,
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
  created: function(){
    //Escucha Evento SelectPlaza Component
    EventBus.$on('ACTUALIZAR_INVENTARIO', () => {    
        this.listComponent = []  
        this.loadingTabla = true        
        setTimeout(() => {
          this.listComponent = this.$store.getters["Refacciones/GET_PAGINACION_COMPONENTES"];          
          this.full_Component.sort((a, b) => {
            if (a.lane < b.lane) return -1;
            if (a.lane > b.lane) return 1;
            return 0;
          });  
          this.loadingTabla = false      
        },1000)        
    });
  },
  beforeMount: async function () { 
    this.loadingTabla = true
    let numeroPlaza = this.$store.state.Login.plazaSelecionada.numeroPlaza             
    await this.$store.dispatch('Refacciones/FULL_COMPONETES',{ numPlaza: numeroPlaza})          
    this.tipoUsuario = await this.$store.state.Login.cookiesUser.rollId
    this.disableInputs = this.tipoUsuario == 7 || this.tipoUsuario == 4  ? true : false    
    this.listComponent = await this.$store.getters["Refacciones/GET_PAGINACION_COMPONENTES"];
    this.loadingTabla = false
  },
  destroyed(){
    EventBus.$off('ACTUALIZAR_INVENTARIO')
  },
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
  methods: {
    abrirModal: function (){
        this.modalmtto = true
        let fechaInicial = new Date()
        this.datosmtto.fecha = moment(fechaInicial,"DD-MM-YYYY").format("YYYY-MM-DD");
    },
    modalAdver: async function (){      
      let isValid = await this.$refs.observer.validate();       
      if(isValid){
        this.modalAdv = true
        this.modalmtto = false   
      }
      else{
        this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA INGRESADO LOS DATOS COMPLETOS.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });             
      }
    },
    boton_modal_aceptar: async function (){     
      let clavePlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
      let idUser = this.$store.state.Login.cookiesUser.userId
      this.$http.put(`${API}/Mantenimiento/UpdateFolioFechaInventario/${clavePlaza}/${this.datosmtto.ubicacion.idGare}/${this.datosmtto.ubicacion.capufeLaneNum}/${this.datosmtto.fecha}/${this.datosmtto.folio}/${idUser}`)
        .then(async()=>{
          this.modalAdv = false
          this.modalLoading = true
          this.datosmtto.folio = ''
          this.datosmtto.ubicacion = ''
          let numeroPlaza = this.$store.state.Login.plazaSelecionada.numeroPlaza                 
          await this.$store.dispatch("Refacciones/FULL_COMPONETES", { numPlaza: numeroPlaza }); 
          this.listComponent = await this.$store.getters["Refacciones/GET_PAGINACION_COMPONENTES"];
          this.loadingTabla = false       
          this.listEditados = [];
          setTimeout(() => {
            this.modalLoading = false
            this.$notify.success({
              title: "Ok!",
              msg: `SE ACTUALIZARON COMPONENTES.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            }); 
          }, 500)       
        })          
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
    guardar_cambios_inventario: async function () {
      if (this.listEditados.length > 0) {
        let numAct = this.listEditados
        this.modalLoading = true
        let numeroPlaza = this.$store.state.Login.plazaSelecionada.numeroPlaza
        console.log(numeroPlaza)                 
        await this.$store.dispatch("Refacciones/EDIT_COMPONETE_QUICK",this.listEditados);
        await this.$store.dispatch("Refacciones/FULL_COMPONETES", { numPlaza: numeroPlaza });        
        this.listEditados = [];
        setTimeout(() => {
          this.modalLoading = false
          this.$notify.success({
            title: "Ok!",
            msg: `SE ACTUALIZARON ${numAct.length} COMPONENTES.`,
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
        this.loadingTabla = true
        this.listComponent = []
        setTimeout(() => {
          let array_filtrado = this.full_Component.filter(item => {
            return item.lane.toUpperCase().includes(newPalabra.toUpperCase()) || item.component.toUpperCase().includes(newPalabra.toUpperCase()) || item.serialNumber.toUpperCase().includes(newPalabra.toUpperCase())
          })       
          this.arrayPaginacion = [];
          this.listComponent = array_filtrado;
          this.loadingTabla = false
        },1000)
      } 
    },
    cambiar_plaza(numeroPlaza) {  
      this.plazaSeleccionada = numeroPlaza 
      this.arrayCarriles = this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)   
    },
  },
  filters:{
    formato_Fecha(fecha){
      return moment(fecha).format('DD/MM/YYYY')
      //let fechaFormato = new Date(fecha)
      //return fechaFormato.toLocaleString().slice(0,10) 
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
    carriles_plaza(){
      return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
    },
    
  },
};
</script>