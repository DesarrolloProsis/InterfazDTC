import Axios from 'axios'

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
        await Axios.post(`http://prosisdev.sytes.net:88/api/User/consulta`,value)
            .then(response => {                              
              commit("USUARIOS_MUTATION", response.data.result);              
            })
            .catch(Ex => {
              console.log(Ex);
            }); 
    },
    async Update_User({commit}, value){
        commit        
        await Axios.put(`http://prosisdev.sytes.net:88/api/User/update`,value)
            .then(() => {})
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async BorrarUser({commit}, value){
        commit        
        console.log(value)
        await Axios.put(`http://prosisdev.sytes.net:88/api/User/delete`,value)
            .then(() => {                                          
            })
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async NuevoUser({commit}, value){
        commit        
        await Axios.post(`http://prosisdev.sytes.net:88/api/user/nuevo`,value)
            .then(() => {})
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async UPDATE_PASSWORD({commit}, value){
      commit            
      await Axios.put(`http://prosisdev.sytes.net:88/api/User/newPassword`,value)
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