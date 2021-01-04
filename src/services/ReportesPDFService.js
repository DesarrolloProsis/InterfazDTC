
import saveAs from "file-saver";
import store from '../store/index.js'

const API = process.env.VUE_APP_URL_API_PRODUCCION
const STATUS_REPORTE_CORRECTIVO = Object.freeze({
    completado: 2,
    firmado: 3,
    sellado: 4
})

function generar_pdf_correctivo(numeroReferencia, statusId){
    let clavePlaza = numeroReferencia.split('-')[0]
    var oReq = new XMLHttpRequest();    
    let urlTopdf = ''
    if(STATUS_REPORTE_CORRECTIVO.completado === statusId){
        urlTopdf = `${API}/pdf/${clavePlaza}/${numeroReferencia}/${clavePlaza}`; 
    }
    if(STATUS_REPORTE_CORRECTIVO.firmado === statusId){
        urlTopdf = `${API}/pdf/FirmarReporte/${clavePlaza}/${numeroReferencia}/${clavePlaza}`;
    }
    if(STATUS_REPORTE_CORRECTIVO.sellado === statusId){
        urlTopdf = `${API}/pdf/GetPdfSellado/${clavePlaza}/${numeroReferencia}/${clavePlaza}`;
    }               
    let namePdf = `ReportDTC-${this.refNum}.pdf`;                
    oReq.open("GET", urlTopdf, true);    
    oReq.responseType = "blob";         
    oReq.onload = function () {         
    var file = new Blob([oReq.response], {
        type: "application/pdf",
    });    
    saveAs(file, namePdf);
    };
    oReq.send();
}
export default {
    generar_pdf_correctivo
}
