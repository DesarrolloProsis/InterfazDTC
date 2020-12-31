import Axios from 'axios'
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
    comentarioMensual: ''
}
const getters = {
    GET_ACTIVIDADES_MENSUALES: (state) => (obj) => {
        console.log(obj)
        return state.actividadesMensuales.map(actividad => {
            actividad["day"] = `${actividad.day}/${obj.month}/${obj.year}` 
            actividad["frequencyName"] = state.catalogoActividades.find(item => item.value == actividad.frequencyId).text 
            return { ...actividad }
        })  
    }      
}
const mutations = {
    ACTIVIDADES_MENSUALES_MUTATION: (state, value) => state.actividadesMensuales =  value,
    COMENTARIO_MENSUAL_MUTATION: (state, value) => state.comentarioMensual = value
}
const actions = {
    async OBTENER_ACTIVIDADES_MESNUALES({ dispatch, commit, rootGetters}, value) {                
        await Axios.post(`${API}/Calendario/ActividadMesYear/${rootGetters['Login/getReferenceSquareActual']}`,value)
            .then((response) => {
                commit("ACTIVIDADES_MENSUALES_MUTATION", response.data.result)
                dispatch('OBTENER_COMENTARIO_MENSUAL', value)
            })
            .catch(Ex => {
            console.log(Ex);
        }); 
    },
    async OBTENER_COMENTARIO_MENSUAL({ commit, rootGetters }, value) {
        await Axios.post(`${API}/Calendario/getComentario/${rootGetters['Login/getReferenceSquareActual']}`,value)
            .then((response) => {
                console.log('dispatch comentario')
                console.log(response)                
                commit("COMENTARIO_MENSUAL_MUTATION", response.data.result.table[0].comment)
            })
            .catch(Ex => {
            console.log(Ex);
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