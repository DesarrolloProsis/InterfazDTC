  <template>
  <div >
    <Nav></Nav>
    <div class="relative mb-16 " >
    <!--//////////////////////////////////////////////////////////////////////
        ////                        FILTROS                              ////
        ////////////////////////////////////////////////////////////////////-->
      <div class="flex justify-center mt-2" :class="{ 'pointer-events-none': modal}">      
        <div class="border-2 px-16 shadow-lg z-10 justify-center sm:w-66">
          <div class="flex sm:inline-block">
            <!--/////////////////////////////////////////////////////////////////////
                ////                         FILTRO TRAMO                        ////
                ////////////////////////////////////////////////////////////////////-->
            <div class="m-3" v-if="false">
              <p class="font-bold sm:text-sm mb-5">Selecciones el Tramo</p>
                <select class="w-full" type="text">
                  <option disabled value="">Selecionar...</option>                                               
                </select>
            </div>
          <!--/////////////////////////////////////////////////////////////////
              ////                         FILTRO PLAZA                       ////
              ////////////////////////////////////////////////////////////////////-->
            <div class="m-3">
              <p class="font-bold sm:text-sm mb-5">Selecciones la Plaza</p>
                <select v-model="plazaFiltro" class="w-full" type="text">
                  <option disabled value="">Selecionar...</option>     
                  <option v-for="(item, index) in plazasValidas" :value="item.squareCatalogId" :key="index">{{ item.squareName }}</option>                
                </select>
            </div>  
            <!--/////////////////////////////////////////////////////////////////
                ////                         FILTRO FECHA                        ////
                ////////////////////////////////////////////////////////////////////-->        
            <div class="m-3">
              <p class="font-bold mb-5 sm:text-sm">Seleccione una fecha</p>
              <input v-model="fechaFiltro" class="border w-40" type="date"/>
              <span class="block text-xs text-gray-600">*Fecha de Siniestro</span>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
                ////                         FILTRO REFERENCIA                   ////
                ////////////////////////////////////////////////////////////////////-->
            <div class="m-3">
              <p class="font-bold sm:text-sm mb-5">Escriba la Referencia</p>
              <input v-model="referenciaFiltro" class="border w-40" placeholder="PM-000000"/>
            </div>  
              <!--////////////////////////////////////////////////////////////////////
                  ////                         FILTRO ESTATUS                     ////
                  ////////////////////////////////////////////////////////////////////-->          
            <div class="m-3">
              <p class="font-bold mb-5 sm:text-sm">Status DTC</p>
              <select v-model="statusFiltro" class="w-full" type="text">
                  <option value="">Selecionar...</option>     
                  <option value="1">Inconcluso</option>  
                  <option value="2">Concluido</option>                                                                  
                  <option value="3">Sellado</option>                                                                                         
                  <option value="4">GMMEP</option>                      
              </select>                  
            </div>
          </div>
          <!--/////////////////////////////////////////////////////////////////
              ////                  BOTONES FILTROS                        ////
              /////////////////////////////////////////////////////////////////-->
          <div class="m-3 text-center">
            <button @click.prevent="limpiar_filtros" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-center border border-red-700 m-1">
              <img src="../../assets/img/bin.png" class="mr-2" width="25" height="2"/>
              <span>Limpiar</span>
            </button>
            <button @click.prevent="filtro_Dtc" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-center border border-blue-700 m-1">
              <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="2"/>
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>      
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
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL CONFIRMAR GMMEP                 ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
        <div v-if="modalFirma" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 mx-auto px-12 py-10 shadow-2xl">
          <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
            <p class="text-gray-900 font-thin text-md">Seguro que quieres agregar autorizacion GMMEP a este DTC {{ refNum }}</p>
            <div class="justify-center flex mt-5">
              <button @click="agregar_autorizacion_gmmep(true)" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
              <button @click="agregar_autorizacion_gmmep(false)" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
            </div>
          </div>
        </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL ELIMINAR                         ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
        <div v-if="modalEliminar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
          <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Seguro que quiere eliminar este DTC {{ refNum }}</p>
          <div class="justify-center flex mt-5">
            <button @click="borrar(true)" class="text-white mb-5 px-5 py-3 rounded-lg m-2 bg-green-600">Si</button>
            <button @click="(modal = modalEliminar = false), (refNum = '')" class="text-white mb-5 px-4 py-3 rounded-lg m-2 bg-red-700">No</button>
          </div>
        </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL EDITAR DTC                       ////
        ////////////////////////////////////////////////////////////////////-->
        <div class=" sticky inset-0">
          <div v-if="modalEdit" class="absolute w-73 sm:w-66  mx-auto sm:relative justify-center inset-x-0 pointer-events-auto">     
            <div class="rounded-lg border border-gray-700 bg-white px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-bold text-lg">Editar DTC {{ dtcEdit.referenceNumber }}</p>
              <!--/////////////////////////////////////////////////////////////////
                ////                   FILA NUMERO 1                         ////
                ////////////////////////////////////////////////////////////////-->
              <div class="justify-center grid grid-cols-2 mt-5">       
                <div class="mt-2 mr-3">        
                  <p class="text-sm mb-1 font-semibold text-gray-900">N° Siniestro:</p>
                  <input v-validate="'uniqueSinester'" :class="{ is_valid: !errors.first('NoSiniestro'),is_invalid: errors.first('NoSiniestro')}" v-model="dtcEdit.sinisterNumber" class="w-full" type="text" name="NoSiniestro" placeholder="S/M"/>
                </div>
                <div class="mt-2">       
                  <p class="text-sm mb-1 font-semibold text-gray-900">N° Reporte:</p>
                  <input v-validate="'uniqueReport'" :class="{ is_valid: !errors.first('NoReporte'),is_invalid: errors.first('NoReporte')}" v-model="dtcEdit.reportNumber" class="w-full" type="text" name="NoReporte" placeholder="S/M"/>
                </div>
              </div>
            <!--/////////////////////////////////////////////////////////////////////
                ////                      FILA NUMERO 2                         ////
                ////////////////////////////////////////////////////////////////////-->
              <div class="justify-center grid grid-cols-2 mt-5">       
                <div class="mt-2 mr-3">     
                  <p class="text-sm mb-1 font-semibold text-gray-900">Folio de Falla:</p>
                  <input v-model="dtcEdit.failureNumber" class="w-full" type="text" placeholder="S/M"/>
                </div>
                <div class="mt-2">    
                  <p class="text-sm mb-1 font-semibold text-gray-900">Tipo de Descripcion:</p>
                  <select v-model="dtcEdit.typeDescriptionId" v-validate="'required'" :class="{ is_valid: !errors.first('TipoDescripcion'),is_invalid: errors.first('TipoDescripcion')}" class="sm:w-full w-48" type="text" name="TipoDescripcion">
                    <option disabled value>Selecionar...</option>
                    <option v-for="(desc, index) in descripciones" v-bind:value="desc.typeDescriptionId" :key="index">
                      {{ desc.description }}
                    </option>
                  </select>
                </div>
              </div>
            <!--/////////////////////////////////////////////////////////////////////
                ////                      FILA NUMERO 3                         ////
                ////////////////////////////////////////////////////////////////////-->
              <div class="justify-center grid grid-cols-2 mt-5">       
                <div class="mt-2 mr-3">     
                  <p class="text-sm mb-1 font-semibold text-gray-900">Observaciones:</p>
                  <textarea v-model="dtcEdit.observation" v-validate="'max:300'" :class="{ 'is_valid': !errors.first('Observaciones'), 'is_invalid': errors.first('Observaciones')}" class="bg-white appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-20 placeholder-gray-500 border" placeholder="jane@example.com" name="Observaciones"/>              
                </div>
                <div class="mt-2 ">     
                  <p class="text-sm mb-1 font-semibold text-gray-900">Diagnostico:</p>
                  <textarea v-model="dtcEdit.diagnosis" v-validate="'max:300'" :class="{ 'is_valid': !errors.first('Diagnostico'), 'is_invalid': errors.first('Diagnostico')}" class="bg-white appearance-none block container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-20 placeholder-gray-500 border" placeholder="jane@example.com" name="Diagnostico"/>              
                </div>            
              </div>
              <p class="text-xs text-red-600">{{ errors.first("Observaciones") }}</p>
              <p class="text-xs text-red-600">{{ errors.first("Diagnostico") }}</p>
              <p class="text-red-600 text-xs">{{ errors.first("NoSiniestro") }}</p>
              <p class="text-red-600 text-xs">{{ errors.first("NoReporte") }}</p>
              <p class="text-red-600 text-xs">{{ errors.first("TipoDescripcion") }}</p>
            <!--/////////////////////////////////////////////////////////////////////
                ////                        BOTONES MODAL EDIT                         ////
                ////////////////////////////////////////////////////////////////////-->
              <div class="justify-end grid grid-cols-2  mt-10">  
                <div >       
                  <button @click="editar_header_dtc(true)" class="text-white px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700">Actualizar</button>          
                </div>     
                <div>                    
                  <button @click="(modalEdit = modal = false), (refNum = '')" class="text-white px-4 py-3 rounded-lg  bg-red-600 hover:bg-red-700">Cancelar</button>              
                </div>     
              </div>
            </div>
          </div>
        </div>      
      <!--/////////////////////////////////////////////////////////////////
      ////                      TARJETAS DE DTC                        ////
      ////////////////////////////////////////////////////////////////////-->
      <div :class="{ 'pointer-events-none': modal}" class="flex justify-center w-full">
        <div class="flex-no-wrap grid grid-cols-3 gap-4 sm:grid-cols-1">
          <div class="shadow-2xl inline-block focus m-4 p-3 sm:m-6 " v-for="(dtc, index) in lista_dtc" :key="index">
            <CardListDTC
              @borrar-card="confimaBorrar"
              @editar-card="editar_header_dtc"
              @agregar_autorizacion_gmmep="agregar_autorizacion_gmmep"
              @enviar_pdf_sellado="enviar_pdf_sellado"
              :plazasValidas="plazasValidas"
              :infoCard="dtc"              
            ></CardListDTC>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Navbar";
import moment from "moment";
import ServicePDfReporte from '../../services/ReportesPDFService'
//import saveAs from "file-saver";
import CardListDTC from "../../components/DTC/CardListaDTC.vue";
import Axios from 'axios';
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  data() {
    return {
      infoDTC: [],
      fechaFiltro: "",
      referenciaFiltro: "",
      modal: false,
      modalEliminar: false,
      modalEdit: false,
      refNum: "",    
      tipoUsuario: '',
      dtcEdit: {},
      descripciones: [],
      plazasValidas: [],
      plazaFiltro: '',
      statusFiltro: '',
      modalFirma: false,
      modalLoading: false
    };
  },
  components: {
    Nav,
    CardListDTC,
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.descripciones = this.$store.getters["DTC/getListaDescriptions"];
  this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];  
  this.tipoUsuario = this.$store.getters['Login/getTypeUser'];
  let listaPlazasValias = []
  let todasPlazas = this.$store.getters['Login/getListaPlazas']  
  for(let plaza of todasPlazas){      
      if(this.infoDTC.some(dtc => dtc.squareCatalogId == plaza.squareCatalogId)){
        plaza["referenceSquare"] = this.infoDTC.find(dtc2 => dtc2.squareCatalogId == plaza.squareCatalogId).referenceSquare
        listaPlazasValias.push(plaza)        
      }
  }
  this.plazasValidas = listaPlazasValias  
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  borrar: async  function (value) {  
      let userId = this.$store.getters['Login/getUserForDTC']         
      let obj = { "refNum": this.refNum, "userId": userId.idUser }    
      if (value) {
        this.infoDTC = []        
        this.modalEliminar = false;   
        this.modal = false     
        await this.$store.dispatch("DTC/BORRAR_DTC",obj);                                                                                
        this.menosMas = true
        this.showmenosMas = false,        
        this.$notify.default({
          title: "Ok!",
          msg: `EL DTC CON LA REFERENCIA ${this.refNum} SE ELIMINO CORRECTAMENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
      await this.$store.dispatch("Header/buscarListaUnique");
      await this.$store.dispatch('DTC/buscarListaDTC', userId)            
      this.infoDTC = await this.$store.getters["DTC/getlistaInfoDTC"] 
      this.refNum = "";
      
  },
  confimaBorrar: function (refNum) {
      this.refNum = refNum;
      this.modalEliminar = true;
      this.modal = true
  },
  editar_header_dtc: async function(refNum){ 
    let validador = false    
    if(refNum === true){                
      this.$validator.validateAll().then((item) => {        
        if(item == false){            
          validador = false      
          this.errors.items.map((error) => {            
            this.$notify.warning({
              title: "Ups!",
              msg: `FALTA LLENAR EL CAMPO ${error.field.toUpperCase()}.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          })
        }
        else{
          validador = true  
        }                      
      }).then(() => {        
        if(validador){          
          this.modalEdit = false
          this.modalLoading = true          
          let objEdit = {
            referenceNumber: this.dtcEdit.referenceNumber,
            numSiniestro: this.dtcEdit.sinisterNumber,
            numReporte: this.dtcEdit.reportNumber,
            folioFalla: this.dtcEdit.failureNumber,
            tipoDescripcion: this.dtcEdit.typeDescriptionId,
            observaciones: this.dtcEdit.observation,
            diagnostico: this.dtcEdit.diagnosis,
          }   
          let values = Object.values(objEdit)          
          for(let item of values){
            if(item === null){
              item = ''
            }
          } 
          console.log('datos que envia')
          console.log(objEdit)                       
          let editar_dtc_promise = new Promise((resolve , reject) => {
            Axios.put(`${API}/dtcData/UpdateDtcHeader/${this.$store.getters['Login/getReferenceSquareActual']}`, objEdit)
            .then(() =>{                                                             
              this.$store.dispatch("Header/buscarListaUnique");
              let info = this.$store.getters['Login/getUserForDTC']
              this.modal = false  
              this.$store.dispatch('DTC/buscarListaDTC', info)               
              resolve('ok')                     
            })
            .catch((ex) => {
              reject(ex)
              this.$notify.error({
              title: "ups!",
              msg: console.log(ex),
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          })  
          })
          setTimeout(() => {
            editar_dtc_promise.then(() => {                                     
              this.limpiar_filtros()
              this.modalLoading = false
              this.$notify.success({
                title: "Ok!",
                msg: `SE ACTUALIZO EL DTC ${objEdit.referenceNumber}.`,
                position: "bottom right",
                styles: {
                  height: 100,
                  width: 500,
                },
              });
              ServicePDfReporte.generar_pdf_correctivo(objEdit.referenceNumber, 2, true)
            })
            .catch((err) =>  console.log(err))    
          }, 3000);    
        } 
      })       
    }
    else{
      this.dtcEdit = { ...this.infoDTC.find(item => item.referenceNumber == refNum) }       
      this.modalEdit = true
      this.modal = true
    }    
  },
  limpiar_filtros: async function() {     
      let info = this.$store.getters['Login/getUserForDTC']  
      this.$store.dispatch('DTC/buscarListaDTC', info)            
      this.infoDTC = []          
      await this.$nextTick().then(() => {             
        this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];  
        this.fechaFiltro = "";
        this.referenciaFiltro = "";            
        this.plazaFiltro = ""
        this.statusFiltro = ""            
      })          
  },
  enviar_pdf_sellado: async function(value){   
    this.modalLoading = true
    let pdf_sellado_promise = new Promise((resolve, reject) => {
      Axios.post(`${API}/pdf/PdfSellado/${value.referenceNumber.split('-')[0]}/${value.referenceNumber}`, value.file)                   
        .then((response) => {
          console.log(response)
          Axios.get(`${API}/pdf/GetPdfSellado/${value.referenceNumber.split('-')[0]}/${value.referenceNumber}`)
          .then((response) => { 
              console.log(response)
              resolve('ok')                
              let info = this.$store.getters['Login/getUserForDTC']  
              this.$store.dispatch('DTC/buscarListaDTC', info)   
              this.limpiar_filtros()                                                                                         
          })                                  
        })
        .catch((ex) => {
          reject(ex)                          
          this.$notify.error({
            title: "ups!",
            msg: ex,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });        
        });              
    })
    setTimeout(() => {
        pdf_sellado_promise.then(() => {  
          this.modalLoading = false                  
          this.limpiar_filtros()
          this.$notify.success({
                title: "Ok!",
                msg: `Se subio el archivo correctamente.`,
                position: "bottom right",
                styles: {
                  height: 100,
                  width: 500,
                },
          });  
        })
        .catch((err) =>  console.log(err))    
      }, 3000);                                                                                   
  },
  filtro_Dtc: function () {    
    this.infoDTC  = []
    let _lista_completa  = this.$store.getters["DTC/getlistaInfoDTC"]; 
    let listaFiltrada = _lista_completa    
    if(this.plazaFiltro != ""){      
      listaFiltrada = _lista_completa.filter(dtc => dtc.squareCatalogId == this.plazaFiltro)
    } 
    else if (this.fechaFiltro != "") {    
      let formatFecha = moment(this.fechaFiltro).format("DD/MM/YYYY");
      let newArray = [];
      for (let item of _lista_completa) {
        if (moment(item.sinisterDate).format("DD/MM/YYYY") == formatFecha) {
          newArray.push(item);
        }
      }
      listaFiltrada = newArray   
    } 
    else if (this.referenciaFiltro != "") {     
      let newArray = [];
      for (let item of _lista_completa) {          
        if (item.referenceNumber.includes(this.referenciaFiltro.toUpperCase())) {
          newArray.push(item);
        }
      }
      listaFiltrada = newArray
    }
    if(this.statusFiltro != ""){   
      console.log(this.statusFiltro)  
      listaFiltrada = listaFiltrada.filter(item => item.statusId == this.statusFiltro)
    }
    this.$nextTick().then(() => {      
        this.infoDTC = listaFiltrada            
    })  
  },  
  agregar_autorizacion_gmmep(value){
    if(value === true){      
      this.modalLoading = true
      this.modalFirma = false    
      let agregar_firma_promise = new Promise((resolve, reject) => {              
        Axios.get(`${API}/pdf/Autorizado/${this.refNum.split('-')[0]}/${this.refNum}`)
        .then(() => {           
          let info = this.$store.getters['Login/getUserForDTC']  
          this.$store.dispatch('DTC/buscarListaDTC', info)                 
          this.refNum = ''     
          resolve('ok')         
        })
        .catch((ex) => {   
          reject(ex)                     
          this.$notify.error({
            title: "ups!",
            msg: ex,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        });            
      })
      setTimeout(() => {
        agregar_firma_promise.then(() =>{
          this.limpiar_filtros()
          this.modalLoading = false 
          this.$notify.success({
            title: "Ok!",
            msg: `SE AUTORIZADO CORRECTAMENTE GMMEP.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });         
        }).catch((err) => console.log(err))
      }, 3000)
    }
    else if(value === false){
        this.referenciaFiltro = this.refNum
        this.filtro_Dtc()
        this.modalFirma = false
        this.refNum = ''
    }
    else{
      this.refNum = value
      this.modalFirma = true
    }
  }
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADOS                         ////
/////////////////////////////////////////////////////////////////////
computed: {
  validaFecha: function () {
      if (this.fechaFiltro != "") return true;
      else return false;
  },
  validaReferencia: function () {
      if (this.referenciaFiltro != "") return true;
      else return false;
  },
  lista_dtc(){
    return this.infoDTC
  }
},


};
</script>

<style>
