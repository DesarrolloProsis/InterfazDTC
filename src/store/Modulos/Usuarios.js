import Axios from 'axios'


const state =  {

    listaUsuarios: []

}

const getters = {
    
    getUsers: function(){

        return state.listaUsuarios        
    }

}

const mutations = {


    USUARIOS_MUTATION(state, value){

        state.listaUsuarios =  value
    }

}
const actions = {


    async Consulta_Users({commit}, value){


        console.log(value)
        await Axios.post(
            `http://prosisdev.sytes.net:88/api/User/consulta`,value      
          )
            .then(response => {
                
            console.log(response.data)
              commit("USUARIOS_MUTATION", response.data.result);              
            })
            .catch(Ex => {
              console.log(Ex);
            }); 

    },
    async Update_User({commit}, value){

        commit
        console.log(value)
        await Axios.put(
            `http://prosisdev.sytes.net:88/api/User/update`,value      
          )
            .then(response => {
                
            console.log(response.data)
                           
            })
            .catch(Ex => {
              console.log(Ex);
        }); 

    },
    async BorrarUser({commit}, value){

        commit
        alert(JSON.stringify(value))
        console.log(value)
        await Axios.put(
            `http://prosisdev.sytes.net:88/api/User/delete`,value      
          )
            .then(response => {
                
            console.log(response.data)
                           
            })
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async NuevoUser({commit}, value){

        commit
        alert(JSON.stringify(value))
        console.log(value)
        await Axios.post(
            `http://prosisdev.sytes.net:88/api/user/nuevo`,value      
          )
            .then(response => {
                
            console.log(response.data)
                           
            })
            .catch(Ex => {
              console.log(Ex);
        }); 
    },
    async UPDATE_PASSWORD({commit}, value){

      commit
      alert(JSON.stringify(value))
      console.log(value)
      await Axios.post(
          `http://prosisdev.sytes.net:88/api/user/nuevo`,value      
        )
          .then(response => {
              
          console.log(response.data)
                         
          })
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