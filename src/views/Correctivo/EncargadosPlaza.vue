<template>
    <div>
        <Nav></Nav>
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <HeaderGenerico @filtrar-encargados="filtrar_encargados" @limpiar-encargados="limpiar_encargados" :titulo="'Encargados de Plaza'" :tipo="'ENC'"></HeaderGenerico>
                <h1 class="text-4xl font-bold text-gray-800 text-center mb-8 hidden">Encargados de Plaza</h1>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24" style="height:690px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">
                                <th class="cabeceraTable">Nombre</th>
                                <th class="cabeceraTable sm:hidden">Correo</th>
                                <th class="cabeceraTable">Plaza</th>
                                <th class="cabeceraTable">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaencargadosFilrada" :key="key" 
                            :class="{'hidden' : item.statusAdmin != true}">
                                <td class="cuerpoTable">{{ `${item.name} ${item.lastName1} ${item.lastName2}` }}</td>
                                <td class="cuerpoTable sm:hidden">{{ item.mail }}</td>
                                <td class="cuerpoTable">{{ item.squareName }}</td>
                                <td class="cuerpoTable">
                                    <button
                                        class="botonIconActualizar" @click="editarUsuario(item)"
                                        >
                                        <img
                                            src="../../assets/img/pencil.png"
                                            class="mr-2 sm:m-1"
                                            width="15"
                                            height="15"
                                        />
                                        <span class="text-xs sm:hidden">Editar</span>
                                    </button>
                                    <button class="botonIconLimpiar" @click="confimaBorrar(item)">
                                        <img
                                            src="../../assets/img/bin.png"
                                            class="mr-2 sm:m-1"
                                            width="15"
                                            height="15"
                                        />
                                        <span class="text-xs sm:hidden">Borrar</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////
            ////                      MODAL ELIMINAR                         ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="">
                <div v-if="modalEliminar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Seguro que quiere eliminar a {{ `${infoDelate.name} ${infoDelate.lastName1} ${infoDelate.lastName2}` }}</p>
                    <div class="mt-5 text-center">
                        <button @click="borrar()" class="botonIconCrear">Si</button>
                        <button @click="modalEliminar = false" class="botonIconCancelar">No</button>
                    </div>
                </div>
            </div>
            <div class="">
                <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center text-center">Editar Encargado de Plaza</p>
                    <div class="grid grid-cols-2 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white border-gray-400" v-model="editUser.name">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Apellido Paterno</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white border-gray-400 border-gray-400 mt-2" v-model="editUser.lastName1">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Apellido Materno</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white border-gray-400 mt-2" v-model="editUser.lastName2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2">Plaza</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white border-gray-400 mt-2" v-model="editUser.plaza">
                    </div>
                    <div class="mt-5 text-center">
                        <button  class="botonIconBuscar">Guardar</button>
                        <button @click="modalEditar = false" class="botonIconCancelar">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
import Nav from "../../components/Navbar";
import CookiesService from '../../services/CookiesService'
import HeaderGenerico from "../../components/Header/HeaderGenerico";
import FiltrosServices from "../../services/FiltrosDTCServices";
import EventBus from "../../services/EventBus"
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "EncargadosDePlaza",
    components:{
        Nav,
        HeaderGenerico
    },
    data (){
        return{
            listaencargadosCompleta: [],
            listaencargadosFilrada:[],
            modalEliminar: false,
            modalEditar: false,
            boolBorrar: false,
            infoDelate:{},
            editUser:{
                userId:'',
                name:'',
                lastName1:'',
                lastName2:'',
                plaza:''
            },
            
        }
    },
    beforeMount: function (){
        Axios.get(`${API}/SquaresCatalog/Admins`, CookiesService.obtener_bearer_token())
        .then((response)=>{
            //console.log(response.data)
            this.listaencargadosCompleta = response.data.result
            this.listaencargadosFilrada = this.listaencargadosCompleta
        }).catch((Ex)=>{
            if(Ex.response.status == 401)
                CookiesService.token_no_autorizado()
        })
    },
    methods:{
        filtrar_encargados(value){
            //console.log(value)
            this.listaencargadosFilrada = FiltrosServices.filtro_encargados_plaza(this.listaencargadosCompleta, value.plaza, value.nombre)

        },
        limpiar_encargados(){
            this.listaencargadosFilrada = this.listaencargadosCompleta
            EventBus.$emit('Limpiar-SelectPlaza')
        },
        confimaBorrar (item) {
            this.infoDelate = item
            this.modalEliminar = true;           
        },
        borrar: function(){
            this.infoDelate.statusAdmin = false
            this.modalEliminar = false
            
        },
        editarUsuario (item) {
            this.editUser.userId = item.adminSquareId
            this.editUser.name = item.name
            this.editUser.lastName1 = item.lastName1
            this.editUser.lastName2 = item.lastName2
            this.editUser.plaza = item.squareName
            this.modalEditar = true;
        }
    },
}
</script>