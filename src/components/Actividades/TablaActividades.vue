<template>
    <div>
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3 max-w-6xl mx-auto sm:-ml-1 sm:pr-1 sm:pl-2">     
            <div class=" border shadow-lg rounded-md w-full mt-5 sm:mx-auto">
                <!--/////////////////////////////////////////////////////////////////////
                ////                         MODAL ESCANEADO                       /////
                ////////////////////////////////////////////////////////////////////-->
                <PdfEscaneado @limpiar-componente-escaneado="limpiar_componete_escaneado" :abrirModal="modalSubirSellado" :objInsert="objInsertEscaneado" :tipoReporte="'Calendario-Actividades'"></PdfEscaneado>          
                <h1 class=" text-3xl sm:text-xs font-titulo font-bold text-center sm:mt-4 m-5">TABLA DE ACTIVIDADES DEL MES {{ mesNombre }} DEL {{ año }}</h1>
                <!--/////////////////////////////////////////////////////////////////////
                ////                            FILTROS                            /////
                ////////////////////////////////////////////////////////////////////-->
                <div v-if="filtros" class="grid grid-cols-3 mx-auto -mt-1 m-5 sm:grid-cols-2 md:grid-cols-2 ">
                    <!--Plaza-->
                     <div class="mx-auto my-auto flex sm:w-auto sm:mb-2 ">
                        <p class="text-sm font-titulo mx-auto text-gray-900 font-semibold -mr-17 mt-1 sm:mr-0 sm:text-xs md:mr-3">Plaza:</p>
                        <p class="">
                            <SelectPlaza @actualizar-plaza="cambiar_plaza" :vista="'Actividades'" :fullPlazas="true"></SelectPlaza>
                        </p>
                    </div>
                    <!-- Mes -->
                    <div class="mx-auto my-auto flex sm:w-auto sm:mb-2 ">
                        <p class="text-sm font-titulo text-gray-900 font-semibold mt-1 mr-3 sm:text-xs">Mes:</p>                                
                        <p class="w-32 input sm:text-sm md:w-48">
                            <select :disabled="blockSelect" @change="filtrar_sin_referencia" v-model="mes" class="w-32 sm:w-32 sm:-ml-1 md:w-48 border-none" type="text" name="TipoDescripcion" >
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
                        </p>
                    </div>
                    <!-- Año -->
                    <div class="mx-auto my-auto flex sm:w-auto sm:text-xs sm:mb-2 ">
                        <p class="text-sm text-gray-900 font-titulo font-semibold mt-1 mr-2 sm:text-xs md:mr-1">Año:</p>
                        <p class="w-32 input sm:ml-1 md:w-48 md:ml-5">
                            <select :disabled="blockSelect" @change="filtrar_sin_referencia" v-model="año" class="w-32 sm:w-32 md:w-48 border-none" type="text" name="TipoDescripcion" >
                                <option disabled value>Selecionar...</option>
                                <option value="2020" :class="{'hidden': this.tipoUsuario == 7}">2020</option>
                                <option value="2021" :class="{'hidden': this.tipoUsuario == 7}">2021</option>
                                <option value="2022">2022</option>                                        
                            </select>
                        </p>
                    </div>
                    <!-- Carril -->
                    <div class="mx-auto my-auto flex sm:w-auto sm:text-xs sm:mb-2 ">
                        <p class="text-sm font-titulo text-gray-900 font-bold mt-1 sm:text-xs">Carril:</p>
                        <p class="w-32 input xl:ml-1 sm:ml-0 md:w-48 md:ml-0 lg:w-48 lg:ml-1 xl:w-48">
                            <select v-model="ubicacion" @change="filtrar_sin_referencia" :disabled="blockSelect" class="w-32 md:w-48 lg:w-48 xl:w-48 border-none"  type="text">
                                <option value="">Selecionar...</option>
                                <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                            </select>
                        </p>
                    </div>
                    <!-- Status -->
                    <div class="mx-auto my-auto flex sm:w-auto sm:text-xs sm:mb-2 md:w-auto ">
                        <p class="text-sm font-titulo text-gray-900 font-bold mt-1 sm:text-xs">Status:</p>
                        <p class="w-32 input md:w-48 md:ml-2">
                            <select  v-model="status" @change="filtrar_sin_referencia" :disabled="blockSelect" class="w-32 sm:w-32 md:w-48 border-none" type="text" name="TipoDescripcion" >
                                <option value="">Todos</option>
                                <option :value=true>Concluido</option>
                                <option :value=false>Inconcluso</option>                                       
                            </select>
                        </p>
                    </div>
                    <!-- Referencia -->
                    <div class="mx-auto my-auto flex sm:w-auto sm:text-xs sm:mb-2 ">
                        <p class="text-sm font-semibold font-titulo text-gray-900 mx-auto mr-1 mt-2 sm:text-xs sm:mr-2 md:ml-1">Ref:</p>
                        <input v-model="referenceNumber" class="text-center w-32 md:w-48 input ml-1" placeholder="PM-00000" type="text">
                    </div>
                    <!-- Vacio -->
                    <div></div>
                    <!-- Botón -->
                    <div class="mx-auto my-auto flex mt-3 ">
                        <button @click="limpiar_filtros" class="botonTodos sm:-ml-33 sm:w-32 sm:h-8 md:h-8 md:mb-4 md:-ml-51" :class="{'ml-10 sm:ml-2 sm:w-32 sm:h-8':tipoUsuario == 2 || tipoUsuario == 5}">
                            <!-- <img src="../../assets/img/todos.png" class="mr-2 xl:ml-2 md:ml-1" width="25" height="2"/> -->
                            <font-awesome-icon icon="fa-solid fa-repeat" class="text-green-800 mr-2 h-5 w-5 "/>
                            <span class="md:mr-2 sm:text-sm">Todos</span>
                        </button>
                    </div>
                </div> 
                <!--/////////////////////////////////////////////////////////////////////
                ////                        BOTONES CELULAR                        /////
                ////////////////////////////////////////////////////////////////////-->
                <div class="text-center lg:hidden xl:hidden animate-bounce">
                    <button @click="filtros=false" v-if="filtros">
                        <img src="../../assets/img/up.png" width="25" height="2"/>
                    </button>
                    <button @click="filtros=true" v-else>
                        <img src="../../assets/img/down.png" width="25" height="2"/>
                    </button>
                </div>
            </div>
            <!--//////////////////////////////////////////////////////////////////////
            ////                           TABLA                             ////////
            ////////////////////////////////////////////////////////////////////-->
            <div class="sm:-m-1 sm:w-full sm:-mb-32 sm:mx-auto sm:text-xs">
                <div class="divtabla font-titulo" style="height:600px;">
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
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////////
                        ////                           BODY TABLA                     //////////
                        /////////////////////////////////////////////////////////////////////-->
                        <tbody name="table" id="multiselectHamburguesa">   
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
                                    <td class="w-76 text-center cuerpoTable">                                            
                                        <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <div class=" inline-flex">
                                                    <!-- <img :src="props.option.img" class="mr-5" width="15" height="15"> -->
                                                    <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                                    <span class="option__title">{{ props.option.title }}</span>
                                                </div>
                                            </template>
                                            <template slot="option" slot-scope="props">                                                
                                                <div class="option__desc"><span class="option__title inline-flex">
                                                    <!-- <img :src="props.option.img" class="mr-5" width="15" height="15"> -->
                                                    <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                                    {{ props.option.title }}</span>
                                                </div>
                                            </template>
                                        </multiselect>                                                                                                   
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
import ServiceReportePDF from '../../services/ReportesPDFService'
import SelectPlaza from '../Header/SelectPlaza'
import PdfEscaneado from '../PdfEscaneado.vue'
import Multiselect from "vue-multiselect";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    components:{
        SelectPlaza,
        Multiselect,
        PdfEscaneado
    },
    data(){
        return{
            listaActividadesMensuales:[],            
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
            loadingTabla: false,
            tipoUsuario: '',
            value: '',           
            pdfSelladoBool: true,
            pdfSellado:'',
            modalSubirSellado: false,
            objSubir:'',
            objInsertEscaneado:{},
            filtros: true, 
            userid: ''
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                        CICLOS DE VIDA                       ////
    /////////////////////////////////////////////////////////////////////
    beforeMount: async function(){  
    this.loadingTabla = true            
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
    this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId 
    this.userId = this.$store.state.Login.cookiesUser.userId           
    },
    computed:{
        carriles_plaza(){
            return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
        },
    },
    /////////////////////////////////////////////////////////////////////
    ////                            METODOS                          ////
    /////////////////////////////////////////////////////////////////////
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
            let tipoEncabezadoLane = item.capufeLaneNum != '0000' ? 'carril' : undefined            
            await this.$http.get(`${API}/Calendario/CalendarioReportDataEdit/${item.referenceNumber.split('-')[0]}/${item.calendarId}`)
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
        },
        customLabel ({ title }) {
        return `${title}`
        },
        acciones_mapper(item){                
        if(this.value.title == 'Crear'){
            this.crear_reporte_carril(item)
        }
        if(this.value.title == 'Editar'){
            this.editar_reporte_carril(item)
        }   
        if(this.value.title == 'Reporte de Mantenimiento'){            
            this.reporte_pdf(item)
        }
        if(this.value.title == 'Reporte Mtto. Sellado'){
            this.objInsertEscaneado = {
                referenceNumber: item.referenceNumber
            }            
            this.modalSubirSellado = true
        }
        if(this.value.title == 'Reporte M. Sellado'){
            this.descargar_escaneado(item)
        }
        this.value = ""
        },
        limpiar_componete_escaneado(){
        this.limpiar_filtros()
        this.modalSubirSellado = false
        this.objInsertEscaneado = {}
        },
        opticones_select_acciones({ statusMaintenance, pdfExists, userId }){
            let options= [
            { title: 'Crear', img: 'fa-file-circle-plus' },
            { title: 'Editar', img: 'fa-pen-to-square' },
            { title: 'Reporte de Mantenimiento', img: 'fa-file-arrow-down' },
            { title: 'Reporte M. Sellado', img: 'fa-file-arrow-down'},
            { title: 'Reporte Mtto. Sellado', img: 'fa-file-arrow-up'},
            ]
            let filtroOpciones = []
            //Si el usuario es administrador, capufe, o supervisor de tècnicos
            if(this.tipoUsuario == 4 || this.tipoUsuario == 7 || this.tipoUsuario == 8){
            //Sí exisite el archivo escaneado
            if(pdfExists){
                return options.splice(2,2)
            }
            else{
                return options.splice(2,1)
            }    
            }
            //Si es supervisor sistemas
            else if(this.tipoUsuario == 5 || this.tipoUsuario == 2){ 
            //Si el mantenimineto se creo (Concluido)
            if(statusMaintenance){
                //Si el usuario que inicio sesion es el mismo que el del mantenimieno
                if(userId == this.userId)
                    return options.splice(1,4)
                else
                    //Si existe el pdf escaneado
                    if(pdfExists){
                        return options.splice(2,2)
                    }else{
                        return options.splice(3,2)
                    }
            }
            //Inconcluso
            else{
                //Si el usuario corresponde al mismo que inicio sesión
                if(userId == this.userId)
                    return options.splice(0,1)
                else
                    return []
            }
            }
            //Si el usuario es tècnico o sistemas
            else{            
            if(statusMaintenance){  
                if(pdfExists){
                    //return options.splice(2,2)
                    filtroOpciones.push(options[2])
                    filtroOpciones.push(options[3])
                }
                else{
                    filtroOpciones.push(options[1])
                    filtroOpciones.push(options[2])
                }    
            }
            else{            
                if(statusMaintenance){  
                    if(pdfExists){
                        /* return options.splice(1,4) */
                        filtroOpciones.push(options[1])
                        filtroOpciones.push(options[2])
                        filtroOpciones.push(options[3])
                        filtroOpciones.push(options[4])    
                    }
                    else{
                        filtroOpciones.push(options[1])
                        filtroOpciones.push(options[2])
                        filtroOpciones.push(options[4])
                    /*     let subir = options[4]
                        let array = options.splice(1,2)    
                        array.push(subir)
                        return array */
                    }
                }
                else{                                                
                    /* return options.splice(0,1) */
                    filtroOpciones.push(options[0])
                }
            } 
            return filtroOpciones  
            }
        },
        descargar_escaneado(value){
            ServiceReportePDF.generar_pdf_sellado_preventivo(value.referenceNumber)
        },
    }
}
</script>