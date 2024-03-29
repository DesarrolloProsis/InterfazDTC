import Axios from '../ManejoSolicitudes'
import moment from "moment";
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
    comentarioMensual: '',
    listaActividadesCheck: []
}
const getters = {
    GET_ACTIVIDADES_MENSUALES: (state) => (obj) => {        
        return state.actividadesMensuales.map(actividad => { 
            let ayudaFecha = new Date(parseInt(obj.year), parseInt(obj.month - 1), parseInt(actividad.day))                                                                     
            actividad["day"] = moment(ayudaFecha).format("DD/MM/YYYY"); //`${actividad.day}/${obj.month}/${obj.year}`  
            actividad["frequencyName"] = state.catalogoActividades.find(item => item.value == actividad.frequencyId).text         
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
        await Axios.post(`${API}/Calendario/ActividadMesYear/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`,value)
            .then((response) => commit("ACTIVIDADES_MENSUALES_MUTATION", response.data.result))
            .catch(() => {
                commit("ACTIVIDADES_MENSUALES_MUTATION", [])                                                                 
            }); 
    },
    async OBTENER_ACTIVIDADES_MESNUALES_ADMIN({ commit, dispatch }, value) {
        dispatch('OBTENER_COMENTARIO_MENSUAL', value)                       
        await Axios.post(`${API}/Calendario/GetActividadesUsuario`,value)
            .then((response) => {
                commit("ACTIVIDADES_MENSUALES_MUTATION", response.data.result)
            })            
            .catch(() => {                
                commit("ACTIVIDADES_MENSUALES_MUTATION", [])                                                                 
            }); 
    },
    async OBTENER_COMENTARIO_MENSUAL({ commit, rootGetters }, value) {
        await Axios.post(`${API}/Calendario/getComentario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`,value)
            .then((response) => {                                 
                let comentario = response.data.result.table.length >= 1 ? response.data.result.table[0].comment : ""                                     
                commit("COMENTARIO_MENSUAL_MUTATION", comentario)               
            })            
    },
    async OBTENER_LISTA_ACTIVIDADES_CHECK({ commit, rootGetters }, value){        
        let rolUser = rootGetters['Login/GET_TIPO_USUARIO']                           
        await Axios.get(`${API}/Calendario/Actividades/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${rolUser}/${value.frequencyId}`)
        .then((response) => {   
            let actividades = response.data.result.map(actividad => {
                actividad["jobStatus"] = 1
                return actividad
            })                                       
            commit("LISTA_ACTIVIDADES_CHECK_MUTATION", actividades)               
        })
        .catch(() => {                        
            commit("LISTA_ACTIVIDADES_CHECK_MUTATION", [])                            
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