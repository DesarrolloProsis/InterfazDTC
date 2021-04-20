<template>
  <div>    
    <h1 class="text-black text-center text-4xl mt-3 sm:mb-1">Inventario</h1>
    <div class="flex justify-center sm:mb-8" :class="{'pointer-events-none': tipoUsuario == 7}">
      <!--/////////////////////////////////////////////////////////////////
      ////                    COLUMNA IZQUIERDA                        ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="flex border border-gray-400 shadow-lg rounded-md m-4 sm:mb-16">
        <div class="m-10 mt-3 sm:m-1 text-base font-light text-gray-900">
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Componente</p>
            <p class="text-lg font-semibold">{{ objDatos.componente }}</p>       
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Ubicación</p>
            <p class="text-lg font-semibold">{{ objDatos.ubicacion }}</p>        
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Marca</p>
            <input v-model="objDatos.marca" class="w-64 sm:w-32" type="text" placeholder="Marca" />
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Modelo</p>
            <input v-model="objDatos.modelo" class="w-64 sm:w-32" type="text" placeholder="Modelo" />
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Numero de Serie</p>
            <input v-model="objDatos.numSerie" class="w-64 sm:w-32" type="text" placeholder="Numero de Serie"/>
          </div>        
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Observacion</p>
            <textarea
              v-model="objDatos.observaciones"
              class="appearance-none block bg-grey-lighter text-grey-darker border border-gray-600 rounded-lg h-20 w-64 sm:w-32"
              type="text"
              placeholder="Observaciones"
            />
          </div>
        </div>
        <!--///////////////////////////////////////////////////////////////////
          ////                     COLUMNA DERECHA                        ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="m-10 mt-3 sm:m-1 sm:text-sm text-base font-light text-gray-900 sm:mb-6" >
          <div class="m-5 sm:ml-10">
            <p class="mb-1">Fecha de Instalacion</p>
            <input v-model="objDatos.fechaInstalacion" class="w-64 sm:w-32" type="date" />
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">Fecha Ultimo Mantenimiento</p>
            <input v-model="objDatos.fechaUltimoMantenimiento" class="w-64 sm:w-32" type="date" />
          </div>
          <div class="m-5 sm:ml-10">
            <p>Folio Ultimo Mantenimiento</p>
            <input v-model="objDatos.folioUltimoMantenimiento" class="w-64 sm:w-32" type="text" placeholder="Folio Mantenimiento"/>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">No. Inventario CAPUFE</p>
            <input v-model="objDatos.numInventarioCapufe" class="w-64 sm:w-32" type="text" placeholder="Numero Inventario Capufe"/>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">No. Inventario Prosis</p>
            <input v-model="objDatos.numInventarioProsis" placeholder="Numero Inventario" class="w-64 sm:w-32" type="text"/>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">Ubicacion</p>
            <select v-model="objDatos.ubicacionGeneral" class="w-64 sm:w-32">
              <option disabled value>Selecionar...</option>
              <option
                v-for="(item, index) in listaUbicacionGeneral"
                v-bind:value="item.ubicacion"
                :key="index"
              >{{ item.ubicacion }}</option>
            </select>
          </div>
          <div class="flex justify-center mt-5 sm:ml-5 sm:text-xs" v-if="tipoUsuario != 7">
            <button @click.prevent="actualizar_componente" class="botonIconBuscar sm:w-32">
              <img src="../../assets/img/save.png" class="mr-2" width="25" height="2" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      infoPlaza: {},
      listaComponentes: [],
      listaUbicacionGeneral: [],
      listaCarriles: [],
      onliInfoComponente: true,
      listaNumSerie: [],
      multiComponente: [],
      objDatos: {
        idComponent: '',
        componente: "",
        ubicacion: "",
        marca: "",
        modelo: "",
        numSerie: "",
        fechaInstalacion: "",
        fechaUltimoMantenimiento: "",
        folioUltimoMantenimiento: "",
        numInventarioCapufe: "",
        numInventarioProsis: "",
        ubicacionGeneral: "",
        observaciones: "",
        oldNumSerie: "",
      },
      tipoUsuario: 0
    };
  },
///////////////////////////////////////////////////////////////////////
////                     CICLO DE VIDA                            ////
/////////////////////////////////////////////////////////////////////
  beforeMount: async function () {
    this.listaComponentes = this.$store.state.Refacciones.listaInventario,
    this.infoPlaza = this.$store.getters["Header/GET_CONVENIO_PLAZA"];
    this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
    this.listaUbicacionGeneral = this.$store.state.Refacciones.listaUbicacionGeneralInventario
    if (JSON.stringify(this.$route.query) != "{}") {
      this.objDatos.idComponent = this.$route.query.infoComponent.idComponent 
      this.objDatos.componente = this.$route.query.infoComponent.component;
      let newObject = {
        numPlaza: this.infoPlaza.numPlaza,
        componente: this.objDatos.componente,
      };
      await this.$store.dispatch("Refacciones/BUSCAR_CARRILES_INVENTARIO",newObject);
      this.listaCarriles = await this.$store.state.Refacciones.listaLaneInventario 
      this.objDatos.ubicacion = this.$route.query.infoComponent.lane;
      await this.buscar_info_componente();
      this.objDatos.numSerie = this.$route.query.infoComponent.serialNumber;
      if (this.onliInfoComponente == false) {
        this.actualiza_info_componente();
      }
    }
  },
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
  methods: {
    buscar_carriles: async function () {
      this.listaCarriles = [];
      this.objDatos.ubicacion = "";
      this.multiComponente = [];
      this.listaNumSerie = [];
      this.onliInfoComponente = true;
      if (this.objDatos.componente != "") {
        let newObject = {
          numPlaza: this.infoPlaza.numPlaza,
          componente: this.objDatos.componente,
        };
        await this.$store.dispatch("Refacciones/BUSCAR_CARRILES_INVENTARIO",newObject);
        this.listaCarriles = this.$store.state.Refacciones.listaLaneInventario
        for (var props in this.objDatos) {
          if (props != "componente") this.objDatos[props] = "";
        }
      }
    },
    buscar_info_componente: async function () {
      if (this.objDatos.ubicacion != "") {
        let newObject = {
          numPlaza: this.infoPlaza.numPlaza,
          carril: this.objDatos.ubicacion,
          componente: this.objDatos.componente,
        };
        await this.$store.dispatch("Refacciones/BUSCAR_INFO_COMPONENTES_INVENTARIO",newObject);
        let infoComponente = this.$store.state.Refacciones.infoComponenteInventario
        this.objDatos.oldNumSerie = infoComponente[0]["serialNumber"];
        if (infoComponente.length == 1) {
          this.onliInfoComponente = true;
          this.objDatos.marca = infoComponente[0]["brand"];
          this.objDatos.modelo = infoComponente[0]["model"];
          this.objDatos.numSerie = infoComponente[0]["serialNumber"];
          this.objDatos.fechaInstalacion = infoComponente[0]["instalationDate"];
          this.objDatos.fechaUltimoMantenimiento = infoComponente[0]["maintenanceDate"];
          this.objDatos.folioUltimoMantenimiento = infoComponente[0]["maintenanceFolio"];
          this.objDatos.numInventarioCapufe = infoComponente[0]["inventaryNumCapufe"];
          this.objDatos.numInventarioProsis = infoComponente[0]["inventaryNumProsis"];
          this.objDatos.ubicacionGeneral = infoComponente[0]["ubication"];
          this.objDatos.observaciones = infoComponente[0]["observations"];
        } 
        else {
          this.onliInfoComponente = false;
          this.multiComponente = infoComponente;
          for (let i = 0; i < this.multiComponente.length; i++) {
            let newObj = {
              numSerie: this.multiComponente[i]["serialNumber"],
            };
            this.listaNumSerie.push(newObj);
          }          
        }
      }
    },
    actualiza_info_componente: function () {
      for (let i = 0; i < this.multiComponente.length; i++) {
        if (this.objDatos.numSerie == this.multiComponente[i]["serialNumber"]) {
          this.objDatos.marca = this.multiComponente[i]["brand"];
          this.objDatos.modelo = this.multiComponente[i]["model"];
          this.objDatos.numSerie = this.multiComponente[i]["serialNumber"];
          this.objDatos.fechaInstalacion = this.multiComponente[i]["instalationDate"];
          this.objDatos.fechaUltimoMantenimiento = this.multiComponente[i]["maintenanceDate"];
          this.objDatos.folioUltimoMantenimiento = this.multiComponente[i]["maintenanceFolio"];
          this.objDatos.numInventarioCapufe = this.multiComponente[i]["inventaryNumCapufe"];
          this.objDatos.numInventarioProsis = this.multiComponente[i]["inventaryNumProsis"];
          this.objDatos.ubicacionGeneral = this.multiComponente[i]["ubication"];
          this.objDatos.observaciones = this.multiComponente[i]["observations"];
        }
      }
    },
    actualizar_componente: async function () {
      let idUbicacion = this.listaUbicacionGeneral.filter(
        (x) => x.ubicacion == this.objDatos.ubicacionGeneral
      );
      let parametros = {
        infoComponentes: this.objDatos,
        infoPlaza: this.infoPlaza,
        infoUbicacionGeneral: idUbicacion,
      };
      
      await this.$store.dispatch("Refacciones/ACTUALIZAR_COMPONENTE_INVENTARIO", parametros); 
      this.$notify.success({
          title: "Ok!",
          msg: `SE ACTUALIZO CORRECTAMENTE EL COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
        this.$router.push('/Inventario')
    },
  },
};
</script>