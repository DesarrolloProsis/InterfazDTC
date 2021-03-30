<template>
    <div>
        <Nav></Nav>
        <div class="flex justify-center p-4">
            <div class="mt-5">
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <HeaderGenerico :titulo="'Encargados de Plaza'" :tipo="'ENC'"></HeaderGenerico>
                <h1 class="text-4xl font-bold text-gray-800 text-center mb-8 hidden">Encargados de Plaza</h1>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="overflow-x-auto bg-white rounded-lg sm:mb-16 shadow overflow-y-auto relative mb-32">
                    <table class="border-2 border-gray-800">
                        <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
                            <th class="w-64 border-2 border-gray-800">Nombre</th>
                            <th class="w-56 border-2 border-gray-800">Correo</th>
                            <th class="w-64 border-2 border-gray-800">Plaza</th>
                            <th class="w-48 border-2 border-gray-800 hidden">Acciones</th>
                        </tr>
                        <tr class="h-12 text-gray-900 text-sm sm:text-xs" v-for="(item, key) in lista_encargados" :key="key">
                            <td class="text-center border-2 border-gray-800">{{ `${item.name} ${item.lastName1} ${item.lastName2}` }}</td>
                            <td class="text-center border-2 border-gray-800">{{ item.mail }}</td>
                            <td class="text-center border-2 border-gray-800 break-all">{{ item.squareName }}</td>
                            <td class="text-center border-2 border-gray-800 hidden">
                                <button
                                    class="botonIconActualizar"
                                    >
                                    <img
                                        src="../../assets/img/pencil.png"
                                        class="mr-2 sm:m-1"
                                        width="15"
                                        height="15"
                                    />
                                    <span class="text-xs sm:hidden">Editar</span>
                                </button>
                                <button class="botonIconLimpiar m-2" @click="confimaBorrar()">
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
            <div class="absolute">
                <div v-if="modalEliminar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-700 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl">
                    <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Seguro que quiere eliminar al encargado de plaza?</p>
                    <div class="mt-5 text-center">
                        <button class="botonIconCrear">Si</button>
                        <button @click="modalEliminar = false" class="botonIconCancelar">No</button>
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
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "EncargadosDePlaza",
    components:{
        Nav,
        HeaderGenerico
    },
    data (){
        return{
            lista_encargados: [],
            modalEliminar: false,
        }
    },
    beforeMount: function (){
        Axios.get(`${API}/SquaresCatalog/Admins`, CookiesService.obtener_bearer_token())
        .then((response)=>{
            CookiesService.refrescar_bearer_token()            
            this.lista_encargados = response.data.result
        }).catch((Ex)=>{
            if(Ex.response.status == 401)
                CookiesService.token_no_autorizado()
        })
    },
    methods:{
        confimaBorrar: function () {
            this.modalEliminar = true;
        },
    },
}
</script>