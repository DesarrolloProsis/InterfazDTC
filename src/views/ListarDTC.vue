<template>
  <div>
    <Nav></Nav>

    <div class="flex flex-col justify-center md:flex-row w-full" >
      <div class="shadow-2xl rounded-lg p-4 w-auto md:w-1/3 m-3 md:m-10 bg-gray-100"  v-for="(dtc, index) in infoDTC" :key="index" >
          <CardListDTC :infoCard="dtc" ></CardListDTC>  
      </div>                 
    </div>
  </div>
</template>




<script>
import Nav from "../components/Navbar";
import CardListDTC from '../components/DTC/CardListaDTC.vue'

export default {
  data() {
    return {

        infoDTC: [

                {
                    referencia: "TXD-19052020",
                    fechaCreacion: "15 Junio 2020",
                    siniestro: "15 Agosto 2019",
                    refaccion: "Barrera Optica",
                    numeroAXA: "M090939",
                    carril:"A01",
                    urlImg: "../assets/img/Dtc.png"

                },
                {
                    referencia: "TXD-19052020",
                    fechaCreacion: "15 Junio 2020",
                    siniestro: "15 Agosto 2019",
                    refaccion: "Barrera Optica",
                    numeroAXA: "M090939",
                    carril:"A01",
                    urlImg: "../assets/img/Dtc.png"

                },
                {
                    referencia: "TXD-19052020",
                    fechaCreacion: "15 Junio 2020",
                    siniestro: "15 Agosto 2019",
                    refaccion: "Barrera Optica",
                    numeroAXA: "M090939",
                    carril:"A01",
                    urlImg: "../assets/img/Dtc.png"

                },
                
        ]


    };
  },
  components: {
    Nav,
    CardListDTC
  }
};
</script>
