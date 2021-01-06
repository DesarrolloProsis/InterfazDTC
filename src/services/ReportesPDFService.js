
import saveAs from "file-saver";
//import store from '../store/index.js'

const API = process.env.VUE_APP_URL_API_PRODUCCION
const STATUS_REPORTE_CORRECTIVO = Object.freeze({
    completado: 2,
    sellado: 3
})
function generar_pdf_correctivo(numeroReferencia, statusId, crearDTC){
    let clavePlaza = numeroReferencia.split('-')[0]
    var oReq = new XMLHttpRequest();    
    let urlTopdf = ''
    let namePdf = ''
    if(STATUS_REPORTE_CORRECTIVO.completado === statusId){
        if(crearDTC == true)
            urlTopdf = `${API}/pdf/FirmarReporte/${clavePlaza}/${numeroReferencia}/${clavePlaza}`; 
        else    
            urlTopdf = `${API}/pdf/GetPdfFirmado/${clavePlaza}/${numeroReferencia}`; 
        namePdf = `DTC-${numeroReferencia}-Finalizado.pdf`;        
    } 
    if(STATUS_REPORTE_CORRECTIVO.sellado === statusId){
        urlTopdf = `${API}/pdf/GetPdfSellado/${clavePlaza}/${numeroReferencia}`;
        namePdf = `DTC-${numeroReferencia}-Sellado.pdf`;  
    }    
    console.log(urlTopdf)                       
    oReq.open("GET", urlTopdf, true);    
    oReq.responseType = "blob";         
    oReq.onload = function () {         
    var file = new Blob([oReq.response], {
        type: "application/pdf",
    });    
    saveAs(file, namePdf);
    };
    oReq.send();
    console.log(oReq)        
}
export default {
    generar_pdf_correctivo
}
