import Axios from 'axios'

export default function manejor_solicitudes_run(){
    Axios.interceptors.request.use((config) => {
        console.log(config)
        return config
    },(error) => {
        return Promise.reject(error)
    })
    
}
