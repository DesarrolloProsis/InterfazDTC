<template>
    <div>                      
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">                      
                <!--/////////////////////////////////////////////////////////////////
                ////                      ESCANEADO                             ////
                ////////////////////////////////////////////////////////////////////-->
                <PdfEscaneado 
                    @limpiar-componente-escaneado="limpiar_componete_escaneado" 
                    :abrirModal="modalSubirSellado" 
                    :objInsert="objInsertEscaneado" 
                    :tipoReporte="tipoEscaneado"
                >
                </PdfEscaneado>
                <!--/////////////////////////////////////////////////////////////////
                ////                 MODAL CAMBIAR USUARIO A DTC                 ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="sticky inset-0" :class="{'modal-container': modalcambiarUsuario}">
                    <div v-if="modalcambiarUsuario" class="rounded-lg justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 mx-auto px-12 py-10 shadow-2xl sm:w-66 mt-33">
                        <ValidationObserver ref="observer">  
                            <p class="text-gray-900 font-thin text-md" v-if="infoCambiarUsuario.referenceDTC != '--' ">
                                Al cambiar el usuario del Diagnóstico de Falla con Refencia: 
                                <span class="text-black font-bold">{{ infoCambiarUsuario.referenceNumber }}</span> 
                                <br>
                                Se cambiará la Ficha con Referencia: <span class="text-red-600 font-bold">{{ infoCambiarUsuario.referenceNumber }}</span> 
                                <br>
                                Y el Dictamen Técnico con Referencia: <span class="text-red-600 font-bold">{{ infoCambiarUsuario.referenceDTC }}</span> 
                            </p>
                            <p v-else class="text-gray-900 font-thin text-md">
                                Se cambiará el usuario del Diagnóstico de Falla y Ficha Técnica con Referencia: 
                                <span class="text-black font-bold">{{ infoCambiarUsuario.referenceNumber }}</span> 
                            </p> 
                            <div class="mt-10">
                                <p class="pdtcpendientes sm:text-sm sm:text-center">Seleccione el Nuevo Usuario</p>
                                <ValidationProvider name="Observaciones" rules="required" v-slot="{ errors }"> 
                                    <select v-model="userChangeDf" class="w-full border-none">
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
                                <button @click="actualizar_user_id_df" class="botonIconCrear">Cambiar</button>
                                <button @click="modalcambiarUsuario = false, userChangeDf = ''" class="botonIconCancelar">Cancelar</button>
                            </div>  
                        </ValidationObserver>          
                    </div>
                </div>     
                <!--/////////////////////////////////////////////////////////////////
                ////                      MODAL ELIMINAR                         ////
                ////////////////////////////////////////////////////////////////////-->
                <div class="sticky inset-0" :class="{'modal-container':modalEliminar}">
                    <div v-if="modalEliminar" class="rounded-lg justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 mx-auto px-12 py-10 shadow-2xl sm:w-66 mt-33">
                        <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
                            <img src="@/assets/img/warning.png" class="ml-2 sm:-ml-4" width="35" height="35" />
                            <p class="-mt-10 text-black sm:-ml-3 sm:-mt-6">Advertencia</p>
                            <img src="@/assets/img/warning.png" class="ml-66 -mt-12 sm:-mt-10 sm:ml-48" width="35" height="35" />
                        </h1>
                        <ValidationObserver ref="observer">
                            <p class="text-red-600 font-thin text-md sm:text-sm text-justify" v-if="infoEliminar.referenceDTC != '--'">Se eliminará el Diagnóstico y la Ficha con referencia <span class="text-black font-bold">{{ infoEliminar.referenceNumber }}</span> y DTC con referencia <span class="text-black font-bold">{{ infoEliminar.referenceDTC}}</span></p>
                            <p class="text-red-600 font-thin text-md sm:text-sm text-justify" v-else>Se eliminará el Diagnóstico y la Ficha con referencia <span class="text-black font-bold">{{ infoEliminar.referenceNumber }}</span></p>
                            <ValidationProvider name="comentarioBorrar" rules="required:max:300"  v-slot="{ errors }">    
                                <p class="text-md mb-1 font-semibold text-gray-900 mt-10">Motivo</p>
                                <textarea v-model="comentarioBorrar" class="textAreaCalendario" name="comentarioBorrar"/>              
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="mt-5 text-center">
                                <button @click="borrar_diagnostico_falla()" class="botonIconCrear">Si</button>
                                <button @click="modalEliminar = false" class="botonIconCancelar font-boton">No</button>
                            </div>
                        </ValidationObserver>
                    </div>
                </div>
                <!--/////////////////////////////////////////////////////////////////////
                /////                    FILTROS DE NAVEGACION                      ////
                ////////////////////////////////////////////////////////////////////-->   
                <HeaderGenerico 
                    @filtrar-concentrado-diagnostico="filtrar_concentrado_diagnostico" 
                    @limpiar-concentrado-diagnostico="limpiar_filtros" 
                    @buscar-df="guardar_palabra_busqueda" 
                    :titulo="'Concentrado de Diagnóstico y Ficha Técnica'" 
                    :tipo="'DF'"
                >
                </HeaderGenerico>
                <!--/////////////////////////////////////////////////////////////////////
                /////                       TABLA GENERICA                      ////
                ////////////////////////////////////////////////////////////////////-->  
                <TablaGenerica  
                    @acciones-mapper="acciones_mapper"              
                    :listaDataTable="listaFicha"
                    :loadingTabla="loadingTabla"
                    :validarAcciones="opticones_select_acciones"
                    :normalheaderKey="[{text: 'Numero Referencia', key: 'referenceNumber'},{text: 'Plaza', key: 'squareName'},{text: 'Fecha Diagnostico', key: 'diagnosisDate', formatoFecha: true},{text: 'Carriles', key: 'lanes'},{text: 'Numero Falla', key: 'failuerNumber'},{text: 'Numero Siniestro', key:'siniesterNumber'},{text: 'Referencia DTC', key: 'referenceDTC', LetrasGris:true },{text: 'Acciones', key: 'Acciones'}]"
                    :movilHeaderKey="[{text: 'Numero Referencia', key: 'referenceNumber'},{text: 'Fecha Diagnostica', key: 'diagnosisDate', formatoFecha: true},{text: 'Acciones', key: 'Acciones'}]"
                >
                </TablaGenerica>  
                <Spinner :modalLoading="modalLoading"/>                            
            </div>
        </div>    
    </div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import HeaderGenerico from "../../../components/Header/HeaderGenerico"
import TablaGenerica from '../../../components/TablaGenerica.vue'
import ServiceReporte from '../../../services/ReportesPDFService'
import ServiceFiltros from '../../../services/FiltrosDTCServices'
import PdfEscaneado from '../../../components/PdfEscaneado.vue'
import ServiceCookies from '../../../services/CookiesService'
import Spinner from '../../../components/Sppiner.vue'
import moment from 'moment'
export default {
    name: "ConcentradoFichas",
    components:{        
        HeaderGenerico,
        PdfEscaneado,
        TablaGenerica,
        Spinner
    },
    data (){
        return {
            infoFichasFallaCompleta:[],
            infoFichasFallaFiltrada: [],
            listaFicha: [],
            loadingTabla: false,
            typeUser:'',             
            infoEliminar:{},
            comentarioBorrar:'',
            modalEliminar: false,            
            modalSubirSellado: false,
            objInsertEscaneado: {},
            tipoEscaneado: 'Diagnostico',
            modalcambiarUsuario: false,
            infoCambiarUsuario:{},
            listaTecnicosPlaza:[],
            userChangeDf: '',
            refNum: '',
            comentario: '',
            statusDTC: 0,
            modalLoading: false
        }
    },
    beforeMount: function (){
        this.typeUser = this.$store.state.Login.cookiesUser.rollId 
        this.loadingTabla = true
        let userId = this.$store.state.Login.cookiesUser.userId
        this.$http.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
        .then((response) => {
            setTimeout(() => {
                this.infoFichasFallaCompleta = response.data.result
                this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
                this.listaFicha = this.infoFichasFallaFiltrada
                this.loadingTabla = false
            },500)           
        })
        .catch(() => {
            this.loadingTabla = false
            this.infoFichasFallaCompleta = []
            this.infoFichasFallaFiltrada = []                       
        })
    },
    methods: {    
        actualizarTabla(){
            this.typeUser = this.$store.state.Login.cookiesUser.rollId 
            this.loadingTabla = true
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/diagnosticoFalla/GetBitacoras/TLA/${userId}`)
            .then((response) => {            
                this.infoFichasFallaCompleta = response.data.result
                this.infoFichasFallaFiltrada = this.infoFichasFallaCompleta
                this.listaFicha = this.infoFichasFallaFiltrada
                this.loadingTabla = false
            })
            .catch(() => {
                this.loadingTabla = false
                this.infoFichasFallaCompleta = []
                this.infoFichasFallaFiltrada = []                       
            })
        },     
        borrar_diagnostico_falla(){
            let userId = this.$store.state.Login.cookiesUser.userId 
            let clavePlaza = this.infoEliminar.referenceNumber.split('-')[0] 
            let indexRowBorrar = this.listaFicha.findIndex(item => item.referenceNumber == this.infoEliminar.referenceNumber)
            this.loadingTabla = true
            this.listaFicha.splice(indexRowBorrar, 1)            
            this.$http.post(`${API}/DiagnosticoFalla/BorraDiagnosticoFull/${clavePlaza}/${this.infoEliminar.referenceNumber}/${userId}/${this.comentarioBorrar}/${this.infoEliminar.referenceDTC}`)
            .then(() => {                                  
                this.modalEliminar = false
                this.comentarioBorrar = ''
                setTimeout(() => {
                    let indexRowBorrar = this.listaFicha.findIndex(item => item.referenceNumber == this.infoEliminar.referenceNumber)
                    this.listaFicha.splice(indexRowBorrar, 1) 
                    this.loadingTabla = false                                           
                }, 1000)
            })      
        },
        guardar_palabra_busqueda: function(newPalabra){            
            if (newPalabra != "") {
                let array_filtrado = this.infoFichasFallaFiltrada.filter(item => {
                    return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase()) || item.referenceDTC.toUpperCase().includes(newPalabra.toUpperCase())
                })       
                this.listaFicha = array_filtrado;    
            }
            else {
                this.listaFicha = this.infoFichasFallaCompleta
            }
        },          
        filtrar_concentrado_diagnostico(objFiltro){            
            this.listaFicha = []
            this.loadingTabla = true
            setTimeout(() => {
                this.listaFicha = ServiceFiltros.filtros_concentrado_diagnostico(this.infoFichasFallaCompleta, objFiltro)
                this.loadingTabla = false
            }, 1000)
        },
        limpiar_filtros(){
            this.listaFicha = this.infoFichasFallaCompleta
        },
        formato_fecha_hora_diagnostico(dateInicio, dateFin){
            let fechaInicio = dateInicio.split(' ')[0].split('-'); let horatInicio = dateInicio.split(' ')[1].split(':')
            let fechaParseInicio = new Date(fechaInicio[2], parseInt(fechaInicio[1]) - 1, fechaInicio[0], parseInt(horatInicio[0]), parseInt(horatInicio[1]), 0);
            let fechaFin = dateFin.split(' ')[0].split('-'); let horatFin = dateFin.split(' ')[1].split(':')
            let fechaParseFin = new Date(fechaFin[2], parseInt(fechaFin[1]) - 1, fechaFin[0], parseInt(horatFin[0]), parseInt(horatFin[1]), 0);      
            return { fechaInicio: fechaParseInicio.toISOString(), fechaFin: fechaParseFin.toISOString()  }
        },
        editar_diagnostico_falla(item){                      
            let objDateParse = this.formato_fecha_hora_diagnostico(item.start, item.end)
            item['start'] = objDateParse['fechaInicio']; item['end'] = objDateParse['fechaFin'];
            this.$router.push({ path: '/Correctivo/PreDTC/Editar/DiagnosticoDeFalla', query: { item, referenciaDtc: item.referenceDTC } })
        },
        terminar_ficha_diagnostico: async function(item){                 
            let carrilesMapeados = []            
            let objDateParse = this.formato_fecha_hora_diagnostico(item.start, item.end)
            item['start'] = objDateParse['fechaInicio']; item['end'] = objDateParse['fechaFin'];            
            let numeroPlaza = this.$store.state.Login.cookiesUser.plazasUsuario.find(plaza => plaza.administradorId == item.adminSquareId).numeroPlaza   
            ServiceCookies.actualizar_plaza(item.adminSquareId)
            await this.$store.dispatch('Refacciones/BUSCAR_CARRILES', numeroPlaza)        
            setTimeout(() => {
                let carriles =  this.$store.getters["Refacciones/GET_CARRILES_STATE"];                  
                item.lanes.split(',').forEach(lane => {                    
                    let carrilFull = carriles.find(carril => carril.lane == lane)                    
                    if(carrilFull != undefined){
                        carrilesMapeados.push({
                            capufeLaneNum: carrilFull.capufeLaneNum,
                            idGare: carrilFull.idGare,
                            lane: carrilFull.lane
                        })
                    }
                })       
                let data = {
                    causaFalla: item.causeFailure,
                    descripcionFalla: item.faultDescription,
                    diagnosticoFalla: item.failureDiagnosis,
                    fechaDiagnostico: moment(item.diagnosisDate,"YYYY-MM-DD").format("YYYY-MM-DD"),
                    folioFalla: item.failuerNumber,
                    horaFin: item.end,
                    horaInicio: item.start,
                    numeroReporte: item.siniesterNumber,
                    referenceNumber: item.referenceNumber,
                    ubicacion: carrilesMapeados,
                }              
                this.$router.push({ path: '/Correctivo/PreDTC/Crear/FichaTecnicaDeFalla', query: { data } })    
            }, 500)        
        },             
        limpiar_componete_escaneado(){            
            this.loadingTabla = true  
            this.modalSubirSellado = false          
            setTimeout(() => {              
                let indexRowUpdate = this.listaFicha.findIndex(item => item.referenceNumber == this.objInsertEscaneado.referenceNumber)
                let objRowUpdate = Object.assign(this.listaFicha[indexRowUpdate])
                this.listaFicha.splice(indexRowUpdate,1,objRowUpdate)
                if(this.tipoEscaneado == 'Diagnostico'){
                    objRowUpdate['diagnosticoSellado'] = true
                    this.listaFicha.splice(indexRowUpdate,1,objRowUpdate)
                }else{
                    objRowUpdate['fichaSellado'] = true
                    this.listaFicha.splice(indexRowUpdate,1,objRowUpdate)
                } 
                this.objInsertEscaneado = {}
                this.loadingTabla = false 
            },500)           
        },
        modal_Cambiar_Usuario(item){
            this.refNum = item.referenceNumber
            this.infoCambiarUsuario = item
            this.$http.get(`${API}/User//UserofSquare/${item.squareId}`)
            .then((response) =>this.listaTecnicosPlaza = response.data.result)
            .catch(() => {})
        },
        actualizar_user_id_df(){
            if(this.infoCambiarUsuario.referenceDTC != '--' && this.infoCambiarUsuario.typeFaultId != 1){
                this.loadingTabla = true
                let actualizar_user = new Promise ((resolve,reject) => {
                    /* let obj_cambiar_user = {
                        userId: this.userChangeDf,
                        referenceNumberDTC: this.infoCambiarUsuario.referenceDTC,
                        referenceNumberDiagnostic: this.refNum,
                        Comment: this.comentario
                    }
                    this.$http.put(`${API}/DtcData/UpdateUserIdOfDTC/${this.refNum.split('-')[0]}`, obj_cambiar_user) */
                    this.$http.put(`${API}/DtcData/UpdateUserIdOfDTC/${this.refNum.split('-')[0]}/${this.userChangeDf}/${this.infoCambiarUsuario.referenceDTC}/${this.refNum}`)
                    .then(() => {
                            resolve('OK')
                            this.modalcambiarUsuario = false
                    })
                    .catch(error => {
                        reject(error)
                    })
                    setTimeout(()=>{
                        actualizar_user.then(()=>{
                            this.loadingTabla = false
                            this.userChangeDf = ''
                            this.comentario = ''
                            this.$notify.success({
                                title: "Ok!",
                                msg: `EL DF CON LA REFERENCIA ${this.refNum} FUE CAMBIADO DE USUARIO.`,
                                position: "bottom right",
                                styles: { height: 100, width: 500,},
                            });
                        })
                    },1000)
                })
            }else{
                this.loadingTabla = true
                let actualizar_user = new Promise ((resolve,reject) => {
                    /* let obj_cambiar_user = {
                        userId: this.userChangeDf,
                        referenceNumberDTC: '--',
                        referenceNumberDiagnostic: this.refNum,
                        Comment: this.comentario
                    }
                    this.$http.put(`${API}/DtcData/UpdateUserIdOfDTC/${this.refNum.split('-')[0]}`, obj_cambiar_user) */
                    this.$http.put(`${API}/DtcData/UpdateUserIdOfDTC/${this.refNum.split('-')[0]}/${this.userChangeDf}/--/${this.refNum}`)
                    .then(() => {
                            resolve('OK')
                            this.modalcambiarUsuario = false
                    })
                    .catch(error => { reject(error) })
                    setTimeout(()=>{
                        actualizar_user.then(()=>{
                            this.userChangeDf = ''
                            this.comentario = ''
                            this.loadingTabla = false
                            this.$notify.success({
                                title: "Ok!",
                                msg: `EL DF CON LA REFERENCIA ${this.refNum} FUE CAMBIADO DE USUARIO.`,
                                position: "bottom right",
                                styles: { height: 100, width: 500,},
                            });
                        })
                    },1000)
                })
            }
        },
        acciones_mapper({ acciones, itemRow }){                  
            if(acciones.title == 'Terminar Ficha'){
                this.terminar_ficha_diagnostico(itemRow)
            }
            if(acciones.title == 'Terminar DTC'){
                this.$router.push(`/NuevoDtc/Crear/${itemRow.referenceNumber}/${itemRow.typeFaultId}`)                 
            }   
            if(acciones.title == 'Editar'){                     
                this.editar_diagnostico_falla(itemRow)
            }
            if(acciones.title == 'Borrar'){   
                this.modalLoading = true                          
                setTimeout(() => {
                this.infoEliminar = itemRow; 
                this.modalEliminar = true;      
                this.modalLoading = false
                }, 2000);
                
            }
            if(acciones.title == 'Bajar Dignóstico de Falla'){     
                ServiceReporte.generar_pdf_diagnostico_falla(itemRow.referenceNumber) 
            }
            if(acciones.title == 'Bajar Ficha Técnica'){                    
                ServiceReporte.generar_pdf_ficha_falla(itemRow.referenceNumber)
            }
            if(acciones.title == 'Bajar Dictamen (DTC)'){                    
                ServiceReporte.generar_pdf_correctivo(itemRow.referenceDTC, 2, false, undefined)
                if (this.typeUser != 4 && this.typeUser != 8){
                    setTimeout(() => {
                        ServiceReporte.generar_pdf_fotografico_correctivo(itemRow.referenceDTC);               
                    },1000)
                }
            }
            if(acciones.title == 'Subir DF Escaneado'){                
                this.tipoEscaneado = 'Diagnostico'
                this.modalSubirSellado = true
                this.objInsertEscaneado = {
                    referenceNumber: itemRow.referenceNumber
                }
            }
            if(acciones.title == 'Subir FT Escaneada'){                
                this.tipoEscaneado = 'Ficha'
                this.modalSubirSellado = true
                this.objInsertEscaneado = {
                    referenceNumber: itemRow.referenceNumber
                }
                
            }
            if(acciones.title ==  'Bajar FT Escaneada'){                
                ServiceReporte.generar_pdf_ficha_sellada(itemRow.referenceNumber, 2)
            }
            if(acciones.title == 'Bajar DF Escaneado'){                
                ServiceReporte.generar_pdf_ficha_sellada(itemRow.referenceNumber, 1)
            }
            if(acciones.title == 'Cambiar de Usuario'){
                this.modalcambiarUsuario = true
                this.infoCambiarUsuario = itemRow;
                this.modal_Cambiar_Usuario(this.infoCambiarUsuario)
            }
            if(acciones.title == 'Bajar DTC Sin Firma'){
                ServiceReporte.generar_pdf_correctivo(itemRow.referenceDTC, 1, false, undefined)
                if (this.typeUser != 4 && this.typeUser != 8){
                    setTimeout(() => {
                        ServiceReporte.generar_pdf_fotografico_correctivo(itemRow.referenceDTC);               
                    },1000)
                }
            }                
        },
        opticones_select_acciones(item){
            const options= [                
                { title: 'Terminar Ficha', accionCss: 'terminar', tipo: '', img: 'fa-file-circle-plus' }, //0
                { title: 'Terminar DTC', accionCss: 'terminar', img: 'fa-file-circle-plus' },//1
                { title: 'Editar', accionCss: 'editar', img: 'fa-solid fa-pen-to-square' }, //2
                { title: 'Borrar', accionCss: 'borrar', img: 'fa-solid fa-trash' },//3
                { title: 'Bajar Dignóstico de Falla', accionCss: 'terminar', img: 'fa-file-arrow-down' }, //4
                { title: 'Bajar Ficha Técnica', accionCss: 'terminar', img: 'fa-file-arrow-down' },//5
                { title: 'Bajar Dictamen (DTC)', accionCss: 'terminar', img: 'fa-file-arrow-down' }, //6
                { title: 'Subir DF Escaneado', accionCss: 'editar', img: 'fa-file-arrow-up' }, //7
                { title: 'Subir FT Escaneada', accionCss: 'editar', img: 'fa-file-arrow-up' }, //8
                { title: 'Bajar FT Escaneada', accionCss: 'terminar', img: 'fa-file-arrow-down' },//9
                { title: 'Bajar DF Escaneado', accionCss: 'terminar', img: 'fa-file-arrow-down' },//10
                { title: 'Cambiar de Usuario', accionCss: 'cambiar', img: 'fa-solid fa-address-card' },//11
                { title: 'Bajar DTC Sin Firma', accionCss: 'terminar', img: 'fa-file-arrow-down' }, //12
            ]
            this.statusDTC = item.statusDtc
            let filtroOpciones = []            
            filtroOpciones.push(options[4])
            if(this.typeUser != 7 && this.typeUser != 4 && this.typeUser != 8 && this.typeUser != 10){
                filtroOpciones.push(options[7])
            }
            if(item.diagnosticoSellado){
                filtroOpciones.push(options[10])
            } 
            if(item.validacionFichaTecnica){
                filtroOpciones.push(options[5]) 
                if(this.typeUser != 7 && this.typeUser != 4 && this.typeUser != 8 && this.typeUser != 10){
                    filtroOpciones.push(options[8])
                }
                if(item.fichaSellado){
                    filtroOpciones.push(options[9]) 
                }
                if(!item.validacionDTC && item.typeFaultId >= 2 && this.typeUser != 7 && this.typeUser != 4 && this.typeUser != 8 && this.typeUser != 10){
                    filtroOpciones.push(options[1])
                }           
                if(item.validacionDTC && item.validacionFichaTecnica && item.statusDtc != 1 && this.typeUser != 7 && this.typeUser != 4 && this.typeUser != 8){
                    filtroOpciones.push(options[6])
                }
                if((this.typeUser == 8 && item.referenceDTC != '--') || (this.typeUser == 4 && item.referenceDTC != '--')) {
                    filtroOpciones.push(options[12])
                }
                if(this.typeUser == 1 || this.typeUser == 2 || this.typeUser == 3 || this.typeUser == 5 ){                                                   
                    filtroOpciones.push(options[2])
                    //filtroOpciones.push(options[3])
                }
            }
            /*if((!item.validacionDTC) && (this.typeUser == 1 || this.typeUser == 2)){
                filtroOpciones.push(options[3])
            }*/
            if(this.typeUser == 2 || this.typeUser == 4 || this.typeUser == 5 || this.typeUser == 8 || this.typeUser == 10){
                filtroOpciones.push(options[11])
                filtroOpciones.push(options[3])
            }  
            else{
                if(this.typeUser != 7 && this.typeUser != 4 && this.typeUser != 10 && !item.validacionFichaTecnica)
                filtroOpciones.push(options[0])
            }                                       
            return filtroOpciones
        },
    }, 
    computed:{
        restante_comentario(){
            return this.comentario.length
        }
    }  
}
</script>
<style>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
</style>