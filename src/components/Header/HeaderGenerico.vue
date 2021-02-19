<template>
<div class="relative">               
    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">{{ titulo }}</h1>
    <!--///////////////////////////////////////////////////////////////////
       ///                    FILTROS DE NAVEGACION                   ////   
      ///                             DTC                            ////
     ///////////////////////////////////////////////////////////////////-->
    <div v-if="tipo == 'DTC'" class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 sm:text-xs sm:ml-3">
            <div class="m-3">
                <SelectPlaza :fullPlazas="true"></SelectPlaza>
            </div>
            <div class=" m-3">
                <p class="font-bold mb-2 sm:text-sm sm:text-center">Seleccione una fecha</p>
                <input v-model="fechaFiltro" class="border w-40 sm:w-full" type="date"/>
                <span class="block text-xs text-gray-600">*Fecha de Elaboración</span>
            </div>
            <div class="m-3">
                <p class="font-bold sm:text-sm mb-2 sm:text-center">Escriba la Referencia</p>
                <input v-model="referenciaFiltro" class="border w-40 text-center sm:w-full" placeholder="PM-000000"/>
            </div>   
        </div>
    <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  DTC               ////
       ////////////////////////////////////////////////////////////////////-->
        <div class="mt-10 mb-4 text-center">
            <button @click="limpiar_filtros" class="w-32 botonIconLimpiar">
                <img src="../../assets/img/escoba.png" class="mr-2" width="25" height="2"/>
                <span>Limpiar</span>
            </button>
            <button @click="filtro_Dtc" class="w-32 botonIconBuscar">
                <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="2"/>
                <span>Buscar</span>
            </button>
        </div>
    </div>
    <!--///////////////////////////////////////////////////////////////////
       ///                    FILTROS DE NAVEGACION                   ////   
      ///                          INVENTARIO                        ////
     ///////////////////////////////////////////////////////////////////-->
    <div v-if="tipo == 'INV'" class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-2 sm:text-xs sm:ml-3">
            <div class="mr-3 sm:mr-1 mt-6">
                <span class="mr-2">Buscar</span>
                <input class="bg-white sm:w-full" />
            </div>
            <div class="mr-3 mt-6">
                <span class="mr-2">Ubicación</span>
                <input class="bg-white" type="checkbox"/>
            </div>
            <div class="mt-6">
                <span class="mr-4">Componente</span>
                <input class="bg-white" type="checkbox"
                />
            </div>
            <div class="text-sm sm:mt-4">
                <SelectPlaza :fullPlazas="true"></SelectPlaza>
            </div>
            <div class="mt-2">
                <span class="text-gray-800">Editados:</span>
            </div>
        </div>
    <!-- ////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION  DTC               ////
       ////////////////////////////////////////////////////////////////////-->
        <div class="mb-3 text-center sm:mt-3 sm:mb-4 sm:ml-4 sm:text-xs mt-5 mr-5 sm:inline-flex">
            <button class="w-32 botonIconBorrarCard ml-4 mr-4">
                <img src="../../assets/img/borrar.png" class="mr-2 sm:m-0" width="25" height="25"/>
                <span class="text-xs">Cancelar</span>
            </button>
            <button class="w-32 botonIconNext">
                <img src="../../assets/img/save.png" class="mr-2 sm:mr-0" width="25" height="25" />
                <span class="text-xs">Guardar</span>
            </button>
        </div>
    </div>    
    <!--///////////////////////////////////////////////////////////////////
       ///                    FILTROS DE NAVEGACION                   ////   
      ///                          CALENDARIO                        ////
     ///////////////////////////////////////////////////////////////////-->
    <div class="inline-flex sm:inline-block w-full">
        <div v-if="tipo == 'CAL'" class="sm:w-full inline-flex sm:inline-block text-base sm:text-sm">
            <div class="sm:w-full ml-5">
                <div class="md:flex lg:flex xl:flex justify-start sm:grid-cols-1">
                    <p class="font-bold">Plaza de Cobro:</p>
                    <select class="w-56 h-6 ml-5 sm:ml-0 sm:mt-2" type="text">
                        <option disabled value="">Selecionar...</option>     
                    </select>                             
                </div>  
    <!-- /////////////////////////////////////////////////////////////////////
        ///                    BOTONES DE NAVEGACION                     ////
       ///                           CALENDARIO                         ////
      /////////////////////////////////////////////////////////////////////-->        
                <div class="flex justify-start m-5 sm:ml-0">
                    <button class="botonIconCrear">
                        <img src="../../assets/img/add.png" class="mr-2" width="25" height="25" />
                        <span>Crear</span>
                    </button>
                </div>                
            </div>             
        </div>
    </div> 
</div>
</template>

<script>
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices"
import SelectPlaza from '../Header/SelectPlaza'

export default {
    name: "HeaderGenerico",
    components: {
        SelectPlaza
    },
    props:{
        titulo: {
            type: String,
            default: () => ''
        },
        tipo:{
            type: String,
            default: () => ''
        },
    },
/////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data: function (){
    return {
        plazaFiltro: '',
        infoDTC:[],
        fechaFiltro: '',
        referenciaFiltro: '',
        filtroVista: false,
    }
},
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
 
},
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
filtro_Dtc: async function () {  
    if( this.plazaFiltro != '' || this.fechaFiltro != '' || this.referenciaFiltro != ''){        
        let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, this.plazaFiltro, this.fechaFiltro, this.referenciaFiltro, false)
        console.log(listaFiltrada)
        this.$nextTick().then(() => {      
            this.infoDTC = listaFiltrada            
        }) 
    }
      //Si no ingresa ningún filtro 
    else{
        this.$notify.warning({
        title: "Ups!",
        msg: `NO SE HA LLENADO NINGUN CAMPO PARA FILTRAR.`,
        position: "bottom right",
        styles: {
            height: 100,
            width: 500,
            },
        });
    }
},
limpiar_filtros: function() {     
    if(this.plazaFiltro != '' || this.fechaFiltro != '' || this.referenciaFiltro != '')
    {        
        this.modalLoading = true                            
        this.$nextTick().then(() => {             
        this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"](this.filtroVista);  
        this.fechaFiltro = "";
        this.referenciaFiltro = "";            
        this.plazaFiltro = ""; 
        }) 
    }
    else{
        this.$notify.warning({
        title: "Ups!",
        msg: `NO SE HA LLENADO NINGUN CAMPO.`,
        position: "bottom right",
        styles: {
            height: 100,
            width: 500,
                },
            });
        }      
    }
},
}
</script>