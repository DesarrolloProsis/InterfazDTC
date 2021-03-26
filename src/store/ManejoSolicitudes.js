import Axios from 'axios'
import CookiesService from '../services/CookiesService'
export default function manejor_solicitudes_run(){
    Axios.interceptors.request.use((config) => {
        console.log(config.headers.Authorization )
        console.log(CookiesService.obtener_bearer_token())
        return config
    },(error) => {
        return Promise.reject(error)
    })   
}