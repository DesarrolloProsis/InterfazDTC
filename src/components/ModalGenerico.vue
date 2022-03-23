<template>
<Transition name="fade">
  <div v-if="showing" class="fixed inset-0 w-full h-screen flex items-center justify-center fondomodal">
      <div class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
           <slot />
      </div>
  </div>
</Transition>
</template>
 
<script>
export default {
props: {
      showing: {
          required: true,
          type: Boolean
      }
  },
watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden');
      }else{
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    }
  },
methods: {
    
  }
}
</script>

<style scoped>
.fondomodal{
    background: rgba(0, 0, 0, 0.5);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>