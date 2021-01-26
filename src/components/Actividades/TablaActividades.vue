<template>
    <div>
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3 max-w-6xl mx-auto">     
            <div class="flex justify-center mt-10">
                <h1 class=" text-3xl sm:text-2xl">TABLA DE ACTIVIDADES</h1>
            </div>
            <div class="inline-flex h-56 xl:mx-auto sm:h-auto sm:m-0 border shadow-lg rounded-md border-gray-800">
                <div class=" inline-flex sm:inline-block mt-3">
                    <div class="w-1/2 sm:w-full">
                    <!--//////////////////////////////////////////////////////////////////////
                        ////                   INFO DE PLAZA                             ////
                        ////////////////////////////////////////////////////////////////////-->
                        <p class=" uppercase sm:text-sm sm:w-66 text-lg text-center">Actividades del mes {{ mes }} del {{ año }}</p> 
                        <div class="pl-10 sm:pl-3 mt-6 inline-flex sm:inline-block">
                            <div class=" sm:w-full sm:ml-3">
                                <p class="sm:text-sm">Plaza Seleccionada: {{ plazaNombre }}</p>
                                <div class=" inline-flex w-64 mt-3 sm:w-auto justify-center">
                                <p class="text-sm sm:text-sm text-red-600  mt-3 mr-2 sm:mr-6">Cambiar Plaza</p>                                   
                                <select v-model="plazaSelect" @change="cambiar_plaza" class="w-40 mt-2 sm:w-40" type="text" name="TipoDescripcion" >
                                    <option disabled value>Selecionar...</option>
                                    <option v-for="(item, index) in listaPlazas" v-bind:value="item.numPlaza" :key="index">
                                        {{ item.plazaName }}
                                    </option>
                                </select>
                                </div> 
                            </div>
                            <!--//////////////////////////////////////////////////////////////////////
                                ////                          FILTROS                             ////
                                ////////////////////////////////////////////////////////////////////-->
                            <div class="pl-5 sm:pl-0 sm:w-full sm:mt-6">
                                <div class=" inline-flex mb-4">
                                    <p class="text-sm sm:text-sm text-gray-900 ml-3 mr-2">Mes</p>                                
                                    <select v-model="mes" class="w-32 sm:w-24" type="text" name="TipoDescripcion" >
                                        <option disabled value>Selecionar...</option>
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                </div>
                                <div class=" inline-flex mb-3">
                                    <p class="text-sm sm:text-sm font-semiboldtext-gray-900 ml-3 mr-2">Año</p>
                                    <select v-model="año" class="w-32 sm:w-24" type="text" name="TipoDescripcion" >
                                        <option disabled value>Selecionar...</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>                                        
                                    </select>
                                </div>
                            <!--//////////////////////////////////////////////////////////////////////
                                ////                           BOTON  BUSCAR                      ////
                                ////////////////////////////////////////////////////////////////////-->
                                <div class=" sm:justify-center sm:flex">
                                    <button @click="filtrar_actividades_mensuales" class="bg-gray-300 hover:bg-gray-400 xl:w-58 text-gray-800 font-bold py-2 px-5 ml-5 mt-2 rounded inline-flex items-center border border-blue-700">
                                        <img src="../../assets/img/lupa.png" class="mr-2 xl:ml-2 md:ml-0" width="25" height="2"/>
                                        <span class="text-xs">Buscar Actividades</span>
                                    </button>
                                </div>
                            </div>                            
                        </div>                          
                    </div>
                    <!--//////////////////////////////////////////////////////////////////////
                        ////                       COMENTARIO                             ////
                        ////////////////////////////////////////////////////////////////////-->
                    <div class="w-1/2 sm:w-full justify-start sm:mt-3 ml-20 mt-10 inline-block sm:p-3">
                        <p class=" uppercase sm:text-base text-lg">Comentario:</p>
                        <p>{{ comentario }}</p>
                    </div>                                 
                </div>            
            </div>
            <div>
                <div class="overflow-x-auto sm:m-2 sm:text-xs justify-center flex">
                    <!--//////////////////////////////////////////////////////////////////////
                        ////                           TABLA                             ////
                        ////////////////////////////////////////////////////////////////////-->
                    <table class="border-2 border-gray-800">
                        <!--/////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      ////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md h-16 text-gray-400 font-normal bg-blue-800">                
                                <th class="w-64 border-2 border-gray-800">Carril</th>
                                <th class="w-64 border-2 border-gray-800">Numero Capufe</th>                                
                                <th class="w-64 border-2 border-gray-800">Fecha de Actividad</th>
                                <th class="w-64 border-2 border-gray-800">Tipo de Actividad</th>
                                <th class="w-64 border-2 border-gray-800">Status</th>   
                                <th class="w-64 border-2 border-gray-800">Acciones</th>                
                            </tr>
                        </thead>
                    <!--/////////////////////////////////////////////////////////////////
                        ////                           Body TABLA                     ////
                        /////////////////////////////////////////////////////////////////-->
                        <tbody>
                            <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividadesMensuales" :key="key"> 
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.lane }}</td>
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.capufeLaneNum }}</td>                                
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.day }}</td>
                                <td class="w-64 text-center border-2 border-gray-800">{{ item.frequencyName }}</td>
                                <td class="w-64 text-center border-2 border-gray-800" :class="{'bg-red-200': true}">{{ 'Inconcluso' }}</td>
                                <td class="w-64 text-center border-2 border-gray-800">
                                    <button @click="vista_reporte_carril(item)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border border-red-700">
                                        <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                                        <span class="text-xs sm:hidden">Descargar</span>
                                    </button>
                                    <div>
                                        <button @click="vista_reporte_carril(item)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border border-yellow-700">
                                            <img src="../../assets/img/pencil.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span class="text-xs sm:hidden">Actualizar</span>
                                        </button>
                                        <button @click="vista_reporte_carril(item)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border border-blue-700">
                                            <img src="../../assets/img/nuevoDtc.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span class="text-xs sm:hidden">Crear</span>
                                        </button>
                                    </div>
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
import servicioActividades from '../../services/ActividadesService.js'
export default {
    data(){
        return{
            listaActividadesMensuales:[],
            listaPlazas: [],
            plazaSelect: '',
            plazaNombre: '',
            año: '',
            mes: '',
            comentario: ''
        }
    },
/////////////////////////////////////////////////////////////////////
////                        CICLOS DE VIDA                       ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function(){           
    this.listaPlazas = await this.$store.getters["Login/getListaPlazasUser"] 
    let cargaInicial = this.$route.params.cargaInicial
    this.listaActividadesMensuales = cargaInicial.listaActividadesMensuales
    this.plazaSelect = cargaInicial.plazaSelect
    this.plazaNombre = cargaInicial.plazaNombre
    this.comentario = cargaInicial.comentario     
    this.mes = cargaInicial.mes
    this.año = cargaInicial.año               
},
/////////////////////////////////////////////////////////////////////
////                            METODOS                          ////
/////////////////////////////////////////////////////////////////////
methods: {
    filtrar_actividades_mensuales: async function(){                
        let actualizar = await servicioActividades.filtrar_actividades_mensuales(this.mes, this.año, false)        
        this.$nextTick().then(() => {
            this.listaActividadesMensuales = actualizar.listaActividadesMensuales,
            this.plazaNombre = actualizar.plazaNombre,
            this.comentario = actualizar.comentario,
            this.plazaSelect = actualizar.plazaSelect
        })
    },  
    cambiar_plaza(){
        let index = this.listaPlazas.findIndex(
            (item) => item.numPlaza == this.plazaSelect
        );
        this.$store.commit("Header/PLAZAELEGIDAMUTATION", index);
        this.$store.commit("Login/PLAZAELEGIDAMUTATION", index);
        this.listaActividadesMensuales = []
    },
    vista_reporte_carril(item){      
        item["plazaNombre"] = this.plazaNombre        
        console.log(item)
        this.$router.push({ 
            path: 'FormularioReporte',
            query: {
                'header': item
            }
        })
    }
}
}
</script>
