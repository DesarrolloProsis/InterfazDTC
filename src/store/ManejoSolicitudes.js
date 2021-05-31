import axios from 'axios'
import axiosretry from 'axios-retry'
import CookiesService from '../services/CookiesService'
import ErrorLog from '../services/ErroresLog'
const Axios = axios.create({baseURL: ''})
const AxiosRetry = axiosretry
AxiosRetry(Axios, { retries: 3, retryDelay: AxiosRetry.exponentialDelay });

Axios.interceptors.request.use((config) => {            
    if(config.url.includes('login'))                                     
        return config          
    else {                                                   
        config.headers['Authorization'] = CookiesService.obtener_bearer_token().headers.Authorization   
        return config 
    }        
},(error) => {
    return Promise.reject(error)
})      
Axios.interceptors.response.use((response) => {        
    return response
},(error) => {    
    let requestOriginal = error.config
    if(error.response){         
        if(error.response.status == 401) {
            //Usuario No auorizado == TokenExpirado
            if(error.response.status === 401 && requestOriginal.url.includes('login/refresh')){
                CookiesService.token_no_autorizado()            
                return Promise.reject(error)
            }
            //Token Expirado Mandar Solicitud de Nuevo
            if(error.response.status == 401 && !requestOriginal._retry){
                requestOriginal._retry = true
                CookiesService.refrescar_barer_token()
                Axios.defaults.headers.common['Authorization'] = CookiesService.obtener_bearer_token().headers.Authorization               
                return Axios(requestOriginal)            
            }                                                                  
        }
        else if (error.response.status == 404) {                           
            ErrorLog.mapear_error_404(error.response)
            return Promise.reject(error)
        }
    }
    else if(error.request){
        return Promise.reject(error)
    }
    else{
        return Promise.reject(error)
    }
})
export default Axios 
