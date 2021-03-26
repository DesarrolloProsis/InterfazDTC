import Axios from 'axios'
//import CookiesService from '../services/CookiesService'
export default function manejor_solicitudes_run(){
    Axios.interceptors.request.use((config) => {
        console.log(config)
        return config
    },(error) => {
        return Promise.reject(error)
    })   
}