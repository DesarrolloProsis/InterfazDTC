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

  //CONSULTA PARA OBTENER DTCHEADER POR ID TECNICO
  async buscarHeaderTec({ commit }, value) {    
    
   await Axios.get(
      `http://localhost:44358/api/login/buscarHeaderTec/${value}`
    )
      .then(response => {              
        commit("listaUser", response.data);              
      })
      .catch(Ex => {
        console.log(Ex);
      });   
  },
  //CONSULTA PARA LISTAR TODOS LO TECNICOS DE UNA PLAZA
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
  //CONSULTA PARA SABER SI EL USUARIO ESTA REGISTRADO
  async buscarUsuarioCokie({ commit }, value) {         
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
  //CONSULTA PARA TENER EL DTCHEADER DEL TECNICO PERSONAL
  async buscarUsuario({ commit }, value) {

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
  },
  //CONULTA PARA LISTAR LAS PLAZAS
  async buscarPlazas({ commit }) {    
    await Axios.get(`https://localhost:44358/api/squaresCatalog`)
      .then(response => {
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
