<template>
    <div>
        <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderGenerico :titulo="'Concentrado DTC Facturados e Instalados'" :tipo="'CDTCF'" />
        <div>
            <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped ">
            <thead>
              <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
                <th class="w-64 cabeceraTable font-medium">Referencia</th>
                <th class="w-56 cabeceraTable font-medium">Usuario</th>              
                <th class="w-48 cabeceraTable font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody id="multiselectHamburguesa">
                
              <!-- <template v-if="listaUsuarios.length == 0 && loadingTabla != true"> 
                <tr>
                    <td class="w-full text-center text-red-500 m-10" colspan="10">                                    
                        <div class="mt-8 mb-8">Sin Informacion</div>
                    </td>
                </tr>  
              </template>  -->
              <!-- <template v-if="loadingTabla">  
                  <tr>
                      <td class="w-full" colspan="10">                                    
                          <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                      </td>                          
                  </tr>  
              </template>   -->
            
                <tr class="h-12 text-gray-900 text-sm sm:text-xs">
                <td class="cuerpoTable text-center"></td>
                <td class="cuerpoTable text-center"></td>
                <td class="cuerpoTable text-center break-all"></td>
                <td class="cuerpoTable">
                  <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                    <!-- <template slot="singleLabel" slot-scope="props">
                      <div class="inline-flex">
                        <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                        <span class="option__title bg-red-300">{{ props.option.title }}</span>
                      </div>
                    </template>
                    <template slot="option" slot-scope="props">                                                
                      <div class="option__desc "><span class="option__title inline-flex">
                        <img :src="props.option.img" class="mr-5" width="15" height="15">    
                        {{ props.option.title }}</span>
                      </div>
                    </template> -->
                  </multiselect>      
                </td>
                </tr>
              
            </tbody>            
          </table>
        </div>
        
        
    </div>
</template>

<script>

import HeaderGenerico from "../../../components/Header/HeaderGenerico";

//const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "DTCBorrados",
    components:{
        HeaderGenerico
    },
    /////////////////////////////////////////////////////////////////////
    ////                      DATA                                   ////
    /////////////////////////////////////////////////////////////////////
    data: function (){
    return {      
        loadingTabla: false,
        listaUsuarios: [{referenceNumber: 'CER-21039',user:'Emiliano'}],                    
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
        opticones_select_acciones(){
            const options= [                
            { title: 'Generar anexo 1.A/1.B', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' }, //0
            { title: 'Editar', accionCss: 'terminar', img: '/img/add.36624e63.png' },//1
            { title: 'Cambiar Estatus', accionCss: 'editar', img: '/img/flechas.a7d6bd28.png' },//2
            ]
            let filtroOpciones = []
            filtroOpciones.push(options[0])
            filtroOpciones.push(options[1])
            filtroOpciones.push(options[2])
            // if(item.statusId >= 3 && !item.escaneadobool){
            // filtroOpciones.push(options[3])
            // }

            return filtroOpciones
        },
    }
}
</script>
