import store from '../store/index'
function formato_cookies_usuario(listaPlazasUser, tipoUsuario){
    console.log(listaPlazasUser)
    let plazasUsuario = listaPlazasUser.map(item => {
        return {
            refereciaPlaza: item.referenceSquare,
            administradorId: item.adminSquareId,
            numeroPlaza: item.squareCatalogId,
            plazaNombre: item.squareName
        }
    })    
    let rollNombre = tipoUsuario.find(tipoUser => tipoUser.id == listaPlazasUser[0].rollId).nombre
    let userValido = plazasUsuario.length > 0 ? true : false
    let cookies = {
        rollId: listaPlazasUser[0].rollId,
        nombreRoll: rollNombre,
        userId: listaPlazasUser[0].userId,
        plazasUsuario: plazasUsuario,
        registrado: userValido
    }    
    localStorage.setItem('cookiesUser', cookies);   
    return cookies 
}
async function actualizar_plaza(plazaSelect, listaPlazas, listaHeaders){
    if(plazaSelect == undefined){        
        listaPlazas = store.state.Login.cookiesUser.plazasUsuario
        listaHeaders = store.state.Header.listaHeaders        
        let plazaSelect = listaPlazas[0]           
        let convenioSelect = listaHeaders.find(header => header.referenceSquare == plazaSelect.refereciaPlaza)
        await store.commit('Login/PLAZA_SELECCIONADA_MUTATION', plazaSelect)                                                
        let objConvenio = {
            id: null,
            numPlaza: plazaSelect.numeroPlaza,
            numConvenio: convenioSelect.agrement,
            idConvenio: convenioSelect.agremmentInfoId,
        }      
        console.log(objConvenio )                
        await store.commit('Header/CONVENIO_ACTUAL_MUTATION', objConvenio)
        await store.commit('Header/HEADER_SELECCIONADO_MUTATION',convenioSelect)
        await store.dispatch('Refacciones/FULL_COMPONETES', objConvenio)
        return {
            plazaSelect,
            convenioSelect,                    
        }
    }
    else{
        store.commit('Login/PLAZA_SELECCIONADA_MUTATION', plazaSelect)  
        let convenioSelect = listaHeaders.find(header => header.referenceSquare == plazaSelect.refereciaPlaza)                                         
        let objConvenio = {
            id: null,
            numPlaza: plazaSelect.numeroPlaza,
            numConvenio: convenioSelect.agrement,
            idConvenio: convenioSelect.agremmentInfoId,
        }                      
        await store.commit('Header/CONVENIO_ACTUAL_MUTATION', objConvenio)
        await store.commit('Header/HEADER_SELECCIONADO_MUTATION',convenioSelect)
        await store.dispatch('Refacciones/FULL_COMPONETES', objConvenio)
        return convenioSelect
    }
}
export default{
    formato_cookies_usuario,
    actualizar_plaza
}