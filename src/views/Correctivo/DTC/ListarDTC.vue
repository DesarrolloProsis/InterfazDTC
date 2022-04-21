  <template>
  <div id="container">  
    <!-- <Error :error="error" :tipo="'ListarDTC'" @cerrar="cerrar"/>     -->
    <div class=" mb-16">
    <!--//////////////////////////////////////////////////////////////////////
        ////                        FILTROS                              ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderGenerico @limpiar-filtros="limpiar_filtros" @filtrar-dtc="filtro_dtc" @buscar-dtc="guardar_palabra_busqueda" :titulo="'Concentrado DTC'" :dtcVista="'pendientes'" :tipo="'DTC'" :listaStatus="statusValidos"/>
        <!--/////////////////////////////////////////////////////////////////
        ////                         MODAL LOADER                        ////
        ////////////////////////////////////////////////////////////////////-->
        <Spinner :modalLoading="modalLoading"/>
        <!--////////////////////////////////////////////////////////////////////
        ////                         MODAL CARRUSEL                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 font-titulo" :class="{'modal-container': carruselModal}">
          <div v-if="carruselModal" class="rounded-lg border max-w-2xl h-69 justify-center items-center relative  inset-x-0 bg-none mx-auto border-none">          
            <div class="justify-center text-center block mt-40">            
                <Carrusel @cerrar-modal-carrusel="carruselModal = false, modal = false, ocultarMultiPadre = false" :arrayImagenes="arrayImagenesCarrusel"></Carrusel>
            </div>
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR STATUS                   ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalCambiarStatus}">
        <div v-if="modalCambiarStatus" class="rounded-lg  justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-10 sm:p-2 mt-54">
          <ValidationObserver ref="observer">      
            <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-thin text-md">Seguro que quieres cambiar el status de la referencia <b class="font-bold">{{ refNum }}</b></p>
              <div>
                <div class="mt-5">
                
                  <p class="mb-1 sm:text-sm">Status DTC</p>
                  <select v-model="statusEdit" class="w-full is_valid" name="Status" type="text">
                      <option value="">Selecionar...</option>     
                      <option value="1">Inconcluso</option>  
                      <option value="2">Concluido</option>                                                                  
                      <option value="3">Sellado</option>                                                                                                                               
                      <option v-if="tipoUsuario == 10" value="4">GMMEP</option>  
                  </select> 
                </div>
                <div class="mt-5">
                  <ValidationProvider name="Observaciones" rules="required|max:300" v-slot="{ errors }"> 
                    <p class="mb-1 sm:text-sm">Motivo del Cambio</p>
                    <textarea
                      v-model="motivoCambioStatus"                                        
                      class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-500 rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border"
                      placeholder=" Indicar el motivo por el cual se cambia el estatus"
                      name="Observaciones"
                    />
                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="justify-end flex mt-5">
                <button @click="actualizar_dtc_status" class="botonIconCrear m-4">Aceptar</button>
                <button  @click="modalCambiarStatus = false, modal = false, statusEdit = '', motivoCambioStatus = '', ocultarMultiPadre = false" class="botonIconCancelar m-4">Cancelar</button>
              </div>
            </div>
          </ValidationObserver>
        </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL CONFIRMAR GMMEP                 ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalFirma}">
          <div v-if="modalFirma" class="rounded-lg justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 mx-auto px-12 py-10 shadow-2xl sm:w-66 mt-66">
              <p class="text-gray-900 font-thin text-md">Seguro que quieres agregar autorizacion GMMEP a este DTC {{ refNum }}</p>
              <div class="mt-5 text-center">
                <button @click="agregar_autorizacion_gmmep(true)" class="botonIconCrear">Si</button>
                <button @click="modalFirma = false, ocultarMultiPadre = false" class="botonIconCancelar">No</button>
              </div>            
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                 MODAL CAMBIAR USUARIO A DTC                 ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalCambiarUsuarioDTC}">
          <div v-if="modalCambiarUsuarioDTC" class="rounded-lg justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 mx-auto px-12 py-10 shadow-2xl sm:w-66 mt-60">
              <ValidationObserver ref="observer">  
                <p class="text-gray-900 font-thin text-md">Cambiar de Usuario el Siguiente DTC {{ refNum }}</p> 
                <div class="mt-10">
                  <p class="pdtcpendientes sm:text-sm sm:text-center">Seleccione el nuevo usuario</p>
                  <ValidationProvider name="Observaciones" rules="required" v-slot="{ errors }"> 
                    <select v-model="userChangeDtc" class="w-full border-none">
                      <option v-for="(item, key) in listaTecnicosPlaza" :key="key" :value="item.userId">{{  item.nombre }}</option>
                    </select> 
                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="mt-5">
                  <p class="pdtcpendientes sm:text-sm sm:text-center">Indica el Motivo del Cambio</p>
                  <ValidationProvider name="Comentario" rules="required|max:300" v-slot="{ errors }"> 
                    <textarea
                      v-model="comentario"                                        
                      class="textAreaCalendario ph-center"
                      placeholder="ingresa tus comentarios"
                      name="Comentario"
                      :maxlength=300
                    />
                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    <span class="text-xs text-gray-400">{{ restante_comentario }}/300</span>
                  </ValidationProvider>
                </div>            
                <div class="mt-10 text-center">
                  <button @click="actualizar_user_id_dtc" class="botonIconCrear">Cambiar</button>
                  <button @click="modalCambiarUsuarioDTC = false, refNum = ''" class="botonIconCancelar">Cancelar</button>
                </div>  
              </ValidationObserver>          
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL ELIMINAR                         ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalEliminar}">
          <div v-if="modalEliminar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-64 mx-auto px-12 py-10 shadow-2xl mt-60">
            <ValidationObserver ref="observer">
              <p class="text-gray-900 font-thin text-md sm:text-sm sm:text-center">Seguro que quiere eliminar este DTC {{ refNum }}</p>
              <ValidationProvider name="comentarioBorrar" rules="required:max:300"  v-slot="{ errors }">    
                <p class="text-md mb-1 font-semibold text-gray-900 mt-10">Motivo</p>
                <textarea v-model="comentarioBorrar" class="bg-white appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-20 placeholder-gray-500 border" name="comentarioBorrar"/>              
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              </ValidationProvider>
              <div class="mt-5 text-center">
                <button @click="borrar(true)" class="botonIconCrear">Si</button>
                <button @click="(modal = modalEliminar = false), (refNum = ''), (ocultarMultiPadre = false)" class="botonIconCancelar">No</button>
              </div>
            </ValidationObserver>
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL EDITAR DTC                       ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 sm:text-xs font-titulo" :class="{'modal-container': modalEdit}">               
          <div v-if="modalEdit" class="absolute w-73 sm:w-66 border border-gray-400 rounded-xl mx-auto  justify-center inset-x-0 pointer-events-auto mt-54">     
            <ValidationObserver ref="observer">      
              <div class="rounded-lg border border-none bg-white px-12 py-10 shadow-2xl">
                <p class="text-gray-900 font-semibold -mt-6 text-lg text-center">Editar DTC {{ dtcEdit.referenceNumber }}</p>
                <!--/////////////////////////////////////////////////////////////////
                  ////                   FILA NUMERO 1                         ////
                  ////////////////////////////////////////////////////////////////-->
                <div class="justify-center grid grid-cols-2 sm:grid-cols-1 mt-5">       
                  <div class="-mt-2 mr-3">
                    <ValidationProvider name="N° de Siniestro" rules="uniqueSinester|max:30"  :custom-messages="{ uniqueSinester: 'Numero de siniestro repetido' }" v-slot="{ errors }"> 
                      <div class="flex">
                        <p class="text-md mb-1 font-semibold text-gray-900">N° Siniestro:</p>
                        <div class="sm:hidden md:hidden ml-2">
                            <span class="" v-tooltip.right =" { ref:'tooltipintervencion', class: 'tooltip-custom tooltip-other-custom'}">
                                <img src="@/assets/img/speech-bubble.png" class="flex items-center w-5 h-5 mb-2"/>
                            </span>

                            <div ref="tooltipintervencion" class="font-titulo">
                                <p class="text-center text-gray-800">Se debe indicar el numero de Siniestro proporcionado por la aseguradora (GNP y/o INBURSA), se puede dejar vacío y se agregará la leyenda SIN NÚMERO DE SINIESTRO</p>
                            </div>
                        </div>
                      </div>
                      <input v-model="dtcEdit.sinisterNumber" class="w-full is_valid" type="text" name="NoSiniestro" placeholder="Sin número de siniestro" maxlength="30"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                      <!--<span class="text-gray-500 text-xs">{{ restante_Siniestro }}/30</span>-->
                    </ValidationProvider>
                  </div>
                  <div class="-mt-2">  
                    <ValidationProvider name="N° de Reporte" rules="uniqueReport|max:30" :custom-messages="{ uniqueReport: 'Numero de reporte repetido' }" v-slot="{ errors }">      
                      <p class="text-md mb-1 font-semibold text-gray-900">N° Reporte:</p>
                      <input v-model="dtcEdit.reportNumber" class="w-full is_valid" type="text" name="NoReporte" placeholder="" maxlength="30"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                      <!--<span class="text-gray-500 text-xs">{{ restante_Reporte }}/30</span>-->
                    </ValidationProvider>
                  </div>
                </div>
                <!--/////////////////////////////////////////////////////////////////////
                  ////                      FILA NUMERO 2                         ////
                  ////////////////////////////////////////////////////////////////////-->
                <div class="justify-center grid grid-cols-2 mt-5">       
                  <div class="-mt-2 mr-3"> 
                    <ValidationProvider name="FolioFalla" rules="max:60"  v-slot="{ errors }">
                      <div class="flex">
                        <p class="text-md mb-1 font-semibold text-gray-900">Folio de Falla:</p>
                        <div class="sm:hidden md:hidden ml-2">
                          <span class="" v-tooltip.right =" { ref:'tooltipfoliofalla', class: 'tooltip-custom tooltip-other-custom'}">
                              <img src="@/assets/img/speech-bubble.png" class="flex items-center  w-5 h-5 "/>
                          </span>

                          <div ref="tooltipfoliofalla" class="font-titulo">
                              <p class="text-center text-gray-800">Se debe indicar el numero de folio de Falla que aparece en el modulo institucional de CAPUFE</p>
                          </div>
                        </div> 
                      </div>         
                      <input v-model="dtcEdit.failureNumber" class="w-full is_valid" name="FolioFalla" type="text" placeholder="" maxlength="60"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                      <!--<span class="text-gray-500 text-xs">{{ return_Folio }}/60</span>-->
                    </ValidationProvider>
                  </div>
                  <div class="-mt-2">   
                    <ValidationProvider name="TipoDescripcion" rules="required"  v-slot="{ errors }">  
                      <div class="flex">
                      <p class="text-md mb-1 font-semibold text-gray-900">Tipo de Descripcion:</p>
                      <div class="sm:hidden md:hidden ml-2">
                        <span class="" v-tooltip.right =" { ref:'tooltiptipodescripcion', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/speech-bubble.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltiptipodescripcion" class="font-titulo">
                            <p class="text-center text-gray-800">Debe indicar el tipo de siniestro que corresponde deacuerdo al catalogo de la bitacora electronica</p>
                        </div>
                      </div>
                      </div>       
                      <select v-model="dtcEdit.typeDescriptionId" @change="tipo(dtcEdit.typeDescriptionId)" class="sm:w-full w-48 is_valid" type="text" name="TipoDescripcion">
                        <option disabled value>Selecionar...</option>
                        <option v-for="(desc, index) in listaDescripcionDtc" v-bind:value="desc.id" :key="index">
                          {{ desc.description }}
                        </option>
                      </select>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <!--/////////////////////////////////////////////////////////////////////
                ////                      FILA NUMERO 3                             ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="justify-center grid grid-cols-2 mt-5">       
                  <div class="-mt-2 mr-3">     
                    <ValidationProvider name="Observaciones" rules="max:300"  v-slot="{ errors }"> 
                      <p class="text-md mb-1 font-semibold text-gray-900">Observaciones:</p>
                      <textarea v-model="dtcEdit.observation" readonly class="bg-white appearance-none block is_valid bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-20 placeholder-gray-500 border" placeholder="jane@example.com" name="Observaciones"/>              
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="-mt-2 ">    
                    <ValidationProvider name="Diagnostico" rules="required"  v-slot="{ errors }">  
                      <p class="text-md mb-1 font-semibold text-gray-900">Diagnostico:</p>
                      <!--<textarea v-model="dtcEdit.diagnosis" class="bg-white appearance-none is_valid block container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-20 placeholder-gray-500 border" placeholder="jane@example.com" name="Diagnostico" maxlength="300"/>              
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                      <span class="text-gray-500 text-xs block">{{ return_Diag }}/300</span>-->
                      <select v-model="dtcEdit.diagnosis" class="sm:w-full w-48 is_valid" type="text" name="TipoDescripcion">
                        <option disabled value>Selecionar...</option>
                        <option v-for="(desc, index) in tiposDescripciones" v-bind:value="desc.type" :key="index">
                          {{ desc.type }}
                        </option>
                      </select>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>            
                </div>               
                <!--/////////////////////////////////////////////////////////////////////
                ////                        BOTONES MODAL EDIT                      ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="text-center grid grid-cols-2  mt-10">  
                  <div><button @click="editar_header_dtc(true)" class="botonIconCrear">Actualizar</button></div>     
                  <div><button @click="(modalEdit = modal = false), (refNum = ''), (ocultarMultiPadre = false)" class="botonIconCancelar font-boton sm:ml-2">Cancelar</button></div>     
                </div>
              </div>     
            </ValidationObserver>         
          </div>                  
        </div>    
        <!--/////////////////////////////////////////////////////////////////
        ////                      MODAL FECHAS DTC                       ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 sm:text-xs font-titulo" :class="{'modal-container': modalEditFechas}">               
          <div v-if="modalEditFechas" class="absolute w-73 sm:w-66  mx-auto  justify-center inset-x-0 pointer-events-auto mt-58">     
            <ValidationObserver ref="observer" v-slot="{ invalid  }">      
              <div class="rounded-lg border border-none bg-white px-12 py-10 shadow-2xl">
                <p class="text-gray-900 font-semibold text-lg text-center">Editar Fechas del DTC {{ refNum }}</p>
                <!--/////////////////////////////////////////////////////////////////
                  ////                   FILA NUMERO 1                         ////
                  ////////////////////////////////////////////////////////////////-->
                <div class="justify-center grid grid-cols-2 sm:grid-cols-1 mt-5">       
                  <div class="mt-2 mr-3">       
                    <ValidationProvider immediate name="FechaSiniestro" rules="required" v-slot="{ errors }"> 
                      <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Siniestro:</p>
                      <input v-model="fechaSiniestro" class="w-full" type="date" name="FechaSiniestro"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="mt-2">  
                    <ValidationProvider immediate name="FechaFalla" rules="required" v-slot="{ errors }">      
                      <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Falla:</p>
                      <input v-model="fechaFalla" class="w-full" type="date" name="FechaFalla"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <!--/////////////////////////////////////////////////////////////////////
                  ////                      FILA NUMERO 2                         ////
                  ////////////////////////////////////////////////////////////////////-->
                <div class="justify-center grid grid-cols-2 mt-5">       
                  <div class="mt-2 mr-3">       
                    <ValidationProvider immediate name="FechaEnvio" rules="required" v-slot="{ errors }"> 
                      <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Envio:</p>
                      <input v-model="fechaEnvio" class="w-full" type="date" name="FechaEnvio"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="mt-2">  
                    <ValidationProvider immediate name="FechaElaboracion" rules="required" v-slot="{ errors }">      
                      <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Elaboracion:</p>
                      <input v-model="fechaElaboracion" class="w-full" type="date" name="FechaElaboracion"/>
                      <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>                                          
              <!--/////////////////////////////////////////////////////////////////////
                  ////                        BOTONES MODAL EDIT                         ////
                  ////////////////////////////////////////////////////////////////////-->
                <div class="text-center grid grid-cols-2  mt-10">  
                  <div><button @click="confirmar_edicion_fechas" :disabled="invalid" class="botonIconCrear">Actualizar Fechas</button></div>     
                  <div><button @click="cancelar_edicion_fechas" class="botonIconCancelar font-boton sm:ml-2">Cancelar</button></div>     
                </div>
              </div>     
            </ValidationObserver>         
          </div>                  
        </div>        
        <!--/////////////////////////////////////////////////////////////////
        ////        MODAL NO SE PUEDE ACTUALIZAR HEADER                 ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 sm:text-xs font-titulo" :class="{'modal-container': error}">               
          <div v-if="error" class="absolute w-73 sm:w-66 border border-gray-400 rounded-xl mx-auto  justify-center inset-x-0 pointer-events-auto mt-54">         
            <div class="rounded-lg border border-none bg-white px-12 py-10 shadow-2xl">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900"> Error al Actualizar </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">NO SE PUDO ACTUALIZAR, VERIFIQUE LOS DATOS. RECUERDA QUE NO SE PUEDE TENER UN NÚMERO DE SINIESTRO REPETIDO.</p>
                  </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="error = false, modalEdit = true">Entendido</button>
              </div>
            </div>
          </div>                  
        </div>    
      <!--/////////////////////////////////////////////////////////////////
      ////                      TARJETAS DE DTC                        ////
      /////////////////////////////////////////////////////////dddd///////////-->
      <div :class="{ 'pointer-events-none': modal,  'opacity-25': false}" class="flex justify-center w-full font-titulo font-medium">        
          <!-- <transition-group class="flex-no-wrap grid grid-cols-3 gap-4 sm:grid-cols-1" name="list" tag="div"> -->
          <div class="flex-no-wrap grid grid-cols-3 gap-4 sm:grid-cols-1">
            <div class="shadow-2xl inline-block border-4 focus m-4 p-3 sm:m-6" :class="{'border-yellow-500 border-4 rounded-lg': dtc.statusId === 1,'border-green-500 border-4 rounded-lg': dtc.statusId === 2,'border-blue-500 border-4 rounded-lg': dtc.statusId === 3}" v-for="(dtc) in lista_dtc" :key="dtc.referenceNumber">
              <CardListDTC
                @borrar-card="confimaBorrar"
                @editar-card="editar_header_dtc"
                @editar-status="editar_status_dtc"
                @agregar_autorizacion_gmmep="agregar_autorizacion_gmmep"
                @enviar_pdf_sellado="enviar_pdf_sellado"
                @editar-fechas-dtc="editar_fechas_dtc"
                @cambiar-usuario-dtc="modal_cambiar_usurio_dtc"
                :plazasValidas="plazasValidas"
                :infoCard="dtc"
                :ocultarMulti="ocultarMultiPadre"              
              ></CardListDTC>
            </div>
          </div>   
          <!-- </transition-group>       -->                
      </div>
      <div class="text-center" :class="{'hidden' : flecha, 'hidden':modalEdit}" v-if="moreCard != false">       
        <button @click="cargar_mas" class="botonBajar animate-bounce">
          <img src="@/assets/img/abajo.png" class="w-16 h-16 sm:w-12 sm:h-12"  />
        </button>          
      </div>
    </div>
  </div>
</template>

<script>
import ServicePDfReporte from '@/services/ReportesPDFService'
import CardListDTC from "@/components/DTC/CardListaDTC.vue";
import HeaderGenerico from '@/components/Header/HeaderGenerico'
import EventBus from "@/services/EventBus.js";
import Carrusel from "@/components/Carrusel";
import ServiceFiltrosDTC from '@/services/FiltrosDTCServices'
import Spinner from '@/components/Sppiner.vue'
import { ExclamationIcon } from "@vue-hero-icons/outline"
//import Error from '@/components/ModalError.vue'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
  name: 'DTCPendientes',
  data() {
    return {
      infoDTC: [],
      infoDTC_Filtrado: [], 
      lista_dtc: [],       
      plazasValidas: [], 
      //catalogos
      statusValidos: [],      
      //data modals          
      modal: false,
      //carrusel  
      carruselModal: false, 
      arrayImagenesCarrusel: [], 
      //eliminar  
      modalEliminar: false,
      comentarioBorrar: '',
      //loading
      modalLoading: false,
      //firma
      modalFirma: false,
      //status
      modalCambiarStatus: false,      
      motivoCambioStatus: '', 
      //edit
      modalEdit: false,
      statusEdit: '',
      dtcEdit: {}, 
      //cambiar User DTC
      modalCambiarUsuarioDTC: false,
      userChangeDtc: '',
      itemCompleteChangeUserDTC: {},
      listaTecnicosPlaza: [],
      //otros      
      refNum: "",    
      tipoUsuario: '',                                                             
      moreCard: true,                  
      filtroVista: false,
      flecha: false,
      //Modal Fechas
      modalEditFechas: false,
      fechaSiniestro: '',
      fechaFalla: '',
      fechaEnvio: '',
      fechaElaboracion: '',
      ocultarMultiPadre: false,
      typeUser: '',
      comentario: '',
      ocultar: false,
      //Modal error
      error: false,
      tiposDescripciones: []
    };
  },
  components: {    
    CardListDTC,
    Carrusel,
    HeaderGenerico,
    Spinner,
    ExclamationIcon
    //Error,
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
created(){
  EventBus.$on('abrir_modal_carrusel', (arrayImagenes) => {      
    this.arrayImagenesCarrusel = arrayImagenes
    this.carruselModal = true
    this.modal = true   
    if(this.carruselModal){
      this.ocultarMultiPadre = true 
    }
  }, );    
},
beforeMount: async function () {
  this.typeUser = this.$store.state.Login.cookiesUser.rollId
  this.filtroVista = false  
  this.infoDTC = await this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);
  this.infoDTC_Filtrado = this.infoDTC 
  this.tipoUsuario = await this.$store.state.Login.cookiesUser.rollId
  this.userId = await this.$store.state.Login.cookiesUser.userId
  let listaPlazasValias = []
  //Lista Plaza Validas
  let todasPlazas = await  this.$store.state.Login.listaPlazas
  for(let plaza of todasPlazas){      
      if(this.infoDTC.some(dtc => dtc.squareCatalogId == plaza.squareCatalogId)){
        plaza["referenceSquare"] = this.infoDTC.find(dtc2 => dtc2.squareCatalogId == plaza.squareCatalogId).referenceSquare
        listaPlazasValias.push(plaza)        
      }
  }
  this.plazasValidas = listaPlazasValias  
  //Lista Status Validos
  let statusLista = this.$store.state.DTC.dtcStatus
  for(let i of [1,2,3,4]){
    if(this.infoDTC.some(item => item.statusId == i)){
        this.statusValidos.push(statusLista.find(status => status.id == i))
    }
  }
  for(let i = 0; i <= 5; i++){
      if(i < this.infoDTC.length)
        this.lista_dtc.push(this.infoDTC[i])
      else 
        this.moreCard = false                
  } 
  this.scroll_infinito()
},
destroyed(){
  EventBus.$off('abrir_modal_carrusel')
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  tipo(value){
    this.tiposDescripciones = []
    this.$http.get(`${API}/typedescriptions/tipoDescripcion/${value}`)
    .then((response) => {
      console.log(response);
      response.data.result.forEach(e => this.tiposDescripciones.push(e));
    })
  },
  cerrar(){
    this.error = false
  },
  actualizar_user_id_dtc(){
    if(this.userChangeDtc != ''){ 
      //if(this.itemCompleteChangeUserDTC.referenceNumberDiagnosis != '--'){
        this.modalLoading = true
        let actualizar_user = new Promise ((resolve,reject) => {
          this.$http.put(`${API}/DtcData/UpdateUserIdOfDTC/${this.refNum.split('-')[0]}/${this.userChangeDtc}/${this.itemCompleteChangeUserDTC.referenceNumber}/${this.itemCompleteChangeUserDTC.referenceNumberDiagnosis}`)
          .then(() => {              
            let index = this.infoDTC.map(item =>  { 
              return item.referenceNumber }
            ).indexOf(this.itemCompleteChangeUserDTC.referenceNumber)                             
            let objUpdate = Object.assign(this.infoDTC[index])
            objUpdate['userId'] = this.userChangeDtc
            this.infoDTC.splice(index, 0, objUpdate)
            this.infoDTC_Filtrado = this.infoDTC
            this.userChangeDtc = ''
            this.itemCompleteChangeUserDTC = {}
            let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
            this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)  
            resolve('ok')
            this.modalCambiarUsuarioDTC = false
          })
          .catch(error => {
            reject(error)
          })
        })
        setTimeout(()=>{
          actualizar_user.then(()=>{
            this.limpiar_filtros()
            this.modalLoading = false
            this.$notify.success({
              title: "Ok!",
              msg: `EL DTC CON LA REFERENCIA ${this.refNum} FUE CAMBIADO DE USUARIO.`,
              position: "bottom right",
              styles: { height: 100, width: 500,},
            });
          })
        },1000)
      }
      else{
        this.userChangeDtc = ''
        this.itemCompleteChangeUserDTC = {}
        this.modalCambiarUsuarioDTC = false
        this.modalLoading = false
        this.$notify.warning({
          title: "Ups!",
          msg: `NECESITAS TERMIANR EL DIAGNOSTICO DE FALLA.`,
          position: "bottom right",
          styles: { height: 100, width: 500 },
        });
      }
    /*}
    else{
      this.modalLoading = false
        this.$notify.warning({
          title: "Ups!",
          msg: `FALTA LLENAR LOS CAMPOS.`,
          position: "bottom right",
          styles: { height: 100, width: 500 },
        });
    }*/
  },
  modal_cambiar_usurio_dtc(item){
    this.refNum = item.referenceNumber
    this.modalCambiarUsuarioDTC = true
    this.itemCompleteChangeUserDTC = item
    this.$http.get(`${API}/User/UserofSquare/${item.squareId}`)
      .then((response) =>this.listaTecnicosPlaza = response.data.result)
      .catch(() => {})
  },
  guardar_palabra_busqueda: function(newPalabra){          
    if (newPalabra != "") {
      let array_filtrado = this.infoDTC_Filtrado.filter(item => {
        return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase())
      })       
      this.lista_dtc = array_filtrado;
      this.flecha = true
    }
    else{
        this.infoDTC = this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);                                         
        this.infoDTC.forEach((element, index) => {
          if(index < 3)
            this.lista_dtc.push(element) 
        });
    }
  },
  cerrarModal: function(){
    this.modalFirma = false
  },
  borrar: async  function (value) {
    let isValid = await this.$refs.observer.validate(); 
    if(isValid){
      let userId = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']         
      let obj = { "refNum": this.refNum, "userId": userId.idUser, comentario: this.comentarioBorrar }    
      if (value) {
        this.infoDTC = []        
        this.lista_dtc = []
        this.modalEliminar = false;   
        this.modal = false     
        await this.$store.dispatch("DTC/BORRAR_DTC",obj);                                                                                
        this.menosMas = true
        this.showmenosMas = false,        
        this.$notify.success({
          title: "Ok!",
          msg: `EL DTC CON LA REFERENCIA ${this.refNum} SE ELIMINO CORRECTAMENTE.`,
          position: "bottom right",
          styles: { height: 100, width: 500,},
        });
      }
      await this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
      await this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', userId)            
      this.infoDTC = await this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista) 
      this.infoDTC.forEach((element, index) => {
        if(index < 3)
          this.lista_dtc.push(element) 
      });
      this.refNum = "";   
    }   
  },
  confimaBorrar: function (refNum) {
      this.refNum = refNum;
      this.modalEliminar = true;
      this.modal = true
      this.ocultarMultiPadre = true
  },
  editar_header_dtc: async function(refNum){  
    this.ocultarMultiPadre = true       
    if(typeof refNum === 'boolean'){  
      if(this.dtcEdit.sinisterNumber == null){
        let isValid = await this.$refs.observer.validate(); 
        if(isValid){ 
          this.modalEdit = false
          this.modalLoading = true         
          let objEdit = {
            referenceNumber: this.dtcEdit.referenceNumber,
            numSiniestro: this.dtcEdit.sinisterNumber,
            numReporte: this.dtcEdit.reportNumber,
            folioFalla: this.dtcEdit.failureNumber,
            tipoDescripcion: this.dtcEdit.typeDescriptionId,
            observaciones: this.dtcEdit.observation,
            diagnostico: this.dtcEdit.diagnosis,
          }   
          let values = Object.values(objEdit)          
          for(let item of values){
            if(item === null){
              item = ''
            }
          }                                 
          let editar_dtc_promise = new Promise((resolve , reject) => {
            this.$http.put(`${API}/dtcData/UpdateDtcHeader/${this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, objEdit)
              .then(async () =>{                                                             
                this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
                let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
                this.modal = false  
                this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)     
                let adminId = await ServicePDfReporte.obtener_admin_id(objEdit.referenceNumber) 
                this.$http.get(`${API}/pdf/RefrescarArchivo/${objEdit.referenceNumber.split('-')[0]}/${objEdit.referenceNumber}/${adminId}`)    
                  .then(() => resolve('ok'))   
                  .catch((error) => { reject(error) })                                     
              })
              .catch((error) => {                              
                reject(error)
                this.$notify.error({
                  title: "ups!",
                  msg: error,
                  position: "bottom right",
                  styles: { height: 100, width: 500 },
                });
              })  
          })
          setTimeout(() => {
            editar_dtc_promise.then(() => {                                     
              this.limpiar_filtros()
              this.modalLoading = false
              this.$notify.success({
                title: "Ok!",
                msg: `SE ACTUALIZÓ EL DTC ${objEdit.referenceNumber}.`,
                position: "bottom right",
                styles: { height: 100, width: 500 },
              });
              ServicePDfReporte.generar_pdf_correctivo(objEdit.referenceNumber, 2, false, undefined)
            })              
          }, 3000);   
        }else{
          this.modalEdit = false
          this.error = true
        }
      }else{
        if(this.dtcEdit.sinisterNumber.trim().length == this.dtcEdit.sinisterNumber.length){
          let isValid = await this.$refs.observer.validate(); 
          if(isValid){ 
            this.modalEdit = false
            this.modalLoading = true         
            let objEdit = {
              referenceNumber: this.dtcEdit.referenceNumber,
              numSiniestro: this.dtcEdit.sinisterNumber,
              numReporte: this.dtcEdit.reportNumber,
              folioFalla: this.dtcEdit.failureNumber,
              tipoDescripcion: this.dtcEdit.typeDescriptionId,
              observaciones: this.dtcEdit.observation,
              diagnostico: this.dtcEdit.diagnosis,
            }   
            let values = Object.values(objEdit)          
            for(let item of values){
              if(item === null){
                item = ''
              }
            }                                 
            let editar_dtc_promise = new Promise((resolve , reject) => {
              this.$http.put(`${API}/dtcData/UpdateDtcHeader/${this.$store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, objEdit)
                .then(async () =>{                                                             
                  this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
                  let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
                  this.modal = false  
                  this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)     
                  let adminId = await ServicePDfReporte.obtener_admin_id(objEdit.referenceNumber) 
                  this.$http.get(`${API}/pdf/RefrescarArchivo/${objEdit.referenceNumber.split('-')[0]}/${objEdit.referenceNumber}/${adminId}`)    
                    .then(() => resolve('ok'))   
                    .catch((error) => { reject(error) })                                     
                })
                .catch((error) => {                              
                  reject(error)
                  this.$notify.error({
                    title: "ups!",
                    msg: error,
                    position: "bottom right",
                    styles: { height: 100, width: 500 },
                  });
                })  
            })
            setTimeout(() => {
              editar_dtc_promise.then(() => {                                     
                this.limpiar_filtros()
                this.modalLoading = false
                this.$notify.success({
                  title: "Ok!",
                  msg: `SE ACTUALIZÓ EL DTC ${objEdit.referenceNumber}.`,
                  position: "bottom right",
                  styles: { height: 100, width: 500 },
                });
                ServicePDfReporte.generar_pdf_correctivo(objEdit.referenceNumber, 2, false, undefined)
              })              
            }, 3000);   
          }else{
            this.modalEdit = false
            this.error = true
          }
        }else{
          this.modalEdit = false
          this.error = true
        }
      }      
    }else{
      this.dtcEdit = { ...this.infoDTC.find(item => item.referenceNumber == refNum) }
      this.tipo(this.dtcEdit.typeDescriptionId)
      this.modalEdit = true
      this.modal = true
    }    
  },
  limpiar_filtros: async function() {     
      let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
      this.modalLoading = true
      this.moreCard = true     
      this.modal = true
      this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)            
      this.infoDTC = []    
      this.lista_dtc = []      
      await this.$nextTick().then(() => {             
        this.infoDTC = this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);                                         
        this.infoDTC.forEach((element, index) => {
          if(index < 6)
            this.lista_dtc.push(element) 
        });        
        setTimeout(() => {
          this.modalLoading = false
          this.modal = false
        },2000)                        
      })       
  },
  enviar_pdf_sellado: async function(value,bandera){   
    this.modalLoading = true
    if(bandera == 1){
      let pdf_sellado_promise = new Promise((resolve, reject) => {                         
      this.$http.get(`${API}/pdf/GetPdfSellado/${value.referenceNumber.split('-')[0]}/${value.referenceNumber}`)
        .then(() => {               
          resolve('ok')                
          let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
          this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)                 
          resolve('ok')                                                                           
        })                                        
        .catch((error) => {                      
          reject(error)                          
          this.$notify.error({
            title: "ups!",
            msg: error,
            position: "bottom right",
            styles: { height: 100, width: 500 },
          });        
        });      
      })        
      setTimeout(() => {
        pdf_sellado_promise.then(() => {  
          this.modalLoading = false                  
          this.limpiar_filtros()
          this.$router.push("/home/${this.typeUser}/correctivo");
        })      
      }, 3000);
    }if( bandera == 2){
        let pdf_sellado_promise = new Promise((resolve, reject) => {                         
        this.$http.get(`${API}/ReporteFotografico/dañado/reporteSellado/${value.referenceNumber.split('-')[0]}/${value.referenceNumber}`)
          .then(() => {               
            resolve('ok')                
            let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
            this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)                 
            resolve('ok')                                                                           
          })                                        
        .catch((error) => {                      
          reject(error)                          
          this.$notify.error({
            title: "ups!",
            msg: error,
            position: "bottom right",
            styles: { height: 100, width: 500 },
          });        
        });      
      })        
      setTimeout(() => {
        pdf_sellado_promise.then(() => {  
          this.modalLoading = false                  
          this.limpiar_filtros()
          this.$router.push("/home/${this.typeUser}/correctivo");
        })      
      }, 3000);
    }                                                                                   
  },
  filtro_dtc: async function (objFiltros) {     
    if(objFiltros.plazaFiltro != '' || objFiltros.fechaFiltro != '' || objFiltros.referenciaFiltro != '' || objFiltros.statusFiltro != ''){            
      this.infoDTC = []
      this.lista_dtc = []         
      let dtcFiltrados = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltros.plazaFiltro, objFiltros.fechaFiltro, objFiltros.referenciaFiltro, objFiltros.statusFiltro, true)                
      this.$nextTick().then(async () => {
          this.moreCard = true            
          this.infoDTC = dtcFiltrados
          for(let i = 0; i <= 3; i++){
              if(i < this.infoDTC.length)
                this.lista_dtc.push(this.infoDTC[i])
              else 
                this.moreCard = false                
          }                
      })  
    }
    else{
      this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA LLENADO NINGUN CAMPO PARA FILTRAR.`,
          position: "bottom right",
          styles: { height: 100, width: 500 },
        });
    }
  },  
  agregar_autorizacion_gmmep(value){
    if(value === true){      
      this.modalLoading = true
      this.modalFirma = false          
      let agregar_firma_promise = new Promise((resolve, reject) => {              
        this.$http.get(`${API}/pdf/Autorizado/${this.refNum.split('-')[0]}/${this.refNum}/${this.userId}`)
        .then(() => {           
          let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
          this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)                 
          this.refNum = ''     
          resolve('ok')         
        })
        .catch((error) => {   
                      
          reject(error)                     
          this.$notify.error({
            title: "ups!",
            msg: error,
            position: "bottom right",
            styles: { height: 100,width: 500,
            },
          });
        });            
      })
      setTimeout(() => {
        agregar_firma_promise.then(() =>{
          this.limpiar_filtros()
          this.modalLoading = false 
          this.$notify.success({
            title: "Ok!",
            msg: `SE AUTORIZADO CORRECTAMENTE GMMEP.`,
            position: "bottom right",
            styles: { height: 100, width: 500 },
          });         
        })
      }, 3000)
    }
    else if(value === false){        
      this.limpiar_filtros()
      this.modalFirma = false      
      this.refNum = ''
    }
    else{
      this.refNum = value
      this.modalFirma = true
      this.ocultarMultiPadre = true
    }
  },
  editar_status_dtc(info){
    this.modalCambiarStatus = true
    this.refNum = info
    this.modal = true    
    this.ocultarMultiPadre = true
  },
  actualizar_dtc_status: async function(){
    let isValid = await this.$refs.observer.validate(); 
    if(isValid){
      let actualizar_status = new Promise((resolve, reject) => {
        let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
        this.modalCambiarStatus = false
        let objeActualizado = { "ReferenceNumber": this.refNum, "StatusId": parseInt(this.statusEdit), "UserId": user.idUser, "Comment": this.motivoCambioStatus,}      
        this.$http.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.refNum.split('-')[0]}`, objeActualizado)
        .then(() => {        
          this.refNum = ''
          this.statusEdit = ''
          this.motivoCambioStatus = ''   
          let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
          this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)           
          resolve('ok')
          this.ocultarMultiPadre = false
        })
        .catch(error => {                  
          reject(error)        
        });
      })
      setTimeout(() => {
          actualizar_status.then(() => {                       
          this.limpiar_filtros()
          location.reload();
          this.$notify.success({
            title: "Ok!",
            msg: `SE ACTUALIZÓ EL ESTATUS.`,
            position: "bottom right",
            styles: { height: 100, width: 500 },
          });  
        })        
      }, 1000);
    } 
  },
  cargar_mas(){
    let pos = document.documentElement.offsetHeight
    let index = this.lista_dtc.length
    for(let i = index; i <= index + 5; i++){
      if(i < this.infoDTC.length){
        this.lista_dtc.push(this.infoDTC[i])
        window.scrollTo(0, pos)         
      } else 
        this.moreCard = false                
    }            
  },
  scroll_infinito(){
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;      
        if (bottomOfWindow) {                     
            let index = this.lista_dtc.length
            for(let i = index; i <= index + 5; i++){
              if(i < this.infoDTC.length){
                this.lista_dtc.push(this.infoDTC[i])                
              }else 
                this.moreCard = false                
            }                                               
        }    
    };
  },
  editar_fechas_dtc(value){    
    this.refNum = value.referenceNumber
    this.fechaSiniestro = value.sinisterDate.slice(0,10)
    this.fechaFalla = value.failureDate.slice(0,10)
    this.fechaElaboracion = value.elaborationDate.slice(0,10)
    this.fechaEnvio = value.shippingDate.slice(0,10)
    this.modalEditFechas = true
    this.ocultarMultiPadre = true
  },
  confirmar_edicion_fechas(){ 
    let promise_fechas = new Promise((resolve, reject) => { 
      this.$http.put(`${API}/DtcData/UpdateFechaDtc/PM`, {
        Reference: this.refNum,
        SinisterDate: this.fechaSiniestro,
        FailureDate: this.fechaFalla,
        ShippingDate: this.fechaEnvio,
        ElaborationDate: this.fechaElaboracion
      })
      .then(() => {
        this.limpiar_filtros()
          this.modalEditFechas = false
          this.$notify.success({
            title: "Ok!",
            msg: `SE ACTUALIZARON LAS FECHAS PARA EL DTC ${this.refNum}`,
            position: "bottom right",
            styles: { height: 100, width: 500,},
          });
          resolve('ok')
      })
      .catch(() =>{
        this.$notify.warning({
            title: "Ups!",
            msg: `NO SE ´PUDIERON ACTUALIZAR LA FECHAS DEL DTC ${this.refNum}`,
            position: "bottom right",
            styles: { height: 100, width: 500,},
          });  
          reject('Mal')    
      })
    })
    setTimeout(() => {
      promise_fechas
        .then(async () => {
            await this.limpiar_filtros()
            this.refNum = ''; this.fechaSiniestro = ''; this.fechaFalla = ''; this.fechaElaboracion = ''; this.fechaEnvio = '';                        
        })
    }, 2000)
  },
  cancelar_edicion_fechas(){
    this.modalEditFechas = false
    this.ocultarMultiPadre = false
  },

},
computed: {
  listaDescripcionDtc(){
    return this.$store.state.DTC.listaDescriptions
  },
  restante_Siniestro(){
    return this.dtcEdit.sinisterNumber.trim().length
  },
  restante_Reporte(){
    return this.dtcEdit.reportNumber.trim().length
  },
  return_Folio(){
    return this.dtcEdit.failureNumber.trim().length
  },
  return_Diag(){
    return this.dtcEdit.diagnosis.trim().length
  },
  restante_comentario(){
    return this.comentario.length
  }
}
};
</script>
<style scoped>
.list-item {  
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
.modal-error{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.089);
}
</style>