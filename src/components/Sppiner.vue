<template>
<div class="z-40 bg-gray-600 bg-opacity-25 absolute flex justify-center items-center h-screen w-screen">
  <div class="rounded animate-spin ease duration-300 w-50 h-50 border-2 border-blue-800"></div>
</div>
</template>

<script>
export default {
    name: "Spinner",
    setup () {
        

        return {}
    }
}
</script>

<style scoped>
#circulo{
  fill: transparent;
        stroke: #4218da;
        stroke-width: 4;
        stroke-linecap: round;
}
</style>