<template>
  <div>
    <div class="flex flex-col md:flex-row inline-block md:justify-between mb-6 inline-block">
      <p class="font-black mb-3">{{ infoCard.referenceNumber }}</p>
      <p class>{{ infoCard.elaborationDate | formatDate }}</p>
      <hr class="md:hidden mt-3 border-black" />
    </div>
    <div class="flex-col md:flex-row flex mb-6">
      <div class="md:w-2/3">
        <p class=" text-left font-bold text-sm">N° Siniestro: {{ infoCard.sinisterNumber }}</p>
        <p class=" text-left font-bold text-sm">N° Reporte: {{ infoCard.reportNumber }}</p>
        <p class="text-left font-bold text-sm mb-6">Folio: {{ infoCard.failureNumber }}</p>

        <div>
          <p class="text-sm text-left w-20 font-bold">Observaciones:</p>
          
            {{ infoCard.observation }}
          
        </div>

        <!-- <p>Se reporta una falla en la cortina optica se requiere de un inmediato cambio para que el porcnetaje eficiencias pueda estar en estado optimo</p> -->
      </div>

      <div class="sm_mt-5 md:w-1/3">
        <img src="../../assets/img/Dtc.png" class="w-64" alt />
      </div>
    </div>


    <div class="flex justify-end">
      <a class="text-green-700 mr-6 md:mr-10">Ver Mas</a>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    infoCard: {
      type: Object,
      default: () => {}
    }
  },
  filters:{

    formatDate: function(value){      
      return moment(value.substring(0,10)).format("DD/MM/YYYY")
    }

  }
};
</script>
