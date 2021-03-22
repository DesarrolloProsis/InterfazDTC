<template>
    <div>
        <!--/////////////////////////////////////////////////////////////////
        ////                HEADER REPORTE NIVEL CARRIL                   ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderPreventivo :header="header" :referenceNumber="referenceNumber" @guarar-log-fecha="guardar_log_fecha"></HeaderPreventivo>
        <!--/////////////////////////////////////////////////////////////////
        ////                         MODAL LOADER                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
            <div v-if="modalLoading" class="rounded-lg border w-64 justify-center absolute  inset-x-0 bg-white mx-auto border-gray-700 px-12 py-10 shadow-2xl">          
                <div class="justify-center text-center block">            
                    <img src="https://media.giphy.com/media/jAYUbVXgESSti/source.gif"  class="h-48 w-48" />
                    <p class="text-gray-900 font-thin text-md">Espere ... </p>
                </div>
            </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                    TABLA DE ACTIVIDADES JOB                   ////
        ////////////////////////////////////////////////////////////////////-->
        <TablaActividadesCarril :listaActividades="listaActividades" :referenceNumber="referenceNumber"></TablaActividadesCarril>
        <!--/////////////////////////////////////////////////////////////////
        ////          TEXT AREA PARA OBSERVACIONES                         ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="inline-flex mx-auto w-full pl-20 pr-20 sm:grid grid-cols-2">
            <div class="w-1/2">                
                <p class="text-center font-bold text-xl text-gray-800 mb-5">Observaciones</p>          
                <textarea
                    id="obs"
                    v-model="observaciones"
                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                    placeholder="jane@example.com"
                    name="Observaciones"
                    v-bind:maxlength="limite"
                    onkeyup=check()
                />
                <span class="text-xs text-gray-500">{{ restante }}/300</span>
            </div>
        <!--/////////////////////////////////////////////////////////////////
        ////            COMPONENTE IMAGENES REPORTE CARRIL               ////
        ////////////////////////////////////////////////////////////////////-->
            <div class=" w-1/2 ml-20">
                <ImagenesActividadCarril :referenceNumber="referenceNumber" @ocutar-modal-loading="ocultar_modal_loading"></ImagenesActividadCarril>
            </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                         BOTON CREAR REPORTE                 ////
        ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/2 justify-end flex sm:grid grid-cols-1 sm:justify-start">
                <button :disabled="modalLoading" @click="crear_header_reporte" class="mt-32 sm:mt-8 botonIconCrear h-16 w-32" :class="{'bg-gray-600 hover:bg-gray-600 hover:text-black cursor-not-allowed': modalLoading}">
 <!--                    <span class="h-24 w-3 hover:hidden">
                        <span class="animate-ping absolute inline-flex h-10 w-10 rounded-full ml-20 bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 ml-24 mt-4 bg-green-400"></span>
                    </span> -->
                    <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                    <span>Crear</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>

import HeaderPreventivo from '../../components/Header/CrearHeaderPreventivo'
import TablaActividadesCarril from '../../components/Actividades/TablaActividadesCarril'
import ImagenesActividadCarril from '../../components/Actividades/ImagenesActividadCarril'
import ServiceReporte from '../../services/ReportesPDFService'
import EventBus from "../../services/EventBus.js";
import Axios from 'axios';
import moment from "moment";
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    components:{
        HeaderPreventivo,
        TablaActividadesCarril,
        ImagenesActividadCarril
    },
    data(){
        return{
            referenceNumber: '',
            header: {},
            listaActividades: [],
            observaciones: '',
            horaFin: '',
            horaInicio: '',
            limite: 300,
            objetoLogDate: {},
            reporteInsert: true,
            modalLoading: false,
            letras: 0
        }
    },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
    created() {        
        EventBus.$on("actualizar_hora_inicio", (newHora) => {                                          
            this.horaInicio = newHora
        });
        EventBus.$on("actualizar_hora_fin", (newHora) => {                                          
            this.horaFin = newHora           
        });
    },
    beforeMount: async function(){        
        if(!this.$route.query.edicion == true){              
            this.reporteInsert = true          
            this.header = this.$route.query.header 
            let refPlaza = await this.$store.getters['Login/GET_REFERENCIA_PLAZA_TO_NOMBRE'](this.$route.query.header.plazaNombre)        
            this.referenceNumber = await ServiceReporte.crear_referencia_calendario(
                refPlaza.refereciaPlaza,
                this.header.frequencyName,
                this.header.day,
                this.header.lane
            )                
            this.listaActividades = await this.$store.getters['Actividades/GET_ACTIVIDADES_CARRIL']
            if(this.listaActividades.length == 0){
                this.$notify.warning({
                    title: "Ups!",
                    msg: `NO TIENE ACTIVIDADES.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
                setTimeout(() => {
                    this.$router.push({ path:'/ReportesMantenimiento/TablaActividades' })
                }, 300);  
            }                    
        }
        else{                      
            this.reporteInsert = false                           
            let headerCompuesto = this.$route.query.headerCompuesto                              
            this.header = {
                calendarId: headerCompuesto.calendarId,
                capufeLaneNum: headerCompuesto.capufeLaneNum,
                dateStamp: headerCompuesto.dateStamp,
                day: moment(headerCompuesto.fecha).format('DD/MM/YYYY'),
                frequencyId: headerCompuesto.frequencyId,
                frequencyName: headerCompuesto.frequencyName,
                idGare: headerCompuesto.idGare,
                lane: headerCompuesto.lane,
                plazaNombre: headerCompuesto.plazaCobro,
                statusMaintenance: headerCompuesto.statusMaintenance
            }            
            this.observaciones = headerCompuesto.comentarios
            this.horaInicio = headerCompuesto.horaInicio
            this.horaFin = headerCompuesto.horaFin
            let tablaActividades = this.$route.query.actividades
            let array_actividades = []
            tablaActividades.forEach(item => {
                array_actividades.push({
                    actividades:item.jobDescription,
                    componente: item.componentDescription,
                    equipo: item.activityDescription,
                    frecuencia: headerCompuesto.frequencyName,
                    idJob: item.componentsJobId,
                    jobStatus: item.jobStatusId,
                    ubicacion: item.name
                })
            })
            this.listaActividades = array_actividades
            this.referenceNumber = headerCompuesto.referenceNumber            
        }
    },
/////////////////////////////////////////////////////////////////////
////                       COMPUTADOS                            ////
/////////////////////////////////////////////////////////////////////
    computed:{
    restante(){
        //return this.limite - this.motivoCambioFecha.length
        let letras = this.observaciones.length
        if(letras == 100){
            letras == 0
            document.getElementById("obs").value+='\n'; 
        }
        return  this.observaciones.length
    }
},

//////////////////////////////////////////////////////////////////////
////                            METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{

    guardar_log_fecha(item){
        this.objetoLogDate = item
        this.referenceNumber = item.ref
    },
    validar_horas(){
        if(this.horaInicio != '' && this.horaFin != ''){
            let horaISplite = this.horaInicio.split(':')            
            let horaFSplite = this.horaFin.split(':')            
            let dateInicio = new Date(1995,11,17,horaISplite[0],horaISplite[1],0);
            let dateFin = new Date(1995,11,17,horaFSplite[0],horaFSplite[1],0);             
            if(dateInicio < dateFin){                
                return true
            }
            else {
                    this.$notify.warning({
                    title: "Ups!",
                    msg: `LA HORA INICIO NO PUEDE SER MAYOR QUE LA HORA FIN.`,
                    position: "bottom right",
                    styles: {
                        height: 100,
                        width: 500,
                    },
                });
                return false
            }
        }
        else{                    
            this.$notify.warning({
                title: "Ups!",
                msg: `FALTA LLENAR CAMPOS DE HORA FIN Y HORA INICIO.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
                return false    
            }
    },
    ocultar_modal_loading(objReporte) {       
        this.modalLoading = false
        setTimeout(async () => {
            await ServiceReporte.generar_pdf_actividades_preventivo(objReporte.referenceNumber, objReporte.frecuenciaId, objReporte.tipoEncabezadoLane)
            await ServiceReporte.generar_pdf_fotografico_preventivo(objReporte.referenceNumber, objReporte.lane)
            this.$router.push({path: '/ReportesMantenimiento/TablaActividades'})  
        }, 2000);                      
    },
    async crear_header_reporte(){        
        let validarActividades = this.listaActividades.every((actividad) => parseInt(actividad.jobStatus) != 0 )          
        //DAtos Para Insertar ACtividades                                                         
        let refPlaza =  this.$store.getters['Login/GET_REFERENCIA_PLAZA_TO_NOMBRE'](this.header.plazaNombre)                        
        let arrayJob = []       
        this.listaActividades.forEach(async (item) => {    
            arrayJob.push({
                    ReferenceNumber: this.referenceNumber,
                    ComponentJob: parseInt(item.idJob),
                    JobStatus: parseInt(item.jobStatus),
                    flagUpdate: this.reporteInsert 
            })    
        });
        //Datos PAra insertar HeaderREportData            
        let user =  this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']                    
        let fechaInsercion = ''
        if(JSON.stringify(this.objetoLogDate) != '{}'){
            let fechaAyuda = this.objetoLogDate.fecha.split('/')            
            fechaInsercion = new Date(fechaAyuda[2], fechaAyuda[1] - 1, fechaAyuda[0])
        }
        else{
            let fechaAyuda = this.header.day.split('/')
            fechaInsercion = new Date(fechaAyuda[2], fechaAyuda[1] - 1, fechaAyuda[0])
        }                                       
        let headerReporte = {
            ReferenceNumber: this.referenceNumber,
            SquareId: refPlaza.numeroPlaza,
            CapufeLaneNum: this.header.capufeLaneNum,
            IdGare: this.header.idGare,
            UserId: user.idUser,
            AdminSquare: refPlaza.administradorId,
            ReportDate: fechaInsercion,
            Start: this.horaInicio,
            End: this.horaFin,
            Observations: this.observaciones,   
            CalendarId: parseInt(this.header.calendarId)     
        }               
        let tipoEncabezadoLane = headerReporte.CapufeLaneNum != '0000' ? 'carril' : undefined
        if(validarActividades){            
            if(this.validar_horas()) {                                                 
                if(this.reporteInsert) {     
                        this.modalLoading = true                                                                                                       
                        Axios.post(`${API}/Calendario/CalendarReportData/${refPlaza.refereciaPlaza}/false`,headerReporte, CookiesService.obtener_bearer_token())
                        .then(() => { 
                            CookiesService.refrescar_bearer_token() 
                            Axios.post(`${API}/Calendario/CalendarReportActivities/${refPlaza.refereciaPlaza}/${this.header.calendarId}`, arrayJob, CookiesService.obtener_bearer_token())
                            .then(() => {  
                                CookiesService.refrescar_bearer_token() 
                                if(this.objetoLogDate.fecha != ''){                                    
                                    let refPlaza = this.referenceNumber.split('-')[0]
                                    let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
                                    let dateLog = {
                                        calendarId: parseInt(this.header.calendarId)     ,
                                        date: this.objetoLogDate.fecha,
                                        userId: user.idUser,
                                        referenceNumber: this.referenceNumber,
                                        comment: this.objetoLogDate.motivo
                                    }
                                    Axios.post(`${API}/Calendario/CalendarDateLog/${refPlaza}`, dateLog, CookiesService.obtener_bearer_token())
                                        .then(() => {   
                                            CookiesService.refrescar_bearer_token()                                                                                                                                 
                                        }).catch(Ex => {      
                                            if(Ex.response.status == 401)
                                                CookiesService.token_no_autorizado()
                                            console.log(Ex);                                       
                                        })         
                                } 
                                let objImg = {
                                    referenceNumber: this.referenceNumber,
                                    frecuenciaId : this.header.frequencyId,
                                    tipoEncabezadoLane: tipoEncabezadoLane,
                                    lane: this.header.lane
                                }                                                                     
                                EventBus.$emit("guardar_imagenes", objImg)                                                   
                                if(this.reporteInsert == true){                               
                                    this.$notify.success({
                                        title: "Ok!",
                                        msg: `SE GENERARON LOS REPORTES CORRECTAMENTE.`,
                                        position: "bottom right",
                                        styles: {
                                            height: 100,
                                            width: 500,
                                        },
                                    });
                                }                                
                                /* this.$notify.success({
                                    title: "Ok!",
                                    msg: `SE INSERTARON TODAS LAS ACTIVIDADES.`,
                                    position: "bottom right",
                                    styles: {
                                        height: 100,
                                        width: 500,
                                    },
                                });        */                                                                         
                            })
                            .catch(Ex => {    
                                if(Ex.response.status == 401)
                                    CookiesService.token_no_autorizado()                                                                                     
                            })                                                                                                                                    
                        })
                        .catch(Ex => { 
                            if(Ex.response.status == 401)
                                CookiesService.token_no_autorizado()                                           
                            console.log(Ex);
                        });                                                                                                                                                                                          
                }
                else {  
                    this.modalLoading = true
                    Axios.post(`${API}/Calendario/CalendarReportData/${refPlaza.refereciaPlaza}/true`,headerReporte, CookiesService.obtener_bearer_token())
                        .then(() => { 
                            CookiesService.refrescar_bearer_token()     
                            Axios.post(`${API}/Calendario/CalendarReportActivities/${refPlaza.refereciaPlaza}/${this.header.calendarId}`, arrayJob, CookiesService.obtener_bearer_token())
                                .then(() => {                             
                                    CookiesService.refrescar_bearer_token()  
                                    let objImg = {
                                        referenceNumber: this.referenceNumber,
                                        frecuenciaId : this.header.frequencyId,
                                        tipoEncabezadoLane: tipoEncabezadoLane,
                                        lane: this.header.lane
                                    }                                      
                                    EventBus.$emit("guardar_imagenes", objImg);                                   
                                    this.$notify.success({
                                        title: "Ok!",
                                        msg: `SE INSERTARON TODAS LAS ACTIVIDADES.`,
                                        position: "bottom right",
                                        styles: {
                                            height: 100,
                                            width: 500,
                                        },
                                    });                                                                                
                                })
                                .catch(Ex => {    
                                    console.log(Ex)
                                    if(Ex.response.status == 401)
                                        CookiesService.token_no_autorizado()                                                                                     
                                })
                        })
                        .catch((error) => {
                            console.log(error)
                            if(error.response.status == 401)
                                CookiesService.token_no_autorizado()   
                        })                                                           
                }   
            } 
        }
        else{
            this.$notify.warning({
                title: "Ups!",
                msg: `FALTAN ESTATUS EN ACTIVIDADES.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
        }            
    }    
}

}
</script>