<template>
    <div>
        <!--/////////////////////////////////////////////////////////////////
        ////                HEADER REPORTE NIVEL CARRIL                   ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderPreventivo 
            :header="header" 
            :referenceNumber="referenceNumber" 
            @guarar-log-fecha="guardar_log_fecha"
            @guardar-adminId-nuevo="modificar_adminid"
            
            ></HeaderPreventivo>
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
        <TablaActividadesCarril :listaActividades="listaActividades" :calendarioId="header.calendarId" :referenceNumber="referenceNumber"></TablaActividadesCarril>
        <!--/////////////////////////////////////////////////////////////////
        ////          TEXT AREA PARA OBSERVACIONES                         ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="inline-flex mx-auto w-full pl-20 pr-20 sm:grid grid-cols-1 font-titulo mt-10 -mb-32">
            <div class="w-1/2 sm:w-full sm:-ml-10">                
                <p class="text-center text-xl text-gray-800 mb-5 sm:text-xs sm:-ml-48 sm:-mt-6">Observaciones</p>          
                <textarea
                    id="obs"
                    v-model="observaciones"
                    class="block container mx-auto py-4 mb-0 h-40 is_valid placeholder-gray-500 sm:text-sm ph-center-observaciones sm:h-24 sm:w-66 sm:-ml-6 sm:-mt-3"
                    placeholder="Observaciones del Mantenimiento Preventivo"
                    name="Observaciones"
                    v-bind:maxlength="limite"                    
                />
                <span class="text-xs text-gray-500 sm:ml-24">{{ restante }}/300</span>
            </div>
        <!--/////////////////////////////////////////////////////////////////
        ////            COMPONENTE IMAGENES REPORTE CARRIL               ////
        ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/2 ml-20 sm:w-full sm:-ml-16 sm:-mt-1 mt-6 ">
                <ImagenesActividadCarril :reporteDataInsertada="reporteInsertado" :referenceNumber="referenceNumber" @ocutar-modal-loading="ocultar_modal_loading"></ImagenesActividadCarril>
            </div>
        <!--/////////////////////////////////////////////////////////////////
        ////                         BOTON CREAR REPORTE                 ////
        ////////////////////////////////////////////////////////////////////-->
            <div class="w-1/2 justify-end flex sm:grid grid-cols-1 sm:w-full sm:-mb-48">
            <!-- reportInsert equivalente a usar route.params.tipoVista == 'crear o editar' -->
                <div v-if="reporteInsert">
                    <div v-if="!reporteInsertado">
                        <button :disabled="modalLoading" @click="crear_header_reporte(true)" class="mt-32 sm:mt-8 botonCrearReporte h-16 w-44" :class="{'botonDeshabilitado': modalLoading}" :disable=" modalLoading ">
                            <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                            <span>Crear Reporte Actividades</span>                    
                        </button>
                    </div>
                    <div v-else>
                        <button :disabled="modalLoading" @click="crear_header_reporte(false)" class="mt-32 sm:mt-8 botonCrearFoto h-16 w-44" :class="{'botonDeshabilitado': modalLoading}" :disable=" modalLoading ">
                            <img src="../../assets/img/camara-fotografica.png" class="mr-2" width="35" height="35" />
                            <span>Crear Reporte Fotografico</span>                    
                        </button>
                    </div>
                </div>
                <div v-else>
                    <button :disabled="modalLoading" @click="crear_header_reporte" class="mt-32 sm:mt-8 botonIconActualizar font-black h-16 w-44" :class="{'botonDeshabilitado': modalLoading}" :disable=" modalLoading ">
                        <img src="../../assets/img/documento.png" class="mr-2" width="35" height="35" />
                        <span>Actualizar Reportes</span>                    
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import HeaderPreventivo from '../../components/Header/CrearHeaderPreventivo'
import TablaActividadesCarril from '../../components/Actividades/TablaActividadesCarril'
import ImagenesActividadCarril from '../../components/ImagenesGenericas'
import ServiceReporte from '../../services/ReportesPDFService'
import EventBus from "../../services/EventBus.js";
import moment from "moment";
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
            letras: 0,
            reporteInsertado: false,
            adminIdCalendarModify: ''
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
                statusMaintenance: headerCompuesto.statusMaintenance,
                adminId: headerCompuesto.adminId,
                squareId: headerCompuesto.squareId
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
            this.reporteInsertado = true                     
        }
    },
    destroyed(){
        EventBus.$off(['actualizar_hora_inicio', 'actualizar_hora_fin'])
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
    modificar_adminid(item){
        alert()
        this.adminIdCalendarModify = item
    },
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
    ocultar_modal_loading() {       
        this.modalLoading = false
        let tipoEncabezadoLane = this.header.capufeLaneNum != '0000' ? 'carril' : undefined
        let objImg = {
            referenceNumber: this.referenceNumber,
            frecuenciaId : this.header.frequencyId,
            tipoEncabezadoLane: tipoEncabezadoLane,
            lane: this.header.lane
        } 
        setTimeout(async () => {            
            await ServiceReporte.generar_pdf_actividades_preventivo(objImg.referenceNumber, objImg.frecuenciaId, objImg.tipoEncabezadoLane)
            await ServiceReporte.generar_pdf_fotografico_preventivo(objImg.referenceNumber, objImg.lane)
            this.$router.push({path: '/ReportesMantenimiento/TablaActividades'})              
        }, 2000);                      
    },
    async crear_header_reporte(value){                                                      
        if(this.validar_horas()) {                                                               
            this.modalLoading = true   
            let refPlaza =  this.$store.getters['Login/GET_REFERENCIA_PLAZA_TO_NOMBRE'](this.header.plazaNombre)                        
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
                AdminSquare: this.adminIdCalendarModify,
                ReportDate: fechaInsercion,
                Start: this.horaInicio,
                End: this.horaFin,
                Observations: this.observaciones,   
                CalendarId: parseInt(this.header.calendarId)     
            }                 
            let banderaInsertar = false
            if(this.reporteInsert){
                if(value){
                    banderaInsertar = true
                }
                else{
                    banderaInsertar = false
                }
            }   
            else banderaInsertar = false
            
            this.$http.post(`${API}/Calendario/CalendarReportData/${refPlaza.refereciaPlaza}/${banderaInsertar}`, headerReporte)
            .then(() => {                                                                                                                           
                    if(this.objetoLogDate.fecha != ''){                                                          
                        let refPlaza = this.referenceNumber.split('-')[0]
                        let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
                        let dateLog = {
                            calendarId: parseInt(this.header.calendarId)     ,
                            date: this.objetoLogDate.fecha,
                            userId: user.idUser,
                            referenceNumber: this.referenceNumber,
                            comment: this.objetoLogDate.motivo,
                        }
                        this.$http.post(`${API}/Calendario/CalendarDateLog/${refPlaza}`, dateLog)
                            .then(() => {                                                                                                                                   
                            })
                    }                                                                                              
                    if(this.reporteInsert){                          
                        if(value) {
                            EventBus.$emit('insertar-todas-actividades')
                            this.modalLoading = false
                            this.reporteInsertado = true    
                        }                        
                        else {
                            this.ocultar_modal_loading()
                        }                                                
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
                    else{                                                
                        this.$notify.success({
                            title: "Ok!",
                            msg: `SE ACTUALIZARON LAS ACTIVIDADES.`,
                            position: "bottom right",
                            styles: {
                                height: 100,
                                width: 500,
                            },
                        });
                        this.ocultar_modal_loading()
                    }                                                                                                                       
            })                                                                                                                                                                                               
        }                   
    }    
}

}
</script>