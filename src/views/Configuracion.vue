<template>
  <div>
    <Nav></Nav>
    <div class="flex justify-center mt-2 sm:mt-14">
      <div class="grid grid-cols-2"> 
        <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/EncargadosPlaza" class="text-center cursor-pointer">
              <img src="../assets/img/encargado.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Encargados de Plaza</h1>
            </router-link>
        </div>
        <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/Usuarios" class="text-center cursor-pointer">
              <img src="../assets/img/tecnico.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Usuarios Bitacora</h1>
            </router-link>
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
      typeUser: true,
    };
  },
  components: {
    Nav,
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
  beforeMount: function () {
    this.lista_Usuarios = this.$store.getters["Usuarios/getUsers"];        
    if (this.$store.state.Login.cookiesUser.rollId == 1) {
      this.typeUser = false;
    }
  },
/////////////////////////////////////////////////////////////////////
////                            METODOS                         ////
///////////////////////////////////////////////////////////////////// 
  methods: {    
    editar_password: function () {      
      if (this.enviarPassword) {
        this.enviarPassword = false;
        this.User.Password = "***********";
        this.User.RePassword = "***********";
      } 
      else {
        this.enviarPassword = true;
        this.User.Password = "";
        this.User.RePassword = "";
      }
    },
    borrar_usuario(item) {
      let User = { id: item.userId, square: ""};
      this.$store.dispatch("Usuarios/BorrarUser", User);
    },    
    limpiar_usuario() {
      for (let prop in this.User) {
        this.User[prop] = "";
      }
      this.modal = false;
      this.modal_Part = false;
      this.disablePass = false;
      if (this.enviarPassword) {
        this.enviarPassword = false;
        this.User.Password = "***********";
        this.User.RePassword = "***********";
      }
    },
    editarUsuario: function (item) {      
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
        if (this.User.Password == "") {
          this.$notify.error({
            title: "Ops!!",
            msg: "LAS CONTRASEÑAS ESTA VACIO",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        } 
        else {  
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
          let _UpUser = {
            IdUser: this.User.UserId,
            Password: this.User.Password,
          };          
          if(_UpUser.Password != "***********"){
              alert('cambie la contraseña')
              this.$store.dispatch("Usuarios/UPDATE_PASSWORD", _UpUser);
          }                                                    
          this.$notify.success({
            title: "Ops!!",
            msg: "SE ACTUALIZO EL USUARIO CORRECTAMENTE.",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
          this.modal = false;
        }
        this.limpiar_usuario();      
      } 
      else {
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
  },
};
</script>
