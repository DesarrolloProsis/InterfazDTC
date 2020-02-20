<template>
  <div>
    <div class="w-full h-full fixed block flex justify-center">
      <div class="w-full bg-gray-700">
        <div class="container mx-auto h-full flex justify-center items-center p-0">
          <form class="max-h-full bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 m-0">
            <div class="mb-4">
              <img
                src="../assets/img/login.png"
                height="150"
                width="150"
                class="mt-10 mb-20 ml-20 mr-20"
              />
              <label class="mb-6 block text-gray-700 text-sm font-bold mb-2" for="username">Usuario</label>
              <input
                class="shadow mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                v-model="datos.User"
                placeholder="Usuario"
              />
            </div>
            <div class="mb-6">
              <label
                class="mb-6 block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >Contraseña</label>
              <input
                class="mb-6 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                v-model="datos.Password"
                placeholder="******************"
              />
              <p class="text-red-500 text-xs italic">Escriba la Contraseña</p>
            </div>
            <div class="flex items-center justify-end">
              <button
              @click="ingresarLogin()"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >Iniciar Sesion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    data(){
        return{

datos:{
            User: '',
            Password: ''
}

        }
    },
    methods:{

        ingresarLogin(){

            if(this.datos.User != '' && this.datos.Password != '')     {    
                     
                  this.$router.push('home')                  
            }                  
            else
                alert("Llena los Campos")

        }
    }
}
</script>