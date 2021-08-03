<template>
  <div class="p-5">
    <BaseProgress></BaseProgress>
  </div>
</template>

<script>
import BaseProgress from "../../components/TablaGenerica.vue"

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
