<template>
    <div>               
        
        <!--////////////////////////////////////////////////////////////////////
        ///                    FILTROS DE NAVEGACION   DTC                 ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'DTC'" class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols font-titulo" 
        :class="{ 'mt-5 grid gap-4 max-w-6xl mx-auto pl-3 pr-3': dtcVista == 'pendientes' }">
        <h1 class="text-black text-center text-4xl mt-3 -mb-6 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 sm:text-xs sm:ml-3" 
            :class="{ 'grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:ml-3':dtcVista == 'pendientes' }">
            <div class="mr-4 mt-4">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Seleccione una Plaza:</p>
                <p class="-ml-20 sm:ml-4">
                    <SelectPlaza :fullPlazas="true" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                </p>
            </div>
            <div class="m-3">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Seleccione una Fecha:</p>
                <p class="input w-40 sm:w-62 sm:ml-3"><input v-model="fechaFiltro" class="border-none w-40 sm:w-full" @change="filtar_dtc_generico" type="date"/></p>
                <span class="block text-xs text-gray-600 sm:ml-3">*Fecha de Elaboración</span>
            </div>
            <div class="m-3">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Escriba la Referencia:</p>
                <p class="input w-40 sm:w-62 sm:ml-3"><input v-model="buscarDTC" class="border-none w-40 text-center sm:w-full"  placeholder="PM-000000"/></p>
            </div> 
            <div class="m-3" v-if="dtcVista == 'pendientes'">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Estatus DTC:</p>
                <p class="input w-40 sm:w-62 sm:ml-3">
                    <select v-model="statusFiltro" class="w-full border-none" @change="filtar_dtc_generico" type="text">
                        <option value="">Selecionar...</option>     
                        <option v-for="(item, key) in listaStatus" :key="key" :value="item.id" >{{ item.nombre }}</option>                                                                                                                                                                                                           
                    </select>
                </p>
            </div>     
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  DTC                   ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="-mt-1 mb-4 text-center sm:mt-2">
            <button @click="limpiar_filtros_dtc" class="w-32 botonTodos font-boton sm:h-8">
                <img src="../../assets/img/todos.png" class="mr-2" width="25" height="2"/>
                <span>Todos</span>
            </button>
            <button @click="filtar_dtc_generico" class="w-32 botonIconBuscar font-boton hidden">
                <img src="../../assets/img/lupa.png" class="" width="25" height="2"/>
                <span >Buscar</span>
            </button>
        </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                    FILTROS DE NAVEGACION GMMEP                 ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'GMMEP'" class="mt-1 sm:-mt-8 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols font-titulo" 
        :class="{ 'mt-5 grid gap-4 max-w-6xl mx-auto pl-3 pr-3': dtcVista == 'pendientes' }">
        <h1 class="text-black text-center text-4xl mt-3 -mb-6 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 sm:text-xs sm:ml-1" 
            :class="{ 'grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:ml-3':dtcVista == 'pendientes' }">
            <div class="mr-4 sm:m-3 sm:ml-1 mt-4">
                <p class="dtcpendientes font-bold sm:text-sm sm:text-center">Seleccione una Plaza:</p>
                <p class="-ml-20 sm:ml-1">
                    <SelectPlaza :fullPlazas="true" :vista="'GMMEP'" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                </p>
            </div>
            <div class="m-3">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Seleccione una Fecha:</p>
                <p class="input w-40 sm:w-62 sm:ml-1"><input v-model="fechaFiltro" @change="filtar_dtc_generico()" class="border-none w-40 sm:w-full" type="date"/></p>
                <span class="block text-xs text-gray-600 sm:ml-2">*Fecha de Elaboración</span>
            </div>
            <div class="m-3">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Escriba la Referencia:</p>
                <p class="input w-40 sm:w-62 sm:ml-1"><input v-model="buscarGMMEP" class="border-none w-40 text-center sm:w-62" placeholder="PM-000000"/></p>
            </div>     
        </div>
    <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  DTC               ////
       ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-4 text-center justify-items-center">
            <button @click="limpiar_filtros_dtc" class="w-32 botonTodos font-boton sm:h-8">
                <img src="../../assets/img/todos.png" class="mr-4" width="25" height="2"/>
                <span class="-ml-2">Todos</span>
            </button>
            <button @click="filtar_dtc_generico" class="w-32 botonIconBuscar font-boton hidden">
                <img src="../../assets/img/lupa.png" class="mr-4" width="25" height="2"/>
                <span >Buscar</span>
            </button>
        </div>
        </div>
        <!--///////////////////////////////////////////////////////////////////
           ///              FILTROS DE NAVEGACION INVENTARIO               ////         
         ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'INV'" class="mt-1 -mb-4 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols font-titulo">
        <h1 class="text-black text-center text-4xl mt-3 -mb-8 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:ml-3 ml-66 mb-3">
            <div class="mr-3 sm:mr-1 mt-6">
                <span class="mr-10 font-bold text-md">Buscar</span>
                    <input v-model="buscarPalabraInventario" placeholder="Componete/No Serie" class="bg-white input  -mt-1 sm:w-full border-none w-40" />
            </div>         
            <div class="text-sm sm:mt-4 mt-6">
                <span class="mr-10 font-bold text-md">Seleccione una Plaza</span>
                <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'edicion'" :edicion="1"></SelectPlaza>
            </div>
            <div class="mt-8 ml-8">
                    <p class="sm:text-sm text-gray-900 -mt-2 -ml-1 font-bold sm:-ml-8 text-md">Seleecione un Carril</p>
                    <p class="w-32 -ml-2 -mt-1 sm:-ml-8">
                    <select @change="buscar_inventario_new" v-model="carrilFiltro" class="w-32 sm:w-48 border-none is_valid" name="Carriles" type="text">
                        <option value="">Selecionar...</option>
                        <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                    </select></p>
            </div>
            <div class="mt-12 ml-16 sm:ml-1 sm:mt-3">
                <span class="text-gray-800">Editados: {{ contadorInventario }}</span>
            </div>
        </div>
        <div class="-mt-1 mb-4 ml-78 sm:ml-40 sm:-mt-4" v-if="typeUser == 1 || typeUser == 2 || typeUser == 3 || typeUser == 5">
            <button class="botonIconNext" @click="abrirModal">
                <span>Mantenimiento</span>
            </button>
        </div>
        <!-- <div class="-mt-1 mb-4 ml-78 sm:ml-40 sm:-mt-4" v-if="typeUser == 4 || typeUser == 10">
            <button class="botonIconNext" @click="abrirModal">
                <span>Agregar Componente</span>
            </button>
        </div> -->
        <!-- ////////////////////////////////////////////////////////////////////
        ///                         BOTONES inventario               ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="mb-3 text-center sm:mt-3 sm:mb-4 sm:ml-4 sm:text-xs -mt-10 mr-5 sm:inline-flex" :class="{'hidden' : contadorInventario < 1 }">
            <button @click="cancelar_filtro_inventario" class="w-32 botonIconBorrarCard font-boton ml-4 mr-4" :class="{'hidden' : contadorInventario < 1}">
                <img src="../../assets/img/borrar.png" class="mr-2 sm:mr-1 sm:ml-4" width="25" height="25"/>
                <span class="text-xs">Cancelar</span>
            </button>
            <button @click="actualizar_inventario" class="w-32 botonIconNext font-boton" :class="{'hidden' : contadorInventario < 1}">
                <img src="../../assets/img/save.png" class="mr-2 sm:mr-1 sm:ml-1" width="25" height="25" />
                <span class="text-xs">Guardar</span>
            </button>
        </div>     
        </div>    
        <!--///////////////////////////////////////////////////////////////////
           ///         FILTROS DE NAVEGACION ENCARGADOS                   ////         
         ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'ENC'" class="w-full  border mb-2 shadow-md rounded-lg font-titulo">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full grid grid-cols-2 text-base sm:text-sm sm:grid-cols-1">
            <div class="sm:-ml-24">
                <div class="ml-32 sm:ml-30">
                    <span class="mr-10 font-bold text-md sm:ml-20">Seleccione una Plaza:</span>
                    <SelectPlaza :fullPlazas="true" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                </div>                
            </div>
            <div class="text-center sm:-ml-33 sm:mt-2">
                <p class="font-bold sm:text-sm sm:ml-33">Nombre:</p>
                <input v-model="buscarEncargado" class="border-none w-40 text-center sm:w-65 sm:ml-33 sm:mt-1" placeholder="Nombre Apellido"/>
            </div>             
        </div>
        <div class="flex justify-center ml-8 mb-4 mt-4 sm:ml-0">
            <button class="botonIconBuscar font-boton hidden" @click="filtrar_encargados">
                <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="25" />
                <span>Buscar</span>
            </button>
            <button class="botonTodos font-boton sm:h-8" @click="limpiar_encargados">
                <img src="../../assets/img/todos.png" class="mr-2" width="25" height="25" />
                <span>Todos</span>
            </button>
        </div> 
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///         FILTROS DE NAVEGACION USUARIOS                          ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'USUARIO'" class="w-full border mb-2 shadow-md rounded-lg font-titulo">
        <h1 class="text-black text-center text-4xl mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>      
            <div class="text-center sm:ml-6 mb-6">
                <p class="font-bold  sm:text-sm sm:-ml-6 sm:text-center">Nombre</p>
                <input v-model="buscarUsuario" class=" ml-67 w-66 text-center is_valid sm:-ml-4" placeholder="Nombre Apellidos"/>
            </div>             
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                   FILTROS DE DTC BORRADO                        ///         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'BORRADO'" class="w-77 border mb-2 shadow-md rounded-lg font-titulo sm:w-67 sm:ml-1">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full grid grid-cols-1 text-base sm:text-sm sm:grid-cols-1 sm:-ml-4">
            <div class="text-center sm:ml-6 mb-6">
                <p class="font-bold sm:text-sm sm:text-center">Referencia</p>
                <input v-model="buscarBorrado" class="border w-66 text-center ml-64 sm:w-32 is_valid sm:ml-20" placeholder="PM-000000"/>
            </div>             
        </div> 
        </div>
        <!--///////////////////////////////////////////////////////////////////
        ///                    FILTROS DE NAVEGACION   DIAGNOSTICO         ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'DF'" class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols font-titulo" >
        <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-xl font-bold">{{ titulo }}</h1>
        <div class="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:ml-3" >
            <div class="m-3 sm:ml-1">                                        
                <p class="font-bold mb-2 sm:text-xs sm:text-center">Seleccione una Plaza:</p>
                <p class="-ml-20 sm:-ml-1">
                    <SelectPlaza :fullPlazas="true" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                </p>
            </div>
            <div class=" m-3">
                <p class="font-bold mb-2 sm:text-xs sm:text-center">Seleccione una Fecha:</p>
                <input v-model="fechaFiltro" class="border w-40 sm:text-xs sm:w-full is_valid" @change="filtar_concentrado_diagnostico_falla" type="date"/>
                <span class="block text-xs text-gray-600">*Fecha de Elaboración</span>
            </div>
            <div class="m-3">
                <p class="font-bold sm:text-xs mb-2 sm:text-center">Escriba la Referencia:</p>
                <input v-model="buscarDF" class="border w-40 text-xs text-center sm:w-full is_valid" placeholder="PM-000000"/>
            </div> 
            <div class="m-3">
                <p class="font-bold sm:text-xs mb-2 sm:text-center">Ubicación (Carril):</p>
                <select class="is_valid" v-model="ubicacion" @change="filtar_concentrado_diagnostico_falla" type="text">
                    <option value="">Selecionar...</option>
                    <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                </select>                
            </div>     
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  DIAGNOSTICO           ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-4 sm:text-xs text-center">
            <button @click="limpiar_filtros_diagnostico_falla" class="w-32 botonTodos font-boton">
                <img src="../../assets/img/todos.png" class="mr-2" width="25" height="2"/>
                <span>Todos</span>
            </button>
            <button @click="filtar_concentrado_diagnostico_falla" class="w-32 botonIconBuscar font-boton hidden">
                <img src="../../assets/img/lupa.png" class="" width="25" height="2"/>
                <span>Buscar</span>
            </button>
        </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                   FILTROS DE COMENTARIOS                        ///         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'COMENTARIOS'" class="w-77 border mb-2 shadow-md rounded-lg font-titulo sm:w-67 sm:ml-1">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full grid grid-cols-1 text-base sm:text-sm sm:grid-cols-1 sm:-ml-4">
            <div class="text-center sm:ml-6 mb-6">
                <p class="font-bold ml-10 sm:text-sm sm:text-center sm:-ml-1">Usuario / Tipo de Falla</p>
                <input v-model="filtroComentario" class="border w-66 text-center ml-64 sm:w-32 is_valid sm:ml-24" placeholder="Usuario/Tipo de Falla"/>
            </div>             
        </div> 
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                   FILTROS DE COMENTARIOS                        ///         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'COMPONENTES'" class="border mb-2 shadow-md rounded-lg font-titulo sm:ml-1">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full text-base sm:text-sm sm:grid-cols-1 sm:-ml-4 hidden">
            <div class="text-center sm:ml-6 mb-6 justify-center">
                <p class="font-bold -ml-10 sm:text-sm sm:text-center sm:-ml-1">Usuario / Tipo de Falla</p>
                <input  class="border ml-65 w-66 text-center sm:w-32 is_valid sm:ml-24" placeholder="Usuario/Tipo de Falla"/>
            </div>             
        </div>
        <div class="mb-4 ml-67 sm:ml-40 sm:-mt-4">
            <button class="botonIconExcel" @click="descargarReporte">
                <img src="@/assets/img/excel.png" class="mr-2" width="25" height="25" />
                <span>Descargar Reporte</span>
            </button>
        </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                   FILTROS DE COMENTARIOS                        ///         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'NOSELLADOS'" class="border mb-2 shadow-md rounded-lg font-titulo sm:ml-1">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full text-base sm:text-sm sm:grid-cols-1 sm:-ml-4">
            <div class="text-center ml-6 sm:ml-6 mb-6 justify-center">
                <p class="font-bold -ml-10 sm:text-sm sm:text-center sm:-ml-1">Referencia</p>
                <input v-model="buscarNoSellado" class="border ml-65 w-66 text-center sm:w-32 is_valid sm:ml-24" placeholder="PM-00000"/>
            </div>             
        </div>
        <div class="mb-4 ml-76 -mt-16 sm:ml-40 sm:-mt-4">
            <button class="botonIconExcel" @click="descargarReporte">
                <img src="@/assets/img/excel.png" class="mr-2" width="25" height="25" />
                <span>Descargar Reporte</span>
            </button>
        </div>
        </div>
    </div>
</template>

<script>
import EventBus from '../../services/EventBus'
import SelectPlaza from '../Header/SelectPlaza'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: "HeaderGenerico",
    components: {
        SelectPlaza
    },
    props:{
        //Props Interno Componente
        titulo: {
            type: String,
            default: () => ''
        },
        tipo:{
            type: String,
            default: () => ''
        },
        //Props Inventario
        contadorInventario: {
            type: Number,            
            default: () => 0
        },
        //Props DTC
        dtcVista: {
            type: String,
            default: () => 'concentrado'
        },
        listaStatus: {
            type: Array,
            default: () => []
        }
    },
    ///////////////////////////////////////////////////////////////////////
    ////                      DATA                                    ////
    /////////////////////////////////////////////////////////////////////
    data: function (){
        return {            
            infoDTC:[],                                    
            //data inventario
            boolUbicacion: true,
            boolComponente: false,
            buscarPalabraInventario: '',
            datosAd:{},
            //data filtros
            plazaFiltro: '',
            fechaFiltro: '',
            referenciaFiltro: '',
            statusFiltro: '',
            buscarGMMEP:'',
            buscarDTC: '',
            //data Diagnostico/Ficha
            ubicacion: '',
            plazaSeleccionada:"",
            //data Encargados Plaza
            nombreEncargado: "",
            buscarEncargado: '',
            //data DTC Borrado
            buscarBorrado: '',
            //data Usuario Bitacora
            buscarUsuario: '',
            //data Concentrado DF
            buscarDF:'',
            //data Comentarios
            filtroComentario:'',
            carrilFiltro: {
                capufeLaneNum: '0000',
                idGare: ''
            },
            buscarNoSellado:'',
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                       CICLOS DE VIDA                        ////
    /////////////////////////////////////////////////////////////////////
    beforeMount: function () {
        this.typeUser = this.$store.state.Login.cookiesUser.rollId  
        this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
        this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
        this.carrilFiltro.idGare = this.plazaSeleccionada
        this.buscar_inventario_new()    
    },
    computed:{
        carriles_plaza(){
            return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
        },
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
        abrirModal: function (){
            this.$emit('abrir-modal')
        },
        abrirAgregarComponente: function (){
            this.$emit('abrir-agregar')
        },
        descargarReporte: function (){
            this.$emit('descargar-reporte')
        },
        buscar_inventario_new(){       
            let clavePlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
            this.$http.get(`${API}/DtcData/InventoryComponentsList/${clavePlaza}/${this.plazaSeleccionada}/${this.carrilFiltro.capufeLaneNum}/${this.carrilFiltro.idGare}`)
                .then((response)=>{                
                    this.$store.commit('Refacciones/FULL_COMPONENT_MUTATION',response.data.result)
                    EventBus.$emit('ACTUALIZAR_INVENTARIO')
                })                          
        },
        cambiar_plaza(numeroPlaza) {              
            this.plazaSeleccionada = numeroPlaza 
            //this.carrilFiltro =  this.carriles_plaza[0].lane
            //this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)   
        },
        //Metodos Internos Componente
        actualizar_plaza_filtro(value){           
            this.plazaFiltro = value 
            //this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaFiltro)
            this.filtrar_encargados()
            this.filtar_dtc_generico()
            this.filtar_concentrado_diagnostico_falla()
        },
        //Metodos Para Inventario
        cancelar_filtro_inventario: function(){
            this.$emit('cancelar-filtros')
        },
        actualizar_inventario: function(){
            this.$emit('guardar-cambios')            
        },
        cambiar_orden_inventario: function(orden){        
            this.$emit('cambiar-orden', orden)
            this.boolUbicacion = this.boolComponente = false 
            orden =='ubicacion' ? this.boolUbicacion = true : this.boolComponente = true
        },
        //Metodos Para Listar DTC
        limpiar_filtros_dtc: function(){   
            this.plazaFiltro = ''
            this.referenciaFiltro = ''
            this.statusFiltro = ''
            this.fechaFiltro = ''         
            this.buscarGMMEP = ''
            this.buscarDTC = ''
            EventBus.$emit('Limpiar-SelectPlaza')            
            this.$emit('limpiar-filtros')
        },
        filtar_dtc_generico(){
            let objFiltro = {
                'plazaFiltro': this.plazaFiltro,
                'fechaFiltro': this.fechaFiltro,
                'referenciaFiltro': this.referenciaFiltro,
                'statusFiltro': this.statusFiltro,                
            }
            this.$emit('filtrar-dtc',objFiltro)
        },
        //Metodos Para Encados de Plaza
        filtrar_encargados: function (){            
            this.$emit('filtrar-encargados',{plaza:this.plazaFiltro,nombre:this.nombreEncargado})
        },
        limpiar_encargados: function (){
            this.$emit('limpiar-encargados')
            this.buscarEncargado = ''
            this.plazaSeleccionada = ''
        },
        //Metodos para Concentrado DTC Borrados
        //Metodos Concentrado de Diagnostico Falla
        limpiar_filtros_diagnostico_falla: function(){
            this.buscarDF = ''
            this.ubicacion = ''
            this.fechaFiltro = ''
            EventBus.$emit('Limpiar-SelectPlaza')
            this.$emit('limpiar-concentrado-diagnostico')
        },
        filtar_concentrado_diagnostico_falla: function(){            
            this.$emit('filtrar-concentrado-diagnostico', {
                numPlaza: this.plazaFiltro,
                fecha: this.fechaFiltro,
                //numeroReferencia: this.referenciaFiltro,
                ubicacion: this.ubicacion
            })
        },
    },
    watch:{
        buscarDTC: function(newPalabra){
            this.$emit('buscar-dtc', newPalabra.trim())
        },
        buscarDF: function (newPalabra){
            this.$emit('buscar-df', newPalabra.trim())
        },
        buscarGMMEP: function (newPalabra){
            this.$emit('buscar-gmmep', newPalabra.trim())
        },
        buscarPalabraInventario: function(newPalabra){
            this.$emit('filtra-palabra', newPalabra.trim())
        },
        buscarUsuario: function(newPalabra){
            this.$emit('filtrar-usuario', newPalabra.trim())
        },
        buscarBorrado: function(newPalabra){
            this.$emit('filtrar-borrado', newPalabra.trim())
        },
        buscarEncargado: function(newPalabra){
            this.$emit('buscar-encargado', newPalabra.trim())
        },
        filtroComentario: function(newPalabra){
            this.$emit('filtrar-comentario', newPalabra.trim())
        },
        buscarNoSellado: function(newPalabra){
            this.$emit('buscar-nosellado', newPalabra.trim())
        }
    }
}
</script>