<template>
  <div>
    <div class="flex justify-center sm:hidden">
      <div class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full flex flex-col">
        <!-- ************************************************************** -->
        <div class="text-center mb-2">
          <h6 class="font-titulo font-bold text-xl text-gray-800">Equipo Propuesto</h6>
        </div>
        <!-- ************************************************************** -->
        <div class="inline-flex font-titulo">
          <div class="overflow-x-auto bg-white rounded-lg overflow-y-auto">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <thead>
              <tr class="border text-xs bg-blue-800 text-white">
                <th class="w-20 cabeceraTable font-medium">Partida</th>
                <th class="w-24 cabeceraTable font-medium">Unidad</th>
                <th class="w-32 xl:w-48 cabeceraTable font-medium">Componente</th>
                <th class="w-24 cabeceraTable font-medium">Cantidad</th>
                <th class="w-24 xl:w-32 cabeceraTable font-medium">Marca</th>
                <th class="w-24 xl:w-32 cabeceraTable font-medium">Modelo</th>
                <th class="w-32 xl:w-48 cabeceraTable font-medium">Precio<br />(Unitario Peso)</th>
                <th class="w-32 xl:w-48 cabeceraTable font-medium">Precio<br />(Unitario Dolar)</th>
                <th class="w-32 xl:w-48 cabeceraTable font-medium">Precio Total<br />(Pesos)</th>
                <th class="w-32 xl:w-40 cabeceraTable font-medium">Precio Total<br />(Dolares)</th>
              </tr>
            </thead>
            <tbody name="table" is="transition-group">  
              <tr class="hover:bg-blue-200 text-center text-xs h-12 xl:text-base" v-for="(equipo, index) in listaEquipo" :key="index">
                <td class="cuerpoTable">{{ equipo.row1}}</td>
                <td class="cuerpoTable">{{ equipo.row2.toString() }}</td>
                <td class="cuerpoTable">{{ equipo.row3.description }}</td>
                <td class="cuerpoTable">{{ equipo.row4.toString() }}</td>
                <td class="cuerpoTable">{{ equipo.marcaPropuesta.toString() }}</td>
                <td class="cuerpoTable">{{ equipo.modeloPropuesto.toString() }}</td>
                <td class="cuerpoTable">$ {{ equipo.row14.toLocaleString('en-US') }}</td>
                <td class="cuerpoTable">{{ '-----' }}</td>
                <td class="cuerpoTable">$ {{ (equipo.row14 * equipo.row4).toLocaleString('en-US') }}</td>
                <td class="cuerpoTable">{{ '-----' }}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <ValidationObserver ref="observer">  
            <div>
              <div class="sm:hidden md:hidden  lg:ml-34 w-6 absolute ml-55 ">
                <span class="" v-tooltip.top =" { ref:'tooltipcambiodeplaza', class: 'tooltip-custom tooltip-other-custom'}">
                    <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                </span>

                <div ref="tooltipcambiodeplaza" class="font-titulo">
                    <p class="text-center text-gray-800">Se debe indicar lo mismo que indica en el diagnostico de falla</p>
                </div>
              </div>             
              <tr>
                <th>Diagnostico</th>
              </tr>
              <td>  
                <ValidationProvider name="Diagnostico" rules="max:300"  v-slot="{ errors }">                                        
                  <textarea 
                    v-model="diagnostico"                  
                    class="appearance-none border border-gray-400 hover:border-gray-400 rounded-lg py-4 mt-5 xl:w-68 xl:ml-6 ph-center mb-1"
                    placeholder="Diagnostico de Equipo Dañado" 
                    name="Diagnostico" 
                    :maxlength="limite"
                  />
                  <span class="text-red-600 text-xs block">{{ errors[0] }}</span>                
                  <span class="text-gray-500 ml-48">{{ restante }}/300</span>                
                </ValidationProvider>
              </td>
            </div>
          </ValidationObserver>
        </div>
        <div>
          <div class="flex mb-4 font-titulo" style="margin-top: 1vh">
            <div class="w-1/2 h-6 pl-4">
              <p class="inline">Total: {{ letraMoneda }}</p>
            </div>
            <div class="w-1/2 h-6 pl-20">
              <input v-model="sumatoria" disabled class="border-none shadow-none w-32" type="text" placeholder="$ 0.00"/>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>

    <div class="md:hidden lg:hidden xl:hidden flex justify-center flex-col">
      <div :class="{ 'hidden': modal }">
        <div class="text-center mb-5">
          <h6 class="font-titulo font-bold">Equipo Propuesto</h6>
        </div>
        <div class="overflow-x bg-white rounded-lg shadow overflow-y-auto sm:text-xs sm:ml-4 sm:mr-4">
          <table class="border-collapse font-titulo">
            <tr class=" border-gray-800 bg-blue-800 text-white text-xs text-center">
              <th class="w-20 cabeceraTable font-medium">Partida</th>
              <th class="w-48 cabeceraTable font-medium">Componente</th>
              <th class="w-48 cabeceraTable font-medium">
                Precio Total
                <br />(Pesos)
              </th>
              <th class="w-40 cabeceraTable font-medium">Accion</th>
            </tr>
            <tr
              class="hover:bg-blue-200 text-center text-xs"
              v-for="(equipo, index) in listaEquipo"
              :key="index"
            >
              <td class="cuerpoTable">{{ equipo.row1}}</td>
              <td class="cuerpoTable">{{ equipo.row3.description }}</td>
              <td class="cuerpoTable">$ {{ (equipo.row14 * equipo.row4).toLocaleString('en-US') }}</td>
              <td class="cuerpoTable">
                <button
                  v-on:click.stop.prevent="infoFull(index)"
                  class="hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded-lg inline-flex items-center border-b-2 border-blue-700"
                >
                  <img src="../../assets/img/mas.png" class width="20" height="20" />
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <div class=" p-4 font-titulo flex">
            <div class="text-xs p-2">
              <p class="inline">Total: {{ letraMoneda | totalLinea }}</p>
            </div>
            <div class="p-2">
              <input v-model="sumatoria" disabled class="w-32 is_valid" type="text" placeholder="$ 0.00" />
            </div>
          </div>
          <hr />
        </div>
        <ValidationObserver ref="observer">  
          <div class="flex justify-center flex-col sm:mt-10">
            <div>
              <ValidationProvider name="Diagnostico" rules="max:300"  v-slot="{ errors }">            
                <textarea
                  v-model="diagnostico"                                    
                  placeholder="Dignostico"
                  class="appearance-none block bg-grey-400 container mx-auto text-grey-darkerr border-gray-400 rounded-lg mb-0 h-40 placeholder-gray-500 border"
                  name="Diagnostico"
                  :maxlength="limite"
                />
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="text-center">
              <span class="text-gray-500">{{ restante }}/300</span>              
            </div>
          </div>
        </ValidationObserver>
      </div>
      <!--////////////////////////////////////////////////////////////////////
      ////              MODAL INFORMACION CELULAR                        ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="p-5 font-titulo" v-if="modal">
        <div class="text-xs text-center border border-gray-400 shadow-lg rounded-lg z-40">
              <div class="flex justify-end">
                <button v-on:click.stop.prevent="(modal = false), (objectModal = {})" class="">
                  <img src="../../assets/img/close.png" class="mr-2 sm:m-1" width="25" height="25"/>
                  <span class="text-sm hidden">Cerrar</span>
                </button>
              </div>
          <div class="inline-flex m-2 mt-6">
            <div class=" w-20 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Componete</p>
              <p>{{ infoRow.row3.description }}</p>
            </div>
            <div class="w-20 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Unidad</p>
              <p>{{ infoRow.row2 }}</p>
            </div>
            <div class="w-20 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Cantidad</p>
              <p class>{{ infoRow.row4 }}</p>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="w-32 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Unitario Dolares</p>
              <p class="border-b-2">{{ '----------' }}</p>
            </div>
            <div class="w-32 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Total Dolares</p>
              <p class="border-b-2">{{ '----------' }}</p>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="w-32 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Unitario Dolares</p>
              <p class="border-b-2">$ {{ (infoRow.row14).toLocaleString('en-US') }}</p>
            </div>
            <div class="w-32 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Total Pesos</p>
              <p class="border-b-2">$ {{ (infoRow.row14 * infoRow.row4).toLocaleString('en-US') }}</p>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="w-32 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Marca</p>
              <p class="border-b-2" v-for="(item, id) in infoRow.row5" :key="id">{{ item }}</p>
            </div>
            <div class="w-32 m-1">
              <p class="mb-3 font-medium text-gray-800 border-b-2 border-blue-800 rounded-lg">Modelo</p>
              <p class="border-b-2" v-for="(item, id) in infoRow.row6" :key="id">{{ item }}</p>
            </div>
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
      limite:300
    };
  },
  filters: {
    totalLinea: function (value) {
      return value.substr(0, 30);
    },
  },
  beforeMount: function () {
    this.diagnostico = this.$store.state.Header.diagnostico
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
    restante(){
      return this.diagnostico.length
    },
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





