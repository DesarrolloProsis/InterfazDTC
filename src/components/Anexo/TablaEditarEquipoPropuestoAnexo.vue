<template>
  <div>
    <div class="flex justify-center sm:hidden">
      <div class="shadow-sm rounded  pb-8 mt-8 w-full flex flex-col">
        <div class="inline-flex font-titulo">
          <div class="overflow-x-auto bg-white rounded-lg overflow-y-auto">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <thead>
              <tr class="text-sm text-center text-white trTable sm:text-xs">
                <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">Cantidad</th>
                <th class="w-32 lg:w-36 xl:w-48 cabeceraTable font-medium">Componente</th>
                <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">Marca</th>
                <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">Modelo</th>
                <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">No. Serie</th>
                <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">Ubicacion (carril/cuerpo)</th>
                <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">Observaciones</th>
              </tr>
            </thead>
            <tbody name="table" is="transition-group">  
              <tr class="hover:bg-blue-200 text-center text-xs h-12 xl:text-base" v-for="(equipo, index) in listaEquipo" :key="index">
                <td class="cuerpoTable">1</td>
                <td class="cuerpoTable">{{ equipo.nameComponent }}</td>
                <td class="cuerpoTable">{{ equipo.brandPropuesto }}</td>
                <td class="cuerpoTable">{{ equipo.modelPropuesto }}</td>
                <td class="cuerpoTable">
                  <input type="text" class="text-center inputanexo" :placeholder="equipo.serialNumber" v-model="equipo.serialnuevo" @change ="generarlistanuevalistacomponentes(equipo)">
                  </td>
                <td class="cuerpoTable">{{ equipo.lane }}</td>
                <td class="cuerpoTable">Nuevo</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>

    <div class="mt-2 md:hidden lg:hidden xl:hidden flex justify-center flex-col">
      <div :class="{ 'hidden': modal }">
        <div class="overflow-x bg-white rounded-lg shadow overflow-y-auto sm:text-xs sm:ml-4 sm:mr-4">
          <table class="border-collapse font-titulo">
            <thead>
            <tr class=" border-gray-800 bg-blue-800 text-white text-xs text-center">
              <th class="w-32 lg:w-36 xl:w-48 cabeceraTable font-medium">Componente</th>
              <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">Ubicacion (carril/cuerpo)</th>
              <th class="w-24 lg:w-36 xl:w-48 cabeceraTable font-medium">No. Serie</th>
            </tr>
            </thead>
            <tbody>
                <tr
                class="hover:bg-blue-200 text-center text-xs"
                v-for="(equipo, index) in listaEquipo"
                :key="index"
              >
                <td class="cuerpoTable">{{ }}</td>
                <td class="cuerpoTable">{{ }}</td>
                
              </tr>
            </tbody>
            
          </table>
        </div>
        <div>
          
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
      modal: false,
      arrayobjetoseditados:[],
    };
  },
  created(){
    console.log(this.listaEquipo)
  },
  watch: {
    vercomponentes: function (){
      console.info(this.listaEquipo)
      }
  },
  methods: {
    generarlistanuevalistacomponentes(equipo){
      var componente = {
        RequestedComponentId: equipo.requestedComponentId,
        SerialNumber: equipo.serialnuevo
      }
      if (this.arrayobjetoseditados.length == 0) {
        this.arrayobjetoseditados.push(componente);
      }else{
        const o = this.arrayobjetoseditados.findIndex(element => {
          return element.RequestedComponentId === componente.RequestedComponentId
        })
        if (o < 0) {
          this.arrayobjetoseditados.push(componente);
        }else{
          this.arrayobjetoseditados.splice(o, 1, componente);
        }
      }
      console.log('Estoy entrando a la funcion');
      this.$emit('componentesfinales',this.arrayobjetoseditados);
    },
  }
}
</script>

