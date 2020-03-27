import Axios from "axios";
import qs from "qs";

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

     //alert('Hola desde MutationDelete')
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
  //Cosnsulta API Listar Carriles
  async sdfs({ commit }, value) {
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

  async buscarDTC({ commit }) {
    console.log(`https://localhost:44358/api/dtcdata`);
    await Axios.get(`https://localhost:44358/api/dtcdata`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },

  async buscarDescriptions({ commit }) {
    console.log(`https://localhost:44358/api/typedescriptions`);
    await Axios.get(`https://localhost:44358/api/typedescriptions`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear DTC
  async crearDmg({ commit, state }) {
    console.log("CREADMG");
    console.log(state.listaDmg);

    await Axios.post(
      `https://localhost:44358/api/requestedComponent`,
      state.listaDmg
    )
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit();
      })
      .catch(Ex => {
        console.log(Ex);
      });
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
