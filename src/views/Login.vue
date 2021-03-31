<template>
  <div class="container-login100">
    <div class="wrap-login100">
        <!-- //////////////////////////////////////////////////////////////////
        ////                 FORMULARIO PRINCIPAL                         ////
        ///////////////////////////////////////////////////////////////////// -->
      <div :class="{ 'blur-content': modal }">
        <p class="text-center text-black font-sans text-4xl">Bienvenido</p>
        <div>
          <div class="flex">
            <img src="../assets/img/loginIcon.png" class="w-64 h-64 mx-auto" />
          </div>
        </div>
        <br />
        <div class="mt-10">
          <div class="mb-5">
            <input @keyup.enter="ingresar_inicio()"  v-validate="'required'" v-model="datos.User" class="w-full h-8" type="text" name="Usuario" :class="{ is_valid: !errors.first('Usuario'),is_invalid: errors.first('Usuario')}" placeholder="  Usuario" />
            <span class="text-red-600 text-xs">{{ errors.first("Usuario") }}</span>
          </div>
          <div class="mb-5">
            <div class="w-full inline-flex relative">
              <input @keyup.enter="ingresar_inicio()" placeholder=" Contraseña" class="w-full h-8" v-validate="'required'" :class="{ is_valid: !errors.first('Contraseña'),is_invalid: errors.first('Contraseña')}" :type="tipoInput" name="Contraseña" v-model="datos.Password" />
              <span class="absolute right-0 mt-2 mr-2 cursor-pointer" @click="tipoInput == 'password' ? tipoInput = 'text' : tipoInput = 'password'">
                <img v-if="tipoInput == 'password'" src="../assets/img/visibility.png" class="w-5" />
                <img v-else src="../assets/img/notvisibility.png" class="w-5" />
              </span>
            </div>
            <span class="text-red-600 text-xs">{{ errors.first("Contraseña") }}</span>
          </div>          
        </div>
        <div class="text-center text-gray-900">
          <input v-model.number="datos.checkLog" class="mt-10 mb-10 mr-2" type="checkbox"/>
          <span>Generar Por Otra Persona</span>
        </div>
        <div class="container-login100-form-btn">
          <button @click="ingresar_inicio()" type="button" class="login100-form-btn text-blue-600 outline-none">Login</button>
        </div>
<!--         <div class="flex flex-col text-center mt-3 text-blue-700">
          <a class="hover:text-blue-900 cursor-pointer" @click="registar_nuevo_usuario">Registrarse</a>
          <a class="hover:text-blue-900 cursor-pointer" @click="contraseña_perdida">¿Olvidaste tu constraseña?</a>
        </div> -->
      </div>
    </div>
    <!-- //////////////////////////////////////////////////////////////////
    ////                  MODAL INGRESAR POR OTRO                     ////
    ///////////////////////////////////////////////////////////////////// -->
    <div v-if="modal" class="rounded-lg absolute border border-gray-700 bg-white px-24 py-20 flex flex-col" @close="modal = false">
      <div>
        <div class="flex mb-8">
          <img src="../assets/img/change.png" class="w-24 mx-auto" />
        </div>
      </div>
      <div class="mb-4">
        <p class="text-xs mb-1 text-gray-900">Plaza</p>
        <select @change="buscar_tecnivo_plaza()" v-validate="'required'" :class="{ is_valid: !errors.first('Plaza'),is_invalid: errors.first('Plaza')}" v-model="plazaSelect" class="w-48 h-8" type="text" name="Plaza">
          <option value>Selecionar...</option>
          <option v-for="(item, index) in listaPlazas" v-bind:value="item.squareCatalogId" :key="index">{{ item.squareName }}</option>
        </select>
        <p class="text-red-600 text-xs">{{ errors.first("Plaza") }}</p>
      </div>
      <div class="mb-8">
        <p class="text-xs mb-1 text-gray-900">Tecnico</p>
        <select v-model="tecSelect" v-validate="'required'" class="h-8 w-48" :class="{ is_valid: !errors.first('Tecnico'), is_invalid: errors.first('Tecnico') }" type="text" name="Tecnico">
          <option value>Selecionar...</option>
          <option v-for="(item, index) in listaTec" v-bind:value="item.userId" :key="index">{{ item.tecnicosAsignados }}</option>
        </select>
        <p class="text-red-600 text-xs">{{ errors.first("Tecnico") }}</p>
      </div>
      <button @click="login_por_otro()" class="text-white mb-5 px-4 py-2 rounded-full bg-blue-800">Ingresar</button>
      <button @click="modal = false" class="text-white px-4 py-2 rounded-full bg-red-800">Cancelar</button>
    </div>
  </div>
</template>

<script>
import ServiceCookies from '../services/CookiesService'
export default {
  name: "Login",  
  data() {
    return {
      modal: false,
      datos: {
        User: "",
        Password: "",
        checkLog: false,
      },
      listaPlazas: [],
      listaTec: [],
      plazaSelect: "",
      tecSelect: "",
      tipoInput : 'password'
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
  async beforeMount() {  
  },
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
  methods: {
    registar_nuevo_usuario: function () {
      this.$router.push("register");
    },
    contraseña_perdida: function () {
      this.$router.push("home");
    },
    login_por_otro: async function () {
      if (this.fields.Plaza.valid && this.fields.Tecnico.valid) {
        await this.$store.dispatch("Login/BUSCAR_HEADER_OTRO_TECNICO", this.tecSelect);
        let dataHeader = await this.$store.state.Login.listaHeaderDtcUser
        await this.$store.commit("Header/LISTA_HEADERS_MUTATION", dataHeader);
        await this.$store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
        await this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
        this.$router.push("home");
      }
    },
    buscar_tecnivo_plaza: async function () {
      if (this.plazaSelect != "") {
        await this.$store.dispatch("Login/BUSCAR_TECNICOS_PLAZA", this.plazaSelect);
        this.listaTec = this.$store.state.Login.listaTec
      } 
      else {
        this.listaTec = [];
        this.tecSelect = "";
      }
    },
    ingresar_inicio: async function () {      
      await this.$store.dispatch("Login/BUSCAR_COOKIES_USUARIO", this.datos);             
      if (this.$store.getters["Login/GET_USER_IS_LOGIN"]) {
        await this.$store.dispatch("Login/BUSCAR_PLAZAS");
        this.listaPlazas = await this.$store.state.Login.listaPlazas
        if (this.datos.checkLog === true)
          this.modal = true;      
        else {
          await this.$store.dispatch("Login/INICIAR_SESION_LOGIN", this.datos);
          let dataHeader = await this.$store.state.Login.listaHeaderDtcUser          
          await this.$store.commit("Header/LISTA_HEADERS_MUTATION", dataHeader);
          await this.$store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
          await this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
          let userTipo = await this.$store.state.Login.cookiesUser.rollId
          if(userTipo == 9 || userTipo == 8)
            this.$router.push("ConcentradoDTC");                                              
          else            
            this.$router.push("home");
          ServiceCookies.actualizar_plaza()
        }
      } 
      else {
        this.$notify.error({
          title: "Ops!!",
          msg: "EL USUARIO O LA CONTRASEÑA PUEDEN ESTAR MAL.",
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
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
  background-color: #2c5282;
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
