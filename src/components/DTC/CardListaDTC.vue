<template>
  <div>
    <div class="flex flex-col md:flex-row inline-block md:justify-between mb-6">
        <p class=" font-black mb-3">{{ infoCard.referencia }}</p>
        <p class="">{{ infoCard.fechaCreacion }}</p>
        <hr class="md:hidden mt-3 border-black ">
    </div>

    <div class=" flex-col md:flex-row flex mb-6">
        <div class="p-5">
            <p>Siniestro: {{ infoCard.siniestro }}</p>
            <p>Refaccion: {{ infoCard.refaccion }}</p>
            <p>Numero AXA: {{ infoCard.numeroAXA }}</p>
            <p>Carril: {{ infoCard.carril }}</p>
            <!-- <p>Se reporta una falla en la cortina optica se requiere de un inmediato cambio para que el porcnetaje eficiencias pueda estar en estado optimo</p> -->
        </div>

        <div class=" p-5">
            <img src="../../assets/img/Dtc.png" class=" w-64" alt="" />
        </div>
    </div>
        <div class="flex justify-end">
          <a class="text-green-700  mr-6 md:mr-10">Ver Mas</a>
        </div>  
  </div>
</template>

<script>
export default {

    props: {

        infoCard: {
            type: Object,
            default: () => {}
        }
    } 
       

}
</script>
