<template>
  <div>
    <div class="flex w-auto justify-center sm:hidden" v-if="typeCel">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full flex flex-col"
      >
        <!-- ************************************************************** -->
        <div class="text-center mb-2">
          <h6 class="font-bold text-xl text-gray-800">Equipo Propuesto</h6>
        </div>
        <!-- ************************************************************** -->
        <div class="inline-flex">
          <table>
            <tr class="border text-sm bg-blue-800 text-gray-400 font-normal"> 
              <th class="w-20 border-2 border-gray-800">Partida</th>
              <th class="w-24 border-2 border-gray-800">Unidad</th>
              <th class="w-32 border-2 border-gray-800">Componente</th>
              <th class="w-24 border-2 border-gray-800">Cantidad</th>
              <th class="w-24 border-2 border-gray-800 xl:w-32">Marca</th>
              <th class="w-24 border-2 border-gray-800 xl:w-32">Modelo</th>
              <th class="w-32 border-2 border-gray-800 xl:w-40">
                Precio
                <br />(Unitario Peso)
              </th>
              <th class="w-32 border-2 border-gray-800 xl:w-40">
                Precio
                <br />(Unitario Dolar)
              </th>
              <th class="w-32 border-2 border-gray-800 xl:w-40">
                Precio Total
                <br />(Pesos)
              </th>
              <th class="w-32 border-2 border-gray-800 xl:w-40">
                Precio Total
                <br />(Dolares)
              </th>
              <th class="border-2 border-gray-800"></th>
            </tr>
            <tr
              class="hover:bg-blue-200 text-center"
              v-for="(equipo, index) in listaEquipo"
              :key="index"
            >
              <td class="border border-gray-800">{{ equipo.partida }}</td>
              <td class="border border-gray-800">{{ equipo.unidad }}</td>
              <td class="border border-gray-800">{{ equipo.componente }}</td>
              <td class="border border-gray-800">{{ equipo.cantidad }}</td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUpPropuesto">
                  <textarea
                    v-validate="'required'"
                    v-model="marca"
                    class="w-20"
                    name="marca"
                    type="text"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in infoRow[index].marca.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUpPropuesto">
                  <textarea
                    v-validate="'required'"
                    v-model="modelo"
                    class="w-20"
                    name="modelo"
                    type="text"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in infoRow[index].modelo.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUpPropuesto">
                  <textarea
                    v-validate="'required|numeric'"
                    v-model="precioUnitario"
                    class="w-20"
                    type="text"
                    name="precioUnitario"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in infoRow[index].precioUnitario.split(
                      `\n`
                    )"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">{{ "-----" }}</td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUpPropuesto">
                  <textarea
                    v-validate="'required|numeric'"
                    v-model="precioTotal"
                    :disabled="!equipo.rowUpPropuesto"
                    class="w-20"
                    name="precioTotal"
                    type="text"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in infoRow[index].precioTotal.split(
                      `\n`
                    )"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">{{ "-----" }}</td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUpPropuesto">
                  <button
                    @click="aceptar(index, equipo)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
                  >
                    <img
                      src="../../../assets/img/bin.png"
                      class="mr-2 sm:m-1"
                      width="20"
                      height="20"
                    />
                    <span>Aceptar</span>
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="cancelar(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-1 px-3 rounded inline-flex items-center border-2 border-yellow-500 m-2"
                  >
                    <img
                      src="../../../assets/img/pencil.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Editar</span>
                  </button>
                </template>
              </td>
            </tr>
          </table>
          <div>
            <tr>
              <th class="font-bold text-xl text-gray-800">Diagnostico</th>
            </tr>
            <td>
              <textarea
                v-model="diagnostico"
                v-validate="'max:120'"
                class="appearance-none border border-black rounded-lg h-20 mt-3 ml-3 w-64 xl:w-68"                
                name="Diagnostico"
              />
              <p class="text-red-600 text-xs">
                {{ errors.first("Diagnostico") }}
              </p>
            </td>
          </div>
        </div>
        <div>
          <div class="flex mb-4" style="margin-top: 1vh">
            <div class="w-1/2 h-6 pl-4">
              <p class="inline">Total: {{ letraMoneda }}</p>
            </div>

            <div class="w-1/2 h-6 pl-16">
              <input
                v-model="sumatoria"
                class="md:border border-black w-40"
                type="text"
                placeholder="$ 0.00"
              />
            </div>
          </div>
          <p class="text-red-600 text-xs text-center">
            {{ errors.first("precioTotal") }}
          </p>
          <p class="text-red-600 text-xs text-center">
            {{ errors.first("precioUnitario") }}
          </p>
          <hr />
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-center md:hidden lg:hidden xl:hidden">
      <div class="p-4" :class="{ hidden: modal }">
        <div class="text-center mb-5">
          <h6 class="font-bold text-xl text-gray-800">Equipo Propuesto</h6>
        </div>
        <table class="border-collapse">
          <!--/////////////////////////////////////////////////////////////////
              ////                 CABECERA DE LA TABLA                       ////
          ////////////////////////////////////////////////////////////////////-->
          <thead>
            <tr class="border text-xs h-10 bg-blue-800 text-gray-400 font-normal bg-blue-800">
              <th class="w-20 border-2 border-gray-800">Partida</th>
              <th class="w-48 border-2 border-gray-800 text-red-600">Componente</th>
              <th class="w-48 border-2 border-gray-800 text-red-600">Precio Total</th>
              <th class="w-48 border-2 border-gray-800">Acciones</th>
            </tr>
          </thead>
          <!--/////////////////////////////////////////////////////////////////
              ////                 CUERPO DE LA TABLA                          ////
          ////////////////////////////////////////////////////////////////////-->
          <tbody>
            <!--/////////////////////////////////////////////////////////////////
                ////           FOOTER DE LA TABLA + PARTIDA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <tr class="text-center" v-for="(item, key) in infoRow" :key="key">
              <td class="border-2 border-gray-800">{{ item.partida }}</td>
              <td class="border-2 border-gray-800">{{ item.componente }}</td>
              <td class="border-2 border-gray-800">{{ item.precioTotal }}</td>
              <td class="border-2 border-gray-800">
                <button
                  v-on:click.stop.prevent="editar_cel(key)"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-yellow-500 m-2"
                >
                  <img
                    src="../../../assets/img/pencil.png"
                    class
                    width="10"
                    height="10"
                  />
                  <span class="text-sm">Editar</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class=" mt-10 pl-2 pr-2">
          <div class="flex">
            <div class="h- ml-1 mt-2">
              <p class="inline mt-2">Total: {{ letraMonedaCel }}</p>
            </div>

            <div class="h-6 ml-20 mt-2">
              <input
                v-model="sumatoria"
                class="md:border w-32 border-black"
                type="text"
                placeholder="$ 0.00"
              />
            </div>
          </div>
        </div>
        <div class="mt-6">
          <h1 class="font-bold text-xl text-center text-gray-800">Diagnostico</h1>
            <textarea
                v-model="diagnostico"
                v-validate="'max:120'"
                class="appearance-none border border-black rounded-lg h-20 mt-3 ml-1 w-66"                
                name="Diagnostico"
              />
              <p class="text-red-600 text-xs">
                {{ errors.first("Diagnostico") }}
              </p>
        </div>
      </div>

      <div class="flex flex-col p-5" v-if="modal">
        <div
          class="text-xs text-center border border-gray-800 shadow-lg rounded-lg z-40 h-72 p-2"
        >
          <h1 class="text-lg">Equipo Propuesto</h1>
          <div class="inline-flex m-2">
            <div class="m-1 mr-10">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Componente:
              </p>
              <h1>{{ info_confirmar.componente }}</h1>
            </div>
            <div class="m-1 mr-10">
              <p class="text-md mb-1 font-semibold text-gray-900">Unidad:</p>
              <h1>{{ info_confirmar.unidad }}</h1>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Cantidad:</p>
              <h1>{{ info_confirmar.cantidad }}</h1>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Marca:</p>
              <textarea
                v-validate="'required'"
                v-model="marca"
                class="w-full"
                type="text"
              ></textarea>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Modelo:</p>
              <textarea
                v-validate="'required'"
                v-model="modelo"
                class="w-full"
                type="text"
              ></textarea>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="m-1 mr-8">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Precio Unitario:
              </p>
              <input
                v-validate="'required|numeric'"
                v-model="precioUnitario"
                class="w-full"
                type="text /"
              />
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Precio Unitario Dolar:
              </p>
              <h1>--------</h1>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="m-1 mr-10">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Precio Total Unitario:
              </p>
              <input
                v-validate="'required|numeric'"
                v-model="precioTotal"
                class="w-full"
                type="text"
              />
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Precio Total Dolar:
              </p>
              <h1>--------</h1>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="aceptar_cel"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
            >
              <img
                src="../../../assets/img/more.png"
                class="mr-2 sm:m-1"
                width="15"
                height="15"
              />
              <span class="text-sm">Aceptar</span>
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>

  </div>
</template>

<script>
import EventBus from "../../../services/EventBus.js";

export default {
  props: {
    listaEquipo: {
      type: Array,
      default: () => [],
    },
    typeCel: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      diagnostico: "",
      modal: false,
      marca: "",
      modelo: "",
      precioUnitario: "",
      precioTotal: "",
      infoRow: [],
      info_confirmar: {},
      index_editar: "",
      bool_editar: false,
    };
  },
  filters: {
    // totalLinea: function (value) {
    //   return value.substr(0, 30);
    // },
  },
  created: function () {
    EventBus.$on("nuevo_componente", (value) => {
      this.info_confirmar = this.listaEquipo.find(
        (item) => item.partida == value
      );
      this.modal = true;
    });
    EventBus.$on("editar_componente", (value) => {
      console.log(value);

      this.infoRow[value.index].partida = value.data.partida;
      this.infoRow[value.index].unidad = value.data.unidad;
      this.infoRow[value.index].componente = value.data.componente;
      this.infoRow[value.index].cantidad = value.data.cantidad;
    });
  },
  beforeMount: function () {
    this.diagnostico = this.$store.getters["Header/getDiagnostico"];

    let componetesEdit = this.$store.getters["DTC/getcomponentesEdit"];

    if (JSON.stringify(componetesEdit) != "{}") {
      console.log(componetesEdit);

      for (let item of componetesEdit.proposedComponents) {
        let newPartida = {
          partida: item.item,
          unidad: item.unity,
          componente: item.component,
          cantidad: item.quantity,
          marca: item.brand,
          modelo: item.model,
          precioUnitario: item.unitaryPrice,
          precioTotal: item.totalPrice,
        };
        this.infoRow.push(newPartida);
      }
    }
  },
  watch: {
    diagnostico: function (newValue) {
      this.$store.commit("Header/DIAGNOSTICO_MUTATION", newValue);
    },

    infoRow: {
      deep: true,
      handler(newValue) {
        this.$store.commit("DTC/LISTA_PROPUESTO_LIBRE_EDIT_MUTATION", newValue);
      },
    },
  },
  methods: {
    cancelar: function (index) {
      this.marca = this.infoRow[index].marca;
      this.modelo = this.infoRow[index].modelo;
      this.precioUnitario = this.infoRow[index].precioUnitario;
      this.precioTotal = this.infoRow[index].precioTotal;

      this.listaEquipo[index].rowUpPropuesto = true;
    },
    editar_cel: function (index) {
      this.modal = true;
      this.index_editar = index;
      this.bool_editar = true;
      this.marca = this.infoRow[index].marca;
      this.modelo = this.infoRow[index].modelo;
      this.precioUnitario = this.infoRow[index].precioUnitario;
      this.precioTotal = this.infoRow[index].precioTotal;
    },
    aceptar_cel: function () {
      this.$validator
        .validateAll()
        .then((item) => {
          if (item) {
            console.log();
            if (this.bool_editar) {
              console.log("editar");
              this.infoRow[this.index_editar].marca = this.marca;
              this.infoRow[this.index_editar].modelo = this.modelo;
              this.infoRow[
                this.index_editar
              ].precioUnitario = this.precioUnitario;
              this.infoRow[this.index_editar].precioTotal = this.precioTotal;
              this.modal = false;
              this.index_editar = "";
              this.bool_editar = false;
            } else {
              let newPartida = {
                partida: this.info_confirmar.partida,
                unidad: this.info_confirmar.unidad,
                componente: this.info_confirmar.componente,
                cantidad: this.info_confirmar.cantidad,
                marca: this.marca,
                modelo: this.modelo,
                precioUnitario: this.precioUnitario,
                precioTotal: this.precioTotal,
              };
              this.marca = "";
              this.modelo = "";
              this.precioUnitario = "";
              this.precioTotal = "";
              this.infoRow.push(newPartida);
              this.modal = false;
            }
          } else {
            this.$notify.error({
              title: "Error",
              msg: `FALTA LLENAR CAMPOS PARA LA PARTIDA.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "Error",
            msg: `${err}.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        });
    },
    aceptar: function (index, item) {
      this.$validator
        .validateAll()
        .then((val) => {
          if (val) {
            this.listaEquipo[index].rowUpPropuesto = false;
            let newPartida = {
              partida: item.partida,
              unidad: item.unidad,
              componente: item.componente,
              cantidad: item.cantidad,
              marca: this.marca,
              modelo: this.modelo,
              precioUnitario: this.precioUnitario,
              precioTotal: this.precioTotal,
            };
            this.marca = "";
            this.modelo = "";
            this.precioUnitario = "";
            this.precioTotal = "";
            this.$emit("desbloquear_partida");
            if (this.infoRow.length > index) this.infoRow[index] = newPartida;
            else this.infoRow.push(newPartida);
          } else {
            this.$notify.error({
              title: "Error",
              msg: `FALTA LLENAR CAMPOS PARA LA PARTIDA.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "Error",
            msg: `${err}.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        });
    },
    // infoFull: function (value) {
    //   this.modal = true;
    //   this.infoRow = Object.assign(this.listaEquipo[value]);
    // },
  },
  computed: {
    // multiplicacion: function () {
    //   let multi = 0;
    //   for (let i = 0; i < this.listaEquipo.length; i++) {
    //     multi += this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
    //   }
    //   return multi;
    // },
    sumatoria: function () {
      let suma = 0;
      for (let item of this.infoRow) {
        console.log(item);
        suma += parseInt(item.precioTotal);
      }
      console.log(suma);
      return "$ " + suma.toLocaleString("en-US");
    },
    letraMoneda: function () {
      let suma = 0;
      for (let item of this.infoRow) {
        console.log(item);
        suma += parseInt(item.precioTotal);
      }
      if (suma > 0) {
        let MonedaLetra = NumeroALetras(suma, {
          plural: "PESOS",
          singular: "PESO",
          centPlural: "CENTAVOS",
          centSingular: "CENTAVO",
        });
        return MonedaLetra;
      } else
        return "--------------------------------------------------------------------------------------";
    },
     letraMonedaCel: function () {
      let suma = 0;
      for (let item of this.infoRow) {
        console.log(item);
        suma += parseInt(item.precioTotal);
      }
      if (suma > 0) {
        let MonedaLetra = NumeroALetras(suma, {
          plural: "PESOS",
          singular: "PESO",
          centPlural: "CENTAVOS",
          centSingular: "CENTAVO",
        });
        return MonedaLetra;
      } else
        return "------------";
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





