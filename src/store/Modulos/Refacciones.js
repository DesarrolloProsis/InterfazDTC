import Axios from "axios";
import qs from "qs";

const state = {
  listaRefacciones: []
};

const getters = {};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaCarriles = value;
  }
};
const actions = {
  //Cosnsulta API Listar Carriles
  async buscarRefacciones({ commit }, value) {
    console.log("Hello con Vue! => ListarRefaccion ");
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

  //Consulta API Crear Carril
  async crearRefaccion({ commit }, value) {
    console.log("Hello con Vue! => CrearRefaccion");
    let response = await Axios.post(
      `http://192.168.0.144:5342/api/LanesCatalogs`,
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
  //Consulta API Editar Carril
  async editarRefaccion({ commit }, value) {
    console.log("Hello con Vue! => EditarRefaccion");
    let response = await Axios.post(
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
