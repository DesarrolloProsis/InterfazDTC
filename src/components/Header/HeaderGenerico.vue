<template>
    <div>               
        <!--////////////////////////////////////////////////////////////////////
        ///                    FILTROS DE NAVEGACION   DTC                 ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'DTC'" class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:mx-auto shadow-md grid grid-cols font-titulo" 
        :class="{ 'mt-5 grid gap-4 max-w-6xl mx-auto pl-3 pr-3': dtcVista == 'pendientes' }">
        <h1 class="text-black text-center text-4xl mt-3 -mb-6 sm:mb-1 sm:text-2xl sm:mx-auto font-bold">{{ titulo }}</h1>
        <div class="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 sm:text-xs sm:mx-3" 
            :class="{ 'grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:ml-3':dtcVista == 'pendientes' }">
            <div class="mr-4 sm:mx-auto mt-4  ">
                <p class="pdtcpendientes sm:text-sm sm:mx-auto sm:text-center">Seleccione una Plaza:</p>
                <p class="-ml-20 sm:mx-auto">
                    <SelectPlaza :fullPlazas="true" :vista="'ConcentradoDTC'" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                </p>
            </div>
            <div class="m-3 sm:mx-auto ">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Seleccione una Fecha:</p>
                <p class="input w-40 sm:w-62 sm:mx-auto"><input v-model="fechaFiltro" class="border-none w-40 sm:w-full" @change="filtar_dtc_generico" type="date"/></p>
                <span class="block text-xs text-gray-600 sm:ml-3">*Fecha de Elaboración</span>
            </div>
            <div class="m-3 sm:mx-auto ">
                <p class="pdtcpendientes sm:text-sm sm:text-center">Escriba la Referencia:</p>
                <p class="input w-40 sm:w-62 sm:mx-auto"><input v-model="buscarDTC" class="border-none w-40 text-center sm:w-full"  placeholder="PM-000000"/></p>
            </div> 
            <div class="m-3 " v-if="dtcVista == 'pendientes'">
                <p class="pdtcpendientes sm:text-sm sm:text-center sm:mx-auto">Estatus DTC:</p>
                <p class="input w-40 sm:w-62 sm:mx-auto">
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
                <!-- <img src="../../assets/img/todos.png" class="mr-2" width="25" height="2"/> -->
                <font-awesome-icon icon="fa-solid fa-repeat" class="text-green-800 mr-2 h-5 w-5 "/>
                <span>Todos</span>
            </button>
        </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                    FILTROS DE NAVEGACION GMMEP                 ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'GMMEP'" class="mt-1 mb-1 flex flex-col sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md md:w-auto font-titulo" 
        :class="{ 'mx-auto': dtcVista == 'pendientes' }">
        <h1 class="text-black text-center text-4xl sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="flex content-center sm:flex-col  sm:justify-center md:justify-center" 
            :class="{ 'flex content-center sm:flex-col sm:justify-center md:justify-center lg:justify-center xl:justify-center':dtcVista == 'pendientes' }">
            <div class="p-3 w-1/4">
                <div class="w-48 mx-auto text-center">
                    <p class="font-bold sm:text-sm sm:text-center">Seleccione una Plaza:</p>
                    <SelectPlaza :fullPlazas="true" :vista="'GMMEP'" :tipo="'filtro'" @actualizar-plaza="filtrarGMEEP"></SelectPlaza>
                </div>
            </div>
            <div class="p-3 w-1/4">
                <div class="text-center mx-auto font-bold">
                    <p class=" sm:text-sm sm:text-center">Seleccione una Fecha:</p>
                    <input v-model="fechaFiltro" @change="filtrarGMEEP()" class="input mx-auto border-none w-40 sm:w-full" type="date"/>
                    <span class="block text-xs text-gray-600 sm:ml-2">*Fecha de Elaboración</span>
                </div>
            </div>
            <div class="p-3 w-1/4">
                <div class="text-center font-bold">
                    <p class="sm:text-sm">Escriba la Referencia:</p>
                    <input v-model="buscarGMMEP" @change="filtrarGMEEP()" class="input mx-auto border-none w-40 text-center sm:w-62 md:w-48" placeholder="PM-000000"/>
                </div>
            </div>
            <div class="p-3  w-1/4">
                <div class="text-center font-bold">
                    <p class="sm:text-sm">Estatus</p>
                    <select class="input mx-auto border-none w-40 text-center sm:w-62 md:w-48" v-model ="estatus" @change="filtrarGMEEP()">
                        <option value=""></option>
                        <option value="4">GMEEP (4)</option>
                        <option value="5">Gerencia (5)</option>
                    </select>
                </div>
            </div>      
        </div>
    <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  GMEEP              ////
       ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-4 text-center justify-items-center">
            <button @click="filtrar_GMMEP_todos()" class="w-32 botonTodos font-boton sm:h-8">
                <img src="../../assets/img/todos.png" class="mr-4" width="25" height="2"/>
                <span class="-ml-2">Todos </span>
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
        <div v-if="tipo == 'INV'" class="mt-1 -mb-12 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols font-titulo">
        <h1 class="text-black text-center text-4xl mt-3 -mb-8 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class=" grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 md:mx-auto md:ml-30 md:mt-5 md:-mb-1 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:mx-auto ml-64 mb-3 ">
            <div class="mr-3  mt-6 sm:w-full sm:mx-auto md:mx-auto md:mr-10">
                <span class="mr-10 font-bold text-md sm:mx-auto ">Buscar</span>
                <input v-model="buscarPalabraInventario" placeholder="Componete/No Serie" class="bg-white input  -mt-1 sm:w-full border-none w-40" />
            </div>         
            <div class="text-sm sm:mt-4 mt-6 md:mx-auto md:mr-34 ">
                <span class="mr-10 font-bold text-md">Seleccione una Plaza</span>
                    <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :vista="'Inventario'" :tipo="'edicion'" :edicion="1"></SelectPlaza>
            </div>
            <div class="mt-8 ml-8 sm:ml-0 md:mx-auto md:mr-13">
                    <p class="sm:text-sm text-gray-900 -mt-2 -ml-1 font-bold text-md">Seleccione un Carril</p>
                    <p class="w-32 -ml-2 -mt-1 sm:ml-0 sm:w-full">
                    <select @change="buscar_inventario_new" v-model="carrilFiltro" class="w-32 sm:w-full  border-none is_valid" name="Carriles" type="text">
                        <option value="">Selecionar...</option>
                        <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                    </select></p>
            </div>
            <div class="mt-12 ml-1 grid grid-cols-2 sm:ml-1 sm:mt-3 md:mx-auto md:ml-0" :class="{'hidden':typeUser == 4 || typeUser == 7}">
                <div>
                    <span class="text-gray-800">Editados: {{ contadorInventario }}</span>
                </div>
                <div class="-ml-3" v-if="typeUser == 1 || typeUser == 2 || typeUser == 3 || typeUser == 5">
                    <multiselect v-model="value" @close="acciones_mapper()" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel" :show-labels="false">
                        <template slot="singleLabel" slot-scope="props">
                            <div class="inline-flex">
                                <!-- <img :src="props.option.img" class="mr-5" width="15" height="15"> -->
                                <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                <span class="option__title bg-red-300">{{ props.option.title }}</span>
                            </div>
                        </template>
                        <template slot="option" slot-scope="props">                                                
                            <div class="option__desc ">
                                <span class="option__title inline-flex">
                                    <!-- <img :src="props.option.img" class="mr-5" width="15" height="15">     -->
                                    <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>    
                                    {{ props.option.title }}
                                </span>
                            </div>
                        </template>
                    </multiselect>
                </div>
            </div>
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                         BOTONES inventario               ////
        ////////////////////////////////////////////////////////////////////-->
        <div class=" mb-3 text-center sm:mt-3 sm:mb-4 sm:ml-4 sm:text-xs -mt-8 mr-5 sm:inline-flex" :class="{'hidden' : contadorInventario < 1 }">
            <button @click="cancelar_filtro_inventario" class="w-32 botonIconBorrarCard font-boton ml-4 mr-4" :class="{'hidden' : contadorInventario < 1}">
                <img src="../../assets/img/borrar.png" class="mr-2 sm:mr-1 sm:ml-4" width="25" height="25"/>
                <span class="text-xs">Cancelar</span>
            </button>
            <button @click="actualizar_inventario" class="w-32  botonIconNext font-boton" :class="{'hidden' : contadorInventario < 1}">
                <img src="../../assets/img/save.png" class="mr-2 sm:mr-1 sm:ml-1" width="25" height="25" />
                <span class="text-xs ">Guardar</span>
            </button>
        </div>     
        </div>    
        <!--///////////////////////////////////////////////////////////////////
           ///         FILTROS DE NAVEGACION ENCARGADOS                   ////         
         ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'ENC'" class="w-full   mb-2 shadow-md rounded-lg font-titulo">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full grid grid-cols-2 text-base sm:text-sm sm:grid-cols-1 sm:mx-auto ">
            <div class="sm:mx-auto sm:w-full ">
                <div class="ml-32 sm:mx-auto sm:ml-0 md:mx-auto">
                    <span class="mr-10 font-bold text-md sm:mr-0 sm:mx-21 md:mx-21">Seleccione una Plaza:</span>
                    <p class="lg:-mx-21 xl:-mx-20">
                        <SelectPlaza :fullPlazas="true" :vista="'Encargados'" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                    </p>
                </div>                
            </div>
            <div class="text-center sm:mt-2  ">
                <p class="font-bold sm:text-sm ">Nombre:</p>
                <input v-model="buscarEncargado" class="border-none w-40 text-center sm:w-full sm:mt-1" placeholder="Nombre Apellido"/>
            </div>             
        </div>
        <div class="flex justify-center ml-8 mb-4 mt-4 sm:ml-0">
            <button class="botonIconBuscar font-boton hidden" @click="filtrar_encargados">
                <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="25" />
                <span>Buscar</span>
            </button>
            <button class="botonTodos font-boton mb-3 sm:h-8" @click="limpiar_encargados">
                <!-- <img src="../../assets/img/todos.png" class="mr-2" width="25" height="25" /> -->
                <font-awesome-icon icon="fa-solid fa-repeat" class="text-green-800 mr-2 h-5 w-5 "/>
                <span>Todos</span>
            </button>
        </div> 
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///         FILTROS DE NAVEGACION USUARIOS                          ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'USUARIO'" class="w-full border mb-2 shadow-md rounded-lg font-titulo">
        <h1 class="text-black text-center text-4xl mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>      
            <div class="text-center sm:auto md:mx-auto lg:mx-auto xl:mx-auto mb-6">
                <p class="font-bold  sm:text-sm sm:-ml-6 sm:text-center">Nombre</p>
                <input v-model="buscarUsuario" class=" ml-67 w-66 text-center is_valid sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto" placeholder="Nombre Apellidos"/>
            </div>             
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ///                   FILTROS DE DTC BORRADO                        ///         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'BORRADO'" class="w-77 border mb-2 shadow-md rounded-lg font-titulo sm:w-67 sm:ml-1">
        <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
        <div class="sm:w-full grid grid-cols-1 text-base sm:text-sm sm:grid-cols-1 sm:-ml-4">
            <div class="text-center sm:ml-6 mb-6 flex">  
                <div class="mx-auto">
                <p class="font-bold sm:text-sm sm:text-center -mr-32">Referencia</p>
                <input v-model="buscarBorrado" class="border w-66 text-center sm:w-32 is_valid sm:ml-20 -mr-32" placeholder="PM-000000"/>
                </div>
                <div class="my-auto mr-12">
                <button class="botonIconExcel" @click="descargarReportedtcborrados">
                <img src="@/assets/img/excel.png" class="mr-2" width="25" height="25" />
                </button>
                </div>
                
            </div>             
        </div> 
        </div>
        <!--///////////////////////////////////////////////////////////////////
        ///                    FILTROS DE NAVEGACION   DIAGNOSTICO         ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'DF'" class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols md:w-auto font-titulo" >
        <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-lg font-bold">{{ titulo }}</h1>
        <div class="grid grid-cols-1 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:mx-auto md:mx-auto" >
            <div class="m-3 sm:m-0">                                        
                
                <p class="font-bold mb-2 sm:text-xs sm:text-center md:mx-12 lg:mx-6 xl:mx-21 inline-flex">Seleccione una Plaza: </p>
                <div class="sm:mx-16 lg:-mx-18 xl:-mx-8 ">
                    <div class="inline-flex mx-8">
                        <SelectPlaza :fullPlazas="true" :tipo="'filtro'" @actualizar-plaza="actualizar_plaza_filtro"></SelectPlaza>
                    </div>
                </div>
            </div>
            <div class=" m-3 md:mx-auto ">
                <p class="font-bold mb-2 sm:text-xs sm:text-center md:mx-10 lg:mx-6 xl:mx-21">Seleccione una Fecha:</p>
                <input v-model="fechaFiltro" class="border w-40 sm:text-xs sm:w-48 sm:mx-14 md:mx-12 lg:mx-8 xl:mx-21 is_valid" @change="filtar_concentrado_diagnostico_falla" type="date"/>
                <span class="block text-xs text-gray-600 sm:mx-16 md:mx-12 lg:mx-8 xl:mx-21">*Fecha de Elaboración</span>
            </div>
            <div class="m-3 sm:hidden md:mx-auto ">
                <p class="font-bold sm:text-xs mb-2 sm:text-center md:mx-10 lg:mx-8 xl:mx-21">Escriba la Referencia:</p>
                <input v-model="buscarDF" class="border w-40 text-xs text-center sm:w-full md:mx-auto lg:mx-8 xl:mx-20 is_valid" placeholder="PM-000000"/>
            </div> 
            <div class="m-3 md:mx-auto ">
                <p class="font-bold sm:text-xs mb-2 sm:text-center lg:mx-10 xl:mx-21">Ubicación (Carril):</p>
                <select class="is_valid sm:w-48 sm:mx-16 sm:text-center xl:w-48 xl:mx-16" v-model="ubicacion" @change="filtar_concentrado_diagnostico_falla" type="text">
                    <option value="">Selecionar...</option>
                    <option v-for="(item, key) in carriles_plaza" :key="key" :value="item">{{ item.lane }}</option>
                </select>                
            </div> 
            <div class="m-3 md:hidden lg:hidden xl:hidden">
                <p class="font-bold sm:text-xs mb-2 sm:text-center">Escriba la Referencia:</p>
                <input v-model="buscarDF" class="border w-40 text-xs text-center sm:w-full is_valid" placeholder="PM-000000"/>
            </div>     
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  DIAGNOSTICO           ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-4 sm:text-xs text-center">
            <button @click="limpiar_filtros_diagnostico_falla" class="w-32 botonTodos font-boton">
                <!-- <img src="../../assets/img/todos.png" class="mr-2" width="25" height="2"/> -->
                <font-awesome-icon icon="fa-solid fa-repeat" class="text-green-800 mr-2 h-5 w-5 "/>
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
        <div class="mb-4 flex justify-center lg:justify-center md:lg:justify-center sm:justify-center">
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
        <!--////////////////////////////////////////////////////////////////////
        ///                   FILTROS DE INCIOS SESION ULTIMO FILTRO            ///         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'InicioSesion'" class="border mb-2 shadow-md rounded-lg font-titulo sm:ml-1">
            <h1 class="text-black text-center text-4xl  mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
            <div class="sm:w-full text-base sm:text-sm sm:grid-cols-1 sm:-ml-4">
                <div class="text-center ml-2 mr-2 grid grid-cols-2 sm:ml-6 mb-6 justify-center">
                    <div> 
                        <p class="font-bold sm:text-sm sm:text-center sm:-ml-1">Nombre Usuario:</p>
                        <input v-model="sesionName" @change="filtrar_inicio_sesion_todos_change" class="border w-66 text-center sm:w-32 sm:ml-24 is_valid mx-auto" placeholder="Angel Daniel"/>
                    </div>
                    <div class="ml-6">
                        <p class="font-bold  sm:text-sm sm:text-center sm:-ml-1 mr-12 mx-4">Fecha:</p>
                        <input v-model="diaSesiones" type="date" class="border w-66 text-center sm:w-32 sm:ml-24 is_valid mx-auto"/>
                    </div>
                    <div class="col-span-2 ">
                        <button @click="filtrar_inicio_sesion_todos" class="w-32 botonTodos font-boton sm:h-8 mt-4" :class="{'hidden': sesioninicio == false}">
                        <img src="../../assets/img/todos.png" class="mr-2" width="25" height="2"/>
                        <span>Todos</span>
                        </button>

                        <button @click="filtrar_por_boton" class="w-32 botonBuscar font-boton sm:h-8 mt-4" :class="{'hidden': sesioninicio == true}">
                            <!-- <img src="../../assets/img/searchinicios.png" class="mr-2" width="25" height="2"/> -->
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-blue-600 mr-2 h-5"/>
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>             
            </div>           
        </div>
        <!--///////////////////////////////////////////////////////////////////
        ///                    FILTROS DE CONCENTRADO DTC FACTURADOS       ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'CDTCF'" class="mt-1 mb-1 flex flex-col sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md md:w-auto font-titulo" >
        <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-lg font-bold">{{ titulo }}</h1>
        <div class="flex content-center sm:flex-col sm:justify-evenly sm:justify-center md:justify-center md:justify-evenly lg:justify-center lg:justify-evenly xl:justify-center xl:justify-evenly" >
            <div class="xl:m-3 w-full xl:w-1/4">   
                <div class="w-48 sm:w-full sm:p-2 mx-auto text-center">
                    <label class="font-bold sm:text-xs sm:text-center">Seleccione una Plaza:</label>
                    <SelectPlaza :fullPlazas="true" :tipo="'filtro'" :vista="'DTCFacturados'" @actualizar-plaza="fitrarActas"></SelectPlaza>
                </div>                                     
            </div>
            <div class="xl:m-3 w-full xl:w-1/4">
                <div class="w-48 sm:w-full sm:p-2 mx-auto text-center">
                    <label class="font-bold sm:text-xs sm:text-center">Referencia:</label>
                    <input v-model="buscarDTCfacturado" class="border w-full text-xs text-center h-5 is_valid" @change="fitrarActas()" placeholder="PM-000000"/>
                </div>
            </div>
            <div class="xl:m-3 w-full xl:w-1/4" :class="{'hidden': (typeUser == 1 || typeUser == 3)}">
                <div class="w-48 sm:w-full sm:p-2 mx-auto text-center">
                    <label class="font-bold sm:text-xs sm:text-center">Usuario:</label>
                    <input v-model="usuarioActas" class="border w-full text-xs text-center h-5 is_valid" @change="fitrarActas()" placeholder="Usuario"/>
                </div>
            </div>
            <div class="xl:m-3 w-full xl:w-1/4">
                <div class="w-48 sm:w-full sm:p-2 mx-auto text-center">
                    <p class="font-bold sm:text-xs sm:text-center">Tipo de Falla</p>
                    <select class="input mx-auto border-none w-40 text-center sm:w-62 md:w-48" v-model="tipofallaActas" @change="fitrarActas()">
                        <option value=""></option>
                        <option value="2">Siniestro</option>
                        <option value="3">Fin de vida util</option>
                    </select>
                </div>
            </div> 
        </div>
        <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE CONCENTRADO DTC FACTURADOS        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="flex justify-center mb-6 sm:mb-1 sm:mt-2">
            <button @click="filtrar_Actas_todos" class="w-32 botonTodos font-boton sm:h-10">
                <img src="../../assets/img/todos.png" class="mr-2" width="25" height="2"/>
                <span>Todos</span>
            </button>
        </div>
        </div>
        <!--///////////////////////////////////////////////////////////////////
        ///                    Titulo Anexo 1-A                            ////         
        ///////////////////////////////////////////////////////////////////-->
        <div v-if="tipo == 'anexo1A'" class="mt-1 mb-1 flex flex-col sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md md:w-auto font-titulo" >
        <h3 class="text-black text-right text-md p-3 font-bold sm:text-center">{{subtitulo}}</h3>
        <h1 class="text-black text-center text-4xl mb-1 sm:mb-1 sm:text-sm font-bold">{{ titulo }}</h1>
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
        subtitulo: {
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
            buscarDTCfacturado:'',
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
            carrilFiltro: { capufeLaneNum: '0000', idGare: ''},
            buscarNoSellado: '',
            //datos InicioSesion
            diaSesiones: '',
            sesionName: '',
            sesioninicio: false,
            value: '',
            estatus: '',
            tipofallaActas: '',
            usuarioActas: '',
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
        formato: function (){
            this.$emit('formato-capufe')
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
            this.buscarDTCfacturado = ''
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
        descargarReportedtcborrados: function (){
            this.$emit('descargar-reporte-dtc')
        },
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
        //Metodos para SesionesIniciadas
        filtrar_inicios_sesion_fecha(){
            this.$emit('filtrar-inicios-sesion', this.diaSesiones)
        },
        filtrar_inicios_sesion_nombre(){
            if(this.sesionName != '' && this.sesionName.length >= 3)
                this.$emit('filtrar-inicios-sesion-name', this.sesionName)            
            else{
                this.$notify.warning({
                    title: "Ups!",
                    msg: `NOMBRE DEMASIADO CORTO.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
            }            
        },
        filtrar_inicios_sesion_nombre_fecha(){
            if(this.sesionName != '' && this.sesionName.length >= 3 && this.diaSesiones != ''){
                this.$emit('filtrar-inicios-sesion-name-fecha',this.sesionName, this.diaSesiones)   
            }
        },
        filtrar_por_boton(){
            if(this.sesionName != '' && this.diaSesiones == ''){
                if(this.sesionName.length >= 3){
                    this.sesioninicio = true
                    this.filtrar_inicios_sesion_nombre()
                }else{
                    this.$notify.warning({
                    title: "Ups!",
                    msg: `NOMBRE DEMASIADO CORTO.`,
                    position: "bottom right",
                    styles: {
                            height: 100,
                            width: 500,
                        },
                    });
                }
            }else if(this.diaSesiones != '' && this.sesionName == ''){
                this.sesioninicio = true
                this.filtrar_inicios_sesion_fecha()
            }else if(this.diaSesiones != '' && this.sesionName != ''){
                if(this.sesionName.length >= 3){
                    this.sesioninicio = true
                    this.filtrar_inicios_sesion_nombre_fecha()
                }else{
                    this.$notify.warning({
                    title: "Ups!",
                    msg: `NOMBRE DEMASIADO CORTO.`,
                    position: "bottom right",
                    styles: {
                            height: 100,
                            width: 500,
                        },
                    });
                }
            }else if(this.diaSesiones == '' && this.sesionName == ''){
                this.$notify.warning({
                    title: "Ups!",
                    msg: `LOS CAMPOS ESTAN VACIOS.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });         
            }
        },
        filtrar_inicio_sesion_todos(){
            this.vacios = false
            this.sesioninicio = false
            this.sesionName = ''
            this.diaSesiones = ''
            this.$emit('filtrar-todos')
        },
        filtrar_inicio_sesion_todos_change(){
            if(this.sesionName == ''){
                this.vacios = false
                this.sesioninicio = false
                this.sesionName = ''
                this.diaSesiones = ''
                this.$emit('filtrar-todos')
            }
        },
        //Metodos GMMEP
        filtrarGMEEP(value){
            if(value == undefined){
                this.plazaFiltro == this.plazaFiltro 
            }else{
                this.plazaFiltro = value
            }
            this.$emit('filtro_GMEEP', this.plazaFiltro, this.fechaFiltro, this.buscarGMMEP, this.estatus)
        },
        filtrar_GMMEP_todos(){
            this.fechaFiltro = ''
            this.buscarGMMEP = ''
            this.plazaFiltro = ''
            this.estatus = ''
            this.$emit('filtrar-todos_GMEEP')
        },
        //Metodos Actas
        fitrarActas(value){
            if(value == undefined){
                this.plazaFiltro == this.plazaFiltro 
            }else{
                this.plazaFiltro = value
            }
            this.$emit('filtro_Actas', this.plazaFiltro, this.buscarDTCfacturado,this.usuarioActas, this.tipofallaActas)
        },
        filtrar_Actas_todos(){
            this.plazaFiltro = ''
            this.buscarDTCfacturado = ''
            this.$emit('filtrar-todos-Actas')
        },
        customLabel ({ title }) {
            return `${title}`
        },
        acciones_mapper(){      
            if(this.value.title == 'Mantenimiento'){
                this.abrirModal()
            }
            if(this.value.title == 'Formato CAPUFE'){
                this.formato()   
            }
            this.value = ""  
        },
        opticones_select_acciones(){
            const options= [                
              { title: 'Mantenimiento', img: 'fa-regular fa-circle-check' }, //0
              { title: 'Formato CAPUFE', img: 'fa-file-arrow-down' }, //1
            ]
            let filtroOpciones = []
            filtroOpciones.push(options[0])
            filtroOpciones.push(options[1])
    
            return filtroOpciones
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
        buscarDTCfacturado: function (newPalabra){
            this.$emit('buscar-facturado', newPalabra.trim())
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
<style>
.vue-tooltip.tooltip-custom {
    width: 50rem;  
    background-color: rgba(255, 255, 255, 0.685);  
    border: 1px solid #466fa1;  
    box-shadow: 1000;
    border-radius: 15px;
}

.vue-tooltip.tooltip-custom .tooltip-arrow {  
    border: 3px solid #466fa1;  
}
</style>