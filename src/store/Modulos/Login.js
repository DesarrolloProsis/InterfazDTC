import Axios from "axios";
import CookiesService from '../../services/CookiesService'
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state = {
  listaHeaderDtcUser: null,
  listaPlazas: [],
  cookiesUser: {},
  listaTec: [],
  plazaSelecionada: {},  
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
  GET_USEER_ID_PLAZA_ID: () => {return { numPlaza: state.plazaSelecionada.numeroPlaza, idUser: state.cookiesUser.userId}},  
  GET_USER_IS_LOGIN: () => state.cookiesUser.registrado  == undefined ? false : state.cookiesUser.registrado,
  GET_REFERENCIA_ACTUAL_PLAZA: () => state.plazaSelecionada.refereciaPlaza,
  GET_REFERENCIA_PLAZA_TO_NOMBRE: (state) => (nombrePlaza) =>  state.cookiesUser.plazasUsuario.find(item => item.plazaNombre ==  nombrePlaza),
  GET_TIPO_USUARIO: () => state.cookiesUser.rollId,    
};
const mutations = {
  PLAZA_SELECCIONADA_MUTATION: (state, value) => state.plazaSelecionada = value,  
  LISTA_PLAZAS_MUTATION: (state, value) => state.listaPlazas = value,
  COOKIES_USER_MUTATION: (state, value) => state.cookiesUser = value,
  LISTA_TECNICOS_MUTATION: (state, value) => state.listaTec = value,
  LISTA_PLAZAS_USUARIO_COOKIES_MUTATION: (state, value) => state.cookiesUser.plazasUsuario = value,  
  cleanOut: (state) => { state.listaHeaderDtcUser = []; state.listaPlazas = [] },  
  LISTA_HEADER_PLAZA_USER_MUTATION: (state, value) => state.listaHeaderDtcUser = value,  
};
const actions = {
  //CONSULTA PARA OBTENER DTCHEADER POR ID TECNICO
  async BUSCAR_HEADER_OTRO_TECNICO({ commit }, value) {
    await Axios.get(`${API}/login/buscarHeaderTec/${value}`, CookiesService.obtener_bearer_token())
      .then(response => commit("LISTA_HEADER_PLAZA_USER_MUTATION", response.data.result))
      .catch(error => console.log(error));
  },
  //CONSULTA PARA LISTAR TODOS LO TECNICOS DE UNA PLAZA
  async BUSCAR_TECNICOS_PLAZA({ commit }, value) {
    await Axios.get(`${API}/login/buscarTec/${value}`, CookiesService.obtener_bearer_token())
      .then(response => commit("LISTA_TECNICOS_MUTATION", response.data.result))
      .catch(error => console.log(error));
  },
  //CONSULTA PARA TENER EL DTCHEADER DEL TECNICO PERSONAL
  async INICIAR_SESION_LOGIN({ commit }, objUserLogin) {  
    return new Promise((resolve, reject) => {
      let objLogin = { username: objUserLogin.user, password: objUserLogin.password  }     
      Axios.post(`${API}/login`,objLogin)
      .then(async (response) => {                                  
        commit("COOKIES_USER_MUTATION", await CookiesService.formato_cookies_usuario(response.data.result))
        resolve(true)                                                 
      })
      .catch(() => reject(false));
    }) 
  },
  //CONULTA PARA LISTAR LAS PLAZAS
  async BUSCAR_PLAZAS({ commit }) {                 
    await Axios.get(`${API}/squaresCatalog`)
      .then(response => commit("LISTA_PLAZAS_MUTATION", response.data.result))
      .catch(error => console.log(error));
  },
  async REFRESCAR_TOKEN_USER({ state }){  
    let objRefresh = { UserId: state.cookiesUser.userId }     
    await Axios.post(`${API}/login/Refresh`, objRefresh)
      .then(response => console.log(response))
      .catch(error => console.log(error) );
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
