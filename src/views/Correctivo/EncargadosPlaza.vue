<template>
    <div>
        <Nav></Nav>
        <div class="flex justify-center p-4">
            <div class="mt-5">
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">Encargados de Plaza</h1>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="overflow-x-auto bg-white rounded-lg sm:mb-16 shadow overflow-y-auto relative mb-32">
                    <table class="border-2 border-gray-800">
                        <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
                            <th class="w-64 border-2 border-gray-800">Nombre</th>
                            <th class="w-56 border-2 border-gray-800">Correo</th>
                            <th class="w-64 border-2 border-gray-800">Plaza</th>
                            <th class="w-48 border-2 border-gray-800">Acciones</th>
                        </tr>
                        <tr class="h-12 text-gray-900 text-sm sm:text-xs" v-for="(item, key) in lista_encargados" :key="key">
                            <td class="text-center border-2 border-gray-800">{{ `${item.name} ${item.lastName1} ${item.lastName2}` }}</td>
                            <td class="text-center border-2 border-gray-800">{{ item.mail }}</td>
                            <td class="text-center border-2 border-gray-800 break-all">{{ item.squareName }}</td>
                            <td class="text-center border-2 border-gray-800" >
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
                                <button class="botonIconLimpiar m-2" @click="confimaBorrar(item)">
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
                        <button class="botonIconCrear">Si</button>
                        <button @click="modalEliminar = false" class="botonIconCancelar">No</button>
                    </div>
                </div>
            </div>
            <div class="">
                <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center text-center">Editar Encargado de Plaza</p>
                    <div>
                        <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white" v-model="editUser.name">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-1">Apellido Paterno</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white" v-model="editUser.lastName1">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-1">Apellido Materno</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white" v-model="editUser.lastName2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-1">Plaza</p>
                        <input type="text" class="w-full bg-gray-300 focus:bg-white" v-model="editUser.plaza">
                    </div>
                    <div class="mt-5 text-center">
                        <button class="botonIconBuscar">Guardar</button>
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
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "EncargadosDePlaza",
    components:{
        Nav
    },
    data (){
        return{
            lista_encargados: [],
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
            }
        }
    },
    beforeMount: function (){
        Axios.get(`${API}/SquaresCatalog/Admins`, CookiesService.obtener_bearer_token())
        .then((response)=>{
            console.log(response.data)
            this.lista_encargados = response.data.result
        }).catch((Ex)=>{
            if(Ex.response.status == 401)
                CookiesService.token_no_autorizado()
        })
    },
    methods:{
        confimaBorrar (item) {
            this.infoDelate = item
            this.modalEliminar = true;
            
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