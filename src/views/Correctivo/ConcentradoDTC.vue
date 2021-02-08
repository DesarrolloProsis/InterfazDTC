<template>
<div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3">                
            <h1 class="text-black text-center text-4xl mt-3 mb-10 sm:mb-1">Concentrado DTC</h1>
        <!--/////////////////////////////////////////////////////////////////
        ////                     BOTONES NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-5 flex justify-between sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md">
            <div class="inline-flex mt-2 sm:text-xs sm:ml-3 m-6">

            </div>
          <!-- <div class="sm:mt-1 sm:mb-4 sm:ml-4 sm:text-xs mt-5 mr-5 sm:inline-flex">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 mr-3"       >
              <span class="text-xs">Cancelar</span>
            </button>
            <button>
              <span class="text-xs">Guardar</span>
            </button>
            <span class="ml-5 text-gray-800"></span>
          </div> -->
        </div>

        <div class="overflow-x-auto sm:m-2 sm:text-xs">
            <table class="border-2 border-gray-800 table-fixed">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
                <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                    <th class="w-56 border-2 border-gray-800">Referencia</th>
                    <th class="w-56 border-2 border-gray-800">Fecha de SIniestro</th>
                    <th class="w-56 border-2 border-gray-800">Registro en Sistema</th>
                    <th class="w-32 border-2 border-gray-800">Acciones</th>
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody>
                <tr class="h-12 text-gray-900 text-sm">                
                <td class="text-center border-2 border-gray-800"></td>
                <td class="text-center border-2 border-gray-800"></td>
                <td class="text-center border-2 border-gray-800"></td>
                <td class="text-center border-2 border-gray-800">
                <button
                    @click="Mostrar_Mas()"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700">
                    <img src="../../assets/img/more.png" class="mr-2 sm:m-0" width="15" height="15" />
                    <span class="text-xs sm:hidden">Más</span>
                </button>
                </td>
                </tr>
            </tbody>
        </table>
        </div>              
        </div>
    </div>  
    </div>
</template>

<script>
import Nav from "../../components/Navbar";

export default {
  name: "EditarComponente",
  components: {
    Nav,
  },
  methods:{
    Mostrar_Mas: function (){
        console.log("Mostar Más")
        this.$router.push({
        path: "/ConcentradoDetallesDTC"
        });
    }
}
};

</script>

<style>

</style>