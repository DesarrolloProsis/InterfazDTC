<template>
  <div>
    <div class="flex flex-col sm:m-6 mt-16 max-w-md mx-auto border shadow-xl">
      <div class="text-4xl text-center text-gray-900 mt-4">
        <h1>Crear Usuario</h1>
      </div>
      <div class="inline-flex justify-center mt-6">
        <div class="m-3 flex-col">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Nombre</p>
          <input v-model="dataRegister.nombre" type="text" class="w-64" name="nombre" v-validate="'required'"/>
          <p class="text-red-600 text-xs">{{ errors.first("nombre") }}</p>
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Apellido Materno</p>
          <inputv-model="dataRegister.apellidoMaterno" type="text" class="w-64" name="apellidoPaterno" v-validate="'required'"/>
          <p class="text-red-600 text-xs">{{ errors.first("apellidoPaterno") }}</p>
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Apellido Paterno</p>
          <input v-model="dataRegister.apellidoPaterno" type="text" class="w-64" name="apellidoMaterno" v-validate="'required'"/>
          <p class="text-red-600 text-xs">{{ errors.first("apellidoMaterno") }}</p>
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p class="text-sm mb-1 font-semibold text-gray-700">Tipo de Usuario</p>
          <select
            v-model="dataRegister.tipoUsuario"
            class="w-64"
            name="tipoUsuario"
            v-validate="'required'"
          >
            <option disabled value>Selecionar...</option>
            <option value="1">Tecnico</option>
            <option value="2">Administrador</option>
          </select>
          <p class="text-red-600 text-xs">{{ errors.first("tipoUsuario") }}</p>
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-3">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Contraseña</p>
          <input v-model="dataRegister.constraseña" v-validate="'required'" type="password" class="w-64" name="password"/>
          <p class="text-red-600 text-xs">{{ errors.first("password") }}</p>
        </div>
      </div>
      <div class="inline-flex justify-center">
        <div class="m-5">
          <p for="nombre" class="text-sm text-gray-800 mb-1">Repite Contraseña</p>
          <input v-model="dataRegister.reContraseña" v-validate="'required'" type="password" class="w-64" name="repassword"/>
          <p class="text-red-600 text-xs">{{ errors.first("repassword") }}</p>
        </div>
      </div>
      <div class="inline-flex justify-center mb-5">
        <div class="m-5">
          <button @click="crear" class="border-green-600 border w-64 h-12">Registrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dataRegister: {
        nombre: "",
        apellidoMaterno: "",
        apellidoPaterno: "",
        tipoUsuario: "",
        constraseña: "",
        reContraseña: "",
      },
    };
  },
  methods: {
    crear: function () {
      this.$validator.validate().then((row) => {
        if (row === true) {
          if (
            this.dataRegister.constraseña === this.dataRegister.reContraseña
          ) {
            let CreateUser = {
              Name: this.dataRegister.nombre,
              LastName1: this.dataRegister.apellidoMaterno,
              LastName2: this.dataRegister.apellidoPaterno,
              Password: this.dataRegister.constraseña,
              Rol: this.dataRegister.tipoUsuario,
            };
            this.$store
              .dispatch("Usuarios/NuevoUser", CreateUser)
              .then((result) => {
                if (JSON.stringify(result) != "{}") {
                  this.$notify.success({
                    title: "Ok!!",
                    msg: "SE CREO CORRECTAMENTE EL USUARIO.",
                    position: "bottom right",
                    styles: {
                      height: 100,
                      width: 500,
                    },
                  });
                  this.$router.push("login");
                }
              })
              .catch((error) => {
                this.$notify.error({
                  title: "Ops!!",
                  msg: error,
                  position: "bottom right",
                  styles: {
                    height: 100,
                    width: 500,
                  },
                });
              });
          } else {
            this.$notify.error({
              title: "Ops!!",
              msg: "LAS CONTRASEÑAS NO COINCIDEN.",
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
            this.dataRegister.constraseña = "";
            this.dataRegister.reContraseña = "";
          }
        } else {
          this.$notify.error({
            title: "Ops!!",
            msg: "FALTAN CAMPOS PARA LLENAR.",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      });
    },
  },
};
</script>

