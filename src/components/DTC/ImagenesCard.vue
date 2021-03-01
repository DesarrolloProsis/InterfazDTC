<template>
  <div>    
    <div class="border justify-items-center w-66 sm:w-auto">      
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 SECCION DE AGREGAR IMAGEN                    ////
          ///////////////////////////////////////////////////////////////////// -->
      <template v-if="cargarImagen">
        <div class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed w-full" v-if="editar_imagen">         
          <div class="inline-flex justify-center">
            <input :disabled="(tipoUsuario == 9 || tipoUsuario == 7 || tipoUsuario == 8 || tipoUsuario == 4)" type="file" class="opacity-0 w-auto h-12 absolute" multiple @change="recibirImagenes"/>
            <img src="../../assets/img/image-mini.png" class="w-6 mr-3 mt-3 border" alt/>
            <p class="text-base text-gray-900 mt-3">Fotos Equipo Dañado</p>
          </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////////
            ////                 lISTAR IMAGENES EDICION                      ////
            ///////////////////////////////////////////////////////////////////// -->
        <div v-else class="border-2 border-gray-500 flex-col justify-center border-dashed w-full">
          <div v-for="(item, key) in fileUpload" :key="key" class="border border-r-0 justify-between inline-flex w-full">
            <div class="inline-flex">              
              <lazy-image :src="`${item.imgbase}`" :img-class="['w-10', 'h-10']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif" v-if="item.name.split('_')[0] == referenceNumber"/>
              <lazy-image :src="`data:image/jpeg;base64,${item.imgbase}`" :img-class="['w-10', 'h-10']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif" v-else/>
              <p class="ml-3 mt-2">{{ item.name }}</p>
            </div>
            <div class="mr-2">
              <button @click="eliminarImagen(key)" class="w-3 h-46 p-0 bord">x</button>
            </div>
          </div>
          <div class="inline-flex justify-center" v-show="true">
            <input type="file" class="opacity-0 w-64 h-12 absolute" multiple @change="recibirImagenes"/>
            <img src="../../assets/img/image-mini.png" class="w-6 mr-3 mt-3 border" alt/>
            <p class="text-base text-gray-900 mt-3">Subir Imagenes</p>
          </div>
          <div v-if="agregarbool" class="inline-flex w-full border-t-2">
            <button @click="uploadFiles" class="w-1/2 h-8 text-gray-900 text-xs border-2 border-green-500 rounded-lg m-2">Agregar</button>
            <button @click="cancelar_edicion" class="w-1/2 h-8 text-gray-900 text-xs border-red-500 border-2 rounded-lg m-2">Cancelar</button>
          </div>
          <div v-else class="inline-flex w-full border-t-2">
            <button @click="uploadFiles" class="w-1/2 h-8 text-gray-900 text-xs border-2 border-yellow-500 rounded-lg m-2">Guardar Cambios</button>
            <button @click="cancelar_edicion" class="w-1/2 h-8 text-gray-900 text-xs border-red-500 border-2 rounded-lg m-2">Cancelar</button>
          </div>
        </div>
      </template>
      <!-- /////////////////////////////////////////////////////////////////////
          ////              SECCION DE VISUALIZAR IMAGEN                    ////
          ///////////////////////////////////////////////////////////////////// -->
      <template v-else>
        <div class="flex justify-between">
          <div class="justify-start">
            <button v-if="!(tipoUsuario == 9 || tipoUsuario == 7 || tipoUsuario == 8)" @click="editar_img" class="m-1 p-1 text-xs inline-flex border border-green-600 rounded-lg hover:border-green-700">
              Agregar 
              <img src="../../assets/img/image-mini.png" class="w-6 border" alt/>
            </button>
          </div>
          <div class="justify-end">
            <button @click="cambiar_imagen('anterior')" class="m-1 border hover:border-blue-500 rounded-md">
              <img src="../../assets/img/flecha-izquierda.png" class="w-6 border" alt />
            </button>
            <button @click="cambiar_imagen('siguiente')" class="m-1 border hover:border-blue-500 rounded-md">
              <img src="../../assets/img/flecha-derecha.png" class="w-6 border" alt />
            </button>
          </div>
        </div>
        <div  @click="imagenes_carrusel" class="p-1" v-show="!agregarbool">         
          <lazy-image v-if="cambiarImagenBool" :src="imgbase64.array_img[index_imagen_actual].image" :img-class="['h-66']" placeholder="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"/>          
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import ServiceImagenes from '../../services/ImagenesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
import EventBus from "../../services/EventBus.js";
import CookiesService from '../../services/CookiesService'

export default {
  name: 'ImgenesCard',
  component:{
  },
  props: {
    referenceNumber: {
      type: String,
      default: () => "",
    },
    plazasValidas: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      fileUpload: [],
      imagenes_enviar: [],
      cargarImagen: true,
      imgbase64: {
        array_img: [],
        referenceNumber: "",
      },      
      agregarbool: true,
      index_imagen_actual: 0,
      editar_imagen: true,
      eliminar_name: [], 
      cambiarImagenBool: true    ,
      tipoUsuario: '' 
    };
  },  
/////////////////////////////////////////////////////////////////////
////                          CICLOS DE VIDA                     ////
/////////////////////////////////////////////////////////////////////
  beforeMount: async function () {    
    this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
    let _ref = this.referenceNumber.split("-")[0]          
    let nombre_plaza = this.plazasValidas.find(plaza => plaza.referenceSquare == _ref).squareName          
    if(nombre_plaza != undefined){       
      await Axios.get(`${API}/dtcData/EquipoDañado/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`, CookiesService.obtener_bearer_token())
        .then((response) => {              
            if(response.status != 404){
              let array = response.data.map(item => {
                return {
                  "fileName": item, 
                  "image": `${API}/dtcData/EquipoDañado/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${item}`
                }
              })            
              this.imgbase64 = {
                array_img: array,
                referenceNumber: this.referenceNumber,
              };   
            }               
        })
        .catch(() => {    
          CookiesService.token_no_autorizado()      
        });      
      if (this.imgbase64.array_img.length > 0) {        
          this.agregarbool = false;
          this.cargarImagen = false;                   
      } 
      else {
          this.agregarbool = true;
          this.cargarImagen = true;
          this.imgbase64 = {
            array_img: [],
            referenceNumber: "",
          };
      }
    }
  },
  /////////////////////////////////////////////////////////////////////
////                          METODOS                              ////
/////////////////////////////////////////////////////////////////////
  methods: {
    imagenes_carrusel(){      
      EventBus.$emit("abrir_modal_carrusel", this.imgbase64);
    },
    recibirImagenes: function (e) {
      this.imagenes_enviar = this.fileUpload =ServiceImagenes.obtener_array_imagenes(e, this.fileUpload)        
      this.cargarImagen = true;      
      this.editar_imagen = false;
    },
    eliminarImagen: function (item) {
      if (confirm("¿Seguro que quiere eliminar esta imagen?")) {
        if (!this.agregarbool) {
          let nombre = this.fileUpload[item].name;         
          let index = this.fileUpload.indexOf(item => item.name == nombre) 
          if (index > -1){ 
            if(this.imagenes_enviar.length == 1){
              this.imagenes_enviar = []
            }
            else
              this.imagenes_enviar.splice(index, 1);
          }
          else this.eliminar_name.push(nombre);
        }
        this.fileUpload.splice(item, 1);
      }
    },
    cancelar_edicion: function () {
      this.$nextTick().then(() => {
        this.fileUpload = [];
        this.eliminar_name = [];
        this.imagenes_enviar = [];
        this.editar_imagen = true;
        this.cargarImagen = this.imgbase64.array_img.length == 0 ? true : false;
      })
    },
    cambiar_imagen: function (value) {      
      this.cambiarImagenBool = false;
      if (value == "anterior") {
        if (this.index_imagen_actual == 0)
          this.index_imagen_actual = this.imgbase64.array_img.length - 1;        
        else
          this.index_imagen_actual = this.index_imagen_actual - 1;        
      }
      if (value == "siguiente") {
        if (this.index_imagen_actual == this.imgbase64.array_img.length - 1)
          this.index_imagen_actual = 0;        
        else 
          this.index_imagen_actual = this.index_imagen_actual + 1;          
      }      
      this.$nextTick().then(() =>{
        this.cambiarImagenBool = true;
      })
    },
    editar_img: function () {
      for (let imgbase64 of this.imgbase64.array_img) {
        let obj = {
          imgbase: imgbase64.image,
          name: imgbase64.fileName,
        };
        this.fileUpload.push(obj);
      }
      this.editar_imagen = false;
      this.cargarImagen = true;
    },
    uploadFiles: async function () {
      let nombre_plaza = this.$store.state.Login.plazaSelecionada.plazaNombre
      let eliminar_promise = new Promise(async (resolve, reject) => {        
        if (this.eliminar_name.length > 0) {
          for (let eliminar of this.eliminar_name) {
            Axios.get(`${API}/dtcData/EquipoDañado/Images/DeleteImg/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${eliminar}`, CookiesService.obtener_bearer_token())
              .then(() => {})
              .catch((ex) => {
                CookiesService.token_no_autorizado()
                console.log("error al eliminar");
                reject("mal");
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
          }          
          await this.actualizar_img(nombre_plaza);
          resolve("ok");
        } else {          
          resolve("ok");
        }
      });      
      let agregar_promise = new Promise(async (resolve, reject) => {        
        if (this.imagenes_enviar.length > 0) {
          for (const item of this.imagenes_enviar) {
            if(item.name.split('_')[0] != this.referenceNumber)      {      
            let formData = new FormData();
            formData.append("id", this.referenceNumber);
            formData.append("plaza", nombre_plaza);
            formData.append("image",ServiceImagenes.base64_to_file(item.imgbase, item.name));            
            await Axios.post(`${API}/dtcData/EquipoDañado/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`,formData, CookiesService.obtener_bearer_token())
              .then((response) => {    
                console.log(response)            
                this.$notify.success({
                  title: "Ok!",
                  msg: `SE INSERTO CORRECTAMENTE LAS IMAGENES.`,
                  position: "bottom right",
                  styles: {
                    height: 100,
                    width: 500,
                  },
                });
              })
              .catch((ex) => {    
                CookiesService.token_no_autorizado()            
                reject("mal");
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
            }
          }          
          await this.actualizar_img(nombre_plaza);
          resolve("ok");
        } else {          
          this.cargarImagen = false;
          resolve("ok");
        }
      });
      Promise.all([agregar_promise, eliminar_promise]);
    },
    actualizar_img: async function (nombre_plaza) {
      console.log(nombre_plaza)
      let array_nombre_imagenes = [];      
      this.$store.commit("DTC/LIMPIAR_IMAGENES_REF", this.referenceNumber);
      this.imgbase64 = [];
      await Axios.get(`${API}/dtcData/EquipoDañado/Images/GetPaths/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}`, CookiesService.obtener_bearer_token())
        .then((response) => {          
          array_nombre_imagenes = response.data;
        })
        .catch(() => {
          console.log("error en el actuzaliacion");
          CookiesService.token_no_autorizado()
        });
      let arrayimg = [];
      if (array_nombre_imagenes.length > 0) {
        for (let item2 of array_nombre_imagenes) {          
          arrayimg.push({
            fileName: item2,
            image: `${API}/dtcData/EquipoDañado/Images/${this.referenceNumber.split('-')[0]}/${this.referenceNumber}/${item2}`,
          });
        }
        let obj = {
          referenceNumber: this.referenceNumber,
          array_img: arrayimg,
        };
        this.$store.commit("DTC/LISTA_IMAGENES_DTC_MUTATION", obj);
        this.imgbase64 = this.$store.getters["DTC/GET_IMAGENES_DTC"](this.referenceNumber);
        this.agregarbool = false;
        this.cargarImagen = false;
      } else {
        this.imgbase64 = {
          array_img: [{
            imgbase: '',
            name: ''
          }],
          referenceNumber: this.referenceNumber
        
        }
        this.agregarbool = true;
        this.cargarImagen = true;
        this.editar_imagen = true;
      }
      this.eliminar_name = [];
      this.imagenes_enviar = [];
      this.fileUpload = [];
    },
  },
};
</script>
<style scoped>
.vuetify-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.vuetify-lazy-image-loaded {
  filter: blur(0);
}
</style> 