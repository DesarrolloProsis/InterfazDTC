import Axios from "axios";

const API = process.env.VUE_APP_URL_API_PRODUCCION

const state = {
  listaHeaderDtcUser: null,
  listaPlazas: [],
  userLogeado: [],
  listaTec: [],
  PLAZAELEGIDA: 0,
  tipoUsuario: [
    {id: 1, nombre: 'Tecnico'},
    {id: 2, nombre: 'Supervisor'},
    {id: 3, nombre: 'Sistemas'},
    {id: 4, nombre: 'Administracion'},
    {id: 5, nombre: 'Supervisor Sistemas'},
    {id: 6, nombre: 'Almacen'},
    {id: 7, nombre: 'CAPUFE'},
    {id: 8, nombre: 'Contabilidad'},
    {id: 9, nombre: 'Documentacion'},
    {id: 10, nombre: 'Desarrollo'},
  ]
};
const getters = {
  getUserForDTC: () => {
    return {
      numPlaza: state.listaHeaderDtcUser[state.PLAZAELEGIDA].plaza.substring(0, 3),
      idUser: state.listaHeaderDtcUser[state.PLAZAELEGIDA].userId
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
  getUser: () => state.listaHeaderDtcUser,
  //getListaPlazas: () => state.listaPlazas,
  getUserLogeado: () => state.userLogeado.length > 0 ? true : false,
  getReferenceSquareActual: () => state.userLogeado[state.PLAZAELEGIDA].referenceSquare,
  getReferenceSquareNombre: (state) => (nombrePlaza) =>  state.userLogeado.find(item => item.squareName ==  nombrePlaza),
  getTypeUser: () => state.userLogeado[state.PLAZAELEGIDA].rollId,
  GET_TIPO_USUARIO: () => {
    if(state.userLogeado.length > 0){
      let idRol = state.userLogeado[state.PLAZAELEGIDA].rollId
      return state.tipoUsuario.find(item => item.id == idRol)
    }
    else
      return ''
  },
  //getListaTec: () => state.listaTec,
  getPlaza: () => state.listaPlazas.find(item => item.squareCatalogId == state.userLogeado[state.PLAZAELEGIDA].squareCatalogId)
};
const mutations = {
  PLAZAELEGIDAMUTATION: (state, value) => state.PLAZAELEGIDA = value,
  LISTA_PLAZAS_MUTATION: (state, value) => state.listaPlazas = value,
  userLogeadoMutation: (state, value) => state.userLogeado = value,
  LISTA_TECNICOS_MUTATION: (state, value) => state.listaTec = value,
  cleanOut: (state) => {
    state.listaHeaderDtcUser = []
    state.listaPlazas = []
    state.userLogeado = []
  },
  LISTA_HEADER_PLAZA_USER: (state, value) => {
    state.listaHeaderDtcUser = value,
    state.PLAZAELEGIDA = 0
  },  
  PLAZAELEGIDAFINDMUTATION: (state, value) => {    
    let index = state.listaHeaderDtcUser.findIndex(item => item.referenceSquare == value)    
    if(index != -1){
      state.PLAZAELEGIDA = index
    }
  }
};
const actions = {
  //CONSULTA PARA OBTENER DTCHEADER POR ID TECNICO
  async BUSCAR_HEADER_OTRO_TECNICO({ commit }, value) {
    await Axios.get(`${API}/login/buscarHeaderTec/${value}`)
      .then(response => {
        commit("LISTA_HEADER_PLAZA_USER", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //CONSULTA PARA LISTAR TODOS LO TECNICOS DE UNA PLAZA
  async BUSCAR_TECNICOS_PLAZA({ commit }, value) {
    await Axios.get(`${API}/login/buscarTec/${value}`)
      .then(response => {
        commit("LISTA_TECNICOS_MUTATION", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //CONSULTA PARA SABER SI EL USUARIO ESTA REGISTRADO
  async buscarUsuarioCokie({ commit }, value) {        
    let objLogin = {
      username: value.User,
      password: value.Password,
      flag: true
    }
    await Axios.post(`${API}/login/ValidUser`, objLogin)
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
    let objLogin = {
      username: value.User,
      password: value.Password,
      flag: false
    }
    await Axios.post(`${API}/login`,objLogin)
      .then(response => {        
        commit("LISTA_HEADER_PLAZA_USER", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //CONULTA PARA LISTAR LAS PLAZAS
  async BUSCAR_PLAZAS({ commit }) {
    await Axios.get(`${API}/squaresCatalog`)
      .then(response => {
        commit("LISTA_PLAZAS_MUTATION", response.data.result);
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
