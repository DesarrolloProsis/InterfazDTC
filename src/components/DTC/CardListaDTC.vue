<template>
  <div>
    <div >
      <div class="flex flex-col md:flex-row inline-block md:justify-between mb-6 inline-block">
        <p class="font-black mb-3">{{ infoCard.referenceNumber }}</p>
        <p class>{{ infoCard.sinisterDate | formatDate }}</p>
        <hr class="md:hidden mt-3 border-black" />
      </div>
      <div class="flex-col md:flex-row flex mb-6">
        <div class="md:w-2/3">
          <p class="text-left font-bold text-sm">N° Siniestro: {{ infoCard.sinisterNumber }}</p>
          <p class="text-left font-bold text-sm">N° Reporte: {{ infoCard.reportNumber }}</p>
          <p class="text-left font-bold text-sm mb-6">Folio: {{ infoCard.failureNumber }}</p>
          <div>
            <p class="text-sm text-left w-20 font-bold">Observaciones:</p>
            {{ infoCard.observation }}
          </div>
        </div>
        <div class="sm_mt-5 md:w-1/3">
          <img src="../../assets/img/Dtc.png" class="w-64" alt />
        </div>
      </div>
      <div class="flex justify-between">
        <a @click="mas" v-show="menosMas" class=" text-sm text-gray-900">Status: {{ infoCard.statusDescription }}</a>
        <a @click="mas" v-show="menosMas" class=" cursor-pointer text-green-700">Ver Mas</a>
      </div>
    </div>

    <!-- VerMar -->
    <div v-if="showmenosMas">
      <div class="flex-col md:flex-row flex mb-6">
       <div class="text-sm  font-sans text-center">
         <table class="border  border-black">
           <tr>
             <th class="w-56 border border-black">Componete</th>
             <th class="w-20 border border-black">Cantidad</th>
             <th class="w-48 border border-black">Ubicacion</th>
           </tr>
           <tr class=" h-10" v-for="(item, key) in tableFormat" :key="key">
              <td>{{ item.componente }}</td>
              <td>{{ item.cantidad }}</td>
              <td class=" text-xs">{{ item.lane }}</td>
          </tr>          
         </table>
       </div>
      </div>

      <div class="flex justify-between">
        <div>        
          <button
            @click.prevent="borrar"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700 "
          >
            <img src="../../assets/img/bin.png" class="mr-2" width="20" height="1" />
            <span>Borrar</span>
          </button>
        </div>
        <div>
          <a @click="menos" class="text-gray-700 md:mr-4 md:mt-2 cursor-pointer mr-2">Menos ↑</a>     
            <button
            v-if="showBotonPDF"
            @click.prevent="pdf"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700"
          >
            <img src="../../assets/img/pdf.png" class="mr-2" width="20" height="1" />
            <span>PDF</span>
          </button>
        </div>
      </div>
    </div>

 
  

 
  </div>  
</template>

<script>
import moment from "moment";
import saveAs from "file-saver";

export default {
  props: {
    infoCard: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return{
      menosMas: true,
      showmenosMas: false,
      tableFormat: [],
      showBotonPDF: true
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
    }
  },
  methods: {
    mas: async function(){      
      this.menosMas = false      
      await this.$store.dispatch('DTC/tableFormComponent',this.infoCard.referenceNumber)
      this.tableFormat = await this.$store.getters['DTC/gettableFormComp']
      this.showmenosMas = true
    },
    menos: function(){      
      this.menosMas = true
      this.showmenosMas = false
    },   
    pdf: function(){

            var oReq = new XMLHttpRequest();
            // The Endpoint of your server
            let urlTopdf = `http://prosisdev.sytes.net:88/api/pdf/${this.infoCard.referenceNumber}`;
            let namePdf = `ReportDTC-${this.refNum}.pdf`;
            // Configure XMLHttpRequest
            oReq.open("GET", urlTopdf, true);
            // Important to use the blob response type
            oReq.responseType = "blob";
            // When the file request finishes
            // Is up to you, the configuration for error events etc.
            oReq.onload = function() {
              // Once the file is downloaded, open a new window with the PDF
              // Remember to allow the POP-UPS in your browser
              var file = new Blob([oReq.response], {
                type: "application/pdf"
              });
              // Generate file download directly in the browser !
              saveAs(file, namePdf);
            };

            oReq.send();            
    },
    borrar: function(){
                
        this.$emit('borrar-card', this.infoCard.referenceNumber)   
        this.menosMas = true
        this.showmenosMas = false         
    },
  },
  beforeMount() {
    

      this.showBotonPDF = this.infoCard.statusId == 2 ? true : false

  },
};
</script>
