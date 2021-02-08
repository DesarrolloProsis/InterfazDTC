<template>
    <div>
         <!--/////////////////////////////////////////////////////////////////
        ////                HEADER REPORTE NIVEL CARRIL                   ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderPreventivo :header="header" :referenceNumber="referenceNumber"></HeaderPreventivo>
         <!--/////////////////////////////////////////////////////////////////
        ////                    TABLA DE ACTIVIDADES JOB                   ////
        ////////////////////////////////////////////////////////////////////-->
        <TablaActividadesCarril :listaActividades="listaActividades" :referenceNumber="referenceNumber"></TablaActividadesCarril>
         <!--/////////////////////////////////////////////////////////////////
        ////          TEXT AREA PARA OBSERVACIONES                         ////
        ////////////////////////////////////////////////////////////////////-->
        <div class=" inline-flex mx-auto w-full pl-20 pr-20">
            <div class="w-1/2">                
                <p class="text-center font-bold text-xl text-gray-800 mb-5">Observaciones</p>          
                <textarea
                    v-model="observaciones"
                    v-validate="'max:300'"
                    :class="{ 'is_valid': !errors.first('Observaciones'), 'is_invalid': errors.first('Observaciones')}"
                    class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                    placeholder="jane@example.com"
                    name="Observaciones"
                />
                <p class="text-xs">{{ errors.first("Observaciones") }}</p>
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
            <div class="w-1/4 justify-end flex">
                <button @click="crear_header_reporte" class="mt-32 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-blue-700 h-16 w-32">
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
            horaInicio: ''
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
            this.header = this.$route.query.header 
            let refPlaza = await this.$store.getters['Login/getReferenceSquareNombre'](this.$route.query.header.plazaNombre)        
            this.referenceNumber = await ServiceReporte.crear_referencia_calendario(
                refPlaza.referenceSquare,
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
            else{
                console.log(this.$route.query.headerCompuesto)
            }
        }
        else{
            let headerCompuesto = this.$route.query.headerCompuesto
            this.header = {
                calendarId: headerCompuesto.calendarId,
                capufeLaneNum: headerCompuesto.capufeLaneNum,
                dateStamp: headerCompuesto.dateStamp,
                day: headerCompuesto.day,
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

//////////////////////////////////////////////////////////////////////
////                            METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
    async crear_header_reporte(){                 
        let validarActividades = this.listaActividades
            .every((actividad) => {                
                return parseInt(actividad.jobStatus) != 0
            })
        if(validarActividades){
                let insercionActividadesPromise = new Promise(async (resolve, reject) => {
                let refPlaza = await this.$store.getters['Login/getReferenceSquareNombre'](this.header.plazaNombre)   
                let user = await this.$store.getters['Login/getUserForDTC'] 
                let fechasplit = this.header.day.split('/')    
                let headerReporte = {
                    ReferenceNumber: this.referenceNumber,
                    SquareId: refPlaza.squareCatalogId,
                    CapufeLaneNum: this.header.capufeLaneNum,
                    IdGare: this.header.idGare,
                    UserId: user.idUser,
                    AdminSquare: refPlaza.adminSquareId,
                    ReportDate: new Date(fechasplit[2], fechasplit[1], fechasplit[0]).toJSON(),
                    Start: this.horaInicio,
                    End: this.horaFin,
                    Observations: this.observaciones,   
                    CalendarId: parseInt(this.header.calendarId)     
                }
                console.log(headerReporte)
                await Axios.post(`${API}/Calendario/CalendarReportData/${refPlaza.referenceSquare}`,headerReporte)
                .then((response) => {     
                    console.log(response)
                    let arrayJob = []       
                    this.listaActividades.forEach(async (item) => {    
                        arrayJob.push({
                                ReferenceNumber: this.referenceNumber,
                                ComponentJob: parseInt(item.idJob),
                                JobStatus: parseInt(item.jobStatus)
                        })    
                    });      
                    console.log(arrayJob)            
                    Axios.post(`${API}/Calendario/CalendarReportActivities/${refPlaza.referenceSquare}/${this.header.calendarId}`, arrayJob)
                    .then((response) => {     
                        console.log(response) 
                        this.$notify.success({
                        title: "Ok!",
                        msg: `SE INSERTO EL HEADER.`,
                        position: "bottom right",
                        styles: {
                            height: 100,
                            width: 500,
                            },
                        });
                        this.$notify.success({
                        title: "Ok!",
                        msg: `SE INSERTARON TODAS LAS ACTIVIDADES.`,
                        position: "bottom right",
                        styles: {
                            height: 100,
                            width: 500,
                            },
                        });
                        resolve('ok')                                                             
                    }).catch(Ex => {    
                        reject(Ex)         
                        console.log(Ex);                                       
                    })                             
                })
                .catch(Ex => {    
                    reject(Ex)                  
                    console.log(Ex);
                });                                  
            })
            insercionActividadesPromise.then(() => {
                EventBus.$emit("guardar_imagenes", this.referenceNumber);                 
                ServiceReporte.generar_pdf_actividades_preventivo(this.referenceNumber, this.header.frequencyId)
                ServiceReporte.generar_pdf_fotografico_preventivo(this.referenceNumber)
                this.$notify.success({
                title: "Ok!",
                msg: `GENERANDO REPORTE.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                    },
                });
                this.$router.push({path: '/ReportesMantenimiento/TablaActividades'})  
            })
            .catch((Ex) => {
                console.log(Ex)
            })           
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