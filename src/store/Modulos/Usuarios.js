import Axios from 'axios'
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state =  {
  listaUsuarios: []
}
const getters = {
  getUsers: () => state.listaUsuarios        
}
const mutations = {
  USUARIOS_MUTATION: (state, value) => state.listaUsuarios =  value
}
const actions = {
    async Consulta_Users({commit}, value){      
        await Axios.post(`${API}/User/consulta`,value, CookiesService.obtener_bearer_token())
            .then(response => {                              
              commit("USUARIOS_MUTATION", response.data.result);              
            })
            .catch(Ex => {
              console.log(Ex);
            }); 
    },
    async Update_User({commit}, value){
        commit        
        await Axios.put(`${API}/User/update`,value, CookiesService.obtener_bearer_token())
            .then(() => {})
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async BorrarUser({commit}, value){
        commit                
        await Axios.put(`${API}/User/delete`,value, CookiesService.obtener_bearer_token())
            .then(() => {                                          
            })
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async NuevoUser({commit}, value){
        commit        
        await Axios.post(`${API}/user/nuevo`,value, CookiesService.obtener_bearer_token())
            .then(() => {})
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async UPDATE_PASSWORD({commit}, value){
      commit            
      await Axios.put(`${API}/User/newPassword`,value, CookiesService.obtener_bearer_token())
          .then(() => {})
          .catch(Ex => {
            console.log(Ex);
      }); 
  },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}