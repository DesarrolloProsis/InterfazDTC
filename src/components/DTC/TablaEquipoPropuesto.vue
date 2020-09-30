<template>
  <div>
    <div class="flex justify-center sm:hidden">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full flex flex-col"
      >
        <!-- ************************************************************** -->
        <div class="text-center mb-2">
          <h6 class=" font-bold text-xl text-gray-800">Equipo Propuesto</h6>
        </div>
        <!-- ************************************************************** -->
        <div class="inline-flex">
          <table>
            <tr class="border text-sm bg-blue-800 text-white">
              <th class="w-20 border-2 border-gray-800">Partida</th>
              <th class="w-24 border-2 border-gray-800">Unidad</th>
              <th class="w-32 xl:w-48 border-2 border-gray-800">Componente</th>
              <th class="w-24 border-2 border-gray-800">Cantidad</th>
              <th class="w-24 xl:w-32 border-2 border-gray-800">Marca</th>
              <th class="w-24 xl:w-32 border-2 border-gray-800">Modelo</th>
              <th class="w-32 xl:w-48 border-2 border-gray-800">
                Precio
                <br />(Unitario Peso)
              </th>
              <th class="w-32 xl:w-48 border-2 border-gray-800">
                Precio
                <br />(Unitario Dolar)
              </th>
              <th class="w-32 xl:w-48 border-2 border-gray-800">
                Precio Total
                <br />(Pesos)
              </th>
              <th class="w-32 xl:w-40 border-2 border-gray-800">
                Precio Total
                <br />(Dolares)
              </th>
            </tr>
            <tr              
              class="hover:bg-blue-200 text-center text-xs h-12 xl:text-base"
              v-for="(equipo, index) in listaEquipo"
              :key="index"
            >
              <td class="border">{{ equipo.row1}}</td>
              <td class="border">{{ equipo.row2.toString() }}</td>
              <td class="border">{{ equipo.row3.description }}</td>
              <td class="border">{{ equipo.row4.toString() }}</td>
              <td class="border">{{ equipo.row5.toString() }}</td>
              <td class="border">
                <p v-for="(item, key) in equipo.row6" :key="key" class="text-sm">{{ item }}</p>
              </td>
              <td
                class="border"
              >$ {{ equipo.row14.toLocaleString('en-US') }}</td>
              <td class="border">{{ '-----' }}</td>
              <td
                class="border"
              >$ {{ (equipo.row14 * equipo.row4).toLocaleString('en-US') }}</td>
              <td class="border">{{ '-----' }}</td>
            </tr>
          </table>
          <div >
            <tr>
              <th>Diagnostico</th>
            </tr>
            <td>
              <textarea
                v-model="diagnostico"
                v-validate="'max:120'"
                class="appearance-none border border-black rounded-lg py-4 mt-5 xl:w-68 xl:ml-6"
                name="Diagnostico"
              />
              <p class="text-red-600 text-xs">{{ errors.first('Diagnostico') }}</p>
            </td>
          </div>
        </div>
        <div>
          <div class="flex mb-4" style="margin-top: 1vh">
            <div class="w-1/2 h-6 pl-4">
              <p class="inline">Total: {{ letraMoneda }}</p>
            </div>

            <div class="w-1/2 h-6 pl-20">
              <input
                v-model="sumatoria"
                disabled
                class="md:border border-black w-32"
                type="text"
                placeholder="$ 0.00"
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>

    <div class="md:hidden lg:hidden xl:hidden flex justify-center flex-col">
      <div :class="{ 'hidden': modal }">
        <div class="text-center mb-5">
          <h6 class>Equipo Propuesto</h6>
        </div>
        <div class="p-4">
          <table class=" table-fixed border-collapse">
            <tr class=" border-gray-800 bg-blue-800 text-white text-xs text-center">
              <th class="w-20 border-2 border-gray-800">Partida</th>
              <th class=" w-48 border-2 border-gray-800">Componente</th>
              <th class="w-48 border-2 border-gray-800">
                Precio Total
                <br />(Pesos)
              </th>
              <th class="w-40 border-2 border-gray-800">Accion</th>
            </tr>

            <tr
              class="hover:bg-blue-200 text-center text-xs"
              v-for="(equipo, index) in listaEquipo"
              :key="index"
            >
              <td class="border border-gray-800">{{ equipo.row1}}</td>
              <td class="border border-gray-800">{{ equipo.row3.description }}</td>
              <td class="border border-gray-800">$ {{ (equipo.row14 * equipo.row4).toLocaleString('en-US') }}</td>
              <td class="border border-gray-800">
                <button
                  v-on:click.stop.prevent="infoFull(index)"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-blue-700"
                >
                  <img src="../../assets/img/mas.png" class width="20" height="20" />
                </button>
              </td>
            </tr>
          </table>
        </div>

        <div>
          <div class="flex p-4">
            <div class="text-xs p-2">
              <p class="inline">Total: {{ letraMoneda | totalLinea }}</p>
            </div>

            <div class="p-2">
              <input v-model="sumatoria" disabled class="w-24" type="text" placeholder="$ 0.00" />
            </div>
          </div>
          <hr />
        </div>

        <div class="flex justify-center flex-col">
          <div>
            <textarea
              v-model="diagnostico"
              v-validate="'max:120'"
              placeholder="Dignostico"
              class="appearance-none block bg-grey-lighter container mx-auto text-grey-darkerr border-black rounded-lg mb-0 h-40 placeholder-gray-500 border"
              name="Diagnostico"
            />
          </div>
          <div class="text-center">
            <p class="text-red-600 text-xs">{{ errors.first('Diagnostico') }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col p-5" v-if="modal">
        <div class="text-xs text-center border border-gray-800 shadow-lg rounded-lg z-40">
          <div class="inline-flex m-2">
            <div class=" w-20 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Componete</p>
              <p>{{ infoRow.row3.description }}</p>
            </div>
            <div class="w-20 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Unidad</p>
              <p>{{ infoRow.row2 }}</p>
            </div>
            <div class="w-20 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Cantidad</p>
              <p class>{{ infoRow.row4 }}</p>
            </div>
          </div>

          <div class="inline-flex m-2">
            <div class="w-32 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Unitario Dolares</p>
              <p class="border-b-2">{{ '----------' }}</p>
            </div>
            <div class="w-32 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Total Dolares</p>
              <p class="border-b-2">{{ '----------' }}</p>
            </div>
          </div>

          <div class="inline-flex m-2">
            <div class="w-32 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Unitario Dolares</p>
              <p class="border-b-2">$ {{ (infoRow.row14).toLocaleString('en-US') }}</p>
            </div>
            <div class="w-32 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Total Pesos</p>
              <p class="border-b-2">$ {{ (infoRow.row14 * infoRow.row4).toLocaleString('en-US') }}</p>
            </div>
          </div>

          <div class="inline-flex m-2">
            <div class="w-32 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Marca</p>
              <p class="border-b-2" v-for="(item, id) in infoRow.row5" :key="id">{{ item }}</p>
            </div>
            <div class="w-32 m-1">
              <p class="mb-3 font-bold text-gray-800 border-4 border-blue-600">Modelo</p>
              <p class="border-b-2" v-for="(item, id) in infoRow.row6" :key="id">{{ item }}</p>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              v-on:click.stop.prevent="modal = false, infoRow = {}"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-red-700 mr-10 mb-5 mt-3"
            >
              <img src="../../assets/img/cerrar.png" class="mr-2 sm:m-1" width="15" height="15" />
              <span class="text-sm">Cerrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listaEquipo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      diagnostico: "",
      modal: false,
      infoRow: {},
    };
  },
  filters: {
    totalLinea: function (value) {
      return value.substr(0, 30);
    },
  },
  beforeMount: function () {
    this.diagnostico = this.$store.getters["Header/getDiagnostico"];
  },
  watch: {
    diagnostico: function (newValue) {
      this.$store.commit("Header/DIAGNOSTICO_MUTATION", newValue);
    },
  },
  methods: {
    infoFull: function (value) {
      this.modal = true;
      this.infoRow = Object.assign(this.listaEquipo[value]);
    },
  },
  computed: {
    multiplicacion: function () {
      let multi = 0;
      for (let i = 0; i < this.listaEquipo.length; i++) {
        multi += this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
      }
      return multi;
    },
    sumatoria: function () {
      let suma = 0;
      for (let i = 0; i < this.listaEquipo.length; i++) {
        let multi = this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
        suma += multi;
      }
      return "$ " + suma.toLocaleString("en-US");
    },
    letraMoneda: function () {
      let multi = 0;
      for (let i = 0; i < this.listaEquipo.length; i++) {
        multi += this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
      }

      if (multi > 0) {
        let MonedaLetra = NumeroALetras(multi, {
          plural: "PESOS",
          singular: "PESO",
          centPlural: "CENTAVOS",
          centSingular: "CENTAVO",
        });
        return MonedaLetra;
      } else
        return "--------------------------------------------------------------------------------------";
    },
  },
};

// Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
function Unidades(num) {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
  }

  return "";
} //Unidades()

function Decenas(num) {
  let decena = Math.floor(num / 10);
  let unidad = num - decena * 10;

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
} //Unidades()

function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0) return strSin + " Y " + Unidades(numUnidades);

  return strSin;
} //DecenasY()

function Centenas(num) {
  let centenas = Math.floor(num / 100);
  let decenas = num - centenas * 100;

  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
} //Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;

  let letras = "";

  if (cientos > 0)
    if (cientos > 1) letras = Centenas(cientos) + " " + strPlural;
    else letras = strSingular;

  if (resto > 0) letras += "";

  return letras;
} //Seccion()

function Miles(num) {
  let divisor = 1000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;

  let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  let strCentenas = Centenas(resto);

  if (strMiles == "") return strCentenas;

  return strMiles + " " + strCentenas;
} //Miles()

function Millones(num) {
  let divisor = 1000000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;

  let strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
  let strMiles = Miles(resto);

  if (strMillones == "") return strMiles;

  return strMillones + " " + strMiles;
} //Millones()

function NumeroALetras(num, currency) {
  currency = currency || {};
  let data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: Math.round(num * 100) - Math.floor(num) * 100,
    letrasCentavos: "",
    letrasMonedaPlural: currency.plural || "PESOS CHILENOS", //'PESOS', 'Dólares', 'Bolívares', 'etcs'
    letrasMonedaSingular: currency.singular || "PESO CHILENO", //'PESO', 'Dólar', 'Bolivar', 'etc'
    letrasMonedaCentavoPlural: currency.centPlural || "CHIQUI PESOS CHILENOS",
    letrasMonedaCentavoSingular: currency.centSingular || "CHIQUI PESO CHILENO",
  };

  if (data.centavos > 0) {
    data.letrasCentavos =
      "CON " +
      (function () {
        if (data.centavos == 1)
          return (
            Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular
          );
        else
          return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
      })();
  }

  if (data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaSingular +
      " " +
      data.letrasCentavos
    );
  else
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaPlural +
      " " +
      data.letrasCentavos
    );
}
</script>





