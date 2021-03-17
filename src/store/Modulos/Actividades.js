import Axios from 'axios'
import moment from "moment";
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state =  {
    actividadesMensuales: [],
    catalogoActividades: [        
        { value: 1, text: "Semanal" },
        { value: 2, text: "Mensual" },
        { value: 3, text: "Trimestral" },
        { value: 4, text: "Semestral" },
        { value: 5, text: "Anual" },
    ],
    status :[
        { value: true, text: "true" },
        { value: false, text: "false" },
    ],
    comentarioMensual: '',
    listaActividadesCheck: []
}
const getters = {
    GET_ACTIVIDADES_MENSUALES: (state) => (obj) => {        
        return state.actividadesMensuales.map(actividad => { 
            let ayudaFecha = new Date(parseInt(obj.year), parseInt(obj.month - 1), parseInt(actividad.day))                                                                     
            actividad["day"] = moment(ayudaFecha).format("DD/MM/YYYY"); //`${actividad.day}/${obj.month}/${obj.year}`  
            actividad["frequencyName"] = state.catalogoActividades.find(item => item.value == actividad.frequencyId).text 
            //actividad["statusMaintenance"] = state.status.find(item => item.value == actividad)
            return { ...actividad }
        })  
    },
    GET_ACTIVIDADES_MENSUALES_CALENDARIO: (state) => (obj) => {
        return state.actividadesMensuales.map(actividad => {
            let newEvent = {}
            newEvent["day"] = `${actividad.day}/${obj.month}/${obj.year}` 
            newEvent["frequencyName"] = state.catalogoActividades.find(item => item.value == actividad.frequencyId).text 
            return { ...newEvent }
        })  
    },  
    GET_ACTIVIDADES_CARRIL: (state) => {
        return state.listaActividadesCheck.map(item => {
            return { ...item }
        })        
    }      
}
const mutations = {
    ACTIVIDADES_MENSUALES_MUTATION: (state, value) => state.actividadesMensuales =  value,
    COMENTARIO_MENSUAL_MUTATION: (state, value) => state.comentarioMensual = value,
    LISTA_ACTIVIDADES_CHECK_MUTATION: (state, value) => state.listaActividadesCheck = value
}
const actions = {
    async OBTENER_ACTIVIDADES_MESNUALES({ dispatch, commit, rootGetters}, value) {  
        dispatch('OBTENER_COMENTARIO_MENSUAL', value)                         
        await Axios.post(`${API}/Calendario/ActividadMesYear/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`,value, CookiesService.obtener_bearer_token())
            .then((response) => {                               
                commit("ACTIVIDADES_MENSUALES_MUTATION", response.data.result)                
            })
            .catch(Ex => {
                commit("ACTIVIDADES_MENSUALES_MUTATION", [])  
                console.log(Ex);
                if(Ex.response.status == 401)
                    CookiesService.token_no_autorizado()
        }); 
    },
    async OBTENER_COMENTARIO_MENSUAL({ commit, rootGetters }, value) {
        await Axios.post(`${API}/Calendario/getComentario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`,value, CookiesService.obtener_bearer_token())
            .then((response) => {                                  
                let comentario = response.data.result.table.length >= 1 ? response.data.result.table[0].comment : ""                                     
                commit("COMENTARIO_MENSUAL_MUTATION", comentario)               
            })
            .catch(Ex => {
            console.log(Ex);
            if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
            });
    },
    async OBTENER_LISTA_ACTIVIDADES_CHECK({ commit, rootGetters }, value){        
        let rolUser = rootGetters['Login/GET_TIPO_USUARIO']                           
        await Axios.get(`${API}/Calendario/Actividades/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${rolUser}/${value.frequencyId}`, CookiesService.obtener_bearer_token())
        .then((response) => {   
            let actividades = response.data.result.map(actividad => {
                actividad["jobStatus"] = 1
                return actividad
            })                                       
            commit("LISTA_ACTIVIDADES_CHECK_MUTATION", actividades)               
        })
        .catch(error => {
            console.log(error.response)
            commit("LISTA_ACTIVIDADES_CHECK_MUTATION", [])   
            if(error.response.status == 401)
                CookiesService.token_no_autorizado()
        });
    }
}  
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}   