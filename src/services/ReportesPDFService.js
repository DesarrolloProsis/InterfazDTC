
import saveAs from "file-saver";
import store from '../store/index'
import moment from "moment";

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
async function crear_referencia(sinisterDate, referenceSquare) {
    sinisterDate = moment(sinisterDate,"DD-MM-YYYY").format("YYYY-MM-DD")
    let datesplit =  sinisterDate.split("-");
    console.log(datesplit)
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
    if(diaCorriente < 10)
        autoCompleteDias = "00" +  diaCorriente.toString();
    else if (diaCorriente < 100)
        autoCompleteDias = "0" + diaCorriente.toString();
    else 
        autoCompleteDias = diaCorriente.toString();
    let ReferenceNumber = nomPlaza + "-" + newYear + autoCompleteDias;
    await store.commit("Header/referenceNumMutation", ReferenceNumber);
    await store.dispatch("Header/buscarReferencia", ReferenceNumber);
    
    return await store.getters["Header/getreferenceNum"];        
}
export default {
    generar_pdf_correctivo,
    crear_referencia
}
