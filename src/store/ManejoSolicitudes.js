import Axios from 'axios'
//import CookiesService from '../services/CookiesService'

export default function manejor_solicitudes_run(){
    Axios.interceptors.request.use((config) => {            
        if(config.url.includes('login'))            
            return config        
        else{               
            if(config.url.includes('squaresCatalog')){
                console.log(config)
            }
            //config['header'] = CookiesService.obtener_bearer_token()
            //console.log(CookiesService.obtener_bearer_token())
        }
        
        return config
    },(error) => {
        return Promise.reject(error)
    })   
}