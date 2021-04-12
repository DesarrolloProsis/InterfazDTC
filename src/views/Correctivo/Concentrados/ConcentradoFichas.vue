<template>
    <div>        
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico @limpiar-filtros="limpiar_filtros" @filtrar-dtc="filtro_dtc" :titulo="'Concentrado Diagnostico/Ficha'" :tipo="'DF'"></HeaderGenerico>                       
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24" style="height:450px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <!--/////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      ////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                                <th class="cabeceraTable">Referencia</th>
                                <th class="cabeceraTable">Plaza</th>
                                <th class="cabeceraTable">Fecha</th>
                                <th class="cabeceraTable">Ubicacion</th>
                                <th class="cabeceraTable">Folio de Falla</th>
                                <th class="cabeceraTable">Folio de Siniestro</th>
                                <th class="cabeceraTable">Diagnostico</th>
                                <th class="cabeceraTable">Ficha</th>
                            </tr>
                        </thead>
                        <!--/////////////////////////////////////////////////////////////////
                        ////                          BODY TABLA                          ////
                        ////////////////////////////////////////////////////////////////////-->
                        <tbody name="table" is="transition-group">  
                            <tr class="h-12 text-gray-900 text-sm text-center">                
                                <td class="cuerpoTable">
                                    <input class="text-center border-0 shadow-none" type="text" placeholder="Sin Información" readonly/>
                                </td>
                                <td class="cuerpoTable">
                                    <input class="text-center border-0 shadow-none" type="text" placeholder="Sin Información" readonly/>
                                </td>
                                <td class="cuerpoTable">
                                    <input class="text-center border-0 shadow-none" type="text" placeholder="Sin Información" readonly/>
                                </td>
                                <td class="cuerpoTable">
                                    <input class="text-center border-0 shadow-none" type="text" placeholder="Sin Información" readonly/>
                                </td>
                                <td class="cuerpoTable">
                                    <input class="text-center border-0 shadow-none" type="text" placeholder="Sin Información" readonly/>
                                </td>
                                <td class="cuerpoTable">
                                    <input class="text-center border-0 shadow-none" type="text" placeholder="Sin Información" readonly/>
                                </td>
                                <td class="cuerpoTable">
                                    <div>
                                        <button
                                            class="botonSubir mr-5">
                                            <img src="../../../assets/img/subir.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Subir</span>
                                        </button>
                                        <button
                                            class="botonDescargar">
                                            <img src="../../../assets/img/descargar.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Descargar</span>
                                        </button>
                                    </div>
                                </td>
                                <td class="cuerpoTable">
                                    <div>
                                        <button
                                            class="botonSubir mr-5">
                                            <img src="../../../assets/img/subir.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Subir</span>
                                        </button>
                                        <button
                                            class="botonDescargar">
                                            <img src="../../../assets/img/descargar.png" class="mr-2 sm:m-0" width="15" height="15" />
                                            <span>Descargar</span>
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
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
export default {
    name: "ConcentradoFichas",
    components:{        
        HeaderGenerico
    },
    data (){
        return {
            infoFicha:[],
        }
    },
    beforeMount: function (){
       

    },
    methods: {       
    },
}
</script>