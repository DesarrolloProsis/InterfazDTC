<template>
  <div class="flex justify-center m-48">
    <div class="m-auto">
        <font-awesome-icon icon="fa-solid fa-face-frown" class="h-60 text-blue-800" />
    </div>
    <div class="text-center border-blue-800 border-2 rounded-md m-auto p-5 w-1/2 shadow-xl">
        <span class="text-6xl text-blue-800 font-medium">UPS!!!</span>
        <br>
        <span class="text-2xl text-blue-800 font-medium">ALGO SALIO MAL</span>
        <br>
        <span class="text-2xl text-blue-800 font-medium">ERROR 404</span>
        <br><br>
        <span class="text-blue-800 font-medium">Intentalo nuevamente o si te marca mas de dos veces este mismo error por favor ponte en contacto con el area de servicio, Gracias.</span>
        <br><br>
        <button @click="$router.push('home')"
        class="text-white border 
        border-blue-800 rounded bg-blue-800 
        p-2 m-2 shadow-xl
        transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300
        ">
            Regresar al Menu
        </button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>