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
                                    <button @click="filtrar_actividades_mensuales" class="botonIconBuscar">
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
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                    <!--//////////////////////////////////////////////////////////////////////
                        ////                           TABLA                             ////
                        ////////////////////////////////////////////////////////////////////-->
                    <table class="border-collapse bg-white table-striped relative">
                        <!--/////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      ////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                                <th class="w-64 cabeceraTable">Carril</th>
                                <th class="w-64 cabeceraTable">Numero Capufe</th>                                
                                <th class="w-64 cabeceraTable">Fecha de Actividad</th>
                                <th class="w-64 cabeceraTable">Tipo de Actividad</th>
                                <th class="w-64 cabeceraTable">Status</th>   
                                <th class="w-64 cabeceraTable">Acciones</th>                
                            </tr>
                        </thead>
                    <!--/////////////////////////////////////////////////////////////////
                        ////                           Body TABLA                     ////
                        /////////////////////////////////////////////////////////////////-->
                        <tbody>
                            <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividadesMensuales" :key="key"> 
                                <td class="w-64 cuerpoTable text-center">{{ item.lane }}</td>
                                <td class="w-64 cuerpoTable text-center">{{ item.capufeLaneNum }}</td>                                
                                <td class="w-64 cuerpoTable text-center">{{ item.day }}</td>
                                <td class="w-64 cuerpoTable text-center">{{ item.frequencyName }}</td>
                                <td v-if="item.statusMaintenance == 'False'" class="w-64 text-center cuerpoTable" :class="{'bg-red-200': true}">{{ 'Inconcluso' }}</td>
                                <td v-else class="w-64 text-center cuerpoTable" :class="{'bg-green-200': true}">{{ 'Inconcluso' }}</td>
                                <td class="w-64 text-center cuerpoTable">
                                    <div v-if="item.statusMaintenance == 'False'">                               
                                        <button @click="crear_reporte_carril(item)" class="botonIconCrear">
                                            <img src="../../assets/img/nuevoDtc.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span class="text-xs sm:hidden">Crear</span>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button @click="reporte_pdf(item)" class="botonIconDescargar">
                                            <img src="../../assets/img/pdf.png" class="mr-2" width="15" height="15" />
                                            <span class="text-xs sm:hidden">Descargar</span>
                                        </button>
                                        <button @click="editar_reporte_carril(item)" class="botonIconActualizar">
                                            <img src="../../assets/img/pencil.png" class="mr-2" width="15" height="15" />
                                            <span class="text-xs sm:hidden">Actualizar</span>
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
import ServicioActividades from '../../services/ActividadesService.js'
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Axios from 'axios'
import ServiceReportePDF from '../../services/ReportesPDFService'
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
        let actualizar = await ServicioActividades.filtrar_actividades_mensuales(this.mes, this.año, false)        
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
    reporte_pdf: async function(item){
        console.log(item)
        let refPlaza = this.$store.getters['Login/getReferenceSquareActual']
        await Axios.get(`${API}/Calendario/CalendarioReportDataEdit/${refPlaza}/${item.calendarId}`)
        .then((response) => {                  
            let referenceNumber = response.data.result.table[0].referenceNumber
            ServiceReportePDF.generar_pdf_actividades_preventivo(referenceNumber, item.frequencyId)                                                                                    
            ServiceReportePDF.generar_pdf_fotografico_preventivo(referenceNumber, item.lane)
        })
        .catch(Ex => {                    
            console.log(Ex);                    
        });                 
    },  
    editar_reporte_carril: async function(item){
        console.log(item)
        let refPlaza = this.$store.getters['Login/getReferenceSquareActual']        
        await Axios.get(`${API}/Calendario/CalendarioReportDataEdit/${refPlaza}/${item.calendarId}`)
        .then((response) => {                  
            let header = response.data.result.table[0]                        
            let actividades = response.data.result.table1                             
            this.$router.push({
                path: `FormularioReporte`,
                query: {
                    headerCompuesto: { ...header, ...item},
                    actividades: actividades,
                    edicion: true,
                    horas: {
                        horaInicio: header.horaInicio,
                        horaFin: header.horaFin
                    }
                },
            });
        })
        .catch(Ex => {                    
            console.log(Ex);                    
        });
    },
    crear_reporte_carril(item){      
        item["plazaNombre"] = this.plazaNombre                
        this.$router.push({ 
            path: 'FormularioReporte',
            query: {
                'header': item,                
            }
        })
    }
}
}
</script>
