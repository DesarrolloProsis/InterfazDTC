<template>
  <div class="p-5">
    <BaseProgress></BaseProgress>
    <img src="../../assets/img/download.png" alt="">
    <img src="../../assets/img/upload.png" alt="">
    <img src="../../assets/img/nuevoDtc.png" alt="">
    <img src="../../assets/img/flechas.png" alt="">    
    <img src="../../assets/img/add.png" alt="">    
    <img src="../../assets/img/actualizado.png" alt="">
    <img src="../../assets/img/comprobado.png" alt="">
    <img src="../../assets/img/details.png" alt="">
    <img src="../../assets/img/more.png" alt="">
    <img src="../../assets/img/close.png" alt="">
    <img src="../../assets/img/menos.png" alt="">
    <img src="../../assets/img/pencil.png" alt="">
    <button @click="descargar_excel" class="bg-red-600 w-64 h-51">Presioname para excel</button>
  </div>
</template>

<script>
import BaseProgress from "../../components/TablaGenerica.vue"
import saveAs from "file-saver";

export default {
  name: "App",
  components: {
    BaseProgress
  },
  data() {
    return {
      colors: [
        "gray",
        "yellow",
        "orange",
        "red",
        "green",
        "teal",
        "blue",
        "indigo",
        "purple",
        "pink"
      ],
      progressStart: 10,
      contentProgress: 20
    };
  },
  methods: {
    increasePercentage() {
      if (this.contentProgress <= 80) {
        this.contentProgress += 20;
      }
    },
    decreasePercentage() {
      if (this.contentProgress >= 20) {
        this.contentProgress -= 20;
      }
    },
    descargar_excel(){
        var oReq = new XMLHttpRequest();  
        oReq.open("post", 'http://prosisdev.sytes.net:84/api/Transacciones/Download/Excel', true);    
        oReq.responseType = "blob";  
        //let token = CookiesService.obtener_bearer_token('pdf')
        //oReq.setRequestHeader('Authorization', 'Bearer ' + token);       
        oReq.send(JSON.stringify({
            "pagenumber": 1,
            "rowsofpage": 5,
            "tagfilter": null,
            "carril": null,
            "plaza": null,
            "fechainicial": null,
            "fechafinal": null,
            "plazas": [
                {
                    "nombre": "default Connection",
                    "ip": "192.168.0.91"
                }
            ]
        }));
        oReq.onload = function () { 
          var file = new Blob([oReq.response], {
              type: "application/vnd.ms-excel",
          });       
          saveAs(file, "excelYisus.xls");
          };
          oReq.send(); 
        }
    }
};
</script>

<style>
</style>
