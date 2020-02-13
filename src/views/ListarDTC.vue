<template>
  <div>
    <Nav></Nav>




    <div class="flex flex-col justify-center md:flex-row w-full" >
      <div class="shadow-2xl rounded-lg p-4 w-auto md:w-1/3 m-3 md:m-10 bg-gray-100"  v-for="(dtc, index) in infoDTC" :key="index" >

        <div class="flex flex-col md:flex-row inline-block md:justify-between mb-6">
          <p class=" font-black mb-3">{{dtc.referencia}}</p>
          <p class="">{{dtc.fechaCreacion}}</p>
          <hr class="md:hidden mt-3 border-black ">
        </div>

        <div class=" flex-col md:flex-row flex mb-6">
          <div class="p-5">
            <p>Siniestro: {{dtc.siniestro}}</p>
            <p>Refaccion: {{dtc.refaccion}}</p>
            <p>Numero AXA: {{dtc.numeroAXA}}</p>
            <p>Carril: {{dtc.carril}}</p>

            <!-- <p>Se reporta una falla en la cortina optica se requiere de un inmediato cambio para que el porcnetaje eficiencias pueda estar en estado optimo</p> -->
          </div>

          <div class=" p-5">
            <img src="../assets/img/Dtc.png" class=" w-64" alt="" />
          </div>
        </div>

        <div class="flex justify-end">
          <a class="text-green-700  mr-6 md:mr-10">Ver Mas</a>
        </div>
      </div>           
      
    </div>

    
    <div class="flex flex-col  justify-center md:flex-row w-full" >
      <div class="shadow-2xl rounded-lg p-4 md:w-1/3 m-10 bg-gray-100"  v-for="(dtc, index) in infoDTC" :key="index" >

        <div class="flex justify-between mb-6">
          <p>{{dtc.referencia}}</p>
          <p>{{dtc.fechaCreacion}}</p>
        </div>

        <div class=" flex-col md:flex-row flex mb-6">
          <div class="p-5">
            <p>Siniestro: {{dtc.siniestro}}</p>
            <p>Refaccion: {{dtc.refaccion}}</p>
            <p>Numero AXA: {{dtc.numeroAXA}}</p>
            <p>Carril: {{dtc.carril}}</p>

            <!-- <p>Se reporta una falla en la cortina optica se requiere de un inmediato cambio para que el porcnetaje eficiencias pueda estar en estado optimo</p> -->
          </div>

          <div class=" p-5">
            <img src="../assets/img/Dtc1.jpg" class=" w-64" alt="" />
          </div>
        </div>

        <div class="flex justify-end">
          <a class="text-green-700 mr-10">Ver Mas</a>
        </div>
      </div>           
      
    </div>

   

  </div>
</template>

<script>
import Nav from "../components/Navbar";

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

                }
        ]


    };
  },
  components: {
    Nav
  }
};
</script>
