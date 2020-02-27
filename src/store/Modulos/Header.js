import Axios from "axios";

const state = {
  listaHeaders: [],
  numConvenio: null
};

const getters = {
  getHeaders: () => state.listaHeaders,
  getnumConvenio: () => state.numConvenio
};
const mutations = {
  listaHeadersMutation: (state, value) => {
    state.listaHeaders = value;
  },
  numConvenioMutation: (state, value) => {
    state.numConvenio = value;
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

    await Axios.get(`http://192.168.0.111:8084/api/DTCHeaders/`)
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
    
    await Axios.post(`http://192.168.0.111:8084/api/DTCHeaders/`, newObject)
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
      `http://192.168.0.111:8084/api/DTCHeaders/${newObject.DTCHeaderId}`
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
