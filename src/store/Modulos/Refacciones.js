import Axios from "axios";

const state = {
  listaRefacciones: [],
  listaRefaccionesValid: [],
  listaLane: []
};

const getters = {
  getListaRefacciones: function(){ 
    return state.listaRefacciones 
  },
  getListaLane: function(){
     return state.listaLane
  },
  getComponentDisable: function(){

    if(state.listaRefaccionesValid.length > 0){

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
    else
      return []
  },  
  getEquipoMalo: function(){
    if(state.listaRefaccionesValid.length > 0)
      return state.listaRefaccionesValid
    else
      return []
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
    await Axios.get(`http://prosisdev.sytes.net:88/api/component`)
      .then(response => {
        commit("listaRefaccionesMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit }, value) {      
    await Axios.get(
      `http://prosisdev.sytes.net:88/api/component/${value.numConvenio}/${value.numPlaza}/${value.id}`
    )
      .then(response => {         
        if(response.data.message == 'Ok') {          
          commit("listaRefaccionValidMutation", response.data.result.result);
          commit("listaLaneMutation", response.data.result.listLane);
        }
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
