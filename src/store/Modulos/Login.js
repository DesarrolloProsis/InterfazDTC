import Axios from "axios";

const state = {
  listUser: null,
  listaPlazas: [],
  userLogeado: [],
  listaTec: []
};

const getters = {


  getUserForDTC: function(){
    return {
      numPlaza: state.listUser[0].plaza.substring(0,3),
      idUser: state.listUser[0].userId
    }
  },
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
  },
  cleanOut: (state) => {
    state.listUser = []
    state.listaPlazas = []
    state.userLogeado = []
  }
};

const actions = {

  //CONSULTA PARA OBTENER DTCHEADER POR ID TECNICO
  async buscarHeaderTec({ commit }, value) {    
    
   await Axios.get(
      `http://prosisdev.sytes.net:88/api/login/buscarHeaderTec/${value}`      
    )
      .then(response => {              
        commit("listaUser", response.data.result);              
      })
      .catch(Ex => {
        console.log(Ex);
      });   
  },
  //CONSULTA PARA LISTAR TODOS LO TECNICOS DE UNA PLAZA
  async buscarTec({ commit }, value) {    
          
    console.log('Action Buscar Tecnicos id Plaza')
          await Axios.get(
            `http://prosisdev.sytes.net:88/api/login/buscarTec/${value}`            
          )
            .then(response => {           
              console.log(response.data.result)   
              commit("listaTecMutation", response.data.result);              
            })
            .catch(Ex => {
              console.log(Ex);
            });   
  },
  //CONSULTA PARA SABER SI EL USUARIO ESTA REGISTRADO
  async buscarUsuarioCokie({ commit }, value) {         
          await Axios.get(
            `http://prosisdev.sytes.net:88/api/login/ValidUser/${value.User}/${value.Password}/${true}`            
          )
            .then(response => {              
              commit("userLogeadoMutation", response.data.result); 
              console.log(response.data)             
            })
            .catch(Ex => {
              console.log(Ex);
            });   
  },
  //CONSULTA PARA TENER EL DTCHEADER DEL TECNICO PERSONAL
  async buscarUsuario({ commit }, value) {

          await Axios.get( 
            `http://prosisdev.sytes.net:88/api/login/${value.User}/${value.Password}/${false}`            
          )
            .then(response => {
              console.log(response.data);
              commit("listaUser", response.data.result);              
            })
            .catch(Ex => {
              console.log(Ex);
            });     
  },
  //CONULTA PARA LISTAR LAS PLAZAS
  async buscarPlazas({ commit }) {    
    await Axios.get(
      `http://prosisdev.sytes.net:88/api/squaresCatalog`)      
      .then(response => {
        commit("listaPlazasMutation", response.data.result);
        console.log(response.data)
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
