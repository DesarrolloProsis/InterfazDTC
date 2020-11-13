import Axios from "axios";

const state = {
  listUser: null,
  listaPlazas: [],
  userLogeado: [],
  listaTec: []
};

const getters = {

  getUserForDTC: () => {
    return {
      numPlaza: state.listUser[0].plaza.substring(0, 3),
      idUser: state.listUser[0].userId
    }
  },
  getUser: () => state.listUser,
  getListaPlazas: () => state.listaPlazas,
  getUserLogeado: () => state.userLogeado.length > 0 ? true : false,
  getTypeUser: () => state.userLogeado[0].rollId,
  getListaTec: () => state.listaTec,
  getPlaza: () => state.listaPlazas.find(item => item.squareCatalogId == state.userLogeado[0].squareCatalogId)
};
const mutations = {

  listaUser: (state, value) => state.listUser = value,

  listaPlazasMutation: (state, value) => state.listaPlazas = value,

  userLogeadoMutation: (state, value) => state.userLogeado = value,

  listaTecMutation: (state, value) => state.listaTec = value,

  cleanOut: (state) => {
    state.listUser = []
    state.listaPlazas = []
    state.userLogeado = []
  }
};
const actions = {
  //CONSULTA PARA OBTENER DTCHEADER POR ID TECNICO
  async buscarHeaderTec({ commit }, value) {

    await Axios.get(
      `http://prosisdev.sytes.net:88/api/login/buscarHeaderTec/${value}`
    )
      .then(response => {
        commit("listaUser", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //CONSULTA PARA LISTAR TODOS LO TECNICOS DE UNA PLAZA
  async buscarTec({ commit }, value) {

    await Axios.get(
      `http://prosisdev.sytes.net:88/api/login/buscarTec/${value}`
    )
      .then(response => {
        commit("listaTecMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //CONSULTA PARA SABER SI EL USUARIO ESTA REGISTRADO
  async buscarUsuarioCokie({ commit }, value) {

    await Axios.get(
      `http://prosisdev.sytes.net:88/api/login/ValidUser/${value.User}/${value.Password}/${true}`
    )
      .then(response => {
        if (response.data.result != null) {
          commit("userLogeadoMutation", response.data.result);
        }
        else {
          commit("userLogeadoMutation", []);
        }
      })
      .catch(Ex => {
        commit("userLogeadoMutation", []);
        console.log(Ex);
      });
  },
  //CONSULTA PARA TENER EL DTCHEADER DEL TECNICO PERSONAL
  async buscarUsuario({ commit }, value) {
    await Axios.get(
      `http://prosisdev.sytes.net:88/api/login/${value.User}/${value.Password}/${false}`
    )
      .then(response => {
        commit("listaUser", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //CONULTA PARA LISTAR LAS PLAZAS
  async buscarPlazas({ commit }) {
    await Axios.get(
      `http://prosisdev.sytes.net:88/api/squaresCatalog`)
      .then(response => {
        commit("listaPlazasMutation", response.data.result);
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
