<template>
  <div>
    <div>
      <div class="flex flex-row mb-6">
        <div class="flex justify-between">
          <p class="font-black m-3 w-1/2">{{ infoCard.referenceNumber }}</p>
          <p class="m-3 w-1/12">{{ infoCard.sinisterDate | formatDate }}</p>
        </div>
        <hr />
      </div>
      <div class="flex-col md:flex-row flex mb-6">
        <div class="md:w-2/3">
          <p class="text-left font-bold text-sm">
            N° Siniestro: {{ infoCard.sinisterNumber }}
          </p>
          <p class="text-left font-bold text-sm">
            N° Reporte: {{ infoCard.reportNumber }}
          </p>
          <p class="text-left font-bold text-sm mb-6">
            Folio: {{ infoCard.failureNumber }}
          </p>
          <div class="w-64 break-words text-left text-gray-800 font-normal">
            <p class="text-sm text-black w-40 font-bold">Observaciones:</p>
            {{ infoCard.observation }}
          </div>
        </div>
        <div
          class="m-10 flex text-center cursor-pointer border-gray-800 w-64 flex-col"
          v-if="!showmenosMas"
        >
          <template v-if="cargarImagen">
            <VueFileAgent
              v-model="fileRecords"
              :helpText="'Eliga la imagenes.'"
              class="w-auto sm:mr-6"
              :theme="'list'"
              :deletable="true"
              :ref="vueFileAgent"
              :multiple="true"
              @delete="fileDeleted($event)"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
            ></VueFileAgent>
            <button
              class="border-green-800 border-2 rounded-lg bg-green-400 opacity-75 mt-1"
              v-show="fileRecordsForUpload.length != 0"
              @click="guardar_imagenes()"
            >
              Subir {{ fileRecordsForUpload.length }} imagenes
            </button>
          </template>
          <template v-else>
            <div class="flex justify-between">
              <div class="justify-start">
                <button
                  @click="uploadFiles"
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
      <div class="flex justify-between static bg-bottom">
        <a @click="mas" v-show="menosMas" class="text-sm text-gray-900 relative"
          >Status: {{ infoCard.statusDescription }}</a
        >
        <a
          @click="mas"
          v-show="menosMas"
          class="cursor-pointer text-green-700 rel"
          >Ver Mas</a
        >
      </div>
      <!-- VerMar -->
      <div v-if="showmenosMas">
        <div class="flex flex-col md:flex-row mb-6 mt-8">
          <div class="text-xs font-sans text-center">
            <table class="ml-2 table-fixed w-66 sm:w-65">
              <tr class="bg-blue-800 text-white h-8">
                <th class="w-1/3 border-2 border-gray-800">Componete</th>
                <th class="w-1/8 border-2 border-gray-800">Cantidad</th>
                <th class="w-1/8 border-2 border-gray-800">Ubicacion</th>
              </tr>
              <tr class="" v-for="(item, key) in tableFormat" :key="key">
                <td class="border border-gray-800">{{ item.componente }}</td>
                <td class="border border-gray-800">{{ item.cantidad }}</td>
                <td class="text-xs border border-gray-800">
                  <p v-for="(value, key2) in item.lane.split(',')" :key="key2">
                    {{ value }}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="" v-if="showmenosMas">
        <div class="flex justify-between">
          <div class="">
            <button
              @click.prevent="borrar"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700 mt-1"
            >
              <img
                src="../../assets/img/bin.png"
                class="mr-2"
                width="20"
                height="1"
              />
              <span>Borrar</span>
            </button>
          </div>
          <div>
            <a
              @click="menos"
              class="text-gray-700 md:mr-4 md:mt-2 cursor-pointer mr-2"
              >Menos ↑</a
            >
            <button
              v-if="showBotonPDF"
              @click.prevent="pdf"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700"
            >
              <img
                src="../../assets/img/pdf.png"
                class="mr-2"
                width="20"
                height="1"
              />
              <span>PDF</span>
            </button>
            <button
              v-if="!showBotonPDF"
              @click.prevent="pruebas"
              class="bg-gray-300 m-1 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-yellow-600"
            >
              <img
                src="../../assets/img/pencil.png"
                class="mr-2"
                width="20"
                height="1"
              />
              <span class="text-xs">Editar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/vue-file-agent@latest/dist/vue-file-agent.css"
    />
  </div>
</template>

<script>
import moment from "moment";
import Axios from "axios";
import saveAs from "file-saver";

export default {
  props: {
    infoCard: {
      type: Object,
      default: () => {},
    },
  },

  data: function () {
    return {
      menosMas: true,
      showmenosMas: false,
      tableFormat: [],
      showBotonPDF: true,
      //Imagen
      fileRecords: [],
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [],
      cargarImagen: true,
      imgbase64: [],
      index_imagen_actual: 0,
    };
  },
  filters: {
    formatDate: function (value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
    },
  },
  methods: {
    onChange() {
      console.log("Picture changed!");
    },
    mas: async function () {
      this.menosMas = false;
      await this.$store.dispatch(
        "DTC/tableFormComponent",
        this.infoCard.referenceNumber
      );
      this.tableFormat = await this.$store.getters["DTC/gettableFormComp"];
      this.showmenosMas = true;
    },
    menos: function () {
      this.menosMas = true;
      this.showmenosMas = false;
    },
    pruebas: async function () {
      let ruta = this.infoCard.openMode
        ? "COMPONENT_EDIT_OPEN"
        : "COMPONENT_EDIT";

      await this.$store.dispatch(`DTC/${ruta}`, this.infoCard.referenceNumber);

      let datosSinester = {
        ReferenceNumber: "",
        SinisterNumber: "",
        ReportNumber: "",
        SinisterDate: "",
        FailureDate: "",
        FailureNumber: "",
        ShippingElaboracionDate: "",
        Diagnosis: "",
        Observation: "",
        TypeDescriptionId: "",
        UserId: null,
        AgremmentInfoId: null,
        Descripcion: null,
        Observaciones: null,
      };

      datosSinester.ReferenceNumber = this.infoCard.referenceNumber;
      datosSinester.SinisterNumber = this.infoCard.sinisterNumber;
      datosSinester.ReportNumber = this.infoCard.reportNumber;
      datosSinester.SinisterDate = moment(this.infoCard.sinisterDate).format(
        "YYYY-MM-DD"
      );
      datosSinester.FailureNumber = this.infoCard.failureNumber;
      datosSinester.FailureDate = moment(this.infoCard.failureDate).format(
        "YYYY-MM-DD"
      );
      datosSinester.ShippingElaboracionDate = moment(
        this.infoCard.shippingDate
      ).format("YYYY-MM-DD");
      datosSinester.TypeDescriptionId = 2;

      this.$store.commit("Header/datosSinesterMutation", datosSinester);

      let page = this.infoCard.openMode ? "NuevoDtcLibre" : "NuevoDtc";

      this.$router.push({
        path: `/${page}`,
        query: {
          headerInfo: { ...this.infoCard },
        },
      });
    },
    pdf: function () {
      var oReq = new XMLHttpRequest();
      // The Endpoint of your server
      let urlTopdf = this.infoCard.openMode
        ? `https://localhost:44358/api/pdf/${this.infoCard.referenceNumber}`
        : `https://localhost:44358/api/pdf/open/${this.infoCard.referenceNumber}`;

      let namePdf = `ReportDTC-${this.refNum}.pdf`;
      console.log(urlTopdf);
      // Configure XMLHttpRequest
      oReq.open("GET", urlTopdf, true);
      // Important to use the blob response type
      oReq.responseType = "blob";
      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = function () {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        var file = new Blob([oReq.response], {
          type: "application/pdf",
        });
        // Generate file download directly in the browser !
        saveAs(file, namePdf);
      };
      oReq.send();
    },
    borrar: function () {
      this.$emit("borrar-card", this.infoCard.referenceNumber);
      this.menosMas = true;
      this.showmenosMas = false;
    },
    fileDeleted: function (fileRecord) {
      console.log("SE ELIMINO");
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    filesSelected: function (fileRecordsNewlySelected) {

      
      console.log(fileRecordsNewlySelected  )
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        if (confirm("Seguro que quieres eliminar?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        }
      }
    },
    guardar_imagenes: async function () {
      let nombre_plaza = this.$store.getters["Login/getPlaza"].squareName;

      var i = 1;
      for (const item of this.fileRecordsForUpload) {
        let formData = new FormData();
        formData.append("id", this.infoCard.referenceNumber);
        formData.append("plaza", nombre_plaza);
        formData.append("name", "img" + i + "." + item.ext);
        formData.append("file", item.file);
        console.log("img" + i + "." + item.ext);
        i++;

        await Axios.post(`https://localhost:44358/api/Image/Prueba`, formData)
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

  
  
      this.fileRecordsForUpload = [];
      this.fileRecords = [];
      this.cargarImagen = false;
    },
    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    //Metodos Imagen EMI
    cambiar_imagen: function (value) {
      if (value == "anterior") {
        if (this.index_imagen_actual == 0)
          this.index_imagen_actual = this.imgbase64.length - 1;
        else this.index_imagen_actual = this.index_imagen_actual - 1;
      }
      if (value == "siguiente") {
        if (this.index_imagen_actual == this.imgbase64.length - 1)
          this.index_imagen_actual = 0;
        else this.index_imagen_actual = this.index_imagen_actual + 1;
      }
    },
    uploadFiles: function () {
      let dataurl = "data:image/jpeg;base64," + this.imgbase64[0];
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      let nuevo_file = new File([u8arr], "img1.jpg", { type: mime });
      var reader = new FileReader();

      reader.readAsText(nuevo_file);

      console.log(reader)

      console.log(nuevo_file);
      this.fileRecords.push({
        "lastModified": nuevo_file.lastModified,
        "name": nuevo_file.name,
        "size": nuevo_file.size,
        "type": nuevo_file.type,
        "webkitRelativePath": nuevo_file.webkitRelativePath
      })
      //   // "name": "Golf.mp4",
      //   // "lastModified": 1576563996233,
      //   // "sizeText": "549 KB",
      //   // "size": 561813,
      //   // "type": "video/mp4",
      //   // "ext": "mp4",
      //   // "dimensions": {
      //   //   "width": 640,
      //   //   "height": 360
      //   // },
      //   // "url": "https://safrazik.com/vue-file-agent/website/assets/files/Golf.mp4",
      //   // "videoThumbnail": "https://safrazik.com/vue-file-agent/website/assets/files/Golf-thumb.jpg",
      //   // "imageColor": [66, 62, 45]
      // });

      this.cargarImagen = true;
    },
  },
  beforeMount() {
    this.showBotonPDF = this.infoCard.statusId == 2 ? true : false;

    let nombre_plaza = this.$store.getters["Login/getPlaza"].squareName;

    Axios.get(
      `https://localhost:44358/api/Image/Download/${nombre_plaza}/${this.infoCard.referenceNumber}`
    )
      .then((response) => {
        this.imgbase64 = response.data;
        this.cargarImagen = false;
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
  },
};
</script>

