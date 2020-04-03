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
              <td
                class="border-b border-black p-2 md:p-3 border-2"
              >
                $ {{ equipo.row14.toLocaleString('en-US') }}
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
              <td
                class="border-b border-black p-2 md:p-3 border-2"
              >
                 $ {{  (equipo.row14 * equipo.row4).toLocaleString('en-US') }}                 
              </td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
            </tr>
          </table>
          <div class="divDescription" style="width: 20%">
            <tr>
              <th>Descripcion</th>
            </tr>
            <td>
              <textarea
                
                class="appearance-none block width-64 bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0"
                style="width: 20vw;"
                id="grid-last-name"
              />
            </td>
          </div>
        </div>
        <div>
          <div class="flex mb-4" style="margin-top: 1vh">
            <div class="w-1/2 h-6 pl-4">
              <p class="inline">Total: {{ letraMoneda }}</p>
            </div>
      
            <div class="w-1/2 h-6 pl-20" >
              <input
                v-model="sumatoria"
                class="md:border border-black"
                id="grid-last-name"
                type="text"
                style="width: 8.5vw; text-align: center;"
                placeholder="$ 0.00"
              />
            </div>
           
          </div>
          <hr />
        </div>
      </div>
    </form>
  </div>
</template>

<script>



export default {
  props: {
    listaEquipo: {
        type: Array,
        default: () => []
    }
  },
  data() {
    return {
      

    };
  },
  methods: {


  },
  computed: {
    multiplicacion: function() {
      let multi = 0;
      for (let i = 0; i < this.listaEquipo.length; i++) {
        multi += this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
      }            
      return multi;   
    },
    sumatoria: function(){
      let suma = 0
      for (let i = 0; i < this.listaEquipo.length; i++) {
        let multi = this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
        suma += multi;
      }
        return ('$ '+suma.toLocaleString('en-US'));
    },
    letraMoneda: function(){

      let multi = 0;
      for (let i = 0; i < this.listaEquipo.length; i++) {
        multi += this.listaEquipo[i]["row14"] * this.listaEquipo[i]["row4"];
      }   

      if(multi > 0){  
      let MonedaLetra = NumeroALetras(multi, {
                plural: "PESOS",
                singular: "PESO",
                centPlural: "CENTAVOS",
                centSingular: "CENTAVO"
      });
      return MonedaLetra
      }
      else 
        return "---------------------------------------"
    }
  }
};


// Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
    function Unidades(num){

        switch(num)
        {
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }

        return '';
    }//Unidades()

    function Decenas(num){

        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);

        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + Unidades(unidad);
                }
            case 3: return DecenasY('TREINTA', unidad);
            case 4: return DecenasY('CUARENTA', unidad);
            case 5: return DecenasY('CINCUENTA', unidad);
            case 6: return DecenasY('SESENTA', unidad);
            case 7: return DecenasY('SETENTA', unidad);
            case 8: return DecenasY('OCHENTA', unidad);
            case 9: return DecenasY('NOVENTA', unidad);
            case 0: return Unidades(unidad);
        }
    }//Unidades()

    function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
    }//DecenasY()

    function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
            case 5: return 'QUINIENTOS ' + Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + Decenas(decenas);
            case 7: return 'SETECIENTOS ' + Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + Decenas(decenas);
        }

        return Decenas(decenas);
    }//Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    }//Seccion()

    function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = Centenas(resto);

        if(strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    }//Miles()

    function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = Miles(resto);

        if(strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    }//Millones()

    function NumeroALetras(num, currency) {
        currency = currency || {};
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: currency.plural || 'PESOS CHILENOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
            letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (function () {
                    if (data.centavos == 1)
                        return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                    else
                        return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                })();
        }

        if(data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
            return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
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


