<template>
    <div>        
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3">   
        <!--//////////////////////////////////////////////////////////////////////
            ////                        FILTROS                              ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="grid grid-cols justify-center mt-10" :class="{ 'pointer-events-none': false, 'opacity-25': false}">      
                <div class="border-2 px-16 shadow-lg z-10 justify-center sm:w-66">
                    <div>   
                        <h1 class="text-black text-center text-3xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">Bitacora de Visitas de Mantenimiento Equipos De Peaje</h1>     
                    </div>
                    <div class="flex sm:inline-block justify-center"> 
                    <!--/////////////////////////////////////////////////////////////////////
                        ////                         FILTRO TRAMO                        ////
                        ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3">
                        <p class="font-bold sm:text-sm mb-5 tex-2xl">Selecciones el Tramo</p>
                            <select v-model="tramoFiltro" @change="tramo_cascada" class="w-full" type="text">
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
                                <option v-for="(item, index) in listaPlazasValidas" :value="item.squareCatalogId" :key="index">{{ item.squareName }}</option> 
                            </select>
                        </div>  
                        <!--/////////////////////////////////////////////////////////////////
                            ////                         FILTRO FECHA                        ////
                            ////////////////////////////////////////////////////////////////////-->        
                        <div class="m-3">                            
                            <p class="font-bold sm:text-sm mb-5">Seleccione el Año</p>
                            <select v-model="añoFiltro" class="w-full" type="text">
                                <option value="">Selecionar...</option>     
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>                            
                            </select>                                                                        
                        </div>
                        <!--/////////////////////////////////////////////////////////////////////
                            ////                         FILTRO REFERENCIA                   ////
                            ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3">
                            <p class="font-bold mb-5 sm:text-sm">Seleccione el Mes</p>
                            <select v-model="mesFiltro" class="w-full" type="text">
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
                    </div>
                    <!--/////////////////////////////////////////////////////////////////
                        ////                  BOTONES FILTROS                        ////
                        /////////////////////////////////////////////////////////////////-->
                    <div class="m-3 text-center">
                        <button @click.prevent="limpiar_filtros" class="botonIconLimpiar">
                            <img src="../../assets/img/bin.png" class="mr-2" width="20" height="2"/>
                            <span>Limpiar</span>
                        </button>
                        <button @click.prevent="filtros_calendario()" class="botonIconBuscar">
                            <img src="../../assets/img/lupa.png" class="mr-2" width="20" height="2"/>
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>
            </div> 
            <div class="overflow-x-auto sm:m-2 mx-auto sm:text-xs rounded-lg shadow h-66 mt-6" style="height:500px;">
                <table class="border-collapse table-fixed">
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
                    <tbody name="table" is="transition-group">                      
                        <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaCalendario" :key="key">                
                            <td class="cuerpoTable">{{ item.squareName }}</td>
                            <td class="cuerpoTable">{{ item.fecha }}</td>                                                                                 
                            <td class="cuerpoTable">{{ item.nombre  }}</td>
                            <td class="cuerpoTable">
                                <button @click="reporte_pdf(item)" class="botonIconDescargar">
                                        <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                                        <span class="text-xs sm:hidden">Descargar</span>
                                </button>
                            </td>             
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import ServicePDF from '../../services/ReportesPDFService'
import ServiceFiltrosDTC from '../../services/FiltrosDTCServices'
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: 'CalendarioHistorico', 
    data(){
        return{
            tramoFiltro: '',
            plazaFiltro: '',
            añoFiltro: '',
            mesFiltro: '',
            listaCompleta: [],
            listaCalendario: [], 
            listaPlazasValidas: [],
            todasPlazas: []                       
        }
    },
    beforeMount: async function() {
        
        await Axios.get(`${API}/Mantenimiento/Bitacora`)
        .then((response) => { 
            this.listaCompleta = response.data.result  
            this.listaCalendario = response.data.result  
            this.todasPlazas =  this.$store.state.Login.listaPlazas//this.$store.getters['Login/getListaPlazas']  
            for(let plaza of this.todasPlazas){      
                if(this.listaCompleta.some(dtc => dtc.plazaId == plaza.squareCatalogId)){
                    plaza["referenceSquare"] = this.listaCompleta.find(calendario => calendario.plazaId == plaza.squareCatalogId).referenceSquare
                    this.listaPlazasValidas.push(plaza)        
                }
            }                                                                                                           
        }).catch(Ex => {      
            if(Ex.response.status == 401)
                CookiesService.token_no_autorizado()
            console.log(Ex);                                       
        })                  
    },
    methods:{
        tramo_cascada(){
            if(this.tramoFiltro != ''){                
                this.listaPlazasValidas = []
                let plazaTramo = this.todasPlazas.filter(plaza => plaza.delegationId == this.tramoFiltro)                
                for(let plaza of plazaTramo){      
                    if(this.listaCompleta.some(dtc => dtc.plazaId == plaza.squareCatalogId)){
                        plaza["referenceSquare"] = this.listaCompleta.find(calendario => calendario.plazaId == plaza.squareCatalogId).referenceSquare
                        this.listaPlazasValidas.push(plaza)        
                    }
                } 
            }
            else{
                this.listaPlazasValidas = []
                for(let plaza of this.todasPlazas){      
                    if(this.listaCompleta.some(dtc => dtc.plazaId == plaza.squareCatalogId)){
                        plaza["referenceSquare"] = this.listaCompleta.find(calendario => calendario.plazaId == plaza.squareCatalogId).referenceSquare
                        this.listaPlazasValidas.push(plaza)        
                    }
                } 
            }
        },
        limpiar_filtros: function(){
            this.listaCalendario = this.listaCompleta
            this.tramoFiltro = ''
            this.plazaFiltro = ''
            this.añoFiltro = ''
            this.mesFiltro = ''
        },
        filtros_calendario: function(){
            if(this.tramoFiltro != '' || this.plazaFiltro != '' || this.añoFiltro != '' || this.mesFiltro != ''){
                this.listaCalendario = ServiceFiltrosDTC.filtrar_calendario_historico(this.listaCompleta, this.tramoFiltro, this.plazaFiltro, this.añoFiltro, this.mesFiltro)
            }
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
        reporte_pdf: async function(item){            
            let refPlaza = await this.$store.state.Login.cookiesUser.plazasUsuario.find(plaza => plaza.numeroPlaza == item.plazaId).refereciaPlaza        
            ServicePDF.generar_pdf_calendario(refPlaza, {
                mes: item.month,
                año: item.year
            },
            {
                idUser: item.userId,
                numPlaza: item.plazaId
            }) 
        }
    }


}
</script>

<style>

</style>