<template>
  <div>    
    <div :class="{'mb-69': typeUser != 1}" class="flex justify-center p-4 font-titulo">
      <div class="mt-5">
      <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-8 hidden">Lista de Usuarios</h1>
        <HeaderGenerico  @filtrar-usuario="guardar_palabra_busqueda" :titulo="'Usuarios Bitacora'" :tipo="'USUARIO'"></HeaderGenerico>
        <button @click="modalEditar = true" class="w-full botonIconBuscar relative justify-center mb-1" v-if="typeUser">
          <img src="../../assets/img/plus.png" class="mr-2 sm:m-1" width="20" height="20"/>
          <span class="">Agregar Nuevo Usuario</span>
        </button>
      <!--///////////////////////////////////////////////////////////////////
        ////                     TABLA DE USUARIOS                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="overflow-x-auto bg-white rounded-lg sm:mb-16 shadow overflow-y-auto relative mb-32" style="height:600px;">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
              <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
                <th class="w-64 cabeceraTable font-medium">Nombre</th>
                <th class="w-56 cabeceraTable font-medium">Tipo de Usuario</th>   
                <th class="w-56 cabeceraTable font-medium">Correo</th>                
                <th class="w-48 cabeceraTable font-medium" v-if="typeUser">Acciones</th>
              </tr>
              <tr class="h-12 text-gray-900 text-sm sm:text-xs" v-for="(item, key) in lista_Usuarios_Filtrada" :key="key">
                <td class="cuerpoTable text-center">{{ item.name + " " + item.lastName1 + " " + item.lastName2 }}</td>
                <td class="cuerpoTable text-center">{{ item.roll }}</td>
                <td class="cuerpoTable text-center break-all">{{ item.mail }}</td>
                <td class="cuerpoTable text-center" v-if="typeUser">
                  <button @click="editarUsuario(item)" class="botonIconActualizar">
                    <img src="../../assets/img/pencil.png" class="mr-2 sm:m-1" width="15" height="15"/>
                    <span class="text-xs sm:hidden">Editar</span>
                  </button>
                  <button v-if="typeUser" @click="borrar_usuario(item)" class="botonIconLimpiar m-2">
                    <img src="../../assets/img/bin.png" class="mr-2 sm:m-1" width="15" height="15"/>
                    <span class="text-xs sm:hidden">Borrar</span>
                  </button>
                </td>
            </tr>
          </table>
        </div>
      </div>
        <!--/////////////////////////////////////////////////////////////////////
        ////                     MODAL AGREGAR USUARIO                      ////
        ////////////////////////////////////////////////////////////////////-->
      <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center text-center">Agregar Usuario</p>
                    <div class="grid grid-cols-2 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
                        <input v-model="objUsuarioNuevo.nombre" type="text" class="w-full bg-white border-gray-400">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Apellido Paterno</p>
                        <input v-model="objUsuarioNuevo.apellidoM" type="text" class="w-full bg-white border-gray-400 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Apellido Materno</p>
                        <input v-model="objUsuarioNuevo.apellidoP" type="text" class="w-full bg-white border-gray-400 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Tipo Usuario</p>
                        <select v-model="objUsuarioNuevo.tipoUsuario" class="w-full mt-2">
                          <option disabled value>Selecionar...</option>     
                          <option v-for="(item, key) in listaTiposUsuario" :key="key">{{ item.nombre }}</option>                                                                         
                        </select>
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Plaza</p>                        
                        <multiselect 
                          v-model="objUsuarioNuevo.plazas"                                                                                                                                                             
                          :custom-label="label_multi_select"                          
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="listaPlazas"
                          track-by="squareCatalogId"
                          class=" shadow-md hover:border-gray-700 mt-2"
                          :multiple="true"
                        >   
                          <template slot="selection" slot-scope="{ values, search, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Plaza</span>
                          </template>   
                        </multiselect>
                    </div>
                    <div class="mt-5 text-center ml-6">
                        <button @click="guardar_nuevo_usuario" class="botonIconBuscar font-boton">Guardar</button>
                        <button @click="modalEditar = false" class="botonIconCancelar font-boton">Cancelar</button>
                    </div>
                </div>
      <div class="flex absolute justify-center inset-x-0 mt-24">
        <div v-if="modal" class="rounded-lg border border-gray-400 bg-white px-12 py-10 shadow-2xl">
          <div class="justify-end flex -mr-10 -mt-6">
            <button @click="limpiar_usuario">
              <img src="../../assets/img/close.png" class="mr-2" width="25" height="25" />
            </button>
          </div>
          <!--/////////////////////////////////////////////////////////////////
          ////                  MODAL PRIMERA PARTE                        ////
          ////////////////////////////////////////////////////////////////////-->
          <div class="mt-3 inset-x-0 bg-white w-66 sm:w-64 mx-auto px-10 py-5" v-if="!modal_Part">
            <div class>
              <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
              <input v-model="User.Name" class="w-full is_valid" type="text" />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Materno</p>
              <input v-model="User.LastName1" class="w-full is_valid" type="text" name="NoReporte"/>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Paterno</p>
              <input v-model="User.LastName2" class="w-full is_valid" type="text" />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Correo</p>
              <input v-model="User.Mail" class="w-full is_valid" type="text" />
            </div>
            <div class="mt-8 flex justify-center">
              <button @click="modal_Part = true" class="botonIconNext font-boton">
                <img src="../../assets/img/rehacer.png" class="mr-2" width="25" height="25"/>
                <span class="text-xs">Siguiente</span>
              </button>
            </div>
          </div>
          <!--/////////////////////////////////////////////////////////////////
          ////                  MODAL SEGUNDA PARTE                        ////
          ////////////////////////////////////////////////////////////////////-->
          <div class="mt-2 inset-x-0 bg-white w-66 sm:w-64 mx-auto px-10 py-5 -mb-5" v-else>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Tipo de Usuario</p>
              <select v-if="!typeUser" v-model="User.Roll" class="w-full is_valid">
                <option value="1">Tecnico</option>
              </select>
              <select v-else v-model="User.Roll" class="w-full is_valid">
                <option disabled value>Selecionar...</option>
                <option value="1">Tecnico</option>
                <option value="2">Administrador</option>
                <option value="3">Sistemas</option>
              </select>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
              <input v-model="User.Password" class="w-full is_valid" :disabled="enviarPassword"/>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
              <input v-model="User.RePassword" class="w-full is_valid" :disabled="enviarPassword"/>
            </div>
            <div class="grid grid-cols-2">  
              <div class="flex justify-center mt-5 mr-10">
                <button @click="modal_Part = false" class="mt-4 botonIconNext font-boton">
                  <img src="../../assets/img/deshacer.png" class="mr-4" width="25" height="25"/>
                  <span class="text-xs mr-4">Regresar</span>
                </button>
              </div>
              <div class="flex justify-center mt-5 ml-10">
                <button @click="confirmar" class=" mt-4 botonIconBuscar font-boton">
                  <img src="../../assets/img/save.png" class="mr-5" width="25" height="25"/>
                  <span class="text-xs mr-5">Guardar</span>
                </button>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderGenerico from "../../components/Header/HeaderGenerico";
import Multiselect from "vue-multiselect";
import Axios from 'axios'
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  name: "UsuariosBitacora",
  components: {
    Multiselect,
    HeaderGenerico,
  },
  data: function () {
    return {
      lista_Usuarios: [],
      lista_Usuarios_Filtrada: [],
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
      //Metodos Nuevos
      modalEditar: false,
      objUsuarioNuevo:{
        nombre: '',
        apellidoM: '',
        apellidoP: '',        
        tipoUsuario: '',
        plazas: []
      }
      
    };
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
  beforeMount: function () {
    this.lista_Usuarios = this.$store.getters["Usuarios/getUsers"];     
    this.lista_Usuarios_Filtrada = this.lista_Usuarios
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
    guardar_nuevo_usuario(){            
      this.objUsuarioNuevo.tipoUsuario = this.listaTiposUsuario.find(item => item.nombre == this.objUsuarioNuevo.tipoUsuario).id
      this.objUsuarioNuevo.plazas
      console.log(this.objUsuarioNuevo);
      let objInsert = {
        name: this.objUsuarioNuevo.nombre,
        lastName1: this.objUsuarioNuevo.apellidoM,
        lastName2: this.objUsuarioNuevo.apellidoP,
        password: '1234',
        rol: this.objUsuarioNuevo.tipoUsuario,
      }
      Axios.post(`${API}/User/nuevo`,objInsert)
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => console.log(error))
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
    label_multi_select(value){          
      if(value != 'Sin Actividad')
        return `${value.squareCatalogId} ${value.squareName}`  
    },
    guardar_palabra_busqueda: function(newPalabra){
      console.log(newPalabra)      
      if (newPalabra != "") {
        let array_filtrado = this.lista_Usuarios_Filtrada.filter(item => {
          return item.name.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName1.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName2.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.lista_Usuarios_Filtrada = array_filtrado;
      }
      else{
        this.lista_Usuarios_Filtrada = this.lista_Usuarios
      }
    }
  },
  computed: {
    listaTiposUsuario(){
      return this.$store.state.Login.tipoUsuario
    },
    listaPlazas(){
      return this.$store.state.Login.listaPlazas
    }
  }
};
</script>