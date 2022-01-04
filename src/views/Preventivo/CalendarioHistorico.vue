<template>
    <div>        
        <div class="grid grid-cols-1 w-78 sm:w-66 ml-48 sm:ml-8 xl:mx-auto">   
        <!--//////////////////////////////////////////////////////////////////////
            ////                        FILTROS                              ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="mt-8" :class="{ 'pointer-events-none': false, 'opacity-25': false}">      
                <div class="border-2 px-16 shadow-lg z-10 rounded-lg justify-center sm:w-67 sm:-ml-4">
                    <div>   
                        <h1 class="text-black text-center text-3xl mt-3 mb-1 sm:mb-1 sm:text-sm font-titulo font-bold">Bitacora de Visitas de Mantenimiento Equipos De Peaje</h1>     
                    </div>
                    <div class="grid grid-cols-4 sm:grid-cols-2 justify-center"> 
                    <!--/////////////////////////////////////////////////////////////////////
                        ////                         FILTRO TRAMO                        ////
                        ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3 font-titulo sm:mt-3 sm:-ml-12">
                        <p class="font-bold sm:text-sm mb-5 tex-2xl">Tramo</p>
                            <select v-model="tramoFiltro" @change="filtros_calendario" class="w-full is_valid" type="text">
                                <option value="">Selecionar...</option>  
                                <option value="1">Mexico-Acapulco</option>
                                <option value="2">Mexico-Irapuato</option>                                             
                            </select>
                        </div>          
                        <!--/////////////////////////////////////////////////////////////////
                            ////                         FILTRO PLAZA                       ////
                            ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3 font-titulo sm:mt-3 sm:ml-6">
                            <p class="font-bold sm:text-sm mb-5">Plaza</p>
                            <select v-model="plazaFiltro" @change="filtros_calendario" class="w-full is_valid sm:w-32" type="text">
                                <option value="">Selecionar...</option>     
                                <option v-for="(item, index) in listaPlazasValidas" :value="item.squareCatalogId" :key="index">{{ item.squareName }}</option> 
                            </select>
                        </div>  
                        <!--/////////////////////////////////////////////////////////////////
                            ////                         FILTRO FECHA                        ////
                            ////////////////////////////////////////////////////////////////////-->        
                        <div class="m-3 font-titulo sm:mt-3 sm:-ml-12">                            
                            <p class="font-bold sm:text-sm mb-5">Año</p>
                            <select v-model="añoFiltro" @change="filtros_calendario" class="w-full is_valid" type="text">
                                <option value="">Selecionar...</option>     
                                <option value="2020" :class="{'hidden': this.tipoUsuario == 7}">2020</option>
                                <option value="2021" :class="{'hidden': this.tipoUsuario == 7}">2021</option>                            
                                <option value="2022" >2022</option>                            
                            </select>                                                                        
                        </div>
                        <!--/////////////////////////////////////////////////////////////////////
                            ////                         FILTRO REFERENCIA                   ////
                            ////////////////////////////////////////////////////////////////////-->
                        <div class="m-3 font-titulo sm:mt-3 sm:ml-6">
                            <p class="font-bold mb-5 sm:text-sm">Mes</p>
                            <select v-model="mesFiltro" @change="filtros_calendario" class="w-full is_valid sm:w-32" type="text">
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
                        <button @click.prevent="limpiar_filtros" class="botonTodos font-boton">
                            <img src="../../assets/img/todos.png" class="mr-2" width="20" height="2"/>
                            <span>Todos</span>
                        </button>
                        <button @click.prevent="filtros_calendario()" class="botonIconBuscar font-boton hidden">
                            <img src="../../assets/img/lupa.png" class="mr-2" width="20" height="2"/>
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>
            </div> 
            <div class="overflow-x-auto mx-auto sm:text-xs rounded-lg shadow mb-16 mt-6 sm:mb-24 sm:w-67 sm:-ml-4" style="height:500px;">
                <table class="border-collapse table-fixed">
                    <!--/////////////////////////////////////////////////////////////////
                    ////                           HEADER TABLA                      ////
                    ////////////////////////////////////////////////////////////////////-->
                    <thead>
                        <tr class="text-md text-gray-400 bg-blue-800 font-titulo">                
                            <th class="cabeceraTable font-titulo font-normal w-64">Plaza</th>
                            <th class="cabeceraTable font-titulo font-normal w-64">Fecha</th>
                            <th class="cabeceraTable font-titulo font-normal w-64">Tecnico</th>                                                                                    
                            <th class="cabeceraTable font-titulo font-normal w-64">Acciones</th>
                        </tr>
                    </thead>
                    <!--/////////////////////////////////////////////////////////////////
                    ////                          BODY TABLA                          ////
                    ////////////////////////////////////////////////////////////////////-->
                    <tbody name="table" is="transition-group">                      
                        <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaCalendario" :key="key">                
                            <td class="cuerpoTable font-titulo font-normal">{{ item.squareName }}</td>
                            <td class="cuerpoTable font-titulo font-normal">{{ item.fecha }}</td>                                                                                 
                            <td class="cuerpoTable font-titulo font-normal">{{ item.nombre  }}</td>
                            <td class="cuerpoTable font-titulo font-normal">
                               <!--  <button @click="reporte_pdf(item)" class="botonIconDescargar">
                                    <img src="../../assets/img/pdf.png" class="mr-2 sm:-ml-2" width="15" height="15" />
                                    <span class="text-xs">Descargar</span>
                                </button>-->
                                <multiselect class="float:none" v-model="value"  @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                    <template slot="singleLabel" slot-scope="props">
                                    <div class=" inline-flex">
                                        <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                                        <span class="option__title">{{ props.option.title }}</span>
                                    </div>
                                    </template>
                                    <template slot="option" slot-scope="props">                                                
                                    <div class="option__desc">
                                        <span class="option__title inline-flex">
                                        <img :src="props.option.img" class="mr-5" width="15" height="15">    
                                            {{ props.option.title }}
                                        </span>
                                    </div>
                                    </template>
                                </multiselect>  
                                <!-- <button @click="reporte_pdf(item)" class="botonIconDescargar">
                                        <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                                        <span class="text-xs sm:hidden">Reporte Fotografico</span>
                                </button> -->
                            </td>             
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>
    </div>
</template>

<script>
import ServicePDF from '../../services/ReportesPDFService'
import ServiceFiltrosDTC from '../../services/FiltrosDTCServices'
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
            todasPlazas: [],
            value: ''                       
        }
    },
    beforeMount: async function() {        
        await this.$http.get(`${API}/Mantenimiento/Bitacora`)
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
        reporte_pdf: function(item){            
                
            ServicePDF.generar_pdf_calendario(item.referenceSquare, {
                mes: item.month,
                año: item.year
            },
            {
                idUser: item.userId,
                numPlaza: item.plazaId
            }) 
        },
        reporte_pdf_escaneado: function(item){ 
            ServicePDF.generar_pdf_calendario_escaneado_capufe(item.referenceSquare,item.userId,item.year,item.month) 
        },
        opticones_select_acciones(item){
            let options = [
                { title: 'Bajar Calendario', img: '/img/download.ea0ec6db.png' },//0
                { title: 'Bajar Cal. Escaneado', img: '/img/download.ea0ec6db.png' },//1
            ]
            let array = []
            array.push(options[0])

            if(item.calendarioEscaneado){
                array.push(options[1])
            }
            return array
        },
        acciones_mapper(item){
        if(this.value.title == 'Bajar Calendario'){
            this.reporte_pdf(item)
        }
        if(this.value.title == 'Bajar Cal. Escaneado'){
            this.reporte_pdf_escaneado(item)
        }
            this.value = ''
        },
    }


}
</script>

<style>

</style>