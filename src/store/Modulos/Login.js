import Axios from "axios";

const state = {
  listUser: null,
  listaPlazas: [],
};

const getters = {
  getUser: () => state.listUser,
  getListaPlazas: () => state.listaDescriptions
};
const mutations = {
  listaUser: (state, value) => {
    state.listUser = value;
  },
  listaPlazasMutation: (state, value) => {
    state.listaDescriptions = value;
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
            `201.99.110.3:87/api/login/${value.User}/${value.Password}`
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
  },
  async buscarPlazas({ commit }) {
    console.log(`http://192.168.0.111:8084/api/squaresCatalog`);
    await Axios.get(`201.99.110.3:87/api/squaresCatalog`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaPlazasMutation", response.data);
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
