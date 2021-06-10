<template>
    <div>
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3 max-w-6xl mx-auto">     
            <div class="sm:m-2 border shadow-lg rounded-md w-full mt-5 sm:ml-1">
                <h1 class=" text-3xl sm:text-2xl font-titulo font-bold text-center">TABLA DE ACTIVIDADES DEL MES {{ mesNombre }} DEL {{ año }}</h1>
                <div class="grid grid-cols-1 -mt-3">
                    <div class="grid grid-cols-1">
                        <!--//////////////////////////////////////////////////////////////////////
                        ////                   INFO DE PLAZA                             ////
                        ////////////////////////////////////////////////////////////////////-->                        
                        <div class="pl-10 sm:pl-3 mt-6 grid grid-cols-1 font-titulo">
                            <div class="ml-2 md:hidden lg:hidden xl:hidden">
                                <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true"></SelectPlaza>
                            </div>
                            <div class="grid grid-cols-4 sm:w-full sm:ml-3 w-full xl:text-center">                                       
                                <div class="sm:hidden -mt-2"><SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true"></SelectPlaza></div>                                                    
                                <div class="mb-4 ml-5 sm:ml-0 sm:mt-4">
                                    <p class="text-sm sm:text-sm text-gray-900 mr-2 mb-1 font-semibold">Mes:</p>                                
                                    <p class="w-32 input ml-16 sm:ml-0">
                                    <select :disabled="blockSelect" @change="filtrar_sin_referencia" v-model="mes" class="w-32 sm:w-32  border-none" type="text" name="TipoDescripcion" >
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
                                    </select></p>
                                </div>
                                <div class="mb-4 ml-4 sm:mt-4 sm:ml-20">
                                    <p class="text-sm sm:text-sm text-gray-900 mr-2 font-semibold">Año:</p>
                                    <p class="w-32 input ml-16 sm:ml-0">
                                    <select :disabled="blockSelect" @change="filtrar_sin_referencia" v-model="año" class="w-32 sm:w-32 border-none" type="text" name="TipoDescripcion" >
                                        <option disabled value>Selecionar...</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>                                        
                                    </select></p>
                                </div>
                                <div class="mb-4 ml-5 sm:mt-20 sm:-ml-1">
                                    <p class="text-sm sm:text-sm text-gray-900 -ml-1 font-bold sm:ml-0">Carril:</p>
                                    <p class="w-32 input ml-16 sm:ml-0">
                                    <select v-model="ubicacion" @change="filtrar_sin_referencia" :disabled="blockSelect" class="w-32 border-none"  type="text">
                                        <option value="">Selecionar...</option>
                                        <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                                    </select></p>
                                </div> 
                                <div class="mb-4 sm:-ml-64 sm:mt-20 -ml-20">
                                    <p class="text-sm sm:text-sm text-gray-900 mr-2 mb-1 font-bold">Status:</p>
                                    <p class="w-48 input ml-20 sm:ml-0 sm:w-32">
                                    <select  v-model="status" @change="filtrar_sin_referencia" :disabled="blockSelect" class="w-48 sm:w-32 border-none" type="text" name="TipoDescripcion" >
                                        <option value="">Todos</option>
                                        <option :value=true>Concluido</option>
                                        <option :value=false>Inconcluso</option>                                        
                                    </select></p>
                                </div>
                                <div class="mb-4 ml-10 font-bold sm:ml-0 sm:w-full">
                                    <p class="text-sm sm:text-sm font-semibold text-gray-900 ml-3 mr-2 sm:ml-0 sm:mb-1">Referencia:</p>
                                    <input v-model="referenceNumber" class="text-center input sm:w-32" placeholder="PM-00000" type="text">
                                </div>
                                <div class="mt-2 ml-4 sm:ml-16">
                                    <button @click="limpiar_filtros" class="botonTodos sm:w-32">
                                        <img src="../../assets/img/todos.png" class="mr-2 xl:ml-2 md:ml-0" width="25" height="2"/>
                                        <span class="">Todos</span>
                                    </button>
                                </div>
                            </div>                           
                        </div>
                        <div class="text-center mb-4 ml-16 mt-2 sm:ml-4 hidden sm:hidden md:hidden lg:hidden">
                            <button @click="filtrar_actividades_mensuales" class="botonIconBuscar">
                                <img src="../../assets/img/lupa.png" class="mr-2 xl:ml-2 md:ml-0" width="25" height="2"/>
                                <span class="text-xs">Buscar Actividades</span>
                            </button>
                        </div>                          
                    </div>                                        
                </div> 
            </div>
            <div class="sm:m-2 sm:w-full sm:ml-1 relative">
                <div class="divtabla font-titulo" style="height:600px;">
                    <!--//////////////////////////////////////////////////////////////////////
                    ////                           TABLA                             ////////
                    ////////////////////////////////////////////////////////////////////-->
                    <table class="table table-striped" >
                        <!--////////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      //////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md trTable font-normal">                
                                <th class="w-64 cabeceraTable font-titulo font-medium">Carril</th>
                                <th class="w-64 cabeceraTable font-titulo font-medium">Referencia</th>                                
                                <th class="w-64 cabeceraTable font-titulo font-medium">Fecha de Actividad</th>
                                <th class="w-64 cabeceraTable font-titulo font-medium">Tipo de Actividad</th>
                                <th class="w-64 cabeceraTable font-titulo font-medium">Estatus</th>   
                                <th class="w-64 cabeceraTable font-titulo font-medium">Acciones</th>
                                <th class="w-68 cabeceraTable font-titulo font-medium">PDF</th>                
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////////
                        ////                           Body TABLA                     //////////
                        /////////////////////////////////////////////////////////////////////-->
                        <tbody name="table">   
                            <template v-if="listaActividadesMensuales.length == 0 && loadingTabla != true"> 
                                <tr>
                                    <td class="w-full text-center text-red-500 m-10" colspan="6">                                    
                                        <div class="mt-8 mb-8">Sin Informacion</div>
                                    </td>
                                </tr>  
                            </template> 
                            <template v-if="loadingTabla">  
                                <tr>
                                    <td class="w-full" colspan="6">                                    
                                        <div style="border-top-color:transparent" class="laodTable"></div>
                                    </td>                          
                                </tr>  
                            </template>   
                            <template v-if="listaActividadesMensuales.length > 0">                                                                                     
                                <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividadesMensuales" :key="key"> 
                                    <td class="w-64 cuerpoTable text-center font-titulo font-normal">{{ item.lane }}</td>
                                    <td class="w-64 cuerpoTable text-center font-titulo font-normal">{{ item.referenceNumber }}</td>                                
                                    <td class="w-64 cuerpoTable text-center font-titulo font-normal">{{ item.day}}</td>
                                    <td class="w-64 cuerpoTable text-center font-titulo font-normal">{{ item.frequencyName }}</td>
                                    <td v-if="item.statusMaintenance == false" class="w-64 text-center cuerpoTable font-titulo font-normal" :class="{'bg-red-200': true}">{{ 'Inconcluso' }}</td>
                                    <td v-else class="w-64 text-center cuerpoTable font-titulo font-normal" :class="{'bg-green-200': true}">{{ 'Concluido' }}</td>
                                    <td class="w-64 text-center cuerpoTable">
                                        <div class="ml-2" v-if="item.statusMaintenance == false">                               
                                            <button @click="crear_reporte_carril(item)" class="botonIconCrear ml-3 sm:w-16 sm:h-8">
                                                <img src="../../assets/img/nuevoDtc.png" class="mr-2 sm:m-0" width="15" height="15" />
                                                <span class="text-xs sm:hidden">Crear</span>
                                            </button>
                                        </div>
                                        <div class="mr-5 grid grid-cols-1 sm:-ml-3" v-else>
                                            <button @click="reporte_pdf(item)" class="botonIconDescargar mb-1 sm:mt-2 w-32 sm:w-16 sm:h-8">
                                                <img src="../../assets/img/pdf.png"  class="mr-2 sm:m-1" width="15" height="15" />
                                                <span class="text-xs sm:hidden">Descargar</span>
                                            </button>
                                            <button @click="editar_reporte_carril(item)" class="botonIconActualizar mb-1 w-32 sm:w-16 sm:h-8">
                                                <img  src="../../assets/img/pencil.png" class="mr-2 sm:m-1"  width="15" height="15" />
                                                <span class="text-xs sm:hidden">Actualizar</span>
                                            </button>                                   
                                        </div>
                                    </td>
                                    <td class="w-64 text-center cuerpoTable">
                                        <div class="grid grid-cols-1 -ml-4">
                                            <button  class="botonIconDescargar mb-1 sm:mt-2 w-32 sm:w-16 sm:h-8">
                                                <img  src="../../assets/img/pdf-sellado.png" class="mr-2 sm:m-1"  width="15" height="15" />
                                                <span class="text-xs sm:hidden">Sellado</span>
                                            </button>
                                            <button  class="botonIconDescargar mb-1 sm:mt-2 w-32 sm:w-16 sm:h-88">
                                                <img  src="../../assets/img/pdf.png" class="mr-2 -ml-4 sm:m-1"  width="15" height="15" />
                                                <span class="text-xs sm:hidden">Subir Sellado</span>
                                            </button> 
                                        </div>
                                    </td>                                                                                     
                                </tr>
                            </template>                                                                                                              
                        </tbody>       
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ServicioActividades from '../../services/ActividadesService.js'
import SelectPlaza from '../Header/SelectPlaza'
import ServiceReportePDF from '../../services/ReportesPDFService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    components:{
        SelectPlaza
    },
    data(){
        return{
            listaActividadesMensuales:[],
            listaPlazas: [],
            plazaSelect: '',
            plazaNombre: '',
            año: '',
            mes: '',
            comentario: '',
            ubicacion: '',
            status: '',
            referenceNumber:'',
            mesNombre: '',
            blockSelect: false,
            loadingTabla: false
        }
    },
/////////////////////////////////////////////////////////////////////
////                        CICLOS DE VIDA                       ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function(){  
    this.loadingTabla = true        
    this.listaPlazas = await this.$store.state.Login.cookiesUser.plazasUsuario
    let cargaInicial = this.$route.params.cargaInicial
    this.listaActividadesMensuales = cargaInicial.listaActividadesMensuales    
    this.plazaNombre = cargaInicial.plazaNombre
    this.comentario = cargaInicial.comentario     
    this.mes = cargaInicial.mes
    this.mesNombre = cargaInicial.mesNombre
    this.año = cargaInicial.año
    this.plazaSeleccionada = await this.$store.state.Login.plazaSelecionada.numeroPlaza;
    this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)     
    this.loadingTabla = false          
},
computed:{
    carriles_plaza(){
        return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
    },
},
watch: {
    referenceNumber(newValue){
        if(newValue.length == 0)this.blockSelect = false        
        else {
            this.filtrar_actividades_mensuales()
            this.blockSelect = true
        }
    }
},
/////////////////////////////////////////////////////////////////////
////                            METODOS                          ////
/////////////////////////////////////////////////////////////////////
methods: {
    limpiar_filtros : async function(){
        this.ubicacion = ''
        this.status = undefined
        this.referenceNumber = ''
        let actualizar = await ServicioActividades.filtrar_actividades_mensuales(this.mes, this.año, false)        
        this.$nextTick().then(() => {
            this.listaActividadesMensuales = actualizar.listaActividadesMensuales,
            this.plazaNombre = actualizar.plazaNombre,
            this.comentario = actualizar.comentario,
            this.plazaSelect = actualizar.plazaSelect  
            this.mesNombre = actualizar.mesNombre         
        })
    },
    filtrar_sin_referencia: async function(){
        this.listaActividadesMensuales = []
        this.loadingTabla = true  
        setTimeout(async () => {
            let actualizar = await ServicioActividades.filtrar_actividades_mensuales(this.mes, this.año, false, this.status, this.ubicacion.lane, undefined)        
                this.$nextTick().then(() => {
                    this.listaActividadesMensuales = actualizar.listaActividadesMensuales,
                    this.plazaNombre = actualizar.plazaNombre,
                    this.comentario = actualizar.comentario,
                    this.plazaSelect = actualizar.plazaSelect           
                    this.mesNombre = actualizar.mesNombre
                    this.loadingTabla = false
                })
        },1000)
    },
    filtrar_actividades_mensuales: async function(){ 
        if(this.referenceNumber != ''){
            this.listaActividadesMensuales = []
            this.loadingTabla = true  
            setTimeout(async () => {
                let actualizar = await ServicioActividades.filtrar_actividades_mensuales(this.mes, this.año, false, this.status, this.ubicacion.lane, this.referenceNumber)        
                this.$nextTick().then(() => {
                    this.listaActividadesMensuales = actualizar.listaActividadesMensuales,
                    this.plazaNombre = actualizar.plazaNombre,
                    this.comentario = actualizar.comentario,
                    this.plazaSelect = actualizar.plazaSelect           
                    this.mesNombre = actualizar.mesNombre
                    this.loadingTabla = false  
                })
            },1000)
        }else{
            this.$notify.warning({
            title: "Ups!",
            msg: `NO SE HAN LLENADO CAMPOS PARA FILTRAR.`,
            position: "bottom right",
            styles: {
                height: 100,
                width: 500,
                },
            });
        }      
    },  
    cambiar_plaza(numeroPlaza){     
        this.plazaSelect = numeroPlaza
        this.listaActividadesMensuales = []
        this.arrayCarriles = this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSelect)
        this.limpiar_filtros()
    },
    reporte_pdf: async function(item){          
        let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']
        let tipoEncabezadoLane = item.capufeLaneNum != '0000' ? 'carril' : undefined            
        await this.$http.get(`${API}/Calendario/CalendarioReportDataEdit/${refPlaza}/${item.calendarId}`)
        .then((response) => {                  
            let referenceNumber = response.data.result.table[0].referenceNumber
            ServiceReportePDF.generar_pdf_actividades_preventivo(referenceNumber, item.frequencyId, tipoEncabezadoLane)                                                                                    
            ServiceReportePDF.generar_pdf_fotografico_preventivo(referenceNumber, item.lane)
        })                   
    },  
    editar_reporte_carril: async function(item){        
        let refPlaza = this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']                     
        await this.$http.get(`${API}/Calendario/CalendarioReportDataEdit/${refPlaza}/${item.calendarId}`)
        .then((response) => {                  
            let header = response.data.result.table[0]                        
            let actividades = response.data.result.table1                             
            this.$router.push({
                path: `editar/FormularioReporte`,
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
    },
    crear_reporte_carril(item){              
        item["plazaNombre"] = this.plazaNombre                
        this.$router.push({ 
            path: 'crear/FormularioReporte',
            query: {
                'header': item,                
            }
        })
    }
},
}
</script>
