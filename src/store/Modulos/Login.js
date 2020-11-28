import Axios from "axios";

const state = {
  listUser: null,
  listaPlazas: [],
  userLogeado: [],
  listaTec: [],
  PLAZAELEGIDA: 0

};

const getters = {

  getUserForDTC: () => {
    return {
      numPlaza: state.listUser[state.PLAZAELEGIDA].plaza.substring(0, 3),
      idUser: state.listUser[state.PLAZAELEGIDA].userId
    }
  },
  getListaPlazasUser: () => {

    return state.userLogeado.map((item) => {
      let obj = {}
      obj["numPlaza"] = item.squareCatalogId
      obj["plazaName"] = item.squareName
      return obj
    })
  },
  getUser: () => state.listUser,
  getListaPlazas: () => state.listaPlazas,
  getUserLogeado: () => state.userLogeado.length > 0 ? true : false,
  getTypeUser: () => state.userLogeado[state.PLAZAELEGIDA].rollId,
  getListaTec: () => state.listaTec,
  getPlaza: () => state.listaPlazas.find(item => item.squareCatalogId == state.userLogeado[state.PLAZAELEGIDA].squareCatalogId)
};
const mutations = {

  listaUser: (state, value) => {
    state.listUser = value,
    state.PLAZAELEGIDA = 0
  },  
  PLAZAELEGIDAMUTATION: (state, value) => state.PLAZAELEGIDA = value,

  listaPlazasMutation: (state, value) => state.listaPlazas = value,

  userLogeadoMutation: (state, value) => state.userLogeado = value,

  listaTecMutation: (state, value) => state.listaTec = value,

  cleanOut: (state) => {
    state.listUser = []
    state.listaPlazas = []
    state.userLogeado = []
  },
  PLAZAELEGIDAFINDMUTATION: (state, value) => {    
    let index = state.listUser.findIndex(item => item.referenceSquare == value)    
    if(index != -1){

      state.PLAZAELEGIDA = index
    }
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

    console.log('cookie')
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

    console.log('usuario')
    await Axios.get(
      
      //`https://localhost:44358//api/login/${value.User}/${value.Password}/${false}`
      `http://prosisdev.sytes.net:88/api/login/${value.User}/${value.Password}/${false}`
    )
      .then(response => {
        console.log(response)
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
