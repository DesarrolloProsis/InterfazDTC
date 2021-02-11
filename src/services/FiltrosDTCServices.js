import store from "../store/index"
import moment from "moment";
async function filtrarDTC (numPlaza, fecha, referenceNumber, status, banderafecha){
    console.log(numPlaza)
    console.log(fecha)
    console.log(referenceNumber)
    console.log(status)
    console.log(banderafecha)
    this.infoDTC  = []
    let listaCompleta  = await store.getters["DTC/getlistaInfoDTC"]; 
    let listaFiltrada = []  
    //Si filtra por plaza, fecha y referencia
    if (numPlaza != "" && fecha != "" && referenceNumber != ""){
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza)
        listaFiltrada = filtro_fecha( listaFiltrada, fecha, banderafecha)
        listaFiltrada = filtro_referencia(listaFiltrada,referenceNumber)
    }
    //Si filtra por plaza y fecha
    else if (numPlaza != "" && fecha != ""){   
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza)
        listaFiltrada = filtro_fecha( listaFiltrada, fecha, banderafecha)
    }
    //Si filtra por  plaza y referencia
    else if (referenceNumber != "" && numPlaza != "") {     
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza)
        listaFiltrada = filtro_referencia(listaFiltrada,referenceNumber)
    }
    //Si filtra solo por la plaza
    else if(numPlaza != "" && fecha == "" && referenceNumber == ""){      
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza)
    }
    //Si filtra solo por la fecha
    else if (fecha != "" && numPlaza == "" && referenceNumber == "") {    
        listaFiltrada = filtro_fecha(listaCompleta, fecha, banderafecha)
    }
    //Si filtra solo por la Referencia
    else if (referenceNumber != "" && numPlaza == "" && fecha == "") {     
        listaFiltrada = filtro_referencia(listaCompleta,referenceNumber)
    }
    
    if(status != undefined && status != '')
        return listaFiltrada.filter(dtc => dtc.statusId == status)
    else
        return listaFiltrada
}
function filtro_plaza (listaDTC, numPlaza) {
    let listaFiltrada = listaDTC.filter(dtc => dtc.squareCatalogId == numPlaza)
    return listaFiltrada
}
function  filtro_fecha (listaDTC, fecha, sinisterOrdElab) {
    let formatFecha = moment(fecha).format("DD/MM/YYYY");
    let newArray = [];
    for (let item of listaDTC) {
        if(sinisterOrdElab == true){
            if (moment(item.sinisterDate).format("DD/MM/YYYY") == formatFecha) {
                newArray.push(item);
            }
        }
        else{
            if (moment(item.elaborationDate).format("DD/MM/YYYY") == formatFecha) {
                newArray.push(item);
            }
        }
    }
    return newArray    
}
function filtro_referencia (listaDTC,referenceNumber) {
    let newArray = [];
    for (let item of listaDTC) {          
        if (item.referenceNumber.includes(referenceNumber.trim().toUpperCase())) {
            newArray.push(item);
            }
        }
    return newArray
}
export default
{
    filtrarDTC
}