<template>
  <div>
    <div class="border justify-items-center">
      <template v-if="cargarImagen">
        <div
          class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed"
          v-if="fileUpload.length == 0"
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
              <img :src="`${item.imgbase}`" class="w-10 h-10" alt="" />
              <p class="ml-3 mt-2">
                {{ item.file.name }}
              </p>
            </div>
            <div class="mr-2">
              <button @click="eliminarImagen(key)" class="w-3 h-46 p-0 bord">
                x
              </button>
            </div>
          </div>
          <div>
            <button @click="uploadFiles" class="w-64 h-8 text-green-700">
              Agregar
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
              imgbase64[this.index_imagen_actual]
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
      default: () => ""
    },
  },
  data: function () {
    return {
      fileUpload: [],
      cargarImagen: true,
      imgbase64: [],
      index_imagen_actual: 0,
    };
  },
  methods: {
    recibirImagenes: function (e) {
      console.log("Primera Parte");
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
          imgbase: e.target.result,
          file: file,
        };
        this.fileUpload.push(obj);
      };
      reader.readAsDataURL(file);
    },
    eliminarImagen: function (item) {
      if (confirm("¿Seguro que quiere eliminar esta imagen?"))
        this.fileUpload.splice(item, 1);
    },
    // cambiar_imagen: function (value) {
    //   if (value == "anterior") {
    //     if (this.index_imagen_actual == 0)
    //       this.index_imagen_actual = this.imgbase64.length - 1;
    //     else this.index_imagen_actual = this.index_imagen_actual - 1;
    //   }
    //   if (value == "siguiente") {
    //     if (this.index_imagen_actual == this.imgbase64.length - 1)
    //       this.index_imagen_actual = 0;
    //     else this.index_imagen_actual = this.index_imagen_actual + 1;
    //   }
    // },
    // //Metodos Imagen EMI
    // editar_img: function () {
    //   let dataurl = "data:image/jpeg;base64," + this.imgbase64[0];
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);

    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }

    //   let nuevo_file = new File([u8arr], "img1.jpg", { type: mime });
    //   var reader = new FileReader();

    //   reader.readAsText(nuevo_file);

    //   console.log(reader);

    //   console.log(nuevo_file);
    //   this.fileRecordsForUpload.push({
    //     lastModified: nuevo_file.lastModified,
    //     name: nuevo_file.name,
    //     size: nuevo_file.size,
    //     type: nuevo_file.type,
    //     webkitRelativePath: nuevo_file.webkitRelativePath,
    //   });
    //   this.cargarImagen = true;
    // },
    uploadFiles: async function () {
        alert()
      let nombre_plaza = await this.$store.getters["Login/getPlaza"].squareName;
      var i = 1;
      for (const item of this.fileUpload) {
          console.log(item)
        let formData = new FormData();
        formData.append("id", this.referenceNumber);
        formData.append("plaza", nombre_plaza);
        formData.append("name", "img" + i + "." + "jpg");
        formData.append("file", item.file);        
        i++;

        await Axios.post(
          `http://prosisdev.sytes.net:88/api/Image/Prueba`,
          formData
        )
          .then((response) => {
            console.log(response.data);
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
  },
};
</script>