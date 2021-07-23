<template>
    <div>
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3 max-w-6xl mx-auto sm:-ml-1">     
            <div class=" border shadow-lg rounded-md w-full mt-5 sm:mx-auto">
            <!--/////////////////////////////////////////////////////////////////////
            ////                         MODAL SELLADO                         /////
            ////////////////////////////////////////////////////////////////////-->
                <PdfEscaneado @limpiar-componente-escaneado="limpiar_componete_escaneado" :abrirModal="modalSubirSellado" :objInsert="objInsertEscaneado" :tipoReporte="'Calendario-Actividades'"></PdfEscaneado>
                
                <h1 class=" text-3xl sm:text-sm font-titulo font-bold text-center sm:mt-4">TABLA DE ACTIVIDADES DEL MES {{ mesNombre }} DEL {{ año }}</h1>
                <div v-if="filtros" class="grid grid-cols-1 -mt-3">
                    <div class="grid grid-cols-1">
                        <!--//////////////////////////////////////////////////////////////////////
                        ////                   INFO DE PLAZA                             ////
                        ////////////////////////////////////////////////////////////////////-->                        
                        <div class="pl-10 sm:pl-3 mt-6 grid grid-cols-1 font-titulo sm:text-xs">
                            <div class="ml-0 md:hidden lg:hidden xl:hidden">
                                <p class="text-sm sm:text-xs text-gray-900 ml-32 mb-1 font-semibold">Plaza:</p>
                                <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true"></SelectPlaza>
                            </div>
                            <div class="grid grid-cols-4 sm:w-full sm:ml-1 w-full xl:text-center">                                       
                                <div class="sm:hidden -mt-2">
                                    <p class="text-sm sm:text-xs text-gray-900 ml-20 mb-1 font-semibold">Plaza:</p>
                                    <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true"></SelectPlaza>
                                </div>                                                    
                                <div class="mb-4 ml-5 sm:ml-1 sm:mt-4">
                                    <p class="text-sm sm:text-xs sm:ml-12 text-gray-900 ml-1 mb-1 font-semibold">Mes:</p>                                
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
                                <div class="mb-4 ml-4 sm:mt-4 sm:ml-21">
                                    <p class="text-sm sm:text-xs sm:ml-16 text-gray-900 ml-1 font-semibold">Año:</p>
                                    <p class="w-32 input ml-16 sm:ml-2">
                                    <select :disabled="blockSelect" @change="filtrar_sin_referencia" v-model="año" class="w-32 sm:w-32 border-none" type="text" name="TipoDescripcion" >
                                        <option disabled value>Selecionar...</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>                                        
                                    </select></p>
                                </div>
                                <div class="mb-4 ml-5 sm:mt-20 sm:ml-1">
                                    <p class="text-sm sm:text-xs text-gray-900 ml-1 font-bold sm:ml-13">Carril:</p>
                                    <p class="w-32 input ml-16 sm:ml-2">
                                    <select v-model="ubicacion" @change="filtrar_sin_referencia" :disabled="blockSelect" class="w-32 border-none"  type="text">
                                        <option value="">Selecionar...</option>
                                        <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                                    </select></p>
                                </div> 
                                <div v-if="this.tipoUsuario != 5 && this.tipoUsuario != 2" class="mb-4 sm:-ml-50 sm:mt-20 -ml-20">
                                    <p class="text-sm sm:text-xs sm:ml-10 text-gray-900 ml-33 mb-1 font-bold">Status:</p>
                                    <p class="w-48 input ml-33 sm:ml-1 sm:w-32">
                                    <select  v-model="status" @change="filtrar_sin_referencia" :disabled="blockSelect" class="w-48 sm:w-32 border-none" type="text" name="TipoDescripcion" >
                                        <option value="">Todos</option>
                                        <option :value=true>Concluido</option>
                                        <option :value=false>Inconcluso</option>                                        
                                    </select></p>
                                </div>
                                <div class="mb-4 ml-10 font-bold sm:ml-1 sm:w-full" :class="{'ml-18 sm:-ml-64 sm:mt-20':tipoUsuario == 2 || tipoUsuario == 5}">
                                    <p class="text-sm sm:text-xs font-semibold text-gray-900 ml-6 mr-2 sm:text-center sm:ml-8 sm:mb-1">Referencia:</p>
                                    <input v-model="referenceNumber" class="text-center input sm:w-32" placeholder="PM-00000" type="text">
                                </div>
                                <div class="mt-2 ml-4 sm:ml-17 sm:mt-3" :class="{'-ml-1 sm:-mt-1 sm:mb-3':tipoUsuario == 2 || tipoUsuario == 5}">
                                    <button @click="limpiar_filtros" class="botonTodos sm:w-32 sm:h-8" :class="{'ml-10 sm:ml-2 sm:w-32 sm:h-8':tipoUsuario == 2 || tipoUsuario == 5}">
                                        <img src="../../assets/img/todos.png" class="mr-2 xl:ml-2 md:ml-0" width="25" height="2"/>
                                        <span class="">Todos</span>
                                    </button>
                                </div>
                            </div>                           
                        </div>                        
                    </div>                                        
                </div> 
                <div class="text-center md:hidden lg:hidden xl:hidden">
                    <button @click="filtros=false" v-if="filtros">
                        <img src="../../assets/img/up.png" width="25" height="2"/>
                    </button>
                    <button @click="filtros=true" v-else>
                        <img src="../../assets/img/down.png" width="25" height="2"/>
                    </button>
                </div>
            </div>
            <div class="sm:-m-1 sm:w-full sm:-mb-32 sm:mx-auto sm:text-xs">
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
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////////
                        ////                           Body TABLA                     //////////
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
                                    <td class="w-69 text-center cuerpoTable">                                            
                                        <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                            <template slot="singleLabel" slot-scope="props">
                                                <div class=" inline-flex">
                                                    <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                                                    <span class="option__title">{{ props.option.title }}</span>
                                                </div>
                                            </template>
                                            <template slot="option" slot-scope="props">                                                
                                                <div class="option__desc"><span class="option__title inline-flex">
                                                    <img :src="props.option.img" class="mr-5" width="15" height="15">    
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

import Multiselect from "vue-multiselect";
import ServicioActividades from '../../services/ActividadesService.js'
import SelectPlaza from '../Header/SelectPlaza'
import ServiceReportePDF from '../../services/ReportesPDFService'
import PdfEscaneado from '../PdfEscaneado.vue'
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
            filtros: true
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
    opticones_select_acciones({ statusMaintenance, pdfExists }){
        let options= [
            { title: 'Crear', img: '/img/nuevoDtc.90090632.png' },
            { title: 'Editar', img: '/img/pencil.04ec78bc.png' },
            { title: 'Reporte de Mantenimiento', img: '/img/download.ea0ec6db.png' },
            { title: 'Reporte M. Sellado', img: '/img/download.ea0ec6db.png'},
            { title: 'Reporte Mtto. Sellado', img: '/img/upload.8d26bb4f.png'},
        ]
        if(this.tipoUsuario == 4 || this.tipoUsuario == 7 || this.tipoUsuario == 5 || this.tipoUsuario == 2){
            if(pdfExists){
                return options.splice(2,2)
            }
            else{
                return options.splice(2,1)
            }    
        }
        else{            
            if(statusMaintenance){  
                if(pdfExists){
                    return options.splice(1,4)     
                }
                else{
                    let subir = options[4]
                    let array = options.splice(1,2)    
                    array.push(subir)
                    return array
                }
            }
            else{                                                
                return options.splice(0,1)
            }
        }   
    },
    subir_esaneado(){
        let clavePlaza = this.objSubir.split('-',1)
        let file = this.base64ToFile(this.pdfSellado.imgbase, 'pdfescaneado')        
        let formData = new FormData()
        formData.append('file', file)        
        this.$http.post(`${API}/MantenimientoPdf/TablaActEscaneado/${clavePlaza}/${this.objSubir}`, formData)
            .then(()=>{
                this.$notify.success({
                    title: "Ok!",
                    msg: `Se subió el archivo correctamente.`,
                    position: "bottom right",
                    class:"font-titulo",
                    styles: {
                    height: 100,
                    width: 500,
                    },
                });
                this.pdfSelladoBool = true
            })         
    },
    descargar_escaneado(value){
        ServiceReportePDF.generar_pdf_sellado_preventivo(value.referenceNumber)
    },
},
}
</script>
