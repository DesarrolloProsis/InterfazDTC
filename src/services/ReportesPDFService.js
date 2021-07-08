
import saveAs from "file-saver";
import store from '../store/index'
import SeriviceActividades from '../services/ActividadesService'
import moment from "moment";
import Axios from '../store/ManejoSolicitudes'
import CookiesService from '../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
const STATUS_REPORTE_CORRECTIVO = Object.freeze({
    sinfirma: 1,
    firmado: 2,
    sellado: 3
})
function xml_hhtp_request(urlTopdf,namePdf){
    var oReq = new XMLHttpRequest();  
    oReq.open("GET", urlTopdf, true);    
    oReq.responseType = "blob";  
    let token = CookiesService.obtener_bearer_token('pdf')
    oReq.setRequestHeader('Authorization', 'Bearer ' + token);       
    oReq.onload = function () {         
    var file = new Blob([oReq.response], {
        type: "application/pdf",
    });       
    saveAs(file, namePdf);
    };
    oReq.send();       
}
function xlsx_hhtp_request(urlToxls,namexls){
    var oReq = new XMLHttpRequest();  
    oReq.open("GET", urlToxls, true);    
    oReq.responseType = "blob";  
    let token = CookiesService.obtener_bearer_token('pdf')
    oReq.setRequestHeader('Authorization', 'Bearer ' + token);       
    oReq.onload = function () {         
    var file = new Blob([oReq.response], {
        type: "application/xlsx",
    });       
    saveAs(file, namexls);
    };
    oReq.send();       
}
async function obtener_admin_id(referenceNumber){
    let id = ''
    await Axios.get(`${API}/dtcData/${referenceNumber.split('-')[0]}/${referenceNumber}`)
    .then(async (response) => {                                              
        id = response.data.result[0].adminSquareId        
    }) 
    return id  
}
async function generar_pdf_correctivo(numeroReferencia, statusId, crearDTC, adminId){    
    let clavePlaza = numeroReferencia.split('-')[0]    
    let urlTopdf = ''
    let namePdf = ''
    if(adminId == undefined){
        adminId = await obtener_admin_id(numeroReferencia)        
    }    
    if(STATUS_REPORTE_CORRECTIVO.sinfirma === statusId){
        urlTopdf = `${API}/pdf/${clavePlaza}/${numeroReferencia}/${adminId}`;
        namePdf = `DTC-${numeroReferencia}.pdf`; 
    }
    else if(STATUS_REPORTE_CORRECTIVO.firmado === statusId){        
        if(crearDTC == true)
            urlTopdf = `${API}/pdf/FirmarReporte/${clavePlaza}/${numeroReferencia}/${adminId}`; 
        else    
            urlTopdf = `${API}/pdf/GetPdfFirmado/${clavePlaza}/${numeroReferencia}/${adminId}`;             
                                
        namePdf = `DTC-${numeroReferencia}-Finalizado.pdf`;        
    } 
    if(STATUS_REPORTE_CORRECTIVO.sellado === statusId){
        urlTopdf = `${API}/pdf/GetPdfSellado/${clavePlaza}/${numeroReferencia}`;
        namePdf = `DTC-${numeroReferencia}-Sellado.pdf`;  
    }      
    xml_hhtp_request(urlTopdf, namePdf)                          
}
function generar_pdf_calendario(referenceSquare, fecha, userSup){
    let user = {}
    if(userSup == undefined)
        user = store.getters['Login/GET_USEER_ID_PLAZA_ID']
    else
        user = userSup
    let urlTopdf = `${API}/Calendario/Mantenimiento/${referenceSquare}/${fecha.mes}/${fecha.año}/${user.idUser}/${user.numPlaza}`;              
    let namePdf = `REPORTE-${SeriviceActividades.numero_to_nombre(fecha.mes)}.pdf`;
    xml_hhtp_request(urlTopdf, namePdf)           
}
async function crear_referencia(sinisterDate, referenceSquare,bandera) {
    if(bandera != true)
    {
        sinisterDate = moment(sinisterDate,"DD-MM-YYYY").format("YYYY-MM-DD")
        let datesplit =  sinisterDate.split("-");        
        let diaActual = parseInt(datesplit[2]);
        let mesActual = parseInt(datesplit[1]);
        let yearActual = parseInt(datesplit[0]);
        let diaCorriente = 0;
        let newYear = parseInt(sinisterDate.substr(2, 2));
        diaCorriente = diaActual;
        for (let i = 1; i < mesActual; i++) {
            diaCorriente += parseInt(new Date( yearActual, i, 0).getDate());
        }
        let nomPlaza = referenceSquare;
        let autoCompleteDias;
        if(diaCorriente < 10) autoCompleteDias = "00" +  diaCorriente.toString();
        else if (diaCorriente < 100) autoCompleteDias = "0" + diaCorriente.toString();
        else autoCompleteDias = diaCorriente.toString();
        let referenceNumber = nomPlaza + "-" + newYear + autoCompleteDias;
        await store.commit("Header/REFERENCIA_DTC_MUTATION", referenceNumber);
        await store.dispatch("Header/BUSCAR_REFERENCIA_DTC_VALIDA", referenceNumber);    
        return await store.state.Header.referenciaDtc
    }
    else{
        sinisterDate = moment(sinisterDate,"DD-MM-YYYY").format("YYYY-MM-DD")
        let datesplit =  sinisterDate.split("-");        
        let diaActual = parseInt(datesplit[2]);
        let mesActual = parseInt(datesplit[1]);
        let yearActual = parseInt(datesplit[0]);
        let diaCorriente = 0;
        let newYear = parseInt(sinisterDate.substr(2, 2));
        diaCorriente = diaActual;
        for (let i = 1; i < mesActual; i++) {
            diaCorriente += parseInt(new Date( yearActual, i, 0).getDate());
        }
        let nomPlaza = referenceSquare;
        let autoCompleteDias;
        if(diaCorriente < 10) autoCompleteDias = "00" +  diaCorriente.toString();
        else if (diaCorriente < 100) autoCompleteDias = "0" + diaCorriente.toString();
        else autoCompleteDias = diaCorriente.toString();
        let referenceNumber = nomPlaza + "-DF-" + newYear + autoCompleteDias;
        let newREferencee = Axios.get(`${API}/DiagnosticoFalla/GetReference/${referenceNumber.split('-')[0]}/${referenceNumber}`) 
            .then((response) => response.data.result[0])                       
        return newREferencee   
    }
}
async function crear_referencia_calendario(numeroReferencia, tipoReferencia, fechaActividad, carril){   
    fechaActividad = fechaActividad.split('/')                   
    let diaCorriente = 0;    
    diaCorriente = parseInt(fechaActividad[0]);
    for (let i = 1; i < parseInt(fechaActividad[1]); i++) {
        diaCorriente += parseInt(new Date(parseInt(fechaActividad[2]), i, 0).getDate());
    }         
    let tiporeferencia = tipoReferencia != 'Semanal' 
        ? tipoReferencia.slice(0,2)
        : tipoReferencia.slice(0,1)
            
    let referenciaNueva = 
        numeroReferencia + '-' + 'MP' + 
        tiporeferencia + 
        diaCorriente + 
        fechaActividad[2].slice(2) + '-' + 
        carril.slice(0,3)
    return referenciaNueva.toUpperCase()
}
const TIPOSENCABEZADOREPORTECARRIL = [
    { frecuencia: 1, encabezado:  1, tipoCarril: false },
    { frecuencia: 2, encabezado:  2, tipoCarril: false },
    { frecuencia: 3, encabezado:  3, tipoCarril: false },
    { frecuencia: 4, encabezado:  4, tipoCarril: false },
    { frecuencia: 5, encabezado:  5, tipoCarril: false },    
    { frecuencia: 1, encabezado:  6, tipoCarril: true },
    { frecuencia: 2, encabezado:  7, tipoCarril: true },
    { frecuencia: 3, encabezado:  8, tipoCarril: true },
    { frecuencia: 4, encabezado:  9, tipoCarril: true },
    { frecuencia: 5, encabezado:  10, tipoCarril: true },        
]
function frecuencia_id_to_encabezado_id(frecuenciaId, tipo){ 
    if(tipo == 'carril')
        return TIPOSENCABEZADOREPORTECARRIL.find(item => item.frecuencia == parseInt(frecuenciaId) && item.tipoCarril == true).encabezado
    else
        return TIPOSENCABEZADOREPORTECARRIL.find(item => item.frecuencia == parseInt(frecuenciaId) && item.tipoCarril == false).encabezado
}
async function generar_pdf_actividades_preventivo(referenceNumber, tipoEncabezado, tipoEncabezadoLane){    
    let clavePlaza = referenceNumber.split('-')[0]
    let urlTopdf = `${API}/MantenimientoPdf/${clavePlaza}/${frecuencia_id_to_encabezado_id(tipoEncabezado, tipoEncabezadoLane)}/${referenceNumber}`       
    let namePdf = referenceNumber
    xml_hhtp_request(urlTopdf, namePdf)    
}
async function generar_pdf_fotografico_preventivo(referenceNumber, lane){    
    Axios.get(`${API}/ReporteFotografico/MantenimientoPreventivo/Images/GetPaths/${referenceNumber.split('-')[0]}/${referenceNumber}`)
    .then((response) => {            
        if(response.data.length > 0){
            let clavePlaza = referenceNumber.split('-')[0]
            let urlTopdf = `${API}/ReporteFotografico/Reporte/${clavePlaza}/${referenceNumber}/${lane.split('-')[0]}`       
            let namePdf = 'ReporteFotografica' + '-' + referenceNumber
            xml_hhtp_request(urlTopdf, namePdf)    
        }
    });    
}
function generar_pdf_calendario_escaneado(año, mes){
    let clavePlaza = store.getters['Login/GET_REFERENCIA_ACTUAL_PLAZA']
    let idPlazaUser = store.getters['Login/GET_USEER_ID_PLAZA_ID']
    let urlTopdf = `${API}/Calendario/GetPdfSellado/${clavePlaza}/${año}/${mes}/${idPlazaUser.idUser}`
    let namePdf = clavePlaza + año.toString().slice(2) + '-' + mes + 'C-Escaneado.pdf'  
    xml_hhtp_request(urlTopdf, namePdf) 
}
function generar_pdf_diagnostico_falla(referenceNumber){
    let clavePlaza = referenceNumber.split('-')[0]
    let urlTopdf = `${API}/DiagnosticoFalla/${clavePlaza}/${referenceNumber}`
    let namePdf = referenceNumber
    xml_hhtp_request(urlTopdf, namePdf)        
}
function generar_pdf_fotografico_correctivo(referenceNumber){
    let clavePlaza = referenceNumber.split('-')[0]
    Axios.get(`${API}/ReporteFotografico/Dañado/${clavePlaza}/0/${referenceNumber}`)
    let urlTopdf = `${API}/ReporteFotografico/Dañado/${clavePlaza}/0/${referenceNumber}`
    let namePdf = 'ReporteFotografico' + '-' + referenceNumber
    xml_hhtp_request(urlTopdf, namePdf) 
    
    
}
function generar_pdf_ficha_falla(referenceNumber){
    let clavePlaza = referenceNumber.split('-')[0]    
    let urlTopdf = `${API}/FichaTecnicaAtencion/${clavePlaza}/${referenceNumber}`
    if(referenceNumber.split('-')[0,3] != undefined){
        let namePdf = clavePlaza + '-' + 'FT' + '-' + referenceNumber.split('-')[0,2] + '-' + referenceNumber.split('-')[0,3]
        xml_hhtp_request(urlTopdf, namePdf)        
    }else{
        let namePdf = clavePlaza + '-' + 'FT' + '-' + referenceNumber.split('-')[0,2]
        xml_hhtp_request(urlTopdf, namePdf)        
    }
}
function generar_pdf_sellado_preventivo(referenceNumber){
    let clavePlaza = referenceNumber.split('-')[0]
    Axios.get(`${API}/MantenimientoPdf/TablaActEscaneado/${clavePlaza}/${referenceNumber}`)
    let urlTopdf = `${API}/MantenimientoPdf/TablaActEscaneado/${clavePlaza}/${referenceNumber}`
    let namePdf = referenceNumber + '-' + 'Sellado'
    xml_hhtp_request(urlTopdf, namePdf) 
}
function generar_pdf_ficha_sellada(referenceNumber,tipo){
    let type = tipo
    let clavePlaza = referenceNumber.split('-')[0]
    if(type == 1){
        let urlTopdf = `${API}/PDF/GetPdfGenerico/${clavePlaza}/${referenceNumber}/${type}`
        let namePdf = referenceNumber + '-' + 'Sellado'
        xml_hhtp_request(urlTopdf,namePdf)
    }
    else{
        let urlTopdf = `${API}/PDF/GetPdfGenerico/${clavePlaza}/${referenceNumber}/${type}`
        let namePdf = clavePlaza + '-' + 'FT' + '-' + referenceNumber.split('-')[0,2] + '-' + 'Sellado'
        xml_hhtp_request(urlTopdf,namePdf)
    }
}
function reporte_componentes(){
    let urlExcel = `${API}/Component/DescargarExcel`
    let nameExcel = 'ReporteDeComponentes.xlsx'
    xlsx_hhtp_request(urlExcel,nameExcel)
}
function manual_pdf(){
    let manual = `${API}/Manual/getManual`
    let namePdf = 'Manual de Usuario'
    xml_hhtp_request(manual, namePdf)

}
export default {
    generar_pdf_correctivo,
    crear_referencia,
    crear_referencia_calendario,
    generar_pdf_calendario,
    generar_pdf_actividades_preventivo,
    generar_pdf_fotografico_preventivo,
    generar_pdf_calendario_escaneado,
    generar_pdf_diagnostico_falla,
    generar_pdf_ficha_falla,
    manual_pdf,
    obtener_admin_id,
    generar_pdf_fotografico_correctivo,
    generar_pdf_sellado_preventivo,
    generar_pdf_ficha_sellada,
    reporte_componentes
}
