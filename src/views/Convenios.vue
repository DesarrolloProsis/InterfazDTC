<template>
  <div>

     <h6>{{date.now}}</h6>
    <div id class="wrapper-dropdown-2">
      <label for="convenios">Seleccionar convenio:</label>
      <select
        @change="validarConvenio()"
        v-model="datos.convenio"
        id="convenios"
        class="lista"
        type="text"
      >
        <option disabled value>Selecionar...</option>
        <option
          v-for="(convenio, index) in listaConvenios"
          v-bind:value="convenio.convenio"
          :key="index"
        >{{convenio.convenio }}</option>
        <!-- + "----" + convenio.managerName -->
      </select>
    </div>

    <div class="btn-div">
      <button @click="onClick()" type="button" class="btn">Aceptar</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      datos: {
        convenio: "",
        selector: false
      },
      listaConvenios: []
    };
  },
  methods: {
    onClick() {

      if (this.datos.selector) {
        this.$store.commit("Header/numConvenioMutation", this.datos.convenio);
        this.$router.push("home");
      } else alert("Selecciona un convenio");
    },
    validarConvenio() {
      if (this.datos.convenio != "0") this.datos.selector = true;
      else this.datos.selector = false;
    }
  },
  async beforeMount() {
    //console.log("COmponente MOUNT");
    console.log(this.datos);
    //await this.$store.dispatch("Header/buscarHeaders", this.datos);
    this.listaConvenios = await this.$store.getters["Login/getUser"];
  }
};
</script>

<style>
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  font-family: "Lato", "Arial", sans-serif;
  background: #ddd
    url(https://www.pocketfoldinvites.co.uk/ekmps/shops/chrisedgecombe/images/pale-grey-matte-authentic-cardstock-6687-p.jpg);
  font-weight: 300;
  font-size: 15px;
  color: #333;
  -webkit-font-smoothing: antialiased;
}

.wrapper-dropdown-2 {
  /* Size and position */
  position: relative; /* Enable absolute positioning for children and pseudo elements */
  width: 400px;
  margin: 150px auto;
  padding: 10px 15px;

  /* Styles */
  background: #fff;
  border-left: 5px solid grey;
  cursor: pointer;
  outline: none;
}

.wrapper-dropdown-2 .dropdown {
  /* Size & position */
  position: absolute;
  top: 100%;
  left: -5px;
  right: 0px;

  /* Styles */
  background: white;
  transition: all 0.3s ease-out;
  list-style: none;

  /* Hiding */
  opacity: 0;
  pointer-events: none;
}

.btn-div {
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px;
  margin: 40px auto;
  padding: 10px 75px;
}

.btn {
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
  width: 10em;
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
/* * {
    margin: 0;
    padding-left: ;
    box-sizing: border-box;
}

.cointainer{
}

.main-div1{
    background-image: url('../assets/img/carretera1.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.9;
}
.dropdown{
    background-color: blue;
} */
</style>