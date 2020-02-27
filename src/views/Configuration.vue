<template>
  <div>
    <Nav></Nav>
    <div
      class="flex items-stretch flex-wrap justify-center xl:flex-row lg:flex-col md:flex-col sm:flex-col lg:mt-3"
    >
      <router-link
        to="/Carriles"
        class="text-gray-700 text-center items-center hover:bg-gray-400 border-4 border-red-700 rounded-lg sm:px-40 sm:py-20 m-4"
      >
        <img src="../assets/img/carriles.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Carriles</h1>
      </router-link>

      <router-link
        to="/Plazas"
        class="text-gray-700 text-center items-center hover:bg-gray-400 border-4 border-red-700 rounded-lg sm:px-40 sm:py-20 m-4"
      >
        <img src="../assets/img/plaza.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Plazas</h1>
      </router-link>

      <!-- <router-link
        to="/Carriles"
        class="text-gray-700 text-center items-center hover:bg-gray-400 border-4 border-red-700 rounded-lg sm:px-40 sm:py-20 m-4"
      >
        <img src="../assets/img/carriles.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Carriles</h1>
      </router-link> -->
    </div>
  </div>
</template>

<script>
  import Nav from "../components/Navbar";

  export default {
  name: "Refacciones",
  components: {
    Nav
  }
}
</script>