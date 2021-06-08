<template>
    <div>
        <div class="flex justify-center p-4">
            <div v-if="modalDetalles" class="mt-32 absolute justify-items-center is_valid shadow-xl inset-x-0 bg-white w-74 h-69 sm:h-73 sm:w-66 mx-auto px-10 py-5 text-gray-600">
                <div>
                    <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">                      
                      <p class="-mt-10 text-black sm:ml-6 sm:-mt-6">DTC REFERENCIA {{  }}</p>                      
                    </h1>
                    <div>       
                      <ul class="mt-10 font-bold">
                        <li class="ml-4 sm:ml-0 sm:text-sm">• SEMÁFORO DE ESTADO DE CARRIL FULLMATRIX LED (ASPA/FLECHA)</li> 
                        <li class="ml-4 sm:ml-0 sm:text-sm">• SEMÁFORO DE TELEPEAJE FULLMATRIX LED (AUTOPAGO)</li>
                        <li class="ml-4 sm:ml-0 sm:text-sm">• SEMÁFORO MODO DE PAGO FULLMATRIX LED (CAJERO)</li>
                      </ul>
                    </div>

                </div>
                <div class="mt-12 flex justify-center">
                    <button class="botonIconCrear font-boton" >
                        <span class="" @click="boton_modal_aceptar">Aceptar</span>
                    </button>

                </div>
            </div>
            <div class="mt-5">
                <!--///////////////////////////////////////////////////////////////////
                ////                          TITULO                            ////
                ////////////////////////////////////////////////////////////////////-->
                <HeaderGenerico @filtrar-borrado="guardar_palabra_busqueda" :titulo="'Concentrado DTC Borrados'" :tipo="'BORRADO'"></HeaderGenerico>
                <!--///////////////////////////////////////////////////////////////////
                ////                     TABLA DE USUARIOS                        ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 w-80 sm:w-67 sm:ml-1" style="height:650px;">
                    <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">
                                <th class="cabeceraTable">Referencia</th>
                                <th class="cabeceraTable">Conteo de borrado</th>
                                <th class="cabeceraTable">Acciones</th>
                            </tr>
                        </thead>
                        <tbody name="table" is="transition-group">  
                            <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in listaborrados" :key="key">
                                <td class="cuerpoTable">{{ `${item.refereceNumber}` }}</td>
                                <td class="cuerpoTable">{{ `Numero de veces borrado ${item.conteos}` }}</td>                                
                                <td class="cuerpoTable">
                                    <button class="botonIconActualizar" @click="mostras_detalles_borrado(item)">
                                        <img src="../../../assets/img/pencil.png" class="mr-2 sm:m-1" width="15" height="15"/>
                                        <span class="text-xs sm:hidden">Detalles</span>
                                    </button>
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
import moment from "moment";
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "DTCBorrados",
    components:{
        HeaderGenerico,
    },
    data (){
        return{
            listaDTC_borrados:[],
            listaDTC_filtrada:[],
            listaborrados:[],
            modalDetalles: false,
            detallesDtcBorrado: {}
        }
    },
    beforeMount: function(){
        this.$http.get(`${API}/DtcData/GetReferencesLog`)
        .then((response)=>{
            this.listaDTC_borrados = response.data.result
            this.listaDTC_filtrada = this.listaDTC_borrados  
            this.listaborrados = this.listaDTC_filtrada          
        })
    },
    methods:{
        guardar_palabra_busqueda: function(newPalabra){        
            if (newPalabra != "") {
                let array_filtrado = this.listaDTC_filtrada.filter(item => {
                    return item.refereceNumber.toUpperCase().includes(newPalabra.toUpperCase())
                })       
                this.listaborrados = array_filtrado;
            }
            else{
                this.listaborrados = this.listaDTC_borrados
            }
        },
        mostras_detalles_borrado(value){
            this.modalDetalles = true
            console.log(value);
            this.$http.get(`${API}/DtcData/GetReferencesLogDetail`)
            .then((response)=>{
                console.log(response.data);       
            })
        }
    },
/////////////////////////////////////////////////////////////////////
////                           FILTROS                           ////
/////////////////////////////////////////////////////////////////////
    filters: {
    formatDate: function (value) {
        return moment(value.substring(0, 10)).format("DD/MM/YYYY");
    },
},
}
</script>