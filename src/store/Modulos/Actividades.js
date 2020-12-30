import Axios from 'axios'
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state =  {
    actividadesMensuales: []
}
const getters = {
    GET_ACTIVIDADES_MENSUALES: () => state.actividadesMensuales        
}
const mutations = {
    ACTIVIDADES_MENSUALES_MUTATION: (state, value) => state.actividadesMensuales =  value
}
const actions = {
    async OBTENER_ACTIVIDADES_MESNUALES({commit, rootGetters}, value){                
        await Axios.post(`${API}/Calendario/ActividadMesYear/${rootGetters['Login/getReferenceSquareActual']}`,value)
            .then((response) => {
                commit("ACTIVIDADES_MENSUALES_MUTATION", response.data.result)
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