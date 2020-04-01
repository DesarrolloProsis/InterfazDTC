import Axios from "axios";

const state = {
  listaRefacciones: null,
  listaRefaccionesValid: null,
  listaLane: null
};

const getters = {
  getListaRefacciones: function(){ 
    return state.listaRefacciones 
  },
  getListaLane: function(){
     return state.listaLane
  },
  getComponentDisable: function(){

    if(state.listaRefaccionesValid != [] && state.listaRefaccionesValid != null){

        return {
          unity: state.listaRefaccionesValid[0]['unity'],
          brand: state.listaRefaccionesValid[0]['brand'],
          model: state.listaRefaccionesValid[0]['model'],
          instalationDate: state.listaRefaccionesValid[0]['instalationDate'].substr(0,10),
          lifeTime: state.listaRefaccionesValid[0]['lifeTime'],          
          unitaryPrice: state.listaRefaccionesValid[0]['unitaryPrice'],
          idGare: state.listaRefaccionesValid[0]['idGare'],
          componentsStockId: state.listaRefaccionesValid[0]['componentsStockId']        
        }
    }
  },  
  getEquipoMalo: function(){
      return state.listaRefaccionesValid
    }
};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  },
  listaLaneMutation: (state, value) => {
    state.listaLane = value;
  },
  listaRefaccionValidMutation: (state, value) => {
    state.listaRefaccionesValid = value;
  }
};
const actions = {
  async buscarComponentes({ commit }) {    
    await Axios.get(`https://localhost:44358/api/component`)
      .then(response => {
        commit("listaRefaccionesMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit }, value) {
    await Axios.get(
      `https://localhost:44358/api/component/${value.numConvenio}/${value.numPlaza}/${value.id}`
    )
      .then(response => {                
        commit("listaRefaccionValidMutation", response.data.response);
        commit("listaLaneMutation", response.data.listLane);
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
