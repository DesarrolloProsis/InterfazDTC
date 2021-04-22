import Axios from 'axios'
import CookiesService from '../services/CookiesService'

export default function manejor_solicitudes_run(){
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
        console.log(error)
        let requestOriginal = error.config
        if(error.response.status === 401 && requestOriginal.url.includes('login/refresh')){
            CookiesService.token_no_autorizado()            
            return Promise.reject(error)
        }
        else if(error.response.status == 401 && !requestOriginal._retry){
            requestOriginal._retry = true
            CookiesService.refrescar_barer_token()
            //Axios.defaults.headers.common['Authorization'] = CookiesService.obtener_bearer_token().headers.Authorization   
            //return Axios(requestOriginal)
            return Promise.reject(error)
        }
        else if(error.response.status == 400){                        
            console.log(error.response)
            return Promise.reject(error)
        }
                
        return Promise.reject(error)
    })
}