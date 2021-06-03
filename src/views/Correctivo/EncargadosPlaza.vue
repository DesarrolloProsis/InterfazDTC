<template>
    <div>        
        <div class="flex justify-center font-titulo">
            <div class="grid gap-4 grid-cols-1 py-3 px-3" >
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <HeaderGenerico @filtrar-encargados="filtrar_encargados" @buscar-encargado="guardar_palabra_busqueda" @limpiar-encargados="limpiar_encargados" :titulo="'Encargados de Plaza'" :tipo="'ENC'"></HeaderGenerico>
                <button @click="agregarUsuario()" class=" botonIconBuscar relative justify-center mb-6 -mt-4">
                    <img
                        src="../../assets/img/plus.png"
                        class="mr-2 sm:m-1"
                        width="20"
                        height="20"
                    />
                    <span class="">Agregar Nuevo Encargado</span>
                </button>
                <h1 class="text-4xl font-bold text-gray-800 text-center mb-8 hidden">Encargados de Plaza</h1>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="divtabla sm:mb-24 mb-10 -mt-8" style="height:550px;">
                    <table class="table">
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">
                                <th class="cabeceraTable font-medium">Nombre</th>
                                <th class="cabeceraTable font-medium sm:hidden">Correo</th>
                                <th class="cabeceraTable font-medium">Plaza</th>
                                <th class="cabeceraTable font-medium">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaEncargados" :key="key" 
                            :class="{'hidden' : item.statusAdmin != true}">
                                <td class="cuerpoTable">{{ `${item.name} ${item.lastName1} ${item.lastName2}` }}</td>
                                <td class="cuerpoTable sm:hidden">{{ item.mail }}</td>
                                <td class="cuerpoTable">{{ item.squareName }}</td>
                                <td class="cuerpoTable">
                                    <button class="botonIconActualizar" @click="editarUsuario(item)">
                                        <img src="../../assets/img/pencil.png" class="mr-2" width="15" height="15"/>
                                        <span class="text-xs sm:hidden">Editar</span>
                                    </button>
                                    <button class="botonIconLimpiar" @click="confimaBorrar(item)" v-if="rollId == 4 || rollId == 7 || rollId == 10">
                                        <img src="../../assets/img/bin.png" class="mr-2 sm:m-1" width="15" height="15"/>
                                        <span class="text-xs sm:hidden">Borrar</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--////////////////////////////////////////////////////////////////////
            ////                      MODAL AGREGAR                            ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="mt-10">
                <div v-if="modalAgregar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-bold text-2xl mb-8 sm:text-sm sm:text-center text-center">Agregar Encargado de Plaza</p>
                    <div class="grid grid-cols-2 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Nombre(s)</p>
                        <input type="text" class="w-full bg-white border-gray-400" v-model="insertAdmin.nombre">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Apellido Paterno</p>
                        <input type="text" class="w-full bg-white border-gray-400 mt-2" v-model="insertAdmin.apellidoP" >
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Apellido Materno</p>
                        <input type="text" class="w-full bg-white border-gray-400 mt-2" v-model="insertAdmin.apellidoM">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Plaza</p>
                        <div class="sm:-ml-20"><SelectPlaza :forma="'encargado'" class="mt-2"></SelectPlaza></div>
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Correo</p>
                        <input type="text" class="w-full bg-white border-gray-400 mt-2 sm:-ml-20 sm:w-48" v-model="insertAdmin.mail">
                    </div>
                    <div class="mt-5 text-center ml-6">
                        <button @click="confirmarAgregar()" class="botonIconBuscar font-boton sm:-ml-24">Guardar</button>
                        <button @click="modalAgregar = false" class="botonIconCancelar font-boton sm:-mr-20">Cancelar</button>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////
            ////                      MODAL ELIMINAR                         ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="mt-10">
                <div v-if="modalEliminar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Seguro que quiere eliminar a: <p class="text-center font-bold">{{ `${infoDelate.name} ${infoDelate.lastName1} ${infoDelate.lastName2}` }}</p>
                    <div class="mt-5 text-center">
                        <button @click="borrar()" class="botonIconCrear font-boton">Si</button>
                        <button @click="modalEliminar = false" class="botonIconCancelar font-boton">No</button>
                    </div>
                </div>
            </div>
            <!--////////////////////////////////////////////////////////////////////
            ////                      MODAL EDITAR                         ////////
            ////////////////////////////////////////////////////////////////////-->
            <div class="mt-10">
                <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-bold text-md sm:text-sm sm:mb-6 sm:text-center text-center">Editar Encargado de Plaza</p>
                    <div class="grid grid-cols-2 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Nombre(s)</p>
                        <input type="text" class="w-full bg-white border-gray-400 is_valid" v-model="editUser.name">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6 ">Apellido Paterno</p>
                        <input type="text" class="w-full bg-white border-gray-400 mt-2 is_valid" v-model="editUser.lastName1">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Apellido Materno</p>
                        <input type="text" class="w-full bg-white border-gray-400 mt-2 is_valid" v-model="editUser.lastName2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Correo</p>
                        <input type="text" class="w-full bg-white border-gray-400 mt-2 is_valid sm:w-48 sm:-ml-20" v-model="editUser.mail">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-6">Plaza</p>
                        <!--<SelectPlaza :forma="'encargado'" :tipo="'edicion'" class="mt-2"></SelectPlaza>-->
                        <input type="text" class="w-full bg-white hover:bg-white hover:border-none focus:bg-white border-none shadow-none mt-2" v-model="editUser.plaza" readonly>
                    </div>
                    <div class="mt-5 text-center ml-6">
                        <button @click="actualizarUsuario" class="botonIconBuscar font-boton sm:-ml-24">Guardar</button>
                        <button @click="modalEditar = false" class="botonIconCancelar font-boton sm:-mr-20">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CookiesService from '../../services/CookiesService'
import HeaderGenerico from "../../components/Header/HeaderGenerico";
import FiltrosServices from "../../services/FiltrosDTCServices";
import EventBus from "../../services/EventBus"
import SelectPlaza from '../../components/Header/SelectPlaza';
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "EncargadosDePlaza",
    components:{        
        HeaderGenerico,
        SelectPlaza,

    },
    data (){
        return{
            listaencargadosCompleta: [],
            listaencargadosFilrada:[],
            listaEncargados:[],
            modalEliminar: false,
            modalEditar: false,
            modalAgregar: false,
            infoDelate:{},
            editUser:{
                userId:'',
                name:'',
                lastName1:'',
                lastName2:'',
                plaza:'',
                plazaId: '',
                mail:'',
            },
            insertAdmin:{
                nombre:'',
                apellidoP:'',
                apellidoM:'',
                mail:'',
                status: true
            },
            rollId: this.$store.state.Login.cookiesUser.rollId
        }
    },
    beforeMount: function (){
        this.typeUser = this.$store.state.Login.cookiesUser.rollId        
        this.$http.get(`${API}/SquaresCatalog/Admins/${this.$store.state.Login.cookiesUser.userId}`)
        .then((response)=>{
            this.listaencargadosCompleta = response.data.result
            this.listaencargadosFilrada = this.listaencargadosCompleta
            this.listaEncargados = this.listaencargadosFilrada
        })
    },
    methods:{
        actualizarFiltro(){
            this.$http.get(`${API}/SquaresCatalog/Admins/${this.$store.state.Login.cookiesUser.userId}`)
                .then((response)=>{                                        
                    this.listaencargadosCompleta = response.data.result
                    this.listaencargadosFilrada = this.listaencargadosCompleta
                    this.listaEncargados = this.listaencargadosFilrada
                })
        },
        filtrar_encargados(value){
            this.listaEncargados = FiltrosServices.filtro_encargados_plaza(this.listaencargadosCompleta, value.plaza, value.nombre)
        },
        limpiar_encargados(){
            this.listaEncargados = this.listaencargadosCompleta
            EventBus.$emit('Limpiar-SelectPlaza')
        },
        agregarUsuario (){
            this.modalAgregar = true
            this.insertAdmin.nombre = ''
            this.insertAdmin.apellidoP = ''
            this.insertAdmin.apellidoM = ''
            this.insertAdmin.mail = ''
        },
        confirmarAgregar (){
            let valueAdmin = Object.values(this.insertAdmin)
            if (valueAdmin.some(item => item == '')){
                this.$notify.warning({
                    title: "Ups!",
                    msg: `NO SE HA LLEADO ALGUNO DE LOS CAMPOS`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
            }else{
                this.modalAgregar = false
                this.insertAdmin['plaza']= this.$store.state.Login.plazaSelecionada.numeroPlaza                             
                this.$http.post(`${API}/SquaresCatalog/InsertAdmin`, this.insertAdmin)
                .then(() => {                    
                    this.actualziar_header_plazas()
                    this.actualizarFiltro()
                })
            }
        },
        actualziar_header_plazas(){
            let userId = this.$store.state.Login.cookiesUser.userId            
            //plazas 
            this.$http.post(`${API}/login/Cookie`, { userId: userId })
            .then((response) => {                     
                let plazasUsuario =  response.data.result.cookie.map(item => {        
                    return {
                        refereciaPlaza: item.referenceSquare,
                        administradorId: item.adminSquareId,
                        numeroPlaza: item.squareCatalogId,
                        plazaNombre: item.squareName,
                        plazaAdminNombre: item.plazaAdministrador,
                        statusAdmin: item.statusAdmin
                    }
                })  
                this.$store.commit('Login/LISTA_PLAZAS_USUARIO_COOKIES_MUTATION',plazasUsuario)
                //Header Lista LArga 
                this.$http.post(`${API}/login/LoginInfo`, { userId: userId })
                .then((response) => {                    
                    this.$store.commit('Login/LISTA_HEADER_PLAZA_USER_MUTATION',response.data.result.loginList)
                    this.$store.commit('Header/LISTA_HEADERS_MUTATION', response.data.result.loginList)      
                    let cookiesUser = this.$store.state.Login.cookiesUser
                    localStorage.setItem('cookiesUser', JSON.stringify(cookiesUser))              
                })               
            })           
        },
        confimaBorrar (item) {
            this.infoDelate = item            
            this.modalEliminar = true;           
        },
        borrar (){
            this.modalEliminar = false
            let objStatusUpdate = {
                status: false,
                adminId: this.infoDelate.adminSquareId} 
                this.$http.put(`${API}/SquaresCatalog/UpdateAdminStatus`, objStatusUpdate)
                .then(() => {                    
                    this.actualziar_header_plazas()
                    this.actualizarFiltro()
                }) 
        },
        editarUsuario (item) {            
            CookiesService.actualizar_plaza(item.adminSquareId)
            this.editUser.userId = item.adminSquareId
            this.editUser.name = item.name
            this.editUser.lastName1 = item.lastName1
            this.editUser.lastName2 = item.lastName2
            this.editUser.plaza = item.squareName
            this.editUser.plazaId = item.squareCatalogId
            this.editUser.mail = item.mail,            
            this.modalEditar = true;                              
        },
        actualizarUsuario (){
            let valueEdit = Object.values(this.editUser)            
            if (valueEdit.some(item => item == '')){
                this.$notify.warning({
                    title: "Ups!",
                    msg: `NO SE HA LLEADO ALGUNO DE LOS CAMPOS`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
            }else{
                let objUpdateAdmin = {
                    nombre: this.editUser.name, 
                    apellidoP: this.editUser.lastName1, 
                    apellidoM: this.editUser.lastName2, 
                    mail: this.editUser.mail, 
                    plaza: this.editUser.plazaId, 
                    adminId: this.editUser.userId}                              
                this.$http.put(`${API}/SquaresCatalog/UpdateAdmin`,objUpdateAdmin)
                .then(() => {                    
                    this.actualizarFiltro()
                    this.actualziar_header_plazas()                    
                })
                this.modalEditar = false
            } 
        },
        guardar_palabra_busqueda: function(newPalabra){             
        if (newPalabra != "") {
            let array_filtrado = this.listaencargadosFilrada.filter(item => {
                return item.name.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName1.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName2.toUpperCase().includes(newPalabra.toUpperCase())
            })       
            this.listaEncargados = array_filtrado;
        }
        else{
            this.listaEncargados = this.listaencargadosCompleta
        }
    }
    },
}
</script>