import Axios from "axios";

const state = {
  listUser: null,
  listaPlazas: [],
  userLogeado: [],
  listaTec: []
};

const getters = {
  getUser: function(){ 
    return state.listUser 
  },
  getListaPlazas: function(){
    return state.listaPlazas
  }, 
  getUserLogeado: function(){
    
    if(state.userLogeado.length > 0)
      return true
    else
      return false
  },
  getListaTec: function(){
    return state.listaTec
  }
};
const mutations = {
  listaUser: (state, value) => {
    state.listUser = value;
  },
  listaPlazasMutation: (state, value) => {
    state.listaPlazas = value;
  },
  userLogeadoMutation: (state, value) => {
    state.userLogeado = value;
  },
  listaTecMutation: (state, value) => {
    state.listaTec = value;
  }
};

const actions = {

  async buscarHeaderTec({ commit }, value) {    
 
    await Axios.get(
      `https://localhost:44358/api/login/buscarHeaderTec/${value}`
    )
      .then(response => {              
        commit("listaUser", response.data);              
      })
      .catch(Ex => {
        console.log(Ex);
      });   
},

  async buscarTec({ commit }, value) {    
 
          await Axios.get(
            `https://localhost:44358/api/login/buscarTec/${value}`
          )
            .then(response => {              
              commit("listaTecMutation", response.data);              
            })
            .catch(Ex => {
              console.log(Ex);
            });   
  },

  async buscarUsuarioCokie({ commit }, value) {    
    console.log(
      `https://localhost:44358/api/login/ValidUser/${value.User}/${value.Password}/false`
    );      
          await Axios.get(
            `https://localhost:44358/api/login/ValidUser/${value.User}/${value.Password}/${true}`
          )
            .then(response => {              
              commit("userLogeadoMutation", response.data);              
            })
            .catch(Ex => {
              console.log(Ex);
            });   
  },
  //Cosnsulta API Listar Headers
  async buscarUsuario({ commit }, value) {
    console.log(value);
    console.log(
      `https://localhost:44358/api/login/${value.User}/${value.Password}/true`
    );
      if(value.User == 'BVilleda' && value.Password == 1234){
          await Axios.get(
            `https://localhost:44358/api/login/${value.User}/${value.Password}/${false}`
          )
            .then(response => {
              console.log(response.data);
              commit("listaUser", response.data);              
            })
            .catch(Ex => {
              console.log(Ex);
            });
      }
      else{
        console.log("ya entre")
      }
  },
  async buscarPlazas({ commit }) {
    console.log(`https://localhost:44358/api/squaresCatalog`);
    await Axios.get(`https://localhost:44358/api/squaresCatalog`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaPlazasMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
