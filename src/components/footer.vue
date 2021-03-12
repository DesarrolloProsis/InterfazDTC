npm run build<template>
    <footer class="fixed inset-x-0 bottom-0">        
        <div class="w-full px-6 bg-blue-900">                
            <div class="inline-flex justify-between  py-3 w-full">
                <div>
                    <p class="text-xs sm:mt-1 text-blue-400">{{ tipoUsuario }}</p>
                </div>
                <div class="w-full ml-16 sm:ml-0 text-center">
                    <p class="text-sm text-white">
                        © 2021 Proyectos y Sistemas Informaticos.
                    </p>
                </div>
                <div>
                    <p class="sm:text-xs text-sm sm:mt-1 text-blue-400">V1.3.18</p>
                </div>
            </div>                                
        </div>        
    </footer>
</template>

<script>
export default {  
    computed: {
        tipoUsuario(){
            return this.$store.state.Login.cookiesUser.nombreRoll     
        }
    }
}
</script>

