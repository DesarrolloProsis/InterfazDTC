import Axios from "axios";
import qs from "qs";

const state = {
  listaDTCTecnico: []
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico
};
const mutations = {
  listaDTCTecnicoMutation: (state, value) => {
    state.listaDTCTecnico = value;
  }
};

const actions = {
  //Cosnsulta API Listar Carriles
  async buscarDTC({ commit }, value) {
    console.log("Hello con Vue! => ListarDTC ");
    let response = await Axios.get(
      `http://127.0.0.1:5000/product`,
      qs.stringify(value)
    );
    console.log(response).then(
      response => {
        commit("listaCarrilesMutation", response.data);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  },

  //Consulta API Crear DTC
  async crearDTCTecnico({ commit }, value) {
    console.log("Hello con Vue! => ArmandoDTC");
    console.log(value)
    let newObject = {
      ReferenceNum: value.ReferenceNum,
      UserId: parseInt(value.UserId),
      DTCHeaderId: value.DTCHeaderId,
      AxaNum: value.AxaNum,
      FailureNum: parseInt(value.FailureNum),
      Status: "false",
      IncidentDate: value.IncidentDate,
      FailureDate: value.FailureDate,
      ElaborationDate: value.ElaborationDate,
      ShippingDate: value.ShippingDate,
      OpinionType: value.OpinionType,
      Description: value.Description,
      Diagnostic: value.Diagnostic,
      Observation: value.Observation,
      Image: value.Image,
      LanesCatalogCapufeLaneNum: value.LanesCatalogCapufeLaneNum,
      LanesCatalogIdGare: value.LanesCatalogIdGare
    }

    console.log(newObject)
    console.log("Hello con Vue! => Creando DTC");
    await Axios.post(`https://localhost:44356/api/dtctechnicals/`, newObject)
    .then(response =>{
      console.log("Bien");    
      console.log(response.data)
      commit()
    })
    .catch((Ex) => {
      console.log(Ex)
    })
  },

    //Cosnsulta API Crear Carriles
    async nuevoDTC({ commit }, value) {
      console.log("Hello con Vue! => CrearDTC ");
      let response = await Axios.get(
        `http://127.0.0.1:5000/product`,
        qs.stringify(value)
      );
      console.log(response).then(
        response => {
          commit("listaCarrilesMutation", response.data);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
