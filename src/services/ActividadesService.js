import store from '../store/index'
import moment from "moment";

async function filtrar_actividades_mensuales(mes, año, tipoCalendario){
    let listaPlazas = await store.getters["Login/getListaPlazasUser"]   
    let user = await store.getters['Login/getUserForDTC']
    if(mes == undefined && año == undefined){
        //let fecha_comodin = new Date()
        mes = 12//fecha_comodin.getMonth() + 1,
        año = 2020//fecha_comodin.getFullYear()
    }        
    let objApi = {
        "userId": user.idUser,
        "squareId": user.numPlaza,
        "month": mes,
        "year": año,
    }
    await store.dispatch('Actividades/OBTENER_ACTIVIDADES_MESNUALES', objApi)   
    let listaActidadesTipo = tipoCalendario === false 
        ? await store.getters['Actividades/GET_ACTIVIDADES_MENSUALES'](objApi)
        : eventos_calendario_formato(objApi)        
    let obj = {
        listaActividadesMensuales: listaActidadesTipo,
        plazaNombre: listaPlazas[await store.state.Login.PLAZAELEGIDA].plazaName,
        comentario: store.state.Actividades.comentarioMensual, 
        plazaSelect: user.numPlaza,
        mes: mes,
        año: año,        
    }    
    return obj
}
function eventos_calendario_formato(objApi){
    let eventoSinFormato = store.getters['Actividades/GET_ACTIVIDADES_MENSUALES'](objApi)
    let catalogoActividades = store.state.Actividades.catalogoActividades
    let eventsReturn = []
    var i = 1;
    let eventoReducidoDay = [];    
    while (i < 31) {
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
        console.log(item)
        let carriles = [];
        for (let item2 of item) {
            carriles.push({
                lane: item2.lane,
                capufeLaneNum: item2.capufeLaneNum,
                idGare: item2.idGare,
            });
        }            
        eventsReturn.push({                        
            start: moment(item[0].day, "DD/MM/YYYY").format("YYYY-MM-DD"), 
            tipoActividad: codigo_colores_actividad(item[0].frequencyId).nombre,
            title: 'Actividad' + ' ' + item[0].frequencyName,                   
            carriles: carriles,            
            end: moment(item[0].day, "DD/MM/YYYY").format("YYYY-MM-DD"),   
            class: codigo_colores_actividad(item[0].frequencyId).css,
            content: '<i class="v-icon material-icons">local_hospital</i>',
        });
    }
    return eventsReturn
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
}