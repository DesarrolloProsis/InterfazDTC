<template>
  <div>
    <Nav></Nav>
    <div class=" max-w-6xl mx-auto flex-auto mt-3">
    <h1 class=" text-black text-center text-4xl">Inventario</h1>
    </div>
    <div class="border-black border-4 max-w-6xl mx-auto flex-auto h-40 mt-3">
      <div class="pt-8 mr-5 ml-1">
        <div class="flex flex-auto">
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Componente</p>
            </div>
            <div class="border-black border-2">
              <select class="w-64">
                <option disabled value>Selecionar...</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Ubicación</p>
            </div>
            <div class="border-black border-2">
              <select class="w-64">
                <option disabled value>Selecionar...</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Marca</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="text" placeholder="Marca">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Modelo</p>
            </div>
            <div class="border-black border-2">
          <input class=" w-64" type="text" placeholder="Modelo">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-black border-4 max-w-6xl mx-auto flex-auto h-40 mt-3">
      <div class="pt-8 mr-5 ml-1">
        <div class="flex flex-auto">
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Numero de Serie</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="text" placeholder="Numero de Serie">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Fecha de Instalacion</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="date">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Fecha Ultimo Mantenimiento</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="date">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Folio Ultimo Mantenimiento</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="text" placeholder="Folio Mantenimiento">
            </div>
          </div>
        </div>
      </div>            
    </div>

    <div class="border-black border-4 max-w-6xl mx-auto flex-auto h-40 mt-3">
      <div class="pt-8 mr-5 ml-1">
        <div class="flex flex-auto">
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>No. Inventario CAPUFE</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="text" placeholder="Numero Inventario Capufe">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>No. Inventario Prosis</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="date">
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Ubicacion</p>
            </div>
            <div class="border-black border-2">
                   <select class="w-64">
                <option disabled value>Selecionar...</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/4 ml-5">
            <div class="mb-8 border-blue-700 border-4 text-center h-8 bg-gray-300">
              <p>Observacion</p>
            </div>
            <div class="border-black border-2">
                <input class=" w-64" type="text" placeholder="Observaciones">
            </div>
          </div>
        </div>
      </div>            
    </div>

    <div class="max-w-6xl mx-auto flex-auto mt-5">

        <div class="flex justify-end">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-green-700">
                <img src="../assets/img/more.png" class="mr-2" width="25" height="2">
                <span>Agregar Componente</span>
            </button>
        </div>

    </div>
  </div>
</template>


<script>
import Nav from "../components/Navbar";

export default {
  data: function() {
    return {

        newComponente: {
            
        }

    };
  },
  components: {
    Nav
  }
};
</script>