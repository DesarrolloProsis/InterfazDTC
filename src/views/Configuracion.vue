<template>
  <div>
    <Nav></Nav>
    <div class="flex justify-center p-4">
      <div class="mt-5">
        <h1 class="text-4xl font-medium text-gray-800 text-center">Lista de Usuarios</h1>
        <div class="mt-5 mb-5 flex justify-between">
          <div class="inline-flex mt-2">
            <button
              @click="modal = true"
              v-if="typeUser"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 mr-3"
            >
              <img src="../assets/img/more.png" class="mr-2" width="25" height="25" />
              <span class="text-xs">Agregar Usuario</span>
            </button>
          </div>
          <div></div>
        </div>
        <div class="overflow-x-auto">
          <table class="border-2 border-gray-800">
            <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
              <th class="w-64 border-2 border-gray-800">Nombre</th>
              <th class="w-56 border-2 border-gray-800">Tipo de Usuario</th>
              <th class="w-64 border-2 border-gray-800">Correo</th>
              <th class="w-48 border-2 border-gray-800">Acciones</th>
            </tr>
            <tr
              class="h-12 text-gray-900 text-sm sm:text-xs"
              v-for="(item, key) in lista_Usuarios"
              :key="key"
            >
              <td
                class="text-center border-2 border-gray-800"
              >{{ item.name + ' ' + item.lastName1 + ' ' + item.lastName2 }}</td>
              <td class="text-center border-2 border-gray-800">{{ item.roll }}</td>
              <td class="text-center border-2 border-gray-800 break-all">{{ item.mail }}</td>
              <td class="text-center border-2 border-gray-800">
                <button
                  @click="editarUsuario(item)"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-yellow-500 m-2"
                >
                  <img src="../assets/img/pencil.png" class="mr-2 sm:m-1" width="15" height="15" />
                  <span class="text-xs sm:hidden">Editar</span>
                </button>
                <button
                  @click="Borrar(item)"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
                >
                  <img src="../assets/img/bin.png" class="mr-2 sm:m-1" width="15" height="15" />
                  <span class="text-xs sm:hidden">Borrar</span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="flex absolute justify-center inset-x-0 mt-24">
        <div v-if="modal" class="rounded-lg border border-gray-700 bg-white px-12 py-10 shadow-2xl">
          <div class="justify-end flex">
            <button @click="clearUser">X</button>
          </div>
          <div class="mt-3" v-if="!modal_Part">
            <div class>
              <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
              <input v-model="User.Name" class="w-full" type="text" />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Materno</p>
              <input v-model="User.LastName1" class="w-full" type="text" name="NoReporte" />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Paterno</p>
              <input v-model="User.LastName2" class="w-full" type="text" />
            </div>

            <div class="mt-8 flex justify-center">
              <button
                @click="modal_Part = true"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-blue-700 m-1"
              >
                <img src="../assets/img/rehacer.png" class="mr-2" width="25" height="25" />
                <span class="text-xs">Siguiente</span>
              </button>
            </div>
          </div>
          <div class="mt-2" v-else>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Tipo de Usuario</p>
              <select v-model="User.Roll" class="w-full">
                <option disabled value>Selecionar...</option>
                <option value="1">Tecnico</option>
                <option value="2">Administrador</option>
              </select>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
              <input
              
                v-model="User.Password"
                class="w-full"
                :disabled="!enviarPassword"
                type="password"
              />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
              <input
                v-model="User.RePassword"
                class="w-full"
                :disabled="!enviarPassword"
                type="password"
              />
            </div>

            <div class="flex justify-center mt-5">
              <button
                @click="modal_Part = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-blue-700 m-1"
              >
                <img src="../assets/img/deshacer.png" class="mr-4" width="25" height="25" />
                <span class="text-xs">Regresar</span>
              </button>
            </div>
            <div class="flex justify-center">
              <button
                v-if="disablePass"
                @click="editPassWord"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-blue-700 m-1"
              >
                <img src="../assets/img/contraseña.png" class="mr-1" width="25" height="25" />
                <span class="text-xs">Contraseña</span>
              </button>
            </div>
            <div class="flex justify-center">
              <button
                @click="confirmar"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-green-700 m-1"
              >
                <img src="../assets/img/more.png" class="mr-1" width="25" height="25" />
                <span class="text-xs">Crear Usuario</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navbar";

export default {
  data: function () {
    return {
      lista_Usuarios: [],
      User: {
        UserId: "",
        UserName: "",
        Name: "",
        LastName1: "",
        LastName2: "",
        Roll: "",
        Mail: "",
        Password: "",
        RePassword: "",
      },
      modal: false,
      modal_Part: false,
      disablePass: false,
      enviarPassword: false,
      typeUser: true
    };
  },
  components: {
    Nav,
  },
  beforeMount: function () {
    this.lista_Usuarios = this.$store.getters["Usuarios/getUsers"];
    if(this.$store.getters['Login/getTypeUser'] == 1){
        this.typeUser = false
    }
  },
  methods: {
    editPassWord: function () {
      //disbalePass False cuando quieraenviar la contraseña
      if (this.enviarPassword) {
        this.enviarPassword = false;
        this.User.Password = "***********";
        this.User.RePassword = "***********";
      } else {
        this.enviarPassword = true;
        this.User.Password = "";
        this.User.RePassword = "";
      }
    },
    clearUser: function () {
      for (let prop in this.User) {
        this.User[prop] = "";
      }
      this.modal = false;
      this.modal_Part = false;
      this.disablePass = false;
      if(this.enviarPassword){
        this.enviarPassword = false;
        this.User.Password = "***********";
        this.User.RePassword = "***********";
      }
      
      
      
    },
    editarUsuario: function (item) {
      console.log(item);
      this.disablePass = true;
      this.User.UserId = item.userId;
      this.User.UserName = item.userName;
      this.User.Name = item.name;
      this.User.LastName1 = item.lastName1;
      this.User.LastName2 = item.lastName2;
      this.User.Roll = item.rollId;
      this.User.Mail = item.mail;
      this.User.Password = "***********";
      this.User.RePassword = "***********";
      this.modal = true;
    },
    confirmar: function () {
      if (this.User.Password == this.User.RePassword) {
        if (!this.disablePass) {
          alert("Agregar Usuario");
          let CreateUser = {
            Name: this.User.Name,
            LastName1: this.User.LastName1,
            LastName2: this.User.LastName2,
            Password: this.User.Password,
            Rol: this.User.Roll,
          };
          this.$store.dispatch("Usuarios/NuevoUser", CreateUser);
      
          this.modal = false
        } else {
          let UpUser = {
            UserId: this.User.UserId,
            UserName: this.User.UserName,
            LastName1: this.User.LastName1,
            LastName2: this.User.LastName2,
            Name: this.User.Name,
            Mail: this.User.Mail,
            Rol: this.User.Roll,
          };
          this.$store.dispatch("Usuarios/Update_User", UpUser);
          console.log(UpUser);          

          this.$notify.success({
            title: "Ops!!",
            msg: "SE ACTUALIZO EL USUARIO CORRECTAMENTE.",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });    
               if (this.enviarPassword) {
            alert('hola')
            let UpUser = {
              UserId: this.User.UserId,
              Password: this.User.Password,
            };
            //this.$store.dispatch('Usuarios/UPDATE_PASSWORD')
            console.log(UpUser);
          }     
          this.clearUser();
          this.modal = false
        }
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
      }
    },
    Borrar: function (item) {
      let User = {
        id: item.userId,
        square: "",
      };
      this.$store.dispatch("Usuarios/BorrarUser", User);
    },
  },
};
</script>
