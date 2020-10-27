<template>
  <div>
    <div class="border justify-items-center">
      <template v-if="cargarImagen">
        <div
          class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed"
          v-if="editar_imagen"
        >
          <div class="inline-flex justify-center">
            <input
              type="file"
              class="opacity-0 w-64 h-12 absolute"
              multiple
              @change="recibirImagenes"
            />
            <img
              src="../../assets/img/image-mini.png"
              class="w-6 mr-3 mt-3 border opacity-75"
              alt
            />
            <p class="text-base text-gray-900 mt-3">Subir Imagenes</p>
          </div>
        </div>
        <div
          v-else
          class="border-2 border-gray-500 flex-col justify-center border-dashed w-64"
        >
          <div
            v-for="(item, key) in fileUpload"
            :key="key"
            class="border border-r-0 justify-between inline-flex w-64"
          >
            <div class="inline-flex">
              <img
                :src="`data:image/jpeg;base64,${item.imgbase}`"
                class="w-10 h-10"
                alt=""
              />
              <p class="ml-3 mt-2">
                {{ item.name }}
              </p>
            </div>
            <div class="mr-2">
              <button @click="eliminarImagen(key)" class="w-3 h-46 p-0 bord">
                x
              </button>
            </div>
          </div>
          <div class="inline-flex justify-center" v-show="true">
            <input
              type="file"
              class="opacity-0 w-64 h-12 absolute"
              multiple
              @change="recibirImagenes"
            />
            <img
              src="../../assets/img/image-mini.png"
              class="w-6 mr-3 mt-3 border opacity-75"
              alt
            />
            <p class="text-base text-gray-900 mt-3">Subir Imagenes</p>
          </div>
          <div v-if="agregarbool" class="inline-flex w-full border-t-2">
            <button
              @click="uploadFiles"
              class="w-1/2 h-8 text-gray-900 text-xs border-2 border-green-500 rounded-lg m-2"
            >
              Agregar
            </button>
            <button
              @click="cancelar_edicion"
              class="w-1/2 h-8 text-gray-900 text-xs border-red-500 border-2 rounded-lg m-2"
            >
              Cancelar
            </button>
          </div>
          <div v-else class="inline-flex w-full border-t-2">
            <button
              @click="uploadFiles"
              class="w-1/2 h-8 text-gray-900 text-xs border-2 border-yellow-500 rounded-lg m-2"
            >
              Guardar Cambios
            </button>
            <button
              @click="cancelar_edicion"
              class="w-1/2 h-8 text-gray-900 text-xs border-red-500 border-2 rounded-lg m-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-between">
          <div class="justify-start">
            <button
              @click="editar_img"
              class="m-1 p-1 text-xs inline-flex border border-green-600 rounded-lg hover:border-green-700"
            >
              Agregar
              <img
                src="../../assets/img/image-mini.png"
                class="w-6 border opacity-75"
                alt
              />
            </button>
          </div>
          <div class="justify-end">
            <button
              @click="cambiar_imagen('anterior')"
              class="m-1 border hover:border-blue-500 rounded-md"
            >
              <img
                src="../../assets/img/flecha-izquierda.png"
                class="w-6 border opacity-75"
                alt
              />
            </button>
            <button
              @click="cambiar_imagen('siguiente')"
              class="m-1 border hover:border-blue-500 rounded-md"
            >
              <img
                src="../../assets/img/flecha-derecha.png"
                class="w-6 border opacity-75"
                alt
              />
            </button>
          </div>
        </div>
        <div class="p-1">
          <img
            :src="`data:image/jpeg;base64,${
              imgbase64.array_img[this.index_imagen_actual].image
            }`"
            style="width: 500px !important; height: 200px !important"
            alt
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  props: {
    referenceNumber: {
      type: String,
      default: () => "",
    },
  },
  data: function () {
    return {
      fileUpload: [],
      imagenes_enviar: [],
      cargarImagen: true,
      imgbase64: [],
      agregarbool: true,
      index_imagen_actual: 0,
      editar_imagen: true,
      eliminar_name: [],
    };
  },
  beforeMount: function () {
    this.imgbase64 = this.$store.getters["DTC/getImagenesDTC"](
      this.referenceNumber
    );

    if (JSON.stringify(this.imgbase64) == undefined) {
      this.agregarbool = true;
      this.cargarImagen = true;
    } else {
      this.agregarbool = false;
      this.cargarImagen = false;
    }
  },
  methods: {
    recibirImagenes: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      else {
        for (let item of files) {
          console.log(files);
          this.crearImage(item);
        }
      }
    },
    crearImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        let obj = {
          imgbase: e.target.result.split(",")[1],
          name: file.name,
        };
        this.fileUpload.push(obj);
        this.imagenes_enviar.push(obj);
      };
      reader.readAsDataURL(file);
      this.editar_imagen = false;
    },
    eliminarImagen: function (item) {
      if (confirm("¿Seguro que quiere eliminar esta imagen?")) {
        if (!this.agregarbool) {
          let nombre = this.fileUpload[item].name;
          let eliminado = this.imagenes_enviar
            .map(function (e) {
              return e.name;
            })
            .indexOf(nombre);

          if (eliminado > -1) this.imagenes_enviar.splice(eliminado, 1);
          else this.eliminar_name.push(nombre);
        }
        this.fileUpload.splice(item, 1);
      }
    },
    cancelar_edicion: function () {
      this.fileUpload = [];
      this.eliminar_name = [];
      this.imagenes_enviar = [];
      this.editar_imagen = true;
      this.cargarImagen = this.imgbase64 == undefined ? true : false;
    },
    cambiar_imagen: function (value) {
      console.log(value);
      if (value == "anterior") {
        if (this.index_imagen_actual == 0)
          this.index_imagen_actual = this.imgbase64.array_img.length - 1;
        else this.index_imagen_actual = this.index_imagen_actual - 1;
      }
      if (value == "siguiente") {
        if (this.index_imagen_actual == this.imgbase64.array_img.length - 1)
          this.index_imagen_actual = 0;
        else this.index_imagen_actual = this.index_imagen_actual + 1;
      }
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
    uploadFiles: function () {
      let nombre_plaza = this.$store.getters["Login/getPlaza"].squareName;

      for(let eliminar of this.eliminar_name){

          Axios.get(`https://localhost:44358/api/Image/Delete/${nombre_plaza}/${this.referenceNumber}/${eliminar}`)
          .then((response) => {
            console.log(response.data);
            console.log('Elimine algo')
          })
          .catch((ex) => {
            console.log(ex);
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
      
      for (const item of this.imagenes_enviar) {
        
        let formData = new FormData();
        formData.append("id", this.referenceNumber);
        formData.append("plaza", nombre_plaza);        
        formData.append("image", this.base64ToFile(item.imgbase, item.name));
      
        Axios.post(`https://localhost:44358/api/Image/InsertImage`, formData)
          .then((response) => {
            console.log(response.data);
            alert('YA INSERTE IMAGENES');
          })
          .catch((ex) => {
            console.log(ex);
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
      this.$notify.success({
        title: "Ok!",
        msg: `SE INSERTO CORRECTAMENTE LAS IMAGENES.`,
        position: "bottom right",
        styles: {
          height: 100,
          width: 500,
        },
      });
      this.fileUpload = [];
      this.cargarImagen = false;
    },
    base64ToFile: function(dataurl,fileName){

      
        let url = 'data:image/jpeg;base64,' + dataurl
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, {type:mime});
    }
  },
};
</script>