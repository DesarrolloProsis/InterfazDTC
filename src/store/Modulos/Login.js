import Axios from "axios";

const state = {
  listUser: null
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
      `http://192.168.0.111:8084/api/login/${value.User}/${value.Password}`
    );
      if(value.User == 'BVilleda' && value.Password == 1234){
          await Axios.get(
            `http://192.168.0.111:8084/api/login/${value.User}/${value.Password}`
          )
            .then(response => {
              console.log(response.data);
              commit("listaUser", response.data);
              
            })
            .catch(Ex => {
              console.log(Ex);
            });
      }
      else{
        console.log("ya entre")

      }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
