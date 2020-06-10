<template>
  <div class="container-login100">
    <div class="wrap-login100">
      <div :class="{ 'blur-content': modal }">
        <p class="text-center text-black font-sans text-4xl">Bienvenido</p>
        <div>
          <div class="flex">
            <img src="../assets/img/loginIcon.png" class="w-64 mx-auto" />
          </div>
        </div>
        <br />
        
        <div class="mt-10">
          <div class="mb-5">
            <input
              class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:border-gray-300 focus:shadow-none focus:bg-white w-full h-8 rounded-lg outline-none"
              type="text"
              name="Usuario"
              placeholder="  Usuario"
              v-validate="'required'"
              v-model="datos.User"
            />
            <span class="text-red-600 text-xs">{{ errors.first('Usuario') }}</span>
          </div>
          <div class="mb-5">
            <input
              @keyup.enter="ingresarLogin()"
              placeholder=" Contraseña"
              class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:border-gray-300 focus:shadow-none focus:bg-white w-full h-8 hover:border-gray-700 rounded-lg outline-none"
              v-validate="'required'"
              type="password"
              name="Contraseña"
              v-model="datos.Password"
            />
            <span class="text-red-600 text-xs">{{ errors.first('Contraseña') }}</span>
          </div>
        </div>
        <div class="text-center text-gray-900">
          <input class="mt-10 mb-10 mr-2" type="checkbox" v-model.number="datos.checkLog" />
          <span>Generar Por Otra Persona</span>
        </div>
        <div class="container-login100-form-btn">
          <button           
            @click="ingresarLogin()"
            
            type="button"
            class="login100-form-btn text-blue-600 outline-none"
          >Login</button>
        </div>
      </div>
    </div>
    <div
      v-if="modal"
      class="rounded-lg absolute border border-gray-700 bg-white px-24 py-20 flex flex-col"
      @close="modal = false">     
        <div>
          <div class="flex mb-8">
            <img src="../assets/img/change.png" class=" w-24 mx-auto" />
          </div>
        </div> 
      <div class="mb-4">
        <p class="text-xs mb-1 text-gray-900">Plaza</p>
        <select
          @change="buscarTec()"
          v-validate="'required'"          
          v-model="plazaSelect"
          class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:border-gray-300 focus:shadow-none focus:bg-white w-48 h-8 hover:border-gray-700 rounded-lg outline-none"
          type="text"
          name="Plaza"
        >
          <option  value="">Selecionar...</option>
          <option
            v-for="(item, index) in listaPlazas"
            v-bind:value="item.squareCatalogId"
            :key="index"
          >{{ item.squareName }}</option>
        </select>
        <p class="text-red-600 text-xs">{{ errors.first('Plaza') }}</p>
      </div>
      <div class="mb-8">
        <p class="text-xs mb-1 text-gray-900">Tecnico</p>
        <select
          v-model="tecSelect"
          v-validate="'required'"
          class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:border-gray-300 focus:shadow-none focus:bg-white h-8 w-48 hover:border-gray-700 rounded-lg outline-none"        
          type="text"
          name="Tecnico"
        >
          <option  value="">Selecionar...</option>
          <option
            v-for="(item, index) in listaTec"
            v-bind:value="item.userId"
            :key="index"
          >{{ item.tecnicosAsignados }}</option>
        </select>
        <p class="text-red-600 text-xs">{{ errors.first('Tecnico') }}</p>
      </div>
      <button @click="loginOther()" class="text-white mb-5 px-4 py-2 rounded-full bg-blue-800">Ingresar</button>
      <button @click="modal = false" class="text-white px-4 py-2 rounded-full bg-red-800">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      modal: false,
      datos: {
        User: "",
        Password: "",
        checkLog: false
      },
      listaPlazas: [],
      listaTec: [],
      plazaSelect: "",
      tecSelect: ""
    };
  },
  methods: {
    loginOther: async function() {
      
      if(this.fields.Plaza.valid && this.fields.Tecnico.valid){

          await this.$store.dispatch("Login/buscarHeaderTec", this.tecSelect);
          let dataHeader = await this.$store.getters["Login/getUser"];
          await this.$store.commit("Header/listaHeadersMutation", dataHeader);
          await this.$store.dispatch("DTC/buscarDescriptions");
          await this.$store.dispatch("Header/buscarListaUnique");
          this.$router.push("home");
      }      
    },
    buscarTec: async function() {
      if (this.plazaSelect != "") {
        await this.$store.dispatch("Login/buscarTec", this.plazaSelect);
        this.listaTec = this.$store.getters["Login/getListaTec"];
      }
      else{
          this.listaTec = []
          this.tecSelect = ""
      }
    },
    ingresarLogin: async function() {

      await this.$store.dispatch("Login/buscarUsuarioCokie", this.datos);      
      if(this.$store.getters["Login/getUserLogeado"]){
        if (this.datos.checkLog === true) {
            this.modal = true
        }
        else{
            await this.$store.dispatch("Login/buscarUsuario", this.datos);
            let dataHeader = await this.$store.getters["Login/getUser"];
            await this.$store.commit("Header/listaHeadersMutation", dataHeader);
            await this.$store.dispatch("DTC/buscarDescriptions");
            await this.$store.dispatch("Header/buscarListaUnique");
            this.$router.push("home");
        }
      }
      else{
          this.$notify.error({
          title: "Ops!!",
          msg: 'EL USUARIO O LA CONTRASEÑA PUEDEN ESTAR MAL.',
          position: "bottom right",
          styles: {              
            height: 100,
            width: 500
          }
        });
      }             
    }
  },
  async beforeMount() {
    await this.$store.dispatch("Login/buscarPlazas");
    this.listaPlazas = await this.$store.getters["Login/getListaPlazas"];
  },
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.blur-content {
  filter: blur(2px);
}
.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #fff;
}

.wrap-login100 {
  width: 390px;
  background: #fff;
}

.login100-form {
  width: 100%;
}

.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login100-form-btn {
  font-family: Poppins-Medium;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  background-color: #1c3b7e;
  border-radius: 25px;

  box-shadow: 0 10px 30px 0px rgba(90, 180, 233, 0.5);
  -moz-box-shadow: 0 10px 30px 0px rgba(90, 180, 233, 0.5);
  -webkit-box-shadow: 0 10px 30px 0px rgba(90, 180, 233, 0.5);
  -o-box-shadow: 0 10px 30px 0px rgba(90, 180, 233, 0.5);
  -ms-box-shadow: 0 10px 30px 0px rgba(90, 180, 233, 0.5);

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
</style>
