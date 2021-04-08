import store from '../store/index'
import router from '../router/index'
import Axios from 'axios'
//import Axios from 'axios'
const API = process.env.VUE_APP_URL_API_PRODUCCION
function formato_cookies_usuario(loginSesion){       
    let cookies = {}
    let tokenUser = {}
    Axios.post(`${API}/login/Cookie`, { userId: loginSesion.userId })
    .then((response) => {         
        let plazasUsuario =  response.data.result.cookie.map(item => {        
               return {
                   refereciaPlaza: item.referenceSquare,
                   administradorId: item.adminSquareId,
                   numeroPlaza: item.squareCatalogId,
                   plazaNombre: item.squareName,
                   plazaAdminNombre: item.plazaAdministrador,
                   statusAdmin: item.statusAdmin
               }
        })          
        tokenUser = response.data.result.userToken
        cookies['plazasUsuario'] = plazasUsuario
        cookies['rollId'] = loginSesion.rolId
        cookies['nombreRoll'] = loginSesion.rolDescription
        cookies['userId'] = loginSesion.userId 
        cookies['registrado'] = cookies.plazasUsuario.length > 0 ? true : false  

        Axios.post(`${API}/login/LoginInfo`, { userId: loginSesion.userId })
        .then((response) => {                  
            store.commit("Login/LISTA_HEADER_PLAZA_USER_MUTATION", response.data.result.loginList) 
        })                       
        localStorage.clear()    
        localStorage.setItem('cookiesUser', JSON.stringify(cookies));  
        localStorage.setItem('token', JSON.stringify(tokenUser)) 
    })
    .catch((error) => {
        console.log(error)
    })
    console.log(cookies)
    return cookies 
}
async function actualizar_plaza(plazaSelect, listaPlazas, listaHeaders, soloReferencia, adminId){            
    if(soloReferencia != undefined){  
        console.log(plazaSelect)
        console.log(listaPlazas)
        console.log(listaHeaders)
        console.log(soloReferencia)
        console.log(adminId)
        //Ediciio para el dtc y le tenmeos que pedir parametro que adminId                    
        listaPlazas = store.state.Login.cookiesUser.plazasUsuario        
        listaHeaders = store.state.Header.listaHeaders            
        let plazaSelect = listaPlazas.find(plaza => plaza.refereciaPlaza == soloReferencia && plaza.adminSquareId == adminId)                 
        let convenioSelect = listaHeaders.find(header => header.referenceSquare == soloReferencia && header.adminSquareId == adminId)           
        await store.commit('Login/PLAZA_SELECCIONADA_MUTATION', plazaSelect)                                                
        let objConvenio = {
            id: null,
            numPlaza: plazaSelect.numeroPlaza,
            numConvenio: convenioSelect.agrement,
            idConvenio: convenioSelect.agremmentInfoId,
        }                            
        await store.commit('Header/CONVENIO_ACTUAL_MUTATION', objConvenio)
        await store.commit('Header/HEADER_SELECCIONADO_MUTATION',convenioSelect)
        await store.dispatch('Refacciones/FULL_COMPONETES', objConvenio)        
        console.log('convenio Nuevo')        
        return {
            plazaSelect,
            convenioSelect,                    
        }   
    }
    else if(plazaSelect == undefined){        
        listaPlazas = store.state.Login.cookiesUser.plazasUsuario
        listaHeaders = store.state.Header.listaHeaders        
        let plazaSelect = listaPlazas[0]           
        let convenioSelect = listaHeaders.find(header => header.referenceSquare == plazaSelect.refereciaPlaza && header.adminSquareId == plazaSelect.administradorId)
        await store.commit('Login/PLAZA_SELECCIONADA_MUTATION', plazaSelect)                                                
        let objConvenio = {
            id: null,
            numPlaza: plazaSelect.numeroPlaza,
            numConvenio: convenioSelect.agrement,
            idConvenio: convenioSelect.agremmentInfoId,
        }                             
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
        let convenioSelect = listaHeaders.find(header => header.referenceSquare == plazaSelect.refereciaPlaza && header.adminSquareId == plazaSelect.administradorId)                                         
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
function obtener_bearer_token(tokenPDF){
    if(tokenPDF == undefined) {
        let tokenData = JSON.parse(localStorage.getItem('token'))    
        let config = {
            headers: { Authorization: `Bearer ${tokenData.token}` }
        };
        return config
    }
    else{
        let tokenData = JSON.parse(localStorage.getItem('token'))  
        return tokenData.token
    }
}
function refrescar_bearer_token(){
    //localStorage.removeItem('token')
    //let userId = store.getters['Login/GET_USEER_ID_PLAZA_ID'].idUser
    //console.log(userId)
    // Axios.get(`${API}/Login/Refresh`,{ userId: userId})
    //     .then((response) => {      
    //         console.log(response)      
    //         localStorage.setItem('token', JSON.stringify(response.data.result))
    //     })  
    //     .catch((error) => {
    //         console.log(error)
    //     })
}
async function cache_token(){
    let datosUserCookies = JSON.parse(localStorage.getItem('cookiesUser'))
    let headerUser = JSON.parse(localStorage.getItem('listaHeaderUser'))   
    if(datosUserCookies != null && headerUser != null){ 
        await store.commit('Login/COOKIES_USER_MUTATION', datosUserCookies)    
        await store.commit('Login/LISTA_HEADER_PLAZA_USER_MUTATION', headerUser)
        await store.commit('Header/LISTA_HEADERS_MUTATION', headerUser)    
        await actualizar_plaza()    
        await store.dispatch('Login/BUSCAR_PLAZAS')
        await store.dispatch('DTC/BUSCAR_DESCRIPCIONES_DTC')
        await store.dispatch('Header/BUSCAR_LISTA_UNIQUE')
        return true  
    }  
    else{
        return false
    }
}
function token_no_autorizado(){    
    router.push('/SesionExpirada')
}
export default{
    formato_cookies_usuario,
    actualizar_plaza,
    obtener_bearer_token,
    token_no_autorizado,
    cache_token,
    refrescar_bearer_token
}