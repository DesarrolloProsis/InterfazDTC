<template>
  <div id="app" class="h-screen">
    <h2 class="ml-6 pt-3 text-lg font-semibold">Content</h2>
    <div class="flex flex-wrap p-4">
      <base-progress :color="'blue'" :percentage="contentProgress" class="mx-2 mb-2 h-5">
        <span class="text-xs text-white w-full flex justify-end pr-2">{{contentProgress}}%</span>
        <img src="@/assets/img/download.png" class="ml-2 sm:-ml-4" width="35" height="35" />
        <img src="@/assets/img/upload.png" class="ml-2 sm:-ml-4" width="35" height="35" />
        <img src="@/assets/img/nuevoDtc.png" class="ml-2 sm:-ml-4" width="35" height="35" />
      </base-progress>
      <div class="ml-2 mt-1 flex">
        <button
          @click="decreasePercentage"
          class="px-4 border text-xl border-teal-600 border-r-0 text-teal-600 hover:bg-teal-600 hover:text-white rounded-l focus:outline-none focus:shadow-outline"
        >-</button>
        <button
          @click="increasePercentage"
          class="px-4 border text-xl border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded-r focus:outline-none focus:shadow-outline"
        >+</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseProgress from "../../components/BarraProgreso"

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
    }
  }
};
</script>

<style>
</style>
