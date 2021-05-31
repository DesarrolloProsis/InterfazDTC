import store from '../store/index'
import router from '../router/index'
import Axios from '../store/ManejoSolicitudes'

const API = process.env.VUE_APP_URL_API_PRODUCCION
function formato_cookies_usuario(loginSesion){  
    return new Promise((resolve, reject) => {
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
        });             
        tokenUser = response.data.result.userToken
        cookies['rollId'] = loginSesion.rolId
        cookies['nombreRoll'] = loginSesion.rolDescription
        cookies['userId'] = loginSesion.userId
        cookies['plazasUsuario'] = plazasUsuario         
        cookies['registrado'] = cookies.plazasUsuario.length > 0 ? true : false
        Axios.post(`${API}/login/LoginInfo`, { userId: loginSesion.userId })    
        .then((response) => {                         
            cookies['nombreUsuario'] = response.data.result.loginList[0].nombre                                                                                          
            localStorage.clear()    
            localStorage.setItem('cookiesUser', JSON.stringify(cookies));  
            localStorage.setItem('token', JSON.stringify(tokenUser))  
            store.dispatch("Login/BUSCAR_PLAZAS");  
            store.commit("Login/LISTA_HEADER_PLAZA_USER_MUTATION", response.data.result.loginList)             
            store.commit("Header/LISTA_HEADERS_MUTATION", response.data.result.loginList);                                    
            resolve(cookies)                 
        })                                                       
    })
    .catch((error) => {        
        reject(error)
    })    
    })           
}
async function refrescar_barer_token(){
    localStorage.removeItem('token')
    let objRefresh = { userId: store.state.Login.cookiesUser.userId }     
    await Axios.post(`${API}/login/Refresh`, objRefresh)
    .then((response) => {                
        localStorage.setItem('token', JSON.stringify(response.data.result))        
    })
    .catch(error => {        
        console.log(error) 
    });
}
async function actualizar_plaza(adminId){    
    let clousere_actualizar = async (adminId, tipoFiltro)  => {        
        const listaPlazas = store.state.Login.cookiesUser.plazasUsuario
        const listaHeaders = store.state.Header.listaHeaders        
        let plazaSelect = {}
        let convenioSelect = {}
        switch (tipoFiltro) {
            case 1:
                plazaSelect = listaPlazas.find(plaza => plaza.administradorId == adminId)                 
                convenioSelect = listaHeaders.find(header => header.adminSquareId == adminId)                   
                break;
            case 2:
                plazaSelect = listaPlazas[0]           
                convenioSelect = listaHeaders.find(header => header.referenceSquare == plazaSelect.refereciaPlaza && header.adminSquareId == plazaSelect.administradorId)
                break;     
            default:
                break;
        }        
        store.commit('Login/PLAZA_SELECCIONADA_MUTATION', plazaSelect)                                                
        let objConvenio = { id: null, numPlaza: plazaSelect.numeroPlaza, numConvenio: convenioSelect.agrement, idConvenio: convenioSelect.agremmentInfoId }  
        store.commit('Header/CONVENIO_ACTUAL_MUTATION', objConvenio)
        store.commit('Header/HEADER_SELECCIONADO_MUTATION',convenioSelect)
        store.dispatch('Refacciones/FULL_COMPONETES', objConvenio)                             
        return { plazaSelect, convenioSelect } 
    }    
    if(adminId != undefined)
        return clousere_actualizar(adminId, 1)       
    else if(adminId == undefined)        
        return clousere_actualizar(adminId, 2)        
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
async function cache_token(){    
    let datosUserCookies = JSON.parse(localStorage.getItem('cookiesUser'))        
    let headerUser = {}   
    await Axios.post(`${API}/login/LoginInfo`, { userId: datosUserCookies.userId })
    .then((response) => {                  
        headerUser = response.data.result.loginList
    })    
    if(datosUserCookies != null){         
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
    localStorage.clear()
    router.push('/SesionExpirada')
}
export default{
    formato_cookies_usuario,
    actualizar_plaza,
    obtener_bearer_token,
    token_no_autorizado,
    cache_token,
    refrescar_barer_token
}