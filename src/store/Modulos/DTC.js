import Axios from "axios";
import qs from "qs";

const state = {
  listaDTC: []
};

const getters = {};
const mutations = {
  listaDTCMutation: (state, value) => {
    state.listaDTC = value;
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
