import Axios from 'axios'
import CookiesService from '../services/CookiesService'

export default function manejor_solicitudes_run(){
    Axios.interceptors.request.use((config) => {            
        if(config.url.includes('login')){
            console.log(config)            
            return config  
        }      
        else    {                                           
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
        if(error.response.status === 401 && requestOriginal.url.includes('login/refresh')){
            CookiesService.token_no_autorizado()
            return Promise.reject(error)
        }
        else if(error.response.status == 401 && !requestOriginal._retry){
            requestOriginal._retry = true
        }
        else if(error.response.status == 400){
            console.log('bad')
            console.log(error)
        }
                
        return Promise.reject(error)
    })
}