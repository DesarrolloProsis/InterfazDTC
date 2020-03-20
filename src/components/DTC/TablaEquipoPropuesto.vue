<template>
  <div class="m-0 bg-white">
    <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
      >    
        <!-- ************************************************************** -->
        <br />
        <div class="divtitle2">
          <h6 class="title2" style="font-size: 1.3rem">Equipo Propuesto</h6>
        </div>
        <br />

        <!-- ************************************************************** -->
        <div class="lastContainer">
          <table class style="width:71%">
            <tr>
              <th>Partida</th>
              <th>Unidad</th>
              <th>Componente</th>
              <th>Cantidad</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>
                Precio
                <br />(Unitario Peso)
              </th>
              <th>
                Precio
                <br />(Unitario Dolar)
              </th>
              <th>
                Precio Total
                <br />(Pesos)
              </th>
              <th>
                Precio Total
                <br />(Dolares)
              </th>
            </tr>

            <tr
              @change="suma()"
              style="text-align: center"
              class="hover:bg-blue-200 text-center"
              v-for="(equipo, index) in listaEquipo"
              :key="index"
            >
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row1}}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row2 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row3 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row4 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row5 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row6 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row14 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row4 * equipo.row14 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
            </tr>
          </table>
              <div class="divDescription" style="width: 20%">
      <tr>
        <th>Descripcion</th>
      </tr>
      <td>
        <textarea
          v-model="descripcion"
          class="appearance-none block width-64 bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0"
          style="width: 20vw;"
          id="grid-last-name"
        />
      </td>
    </div>

        </div>
           <div>
            <div class="flex mb-4">
              <div class="w-1/6 h-6 pl-4">
                <span class="relleno">Total M.N.</span>
              </div>
              <div class="w-1/3 h-6">
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 26vw;"
                  placeholder="(Treinta y Cinco Mil ciento Sesenta y Nueve Pesos 17/100 M.N.)"
                />

              </div>
              <div class="w-1/6 h-6 pl-40">
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 7vw;"
                  placeholder="$ 0.00"
                />
              </div>
              <div class="w-1/6 h-6 pl-3">
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 7vw;"
                  placeholder="$ 0.00"
                />
              </div>
              <div class="w-1/6 h-6"></div>
              <div class="w-1/6 h-6"></div>
            </div>
            <hr />
          </div>
      </div>      
    </form>
  </div>
</template>

<script>
export default {

    props:{

        listaEquipo: {
            type: Array,
            default: () => []
        },

    },
    data(){
        return{

        }
    },
}
</script>



<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 2vw;
  border: 2px solid black;
}

.divtitle {
  margin: 0 auto;
}

.divtitle2 {
  margin: 0 auto;
}

.title2 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20%;
  margin-top: 30%;
  font-size: 1.2vw;
  border: 2px solid black;
}

.imgRefNum {
  display: grid;
  grid-template-columns: 20% 80%;
}

.input {
  text-align: end;
  padding-top: 5vh;
}

.fecha {
  width: 12.1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
}

.grid-container3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
  padding-left: 3vw;
}

label {
  font-weight: bold;
  color: black;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}

.grid-container2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -4vh;
  overflow: hidden;
}

.staticLabel {
  font-weight: normal;
}

.lastContainer {
  display: flex;
  flex-direction: row;
}

.divDescription {
  display: inline-block;
  padding-left: 2vw;
  width: 10vw;
}

.divLastTable {
  display: inline-block;
  padding-bottom: 1vh;
}

.inputDesc {
  height: 10vh;
  width: 18vw;
}

.divLastTable {
  border-spacing: 10px;
  border-collapse: separate;
  display: inline-block;
}

.relleno {
  display: inline-block;
}

@media (max-width: 750px) {
  .grid-container {
    margin-bottom: 0;
  }
  .grid-container2 {
    margin-bottom: 0;
  }
}
</style>


