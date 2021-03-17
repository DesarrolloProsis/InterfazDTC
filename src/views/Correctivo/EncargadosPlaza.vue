<template>
    <div>
        <Nav></Nav>
        <div :class="{'mb-69': typeUser != 1}" class="flex justify-center p-4">
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
                        <tr class="h-12 text-gray-900 text-sm sm:text-xs">
                            <td class="text-center border-2 border-gray-800"></td>
                            <td class="text-center border-2 border-gray-800"></td>
                            <td class="text-center border-2 border-gray-800 break-all"></td>
                            <td class="text-center border-2 border-gray-800">
                                <button
                                    @click="editarUsuario(item)"
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
                                <button class="botonIconLimpiar m-2">
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
        </div>
    </div>
</template>
<script>
import Nav from "../../components/Navbar";

export default {
    name: "EncargadosDePlaza",
    components:{
        Nav
    },
    data: function (){
        return{
            lista_encargados: []
        }
    },
}
</script>