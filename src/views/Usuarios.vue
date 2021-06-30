<template>
  <div>    
    <div class="flex justify-center p-4">
      <div class="mt-5">
      <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-8 hidden">Lista de Usuarios</h1>
        <HeaderGenerico  @filtrar-usuario="guardar_palabra_busqueda" :titulo="'Usuarios Bitacora'" :tipo="'USUARIO'"></HeaderGenerico>
        <button @click="modalEditar = true" class="w-full botonIconBuscar relative justify-center mb-1" v-if="typeUser">
          <img src="@/assets/img/plus.png" class="mr-2 sm:m-1" width="20" height="20"/>
          <span class="">Agregar Nuevo Usuario</span>
        </button>
      <!--///////////////////////////////////////////////////////////////////
        ////                     TABLA DE USUARIOS                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="overflow-x-auto bg-white rounded-lg -mb-66 shadow overflow-y-auto relative" style="height:600px;">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
              <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
                <th class="w-64 cabeceraTable font-medium">Nombre</th>
                <th class="w-56 cabeceraTable font-medium">Tipo de Usuario</th>
                <th class="w-56 cabeceraTable font-medium">Plaza</th>   
                <th class="w-56 cabeceraTable font-medium">Correo</th>                
                <th class="w-48 cabeceraTable font-medium">Acciones</th>
              </tr>
              <tr class="h-12 text-gray-900 text-sm sm:text-xs" v-for="(item, key) in listaUsuarios" :key="key">
                <td class="cuerpoTable text-center">{{ item.name + " " + item.lastName1 + " " + item.lastName2 }}</td>
                <td class="cuerpoTable text-center">{{ item.roll }}</td>
                <td class="cuerpoTable text-center">{{ item.plazas }}</td>
                <td class="cuerpoTable text-center break-all">{{ item.mail }}</td>
                <td class="cuerpoTable">
                  <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                    <template slot="singleLabel" slot-scope="props">
                      <div class="inline-flex">
                        <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                        <span class="option__title bg-red-300">{{ props.option.title }}</span>
                      </div>
                    </template>
                    <template slot="option" slot-scope="props">                                                
                      <div class="option__desc "><span class="option__title inline-flex">
                        <img :src="props.option.img" class="mr-5" width="15" height="15">    
                        {{ props.option.title }}</span>
                      </div>
                    </template>
                  </multiselect> 
                  <!-- <button @click="editarUsuario(item)" class="botonIconActualizar">
                    <img src="@/assets/img/pencil.png" class="mr-2 sm:m-1" width="15" height="15"/>
                    <span class="text-xs sm:hidden">Editar</span>
                  </button>
                  <button v-if="typeUser" @click="borrar_usuario(item)" class="botonIconLimpiar m-2">
                    <img src="@/assets/img/bin.png" class="mr-2 sm:m-1" width="15" height="15"/>
                    <span class="text-xs sm:hidden">Borrar</span>
                  </button> -->
                </td>
            </tr>
          </table>
        </div>
      </div>
        <!--/////////////////////////////////////////////////////////////////////
        ////                     MODAL AGREGAR USUARIO                      ////
        ////////////////////////////////////////////////////////////////////-->
      <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-semibold text-md sm:text-md sm:text-center text-center">Agregar Usuario</p>
                    <div class="grid grid-cols-2 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-5">Nombre(s)</p>
                        <input v-model="objUsuarioNuevo.nombre" type="text" class="w-full bg-white border-gray-400 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Apellido Paterno</p>
                        <input v-model="objUsuarioNuevo.apellidoM" type="text" class="w-full bg-white border-gray-400 mt-2 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Apellido Materno</p>
                        <input v-model="objUsuarioNuevo.apellidoP" type="text" class="w-full bg-white border-gray-400 mt-2 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Constraseña</p>
                        <input v-model="objUsuarioNuevo.password" type="text" class="w-full bg-white border-gray-400 mt-2 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Tipo Usuario</p>
                        <select v-model="objUsuarioNuevo.tipoUsuario" class="w-full mt-2 sm:w-33 sm:-ml-4">
                          <option disabled value>Selecionar...</option>     
                          <option v-for="(item, key) in listaTiposUsuario" :key="key">{{ item.nombre }}</option>                                                                         
                        </select>
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Tramo</p>
                        <select v-model="tramoSeleccionado" class="w-full mt-2 sm:w-33 sm:-ml-4">
                          <option disabled value>Selecionar...</option>     
                          <option value="1">México Acapulco</option>     
                          <option value="2">México Irapuato</option>     
                        </select>
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plaza</p>                        
                        <multiselect 
                          v-model="objUsuarioNuevo.plazas"                                                                                                                                                             
                          :custom-label="label_multi_select"                          
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="listaPlazas"
                          track-by="squareCatalogId"
                          class=" shadow-md hover:border-gray-700 mt-2 sm:w-35 sm:-ml-5"
                          :multiple="true"
                        >   
                          <template slot="selection" slot-scope="{ values, search, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Plaza</span>
                          </template>   
                        </multiselect>
                    </div>
                    <div class="mt-5 text-center ml-6">
                        <button @click="guardar_nuevo_usuario" class="botonIconBuscar font-boton sm:-ml-24">Guardar</button>
                        <button @click="modalEditar = false" class="botonIconCancelar font-boton sm:-mr-20">Cancelar</button>
                    </div>
                </div>
      <div class="flex absolute justify-center inset-x-0 mt-24">
        <div v-if="modal" class="rounded-lg border border-gray-400 bg-white px-12 py-10 shadow-2xl">
          <div class="justify-end flex -mr-10 -mt-6">
            <button @click="limpiar_usuario">
              <img src="@/assets/img/close.png" class="mr-2" width="25" height="25" />
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
                <img src="@/assets/img/rehacer.png" class="mr-2" width="25" height="25"/>
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
                  <img src="@/assets/img/deshacer.png" class="mr-4" width="25" height="25"/>
                  <span class="text-xs mr-4">Regresar</span>
                </button>
              </div>
              <div class="flex justify-center mt-5 ml-10">
                <button @click="confirmar" class=" mt-4 botonIconBuscar font-boton">
                  <img src="@/assets/img/save.png" class="mr-5" width="25" height="25"/>
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
import HeaderGenerico from "@/components/Header/HeaderGenerico";
import Multiselect from "vue-multiselect";
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
      listaUsuarios: [],
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
      tramoSeleccionado: '',
      objUsuarioNuevo:{
        nombre: '',
        apellidoM: '',
        apellidoP: '',  
        password: '',      
        tipoUsuario: '',
        plazas: []
      },
      value:''
      
    };
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
  beforeMount: async function () {
    this.refrescar_usuarios()    
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
    refrescar_usuarios: function(){
      this.listaUsuarios = []
      this.lista_Usuarios_Filtrada = []
      let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
      let params = { Id: user.idUser, Square: user.numPlaza}
      this.$store.dispatch('Usuarios/Consulta_Users', params)
      setTimeout(() => {
        this.lista_Usuarios = this.$store.getters["Usuarios/getUsers"];   
        this.lista_Usuarios_Filtrada = this.lista_Usuarios
        this.listaUsuarios = this.lista_Usuarios_Filtrada
      },100)
    },
    borrar_usuario(item) {
      let User = { id: item.userId, square: ""};
      this.$store.dispatch("Usuarios/BorrarUser", User);
      this.refrescar_usuarios()
    },  
    guardar_nuevo_usuario(){            
      let tipoUsuario = this.listaTiposUsuario.find(item => item.nombre == this.objUsuarioNuevo.tipoUsuario).id
      this.objUsuarioNuevo.plazas      
      let objInsert = {
        name: this.objUsuarioNuevo.nombre,
        lastName1: this.objUsuarioNuevo.apellidoM,
        lastName2: this.objUsuarioNuevo.apellidoP,
        password: this.objUsuarioNuevo.password,
        rol: tipoUsuario,
      }                  
      this.$http.post(`${API}/User/Nuevo`,objInsert)
      .then((response) => {      
          this.$notify.success({
              title: "Ops!!",
              msg: "SE REGISTRO EL USUARIO NUEVO  .",
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              }
          })                        
          //userNuevoId = response.data.result.userId
          this.objUsuarioNuevo.plazas.forEach(plaza => {
            let plazaInsert = {
              userId: response.data.result.userId,
              squareCatalogId: plaza.squareCatalogId,
              clavePlaza: plaza.referenceSquare
            }
            this.$http.post(`${API}/User/AddSquareToUser`,plazaInsert)                        
          })
          setTimeout(() => {                  
                this.$notify.success({
                  title: "Ops!!",
                  msg: "SE ACTIVO CORRECTAMENTE EL USUARIO.",
                  position: "bottom right",
                  styles: {
                    height: 100,
                    width: 500,
                  },
                })
                this.modalEditar = false                
                this.refrescar_usuarios()                            
          },1000)
        })        
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
      if (newPalabra != "") {
        let array_filtrado = this.lista_Usuarios_Filtrada.filter(item => {
          return item.name.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName1.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName2.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.listaUsuarios = array_filtrado;
      }
      else{
        this.listaUsuarios = this.lista_Usuarios
      }
    },
    customLabel ({ title }) {
      return `${title}`
    },
    acciones_mapper(item){                
      if(this.value.title == 'Editar'){
          this.terminar_ficha_diagnostico(item)
      }
      if(this.value.title == 'Borrar'){
          this.terminar_dtc(item.referenceNumber, item.typeFaultId)
      }   
      this.value = ""  
    },
    opticones_select_acciones(){
      const options= [                
        { title: 'Editar', img: '/img/nuevoDtc.90090632.png' }, //0
        { title: 'Borrar', img: '/img/nuevoDtc.90090632.png' },
      ]
      let filtroOpciones = []
      //Diagnostico Descargar Siempre va
      filtroOpciones.push(options[0])
      if(this.typeUser){
          filtroOpciones.push(options[4])   
      }         
      return filtroOpciones
    }
  },
  computed: {
    listaTiposUsuario(){
      return this.$store.state.Login.tipoUsuario
    },
    listaPlazas(){            
      return this.$store.state.Login.listaPlazas.filter(plaza => plaza.delegationId == this.tramoSeleccionado)
    }
  }
};
</script>