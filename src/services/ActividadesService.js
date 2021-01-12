import store from '../store/index'

async function filtrar_actividades_mensuales(mes, año){
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
    let obj = {
        listaActividadesMensuales: store.getters['Actividades/GET_ACTIVIDADES_MENSUALES'](objApi),
        plazaNombre: listaPlazas[await store.state.Login.PLAZAELEGIDA].plazaName,
        comentario: store.state.Actividades.comentarioMensual, 
        plazaSelect: user.numPlaza,
        mes: mes,
        año: año,        
    }    
    return obj
}

export default{
    filtrar_actividades_mensuales,
}