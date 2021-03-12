<template>
    <div>
        <!--/////////////////////////////////////////////////////////////////
        ////                HEADER REPORTE NIVEL CARRIL                   ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderPreventivo :header="header" :referenceNumber="referenceNumber" @guarar-log-fecha="guardar_log_fecha"></HeaderPreventivo>
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
                    v-model="observaciones"
                    v-validate="'max:300'"
                    :class="{ 'is_valid': !errors.first('Observaciones'), 'is_invalid': errors.first('Observaciones')}"
                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                    placeholder="jane@example.com"
                    name="Observaciones"
                    v-bind:maxlength="limite"
                />
                <p class="text-xs">{{ errors.first("Observaciones") }}</p>
                <span class="text-xs text-gray-500">{{ restante }}/300</span>
            </div>
        <!--/////////////////////////////////////////////////////////////////
        ////            COMPONENTE IMAGENES REPORTE CARRIL               ////
        ////////////////////////////////////////////////////////////////////-->
            <div class=" w-1/2 ml-20">
                <ImagenesActividadCarril :referenceNumber="referenceNumber"></ImagenesActividadCarril>
            </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                         BOTON CREAR REPORTE                 ////
        ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/2 justify-end flex sm:grid grid-cols-1 sm:justify-start">
                <button @click="crear_header_reporte" class="mt-32 sm:mt-8 botonIconCrear h-16 w-32">
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
            reporteInsert: true
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
                    console.log(headerReporte)                                                                                                             
                        Axios.post(`${API}/Calendario/CalendarReportData/${refPlaza.refereciaPlaza}/false`,headerReporte, CookiesService.obtener_bearer_token())
                        .then(() => { 
                            console.log(arrayJob)                             
                            Axios.post(`${API}/Calendario/CalendarReportActivities/${refPlaza.refereciaPlaza}/${this.header.calendarId}`, arrayJob, CookiesService.obtener_bearer_token())
                            .then(() => {  
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
                                        }).catch(Ex => {      
                                            if(Ex.response.status == 401)
                                                CookiesService.token_no_autorizado()
                                            console.log(Ex);                                       
                                        })         
                                }  
                                //Envio Imagenes y Generacion de Reportes     
                                EventBus.$emit("guardar_imagenes", this.referenceNumber);    
                                //this.$router.push({path: '/ReportesMantenimiento/TablaActividades'})                                                                                                                                                                          
                                setTimeout(() =>{
                                    ServiceReporte.generar_pdf_actividades_preventivo(this.referenceNumber, this.header.frequencyId, tipoEncabezadoLane)
                                    ServiceReporte.generar_pdf_fotografico_preventivo(this.referenceNumber, this.header.lane)       
                                    this.$router.push({path: '/ReportesMantenimiento/TablaActividades'})
                                },4000)  
                                //Notificaciones de Termino  
                                if(this.reporteInsert == true){   
                                    console.log('SE INSERTO EL HEADER.')                            
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
                                console.log('SE INSERTARON TODAS LAS ACTIVIDADES.')
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
                    Axios.post(`${API}/Calendario/CalendarReportData/${refPlaza.refereciaPlaza}/true`,headerReporte, CookiesService.obtener_bearer_token())
                        .then(() => {     
                            Axios.post(`${API}/Calendario/CalendarReportActivities/${refPlaza.refereciaPlaza}/${this.header.calendarId}`, arrayJob, CookiesService.obtener_bearer_token())
                                .then(() => {                             
                                    //Envio Imagenes y Generacion de Reportes     
                                    EventBus.$emit("guardar_imagenes", this.referenceNumber);    
                                    this.$router.push({path: '/ReportesMantenimiento/TablaActividades'})                                                                                                                                                                          
                                    setTimeout(() =>{
                                        ServiceReporte.generar_pdf_actividades_preventivo(this.referenceNumber, this.header.frequencyId, tipoEncabezadoLane)
                                        ServiceReporte.generar_pdf_fotografico_preventivo(this.referenceNumber, this.header.lane)       
                                    },2000)  
                                    //Notificaciones de Termino  
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