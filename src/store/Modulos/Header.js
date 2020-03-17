import Axios from "axios";

const state = {
  listaHeaders: [],
  numConvenio: null,
  datosSinester: {}
};

const getters = {
  getHeaders: function() {
    if (state.listaHeaders.length === 1) {
      return {
        agrement: state.listaHeaders[0]["agrement"],
        managerName: state.listaHeaders[0]["managerName"],
        position: state.listaHeaders[0]["position"],
        mail: state.listaHeaders[0]["mail"],
        plaza: state.listaHeaders[0]["plaza"],
        nombre: state.listaHeaders[0]["nombre"],
        agremmentInfoId: state.listaHeaders[0]["agremmentInfoId"],
        userId: state.listaHeaders[0]["userId"],
        regionalCoordination: state.listaHeaders[0]["regionalCoordination"]
      };
    } else return state.listaHeaders;
  },
  getConvenioPlaza: function() {
    if (state.listaHeaders.length === 1) {
      return {
        id: null,
        numConvenio: state.listaHeaders[0]["agrement"],
        numPlaza: state.listaHeaders[0]["plaza"].substr(0, 3)
      };
    } else return state.listaHeaders;
  },
  getnumConvenio: () => state.numConvenio
};
const mutations = {
  listaHeadersMutation: (state, value) => {
    state.listaHeaders = value;
  },
  numConvenioMutation: (state, value) => {
    state.numConvenio = value;
  },
  datosSinesterMutation: (state, value) => {
    state.datosSinester = value;
  }
};

const actions = {
  //     async buscarComponentes({commit}){

  //       console.log(`https://localhost:44356/api/DTCHeaders/`)
  //       await Axios.get(`https://localhost:44356/api/DTCHeaders`)
  //     .then(response => {
  //       console.log("Bien")
  //       console.log(response.data)
  //       commit('listaHeaders', response.data)
  //     })
  //     .catch((Ex) => {
  //       console.log(Ex)
  //     })
  // },

  //Cosnsulta API Listar Headers
  async buscarHeaders({ commit }, value) {
    console.log(value);
    console.log("Hello con Vue! => ListaHeaders");

    await Axios.get(`http://192.168.0.76:82/api/DTCHeaders/`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaHeadersMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },

  //Consulta API Crear Carril
  async crearHeaders({ commit }, value) {
    console.log("Hello!");
    console.log(value);
    let newObject = {
      AgreementNum: parseInt(value.AgreementNum),
      DTCHeaderId: value.DTCHeaderId,
      Mail: value.Mail,
      ManagerName: value.ManagerName,
      Position: value.Position
    };

    console.log("NUEVO OBJECTO");
    console.log(newObject);

    await Axios.post(`http://192.168.0.76:82/api/DTCHeaders/`, newObject)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit();
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },

  async eliminarHeaders({ commit }, value) {
    console.log("Hello con Vue! => objeto a borrar");
    console.log(value);
    let newObject = {
      DTCHeaderId: value.dtcHeaderId,
      AgreementNum: parseInt(value.agreementNum),
      Mail: value.mail,
      ManagerName: value.managerName,
      Position: value.position
    };

    console.log(newObject);
    console.log("Hello con Vue! => A punto de borrar");
    await Axios.delete(
      `http://192.168.0.76:82/api/DTCHeaders/${newObject.DTCHeaderId}`
    )
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit();
      })
      .catch(Ex => {
        console.log(Ex);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
