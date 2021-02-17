import store from "../store/index"
import moment from "moment";
async function filtrarDTC (filtroVista, numPlaza, fecha, referenceNumber, status, banderafecha){         
    let listaCompleta  = await store.getters["DTC/getlistaInfoDTC"](filtroVista); 
    let listaFiltrada = []  
    //Si filtra por plaza, fecha y referencia
    if (numPlaza != "" && fecha != "" && referenceNumber != ""){
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza, true)
        listaFiltrada = filtro_fecha( listaFiltrada, fecha, banderafecha)
        listaFiltrada = filtro_referencia(listaFiltrada,referenceNumber)
    }
    //Si filtra por plaza y fecha
    else if (numPlaza != "" && fecha != ""){   
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza, true)
        listaFiltrada = filtro_fecha( listaFiltrada, fecha, banderafecha)
    }
    //Si filtra por  plaza y referencia
    else if (referenceNumber != "" && numPlaza != "") {     
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza, true)
        listaFiltrada = filtro_referencia(listaFiltrada,referenceNumber)
    }
    //Si filtra solo por la plaza
    else if(numPlaza != "" && fecha == "" && referenceNumber == ""){      
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza, true)
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
        if(listaFiltrada.length == 0)
            return listaCompleta.filter(dtc => dtc.statusId == status)
        else
            return listaFiltrada.filter(dtc => dtc.statusId == status)
    else
        return listaFiltrada
}
function filtro_plaza (listaDTC, numPlaza, tipoDTC) {
    let listaFiltrada = []
    if(tipoDTC)
        listaFiltrada = listaDTC.filter(dtc => dtc.squareCatalogId == numPlaza)
    else
        listaFiltrada = listaDTC.filter(dtc => dtc.plazaId == numPlaza)

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

function filtrar_calendario_historico(listaCalendario, numTramo, numPlaza, año, mes){
    console.log(listaCalendario)
    console.log(numTramo)
    console.log(numPlaza)
    console.log(año)
    let listaCompleta = listaCalendario
    let listaFiltrada = []
    if(numTramo != ''){
        listaFiltrada = filtro_tramo(listaCompleta, numTramo)
    }
    if(numPlaza != ''){
        if(listaFiltrada.length == 0)
            listaFiltrada = filtro_plaza(listaCompleta, numPlaza, false)
        else
            listaFiltrada = filtro_plaza(listaFiltrada, numPlaza, false)
    }
    if(año != ''){
        if(listaFiltrada.length == 0)
            listaFiltrada = filtro_año(listaCompleta, año)
        else
            listaFiltrada = filtro_año(listaFiltrada, año)
    }
    if(mes != ''){
        if(listaFiltrada.length == 0)
            listaFiltrada = filtro_mes(listaCompleta, mes)
        else
            listaFiltrada = filtro_mes(listaFiltrada, mes)
    }
    return listaFiltrada
}
function filtro_tramo (listaDTC, numTramo) {
    let listaFiltrada = listaDTC.filter(dtc => dtc.delegationId == numTramo)
    return listaFiltrada
}
function filtro_año (listaDTC, año) {
    let listaFiltrada = listaDTC.filter(dtc => dtc.year == parseInt(año))
    return listaFiltrada
}
function filtro_mes (listaDTC, mes) {
    let listaFiltrada = listaDTC.filter(dtc => dtc.month == parseInt(mes))
    return listaFiltrada
}
export default
{
    filtrarDTC,
    filtrar_calendario_historico
}