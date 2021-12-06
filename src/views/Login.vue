<template>
  <div class="container-login100 sm:mt-1 sm:w-full">
    <div class="absolute h-20 mr-83 -ml-56 -mt-77 sm:hidden md:hidden lg:hidden lg:-mt-56 lg:mr-68 lg:w-25 lg:h-10 sm:w-25 md:h-12 md:ml-0 md:mr-0 md:-mt-58  sm:w-25 sm:h-12 sm:ml-0 sm:mr-0 sm:-mt-56">
            <img src="../assets/img/prosis_letrero.png" class="w-45 h-20" />
    </div>
    <div class="wrap-login100">
        <!-- //////////////////////////////////////////////////////////////////
        ////                 FORMULARIO PRINCIPAL                         ////
        ///////////////////////////////////////////////////////////////////// -->        
      <div :class="{ 'blur-content': modal }" class="sm:ml-2">
        <div class="">
          <p class="text-center text-black font-titulo font-medium text-3xl ml-3 sm:text-2xl">Bitacora de Mantenimiento</p>
          <div class="flex">
            <img src="../assets/img/logoProsis.png" class="w-25 h-45 mx-auto mb-8" />
          </div>
        </div>
        
        <div class="bg-blue-100  -mt-32 h-60 rounded-lg">
          <div class="absolute mt-30 ml-10 w-60 sm:w-64 ">
            <ValidationObserver  v-slot="{ invalid  }">                       
          <div class="">          
            <div class="mb-5">
              <ValidationProvider name="Usuario" rules="required" v-slot="{ errors }">                   
                <input v-model="datos.user" @keyup.enter="iniciar_sesion()" 
                  :class="{ is_valid: !errors[0], is_invalid: errors[0]}" 
                  class="w-full h-8 font-titulo font-normal sm:-mx-7"                
                  type="text" placeholder="Usuario" name="Usuario" 
                />
                <span class="text-red-600 text-xs">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="mb-5">
              <ValidationProvider name="Contraseña" rules="required" v-slot="{ errors }">
                <div class="w-full inline-flex relative sm:-mx-7">              
                    <input v-model="datos.password"  @keyup.enter="iniciar_sesion()" 
                      class="w-full h-8 font-titulo font-normal" 
                      :class="{ is_valid: !errors[0], is_invalid: errors[0] }" 
                      :type="tipoInput" placeholder="Contraseña" name="Contraseña" 
                    />
                    <span @click="tipoInput == 'password' ? tipoInput = 'text' : tipoInput = 'password'" class="absolute right-0 mt-2 mr-2 cursor-pointer">
                      <img v-if="tipoInput == 'password'" src="../assets/img/visibility.png" class="w-5" />
                      <img v-else src="../assets/img/notvisibility.png" class="w-5" />
                    </span>                             
                </div>
                <span class="text-red-600 text-xs">{{ errors[0] }}</span> 
              </ValidationProvider>            
            </div>          
          </div>
          <div class="container-login100-form-btn mb-10 sm:-mx-7">
            <button @click="iniciar_sesion()" id="botonLoginTest" type="button" class="login100-form-btn font-titulo outline-none" :disabled="invalid">Iniciar Sesión</button>
          </div>        
        </ValidationObserver>
          </div>
        </div>
        
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
import CookiesService from '../services/CookiesService'
export default {
  name: "Login", 
  data() {
    return {
      modal: false,
      datos: {
        user: "",
        password: "",
        checkLog: false,
      },
      listaPlazas: [],
      listaTec: [],
      plazaSelect: "",
      tecSelect: "",
      tipoInput : 'password',      
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
///////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
  methods: {
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
    iniciar_sesion: async function () {            
      this.$store.dispatch("Login/INICIAR_SESION_LOGIN", this.datos)
      .then(() => {                     
        let userTipo = this.$store.state.Login.cookiesUser.rollId        
        CookiesService.actualizar_plaza()
        if(userTipo == 9 || userTipo == 8)
          this.$router.push("ConcentradoGMMEP");                                              
        else            
          this.$router.push("home");
      })     
      .catch(() => {        
        this.$notify.error({
          title: "Ops!!",
          msg: "EL USUARIO O LA CONTRASEÑA PUEDEN ESTAR MAL.",
          position: "bottom right",
          styles: { height: 100, width: 500 },
        });
      })     
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
.figura {
  width: 79vh;
  height: 100vh;
  /*margin-left: auto;*/
  background-image: radial-gradient(ellipse farthest-corner at 45px 30px , rgba(255, 255, 255, 0) 69%, rgba(44, 82, 130, 1) 0%);
}
</style>
