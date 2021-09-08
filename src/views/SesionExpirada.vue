<template>
    <div>
        <div class="flex justify-center">
            <div class="mt-8 mb-16 sm:block sm:p-1 sm:pr-2 sm:m-1 grid grid-cols w-full justify-center">
                <h1 class="text-black text-center text-6xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">Sesión Expirada</h1>
                <div class="ml-20 sm:ml-10">
                    <div class="absolute mt-8 opacity-50 mb-10 sm:-mt-64">
                        <img src="../assets/img/trabajador.png" class="-ml-6" width="350px" height="100"/>
                    </div>
                    <div class="grid gap-4 grid-cols-1 py-10 px-3 mt-66">
                        <img src="../assets/img/desenchufado.png" class="ml-6 transform -rotate-45 ... opacity-50" width="200px" height="100" />
                        <p class="ml-2">Redireccionando en {{ countdown.slice(7)  }} segundos...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data () {
        return {
            seconds: 7,
            countdown: 5,
            expires_in: null,
            interval: null,
        }
    },
    beforeMount () {        
        this.countdown = moment.utc(this.seconds).format('HH:mm:ss');
        this.expires_in = this.seconds;
        this._setInterval()
        setTimeout(() => {
            localStorage.clear()        
            this.$router.push("/");                
        },5000)            
        
    },
    destroyed () {
        clearInterval(this.interval);        
    },
    methods: {
        _setInterval: function() {
            this.interval = setInterval(() => {
                if(this.expires_in === 1){
                    localStorage.clear()                    
                    clearInterval(this.interval);
                }
                else {
                    this.expires_in -= 1;
                    this.countdown = moment.utc(this.expires_in * 1000).subtract(1, 'seconds').format('HH:mm:ss');                                       
                }
            }, 1000);
        },
    }
}
</script>