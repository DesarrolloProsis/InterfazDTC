import store from "../store/index"
import moment from "moment";
async function filtrarDTC (filtroVista, numPlaza, fecha, referenceNumber, status, banderafecha, listaOpcional){         
    let listaCompleta  = []
    if(listaOpcional == undefined)
        listaCompleta = await store.getters["DTC/GET_LISTA_DTC"](filtroVista);
    else
        listaCompleta = listaOpcional
        
    let listaFiltrada = []  
    //Si filtra por plaza, fecha y referencia
    if (numPlaza != "" && fecha != "" && referenceNumber != ""){
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza, true)
        listaFiltrada = filtro_fecha_dtc( listaFiltrada, fecha, banderafecha)
        listaFiltrada = filtro_referencia(listaFiltrada,referenceNumber)
    }
    //Si filtra por plaza y fecha
    else if (numPlaza != "" && fecha != ""){   
        listaFiltrada = filtro_plaza(listaCompleta, numPlaza, true)
        listaFiltrada = filtro_fecha_dtc( listaFiltrada, fecha, banderafecha)
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
        listaFiltrada = filtro_fecha_dtc(listaCompleta, fecha, banderafecha)
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
        return  listaFiltrada      
}
function filtro_plaza (listaDTC, numPlaza, tipoDTC) {
    let listaFiltrada = []
    if(tipoDTC)
        listaFiltrada = listaDTC.filter(dtc => dtc.squareCatalogId == numPlaza)
    else
        listaFiltrada = listaDTC.filter(dtc => dtc.plazaId == numPlaza)

    return listaFiltrada
}
function  filtro_fecha_dtc (listaDTC, fecha, sinisterOrdElab) {
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
function filtro_encargados_plaza (listaEncargados, plaza, nombre){
    let encargadosFiltrados = [] 
    if(plaza != ''){
        encargadosFiltrados = listaEncargados.filter(encargado => encargado.squareCatalogId == plaza)
    }
    if(nombre != '' || nombre > 0){
        let array_encargados = []
        encargadosFiltrados = encargadosFiltrados.length == 0 ? listaEncargados : encargadosFiltrados
        for(let nueva of encargadosFiltrados){
        let nombreCompleto = `${nueva.name} ${nueva.lastName1} ${nueva.lastName2}`  
            if(nombreCompleto.toUpperCase().includes(nombre.toUpperCase())){
                array_encargados.push(nueva)
            }
        }
        encargadosFiltrados = array_encargados
    }
    return encargadosFiltrados
}
function filtro_dtc_borrado(listaBorrados, ref){
    let listaFiltro = []    
    if(ref != ''){
        listaFiltro = listaBorrados.filter(dtc => dtc.refereceNumber == ref)
    }
    return listaFiltro
} 
function filtros_concentrado_diagnostico(listaDiagnostico, objFiltro){        
    let listaFiltrada = []
    if(objFiltro.plaza != ''){
        listaFiltrada = listaDiagnostico.filter(ficha => ficha.squareId.includes(objFiltro.plaza))
    }
    if(objFiltro.numeroReferencia != ''){
        if(listaFiltrada.length == 0)
            listaFiltrada = listaDiagnostico.filter(ficha => ficha.referenceNumber.includes(objFiltro.numeroReferencia))
        else
            listaFiltrada = listaFiltrada.filter(ficha => ficha.referenceNumber.includes(objFiltro.numeroReferencia))
    }
    if(objFiltro.fecha != '' ){
        if(listaFiltrada.length == 0)
            listaFiltrada = listaDiagnostico.filter(ficha => ficha.diagnosisDate.slice(0,10) == objFiltro.fecha)
        else
            listaFiltrada = listaFiltrada.filter(ficha => ficha.diagnosisDate.slice(0,10) == objFiltro.fecha)
    }
    if(objFiltro.ubicacion != ''){
        if(listaFiltrada.length == 0)
            listaFiltrada = listaDiagnostico.filter(ficha => ficha.lanes.split(',').includes(objFiltro.ubicacion.lane))
        else
            listaFiltrada = listaFiltrada.filter(ficha => ficha.lanes.split(',').includes(objFiltro.ubicacion.lane))
    }
    
    return listaFiltrada
}
export default {
    filtrarDTC,
    filtrar_calendario_historico,
    filtro_encargados_plaza,
    filtros_concentrado_diagnostico,
    filtro_dtc_borrado,
}