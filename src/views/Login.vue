<template>
  <div class="container-login100">
    <div class="wrap-login100">
      <div class="login100-form" :class="{ 'blur-content': modal }">
        <span class="login100-form-title">Bienvenido</span>
        <br />
        <br />
        <div class="login100-form-avatar">
          <img src="../assets/img/loginIcon.png" class="avatar" />
        </div>
        <br />
        <div class="wrap-input100 validate-input m-t-85 m-b-35">
          <br />
          <span class="focus-input100"></span>
          <div class="wrap-input100 validate-input m-b-50">
            <input
              class="input100"
              type="text"
              id="username"
              name="username"
              placeholder="  Username"
              v-model="datos.User"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input m-b-50">
            <input
              class="input100"
              type="password"
              id="pwd"
              name="pwd"
              placeholder="  Password"
              v-model="datos.Password"
            />
            <span class="focus-input100"></span>
          </div>
        </div>
        <br />

        <label
          ><input type="checkbox" v-model.number="datos.checkLog" />Generar Por
          Otra Persona</label
        ><br />
        <label style="padding-left: 1vw"></label>

        <br />
        <br />
        <div class="container-login100-form-btn">
          <button
            @click="ingresarLogin()"
            type="button"
            class="login100-form-btn"
          >
            Login
          </button>
        </div>
        <br />
        <br />
        <ul class="login-more p-t-190">
          <li class="m-b-8">
            <span class="txt1">
              Olvidaste
              <a href="#" class="txt2">Usuario/Contraseña?</a>
            </span>
          </li>
          <li>
            <span class="txt1">
              No tienes cuenta?
              <a href="#" class="txt2">Registrate</a>
            </span>
          </li>
        </ul>
        <br />
      </div>
    </div>
    <div
      v-if="modal"
      class="bg-blue-100 rounded absolute bg-gray-500 px-24 py-24 flex flex-col"
      @close="modal = false"
    >
      <div style="padding-bottom: 5vh; padding-left: 10vw">
        <button
          @click="modal = false"
          style="font-weight: bold; font-size: 2vw"
        >
          x
        </button>
      </div>
      <div class=" mb-8">
        <select
          @change="buscarTec()"
          v-model="plazaSelect"
          class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
          style="width: 10vw;"
          type="text"
        >
          <option disabled value=" ">Selecionar...</option>
          <option
            v-for="(item, index) in listaPlazas"
            v-bind:value="item.value"
            :key="index"
            >{{ item.text }}</option
          >
        </select>
      </div>

      <div class=" mb-8">
        <select
          v-model="tecSelect"
          class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
          style="width: 10vw;"
          type="text"
        >
          <option disabled value=" ">Selecionar...</option>
          <option
            v-for="(item, index) in listaTec"
            v-bind:value="item.value"
            :key="index"
            >{{ item.text }}</option
          >
        </select>
      </div>
      <button
        @click="loginOther()"
        class="text-black font-bold px-4 py-2 rounded-full"
        style="backgroundColor: #57b846"
      >
        Ingresar
      </button>
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
      await this.$store.dispatch("Login/buscarHeaderTec", this.tecSelect);
      let dataHeader = await this.$store.getters["Login/getUser"];
      await this.$store.commit("Header/listaHeadersMutation", dataHeader);
      await this.$store.dispatch("DTC/buscarDescriptions");
      this.$router.push("home");
    },
    buscarTec: async function() {
      if (this.plazaSelect != "") {
        await this.$store.dispatch("Login/buscarTec", this.plazaSelect);
        this.listaTec = this.$store.getters["Login/getListaTec"];
      }
    },
    ingresarLogin: async function() {
      if (this.datos.checkLog === true) {
        await this.$store.dispatch("Login/buscarUsuarioCokie", this.datos);
        if (this.$store.getters["Login/getUserLogeado"]) {
            this.modal = true;
        } else {
          alert("El usuario o la contraseña son incorrectos");
          this.modal = false;
        }
        //await this.$store.dispatch("Login/buscarUsuario", this.datos);
      } else {
        await this.$store.dispatch("Login/buscarUsuarioCokie", this.datos);
        if (this.$store.getters["Login/getUserLogeado"]) {          
          await this.$store.dispatch("Login/buscarUsuario", this.datos);
          let dataHeader = await this.$store.getters["Login/getUser"];          
          await this.$store.commit("Header/listaHeadersMutation", dataHeader);
          await this.$store.dispatch("DTC/buscarDescriptions");
          this.$router.push("home");
        } else {
          alert("El usuario o la contraseña son incorrectos");
        }
      }
    }
  },
  async beforeMount() {
    await this.$store.dispatch("Login/buscarPlazas");
    this.listaPlazas = await this.$store.getters["Login/getListaPlazas"];
  }
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: Poppins-Regular, sans-serif;
}

/*---------------------------------------------*/
a {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #333333;
}

/*---------------------------------------------*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

.blur-content {
  filter: blur(5px);
}

p {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}
input:focus:-moz-placeholder {
  color: transparent;
}
input:focus::-moz-placeholder {
  color: transparent;
}
input:focus:-ms-input-placeholder {
  color: transparent;
}

textarea:focus::-webkit-input-placeholder {
  color: transparent;
}
textarea:focus:-moz-placeholder {
  color: transparent;
}
textarea:focus::-moz-placeholder {
  color: transparent;
}
textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-webkit-input-placeholder {
  color: #adadad;
}
input:-moz-placeholder {
  color: #adadad;
}
input::-moz-placeholder {
  color: #adadad;
}
input:-ms-input-placeholder {
  color: #adadad;
}

textarea::-webkit-input-placeholder {
  color: #adadad;
}
textarea:-moz-placeholder {
  color: #adadad;
}
textarea::-moz-placeholder {
  color: #adadad;
}
textarea:-ms-input-placeholder {
  color: #adadad;
}

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

.txt1 {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #999999;
  line-height: 1.5;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #57b846;
  line-height: 1.5;
}

.limiter {
  width: 100%;
  margin: 0 auto;
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

.avatar {
  height: 8em;
  width: 8em;
}

.wrap-login100 {
  width: 390px;
  background: #fff;
}

.login100-form {
  width: 100%;
}

.login100-form-title {
  display: block;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 39px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
}

.login100-form-avatar {
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  background-image: url("../assets/img/loginIcon.png");
}

.login100-form-avatar img {
  width: 100%;
}

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
}

.input100 {
  font-family: Poppins-SemiBold;
  font-size: 18px;
  color: #555555;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 52px;
  background: transparent;
  padding: 0 5px;
}

.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #57b846;
}

.focus-input100::after {
  font-family: Poppins-Medium;
  font-size: 18px;
  color: #999999;
  line-height: 1.2;

  content: attr(data-placeholder);
  display: block;
  width: 100%;
  position: absolute;
  top: 15px;
  left: 0px;
  padding-left: 5px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100::after {
  top: -20px;
  font-size: 15px;
}

.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::after {
  top: -20px;
  font-size: 15px;
}

.has-val.input100 + .focus-input100::before {
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
  background-color: #57b846;
  border-radius: 25px;

  box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
  -moz-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
  -webkit-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
  -o-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);
  -ms-box-shadow: 0 10px 30px 0px rgba(87, 184, 70, 0.5);

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background-color: #333333;
  box-shadow: 0 10px 30px 0px rgba(51, 51, 51, 0.5);
  -moz-box-shadow: 0 10px 30px 0px rgba(51, 51, 51, 0.5);
  -webkit-box-shadow: 0 10px 30px 0px rgba(51, 51, 51, 0.5);
  -o-box-shadow: 0 10px 30px 0px rgba(51, 51, 51, 0.5);
  -ms-box-shadow: 0 10px 30px 0px rgba(51, 51, 51, 0.5);
}

.login-more {
  align-content: center;
}

.login-more li {
  position: relative;
  padding-left: 16px;
}

.login-more li::before {
  content: "";
  display: block;
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #cccccc;
  top: 45%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 0;
}

</style>
