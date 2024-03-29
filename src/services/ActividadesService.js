import store from '../store/index'
import moment from "moment";
import Axios from '../store/ManejoSolicitudes'
const API = process.env.VUE_APP_URL_API_PRODUCCION

async function filtrar_actividades_mensuales(mes, año, tipoCalendario, status, carril, ref){
    let user = await store.getters['Login/GET_USEER_ID_PLAZA_ID']
    let nombrePlaza = store.state.Login.plazaSelecionada.plazaNombre    
    store.dispatch('Refacciones/BUSCAR_CARRILES',user.numPlaza)
    if(mes == undefined && año == undefined){
        let fecha_comodin = new Date()
        mes = fecha_comodin.getMonth() + 1,
        año = fecha_comodin.getFullYear()
    }       
    let listaActidadesTipo = []    
    if(ref != undefined){   
        //Consulta tecnicos y Admin capufe desarrollo  
        let objApiNuevo = { "userId": user.idUser, referenceNumber: ref }                       
        listaActidadesTipo = await Axios.post(`${API}/Calendario/GetActividadesFiltroReferencia`, objApiNuevo)
            .then((response) => {                    
                return response.data.result.map(actividad => { 
                    let ayudaFecha = new Date(parseInt(actividad.year), parseInt(actividad.month - 1), parseInt(actividad.day))                                                                     
                    actividad["day"] = moment(ayudaFecha).format("DD/MM/YYYY"); //`${actividad.day}/${obj.month}/${obj.year}`  
                    actividad["frequencyName"] = store.state.Actividades.catalogoActividades.find(item => item.value == actividad.frequencyId).text         
                    return { ...actividad }
                })                  
            })            
    }
    else{   
        let tipoUsuario = store.state.Login.cookiesUser.rollId
        let objApi = { "userId": user.idUser, "squareId": user.numPlaza, "month": mes, "year": año,}
        if(tipoUsuario == 4 || tipoUsuario == 8 || tipoUsuario == 7 || tipoUsuario == 10 || tipoUsuario == 2 || tipoUsuario == 5 )   
            await store.dispatch('Actividades/OBTENER_ACTIVIDADES_MESNUALES_ADMIN', objApi) 
        else
            await store.dispatch('Actividades/OBTENER_ACTIVIDADES_MESNUALES', objApi) 

        listaActidadesTipo = tipoCalendario === false 
        ? await store.getters['Actividades/GET_ACTIVIDADES_MENSUALES'](objApi)
        : eventos_calendario_formato(objApi)                       
        if (status === true || status === false){             
            listaActidadesTipo = listaActidadesTipo.filter(item => item.statusMaintenance == status)                                     
        }        
        if (carril != undefined){              
            listaActidadesTipo = listaActidadesTipo.filter(item => item.lane.split('-')[0] == carril)
        }
    }    
    let obj = {
        listaActividadesMensuales: listaActidadesTipo,
        plazaNombre: nombrePlaza,
        comentario: store.state.Actividades.comentarioMensual, 
        plazaSelect: user.numPlaza,
        mes: mes,
        año: año,
        mesNombre: numero_to_nombre(mes)         
    }    
    return obj
}
function eventos_calendario_formato(objApi){
    let eventoSinFormato = store.getters['Actividades/GET_ACTIVIDADES_MENSUALES'](objApi)    
    let catalogoActividades = store.state.Actividades.catalogoActividades
    let eventsReturn = []
    var i = 1;
    let eventoReducidoDay = [];       
    while (i < 32) {
        let query = eventoSinFormato.filter(
            (item) => item.day.split('/')[0] == i
        );                
        for (let actividad of catalogoActividades) {                         
            let _itemFilter = query.filter(itemfilter => {
                return parseInt(itemfilter.frequencyId) == actividad.value
            })                               
            if(_itemFilter.length > 0) {                            
                eventoReducidoDay.push(_itemFilter);
            }
        }
        i++;
    }        
    for (let item of eventoReducidoDay) {  
        eventsReturn.push(construir_objeto_actividad(item, item[0]))
    }
    return eventsReturn.flat()
}
function construir_objeto_actividad(listaCarriles, info){
    let carriles = []    
    for (let carril of listaCarriles) {
        carriles.push({
            lane: carril.lane,
            capufeLaneNum: carril.capufeLaneNum,
            idGare: carril.idGare,
            calendarId: parseInt(carril.calendarId),
            referenceNumber: carril.referenceNumber            
        });
    }       
    return {                        
        start: moment(info.day, "DD/MM/YYYY").format("YYYY-MM-DD"), 
        tipoActividad: codigo_colores_actividad(info.frequencyId).nombre,
        title: 'Actividad' + ' ' + codigo_colores_actividad(info.frequencyId).nombre,                   
        carriles: carriles,            
        end: moment(info.day, "DD/MM/YYYY").format("YYYY-MM-DD"),   
        class: codigo_colores_actividad(info.frequencyId).css,                            
    }    
}
function objeto_actividad_insertar(listaCarriles, info, comentario, adminId){
    let idGares = []    
    let capufeLaneNum = []
    let daySplit = info.day.split('/')
    let user = store.getters['Login/GET_USEER_ID_PLAZA_ID']
    for (let carril of listaCarriles) {
        idGares.push(carril.idGare);
        capufeLaneNum.push(carril.capufeLaneNum);
    }    
    let obj = {};       
    obj["frequencyId"] = info.frequencyId,
    obj["capufeLaneNums"] = capufeLaneNum,
    obj["idGares"] = idGares,
    obj["squareId"] = user.numPlaza,
    obj["userId"] = user.idUser,
    obj["day"] = parseInt(daySplit[0]),
    obj["month"] = parseInt(daySplit[1]),
    obj["year"] = parseInt(daySplit[2])
    obj["adminId"] = adminId   
    return obj
}
const MESES = [{"nombre": "ENERO", "numero": 1},
                {"nombre": "FEBRERO", "numero": 2},
                {"nombre": "MARZO", "numero": 3},
                {"nombre": "ABRIL", "numero": 4},
                {"nombre": "MAYO", "numero": 5},
                {"nombre": "JUNIO", "numero": 6},
                {"nombre": "JULIO", "numero": 7},
                {"nombre": "AGOSTO", "numero": 8},
                {"nombre": "SEPTIEMBRE", "numero": 9},
                {"nombre": "OCTUBRE", "numero": 10},
                {"nombre": "NOVIEMBRE", "numero": 11},
                {"nombre": "DICIEMBRE", "numero": 12}
            ]
const nombre_to_numero = function(_mes){    
    return MESES.find(mes => mes.nombre == _mes.toUpperCase()).numero
}
const numero_to_nombre = function(_numero){
    return MESES.find(mes => mes.numero == _numero).nombre
}
function codigo_colores_actividad(frequencyId){
    switch(parseInt(frequencyId)) {
        case 1:
            return { css: 'ActividadSemanal', nombre: 'Semanal' }
        case 2:
            return { css: 'ActividadMensual', nombre: 'Mensual' }                    
        case 3:
            return { css: 'ActividadTrimestral', nombre: 'Trimestral' }                                
        case 4:
            return { css: 'ActividadSemestral', nombre: 'Semestral' }                                           
        case 5:
            return { css: 'ActividadAnual', nombre: 'Anual' }                                                       
        default:
            break;
    }
}
export default{
    filtrar_actividades_mensuales, 
    construir_objeto_actividad,
    objeto_actividad_insertar,
    nombre_to_numero,
    numero_to_nombre,    
}