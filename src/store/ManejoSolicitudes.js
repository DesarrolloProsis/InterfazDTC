import Axios from 'axios'
import CookiesService from '../services/CookiesService'

export default function manejor_solicitudes_run(){
    Axios.interceptors.request.use((config) => {            
        if(config.url.includes('login'))            
            return config        
        else                         
            config.headers['Authorization'] = CookiesService.obtener_bearer_token().headers.Authorization    
        return config    
    },(error) => {
        return Promise.reject(error)
    })   
}