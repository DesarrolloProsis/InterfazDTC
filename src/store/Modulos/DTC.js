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
  listDmgConfirmUpdate: ( state, value) => {


    state.listaDmg[value.index]["ComponentsStockId"] = value.ComponentsStockId
    state.listaDmg[value.index]["ReferenceNumber"] = value.ReferenceNumber
    state.listaDmg[value.index]["CapufeLaneNum"] = value.CapufeLaneNum
    state.listaDmg[value.index]["NumSerie"] = value.NumSerie
    state.listaDmg[value.index]["IdGare"] = value.IdGare
    state.listaDmg[value.index]["Marca"] = value.Marca
    state.listaDmg[value.index]["Modelo"] = value.Modelo
    state.listaDmg[value.index]["Unity"] = value.Unity
    state.listaDmg[value.index]["dateInstallationDate"] = value.dateInstallationDate
    state.listaDmg[value.index]["dateMaintenanceDate"] = value.dateMaintenanceDate
    state.listaDmg[value.index]["intLifeTimeExpected"] = value.intLifeTimeExpected
    state.listaDmg[value.index]["dateLifeTimeReal"] = value.dateLifeTimeReal

  }
};

const actions = {
  
  async buscarDTC({ commit }) {    
    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcdata`)
      .then(response => {        
        console.log(response.data);
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async buscarDescriptions({ commit }) {    
    await Axios.get(`http://prosisdev.sytes.net:88/api/typedescriptions`)
      .then(response => {
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear DTC
  async crearDmg({ state } , value ) {


    for(let i = 0; i< state.listaDmg.length; i++){
        state.listaDmg[i]["ReferenceNumber"] = value
        if(state.listaDmg[i]["dateLifeTimeReal"] == "---")
          state.listaDmg[i]["dateLifeTimeReal"] = '00-00-0000'
        if(state.listaDmg[i]["dateMaintenanceDate"] == "---")
        state.listaDmg[i]["dateMaintenanceDate"] = '00-00-0000'
    }
    console.log(state.listaDmg)
    await Axios.post(
      `http://prosisdev.sytes.net:88/api/requestedComponent`,
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
