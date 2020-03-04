import Axios from "axios";

const state = {
  listUser: []
};

const getters = {
  getUser: () => state.listUser
};
const mutations = {
  listaUser: (state, value) => {
    state.listUser = value;
  }
};

const actions = {
  //Cosnsulta API Listar Headers
  async buscarUsuario({ commit }, value) {
    console.log(value);
    console.log(
      `http://192.168.0.79:82/api/dtcusers/${value.User}/${value.Password}AQUISOES`
    );

    await Axios.get(
      `http://192.168.0.79:82/api/dtcusers/${value.User}/${value.Password}`
    )
      .then(response => {
        console.log(response.data);
        commit("listaUser", response.data);
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
