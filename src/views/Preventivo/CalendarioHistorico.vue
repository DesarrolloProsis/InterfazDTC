<template>
    <div>
        <Nav></Nav>
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3">   
        <!--//////////////////////////////////////////////////////////////////////
            ////                        FILTROS                              ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="flex justify-center mt-2" :class="{ 'pointer-events-none': modal, 'opacity-25': false}">      
                <div class="border-2 px-16 shadow-lg z-10 justify-center sm:w-66">
                    <div class="flex sm:inline-block">      
                    <!--/////////////////////////////////////////////////////////////////////
                        ////                         FILTRO TRAMO                        ////
                        ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3" v-if="false">
                        <p class="font-bold sm:text-sm mb-5">Selecciones el Tramo</p>
                            <select class="w-full" type="text">
                                <option value="">Selecionar...</option>  
                                <option value="1">Mexico-Acapulco</option>
                                <option value="2">Mexico-Irapuato</option>                                             
                            </select>
                        </div>          
                        <!--/////////////////////////////////////////////////////////////////
                            ////                         FILTRO PLAZA                       ////
                            ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3">
                            <p class="font-bold sm:text-sm mb-5">Selecciones la Plaza</p>
                            <select v-model="plazaFiltro" class="w-full" type="text">
                                <option value="">Selecionar...</option>     
                                <option v-for="(item, index) in plazasValidas" :value="item.squareCatalogId" :key="index">{{ item.squareName }}</option>                
                            </select>
                        </div>  
                        <!--/////////////////////////////////////////////////////////////////
                            ////                         FILTRO FECHA                        ////
                            ////////////////////////////////////////////////////////////////////-->        
                        <div class="m-3">
                            <p class="font-bold mb-5 sm:text-sm">Seleccione el Mes</p>
                            <select v-model="plazaFiltro" class="w-full" type="text">
                                <option value="">Selecionar...</option>     
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
                        <!--/////////////////////////////////////////////////////////////////////
                            ////                         FILTRO REFERENCIA                   ////
                            ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3">
                            <p class="font-bold sm:text-sm mb-5">Seleccione el Año</p>
                            <select v-model="mesFiltro" class="w-full" type="text">
                                <option value="">Selecionar...</option>     
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>                            
                            </select>   
                        </div>                
                    </div>
                    <!--/////////////////////////////////////////////////////////////////
                        ////                  BOTONES FILTROS                        ////
                        /////////////////////////////////////////////////////////////////-->
                    <div class="m-3 text-center">
                        <button @click.prevent="limpiar_filtros" class="botonIconLimpiar">
                            <img src="../../assets/img/bin.png" class="mr-2" width="25" height="2"/>
                            <span>Limpiar</span>
                        </button>
                        <button @click.prevent="filtro_Dtc" class="botonIconBuscar">
                            <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="2"/>
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>
            </div> 
            <div class="overflow-x-auto sm:m-2 mx-auto sm:text-xs rounded-lg shadow">
                <table class="border-collapse  table-fixed">
                    <!--/////////////////////////////////////////////////////////////////
                    ////                           HEADER TABLA                      ////
                    ////////////////////////////////////////////////////////////////////-->
                    <thead>
                        <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                            <th class="cabeceraTable w-64">Plaza</th>
                            <th class="cabeceraTable w-64">Fecha</th>
                            <th class="cabeceraTable w-64">Tecnico</th>                                                                                    
                            <th class="cabeceraTable w-64">Acciones</th>
                        </tr>
                    </thead>
                    <!--/////////////////////////////////////////////////////////////////
                    ////                          BODY TABLA                          ////
                    ////////////////////////////////////////////////////////////////////-->
                    <tbody>
                        <tr class="h-12 text-gray-900 text-sm" v-for="(item, key) in list_Component" :key="key">                
                            <td class="cuerpoTable">{{ 'Tlalapan' }}</td>
                            <td class="cuerpoTable">{{ 'Tlalapan' }}</td>                                                                                 
                            <td class="cuerpoTable">{{ 'Tlalapan' }}</td>
                            <td class="cuerpoTable">{{ 'Tlalapan' }}</td>             
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>
    </div>
</template>

<script>
import Nav from '../../components/Navbar'
export default {
    name: 'CalendarioHistorico',
    components:{
        Nav
    },
    data(){
        return{
            plazaFiltro: '',
            añoFiltro: '',
            mesFiltro: '',
        }
    }


}
</script>

<style>

</style>