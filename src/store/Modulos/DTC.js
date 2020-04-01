import Axios from "axios";

const state = {
  listaDTCTecnico: [],
  listaDescriptions: [],
  listaDmg: [],
  listaDTC: []
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico,
  getListaDescriptions: () => state.listaDescriptions
};
const mutations = {
  listaDTCTecnicoMutation: (state, value) => {
    state.listaDTCTecnico = value;
  },
  listaDescriptionsMutation: (state, value) => {
    state.listaDescriptions = value;
  },
  listaDmgMutationPush: (state, value) => {
    state.listaDmg.push(value);
  },
  listaDmgMutationDelete: (state, value) =>{
     
      state.listaDmg.splice(value, 1) 
  },
  listaDmgClearMutation: (state) => {
    state.listaDmg = []
  },
  listaDTCMutation: (state, value) => {
    state.listaDTC = value;
  },
};

const actions = {
  
  async buscarDTC({ commit }) {    
    await Axios.get(`https://localhost:44358/api/dtcdata`)
      .then(response => {        
        console.log(response.data);
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async buscarDescriptions({ commit }) {    
    await Axios.get(`https://localhost:44358/api/typedescriptions`)
      .then(response => {
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear DTC
  async crearDmg({ state }) {

    await Axios.post(
      `https://localhost:44358/api/requestedComponent`,
      state.listaDmg
    )
      .then(response => {        
        console.log(response.data);        
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
