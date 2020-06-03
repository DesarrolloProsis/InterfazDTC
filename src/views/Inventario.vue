<template>
  <div>
    <Nav></Nav>
    <div class=" max-w-6xl mx-auto flex-auto mt-3">
    <h1 class=" text-black text-center text-4xl">Inventario</h1>
    </div>
    <div class="border-black border-4 max-w-6xl mx-auto flex-auto h-40 mt-3">
      <div class="pt-8 mr-5 ml-1">
        <div class="flex flex-auto">
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Componente</p>
            </div>
            <div class="border-black border-2">
              <select 
                @change="buscarCarriles"
                v-model="objDatos.componente"
                class="w-64"              
              >
                <option disabled value=''>Selecionar...</option>
                <option
                    v-for="(item, index) in listaComponentes"
                    v-bind:value="item.componente"
                    :key="index"
                  >{{ item.componente }}</option>
              </select>

            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Ubicación</p>
            </div>
            
            <div class="border-black border-2">
              <select 
                @change="buscarInfoComponente"
                v-model="objDatos.ubicacion"
                class="w-64"
              >
                <option disabled value>Selecionar...</option>
                <option
                    v-for="(item, index) in listaCarriles"
                    v-bind:value="item.lane"
                    :key="index"
                  >{{ item.lane }}</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Marca</p>
            </div>
            <div class="border-black border-2">          
                <input v-model="objDatos.marca" class=" w-64" type="text" placeholder="Marca">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Modelo</p>
            </div>
            <div class="border-black border-2">
          <input v-model="objDatos.modelo" class=" w-64" type="text" placeholder="Modelo">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-black border-4 max-w-6xl mx-auto flex-auto h-40 mt-3">
      <div class="pt-8 mr-5 ml-1">
        <div class="flex flex-auto">
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Numero de Serie</p>
            </div>
            <div v-if="onliInfoComponente" class="border-black border-2">
                <input v-model="objDatos.numSerie" class=" w-64" type="text" placeholder="Numero de Serie">
            </div>
            <div v-else class="border-black border-2">
              <select @change="actualizaInfoComponente" v-model="objDatos.numSerie" class="w-64">
                <option disabled value>Selecionar...</option>
                  <option
                    v-for="(item, index) in listaNumSerie"
                    v-bind:value="item.numSerie"
                    :key="index"
                    >{{ item.numSerie }}
                  </option>
              </select>
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Fecha de Instalacion</p>
            </div>
            <div class="border-black border-2">
                <input v-model="objDatos.fechaInstalacion" class=" w-64" type="date">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Fecha Ultimo Mantenimiento</p>
            </div>
            <div class="border-black border-2">
                <input v-model="objDatos.fechaUltimoMantenimiento" class=" w-64" type="date">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Folio Ultimo Mantenimiento</p>
            </div>
            <div class="border-black border-2">
                <input v-model="objDatos.folioUltimoMantenimiento" class=" w-64" type="text" placeholder="Folio Mantenimiento">
            </div>
          </div>
        </div>
      </div>            
    </div>

    <div class="border-black border-4 max-w-6xl mx-auto flex-auto h-40 mt-3">
      <div class="pt-8 mr-5 ml-1">
        <div class="flex flex-auto">
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>No. Inventario CAPUFE</p>
            </div>
            <div class="border-black border-2">
                <input v-model="objDatos.numInventarioCapufe" class=" w-64" type="text" placeholder="Numero Inventario Capufe">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>No. Inventario Prosis</p>
            </div>
            <div class="border-black border-2">
                <input v-model="objDatos.numInventarioProsis" class=" w-64" type="text">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Ubicacion</p>
            </div>
            <div class="border-black border-2">
              <select v-model="objDatos.ubicacionGeneral" class="w-64">
                <option disabled value>Selecionar...</option>
                  <option
                    v-for="(item, index) in listaUbicacionGeneral"
                    v-bind:value="item.ubicacion"
                    :key="index"
                    >{{ item.ubicacion }}
                  </option>
              </select>
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Observacion</p>
            </div>
            <div class="border-black border-2">
              <input v-model="objDatos.observaciones" class=" w-64" type="text" placeholder="Observaciones">
            </div>
          </div>
        </div>
      </div>            
    </div>
    <div class="max-w-6xl mx-auto flex-auto mt-5">
        <div class="flex justify-end">
            <button @click.prevent="AgregarComponente" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-green-700">
                <img src="../assets/img/more.png" class="mr-2" width="25" height="2">
                <span>Agregar Componente</span>
            </button>
        </div>
    </div>
  </div>
</template>


<script>
import Nav from "../components/Navbar";

export default {
  data: function() {
    return {
        infoPlaza: {},
        listaComponentes: [],
        listaUbicacionGeneral: [],
        listaCarriles: [],
        onliInfoComponente: true,
        listaNumSerie: [],
        multiComponente: [],
        objDatos: {
            componente: '',
            ubicacion: '',
            marca: '',
            modelo: '',
            numSerie: '',
            fechaInstalacion: '',
            fechaUltimoMantenimiento: '',
            folioUltimoMantenimiento: '',
            numInventarioCapufe: '',
            numInventarioProsis: '',
            ubicacionGeneral: '',
            observaciones: '',
            oldNumSerie:'',
        }
    };
  },
  components: {
    Nav
  },
  beforeMount: function(){
    this.listaComponentes = this.$store.getters['Refacciones/getlistaRefaccionesInventario']
    this.infoPlaza = this.$store.getters['Header/getConvenioPlaza']  
    this.listaUbicacionGeneral = this.$store.getters['Refacciones/getlistaUbicacionGeneralInventario']  
  },
  methods: {
    buscarCarriles: async function(){
      this.listaCarriles = []
      this.objDatos.ubicacion = ''
      this.multiComponente = []
      this.listaNumSerie = []
      this.onliInfoComponente = true
      if(this.objDatos.componente != ''){
        let newObject = {
          numPlaza: this.infoPlaza.numPlaza,
          componente: this.objDatos.componente          
        }
        await this.$store.dispatch('Refacciones/buscarCarrilesInventario', newObject)
        this.listaCarriles = this.$store.getters['Refacciones/getlistaLaneInventario']
        for (var props in this.objDatos){
          if(props != 'componente')
            this.objDatos[props] = ''
        }
      }
    },
    buscarInfoComponente: async function(){
      if(this.objDatos.ubicacion != ''){
        let newObject = {
          numPlaza: this.infoPlaza.numPlaza,
          carril: this.objDatos.ubicacion,
          componente: this.objDatos.componente          
        }
        await this.$store.dispatch('Refacciones/buscarInfoComponeteInventario', newObject)
        let infoComponente = this.$store.getters['Refacciones/getinfoComponenteInventario']        
        this.objDatos.oldNumSerie = infoComponente[0]['serialNumber']
        if(infoComponente.length == 1){
          this.onliInfoComponente = true          
          this.objDatos.marca = infoComponente[0]['brand']
          this.objDatos.modelo = infoComponente[0]['model']
          this.objDatos.numSerie = infoComponente[0]['serialNumber']
          this.objDatos.fechaInstalacion = infoComponente[0]['instalationDate']
          this.objDatos.fechaUltimoMantenimiento = infoComponente[0]['maintenanceDate']
          this.objDatos.folioUltimoMantenimiento = infoComponente[0]['maintenanceFolio']
          this.objDatos.numInventarioCapufe = infoComponente[0]['inventaryNumCapufe']
          this.objDatos.numInventarioProsis = infoComponente[0]['inventaryNumProsis']
          this.objDatos.ubicacionGeneral = infoComponente[0]['ubication']
          this.objDatos.observaciones = infoComponente[0]['observations']
          
        }
        else{
          this.onliInfoComponente = false
          this.multiComponente = infoComponente
          for(let i = 0; i < this.multiComponente.length; i++){
            let newObj = {
              numSerie: this.multiComponente[i]['serialNumber']
            }
            this.listaNumSerie.push(newObj)          
          }
          console.log(infoComponente)
        }
      }
    },
    actualizaInfoComponente: function(){
      for(let i = 0; i < this.multiComponente.length; i++){
            
            if(this.objDatos.numSerie == this.multiComponente[i]['serialNumber']){
                this.objDatos.marca = this.multiComponente[i]['brand']
                this.objDatos.modelo = this.multiComponente[i]['model']
                this.objDatos.numSerie = this.multiComponente[i]['serialNumber']
                this.objDatos.fechaInstalacion = this.multiComponente[i]['instalationDate']
                this.objDatos.fechaUltimoMantenimiento = this.multiComponente[i]['maintenanceDate']
                this.objDatos.folioUltimoMantenimiento = this.multiComponente[i]['maintenanceFolio']
                this.objDatos.numInventarioCapufe = this.multiComponente[i]['inventaryNumCapufe']
                this.objDatos.numInventarioProsis = this.multiComponente[i]['inventaryNumProsis']
                this.objDatos.ubicacionGeneral = this.multiComponente[i]['ubication']
                this.objDatos.observaciones = this.multiComponente[i]['observations']                
            }
          }
    },
    AgregarComponente: function(){

      let idUbicacion = this.listaUbicacionGeneral.filter(x => x.ubicacion == this.objDatos.ubicacionGeneral)          
      let parametros = {
        infoComponentes: this.objDatos,
        infoPlaza: this.infoPlaza,
        infoUbicacionGeneral: idUbicacion
      }
      this.$store.dispatch('Refacciones/updateComponenteInventary', parametros)
      this.listaCarriles = []
      
      for(const prop in this.objDatos){

        this.objDatos[prop] = ''
      }

    }
  }
};
</script>