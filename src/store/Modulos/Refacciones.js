import Axios from "axios";
import moment from 'moment'

const state = {
  listaRefacciones: [],
  listaRefaccionesValid: [],
  listaLane: []
};

const getters = {
  getListaRefaccionesValid: function(){
    return state.listaRefaccionesValid
  },
  getListaRefacciones: function(){ 
    return state.listaRefacciones 
  },
  getListaLane: function(){
    return state.listaLane
  },
  getComponentDisable: function(){

    if(state.listaRefaccionesValid.length > 0){

        return {
          unity: state.listaRefaccionesValid[0]['unity'],
          brand: state.listaRefaccionesValid[0]['brand'],
          model: state.listaRefaccionesValid[0]['model'],
          instalationDate: state.listaRefaccionesValid[0]['instalationDate'].substr(0,10),
          lifeTime: state.listaRefaccionesValid[0]['lifeTime'],          
          unitaryPrice: state.listaRefaccionesValid[0]['unitaryPrice'],
          idGare: state.listaRefaccionesValid[0]['idGare'],
          componentsStockId: state.listaRefaccionesValid[0]['componentsStockId'],
          maintenanceDate: moment(state.listaRefaccionesValid[0]['maintenanceDate']).format('YYYY-MM-DD'),              
        }
    }
    else
      return []
  },  
  getEquipoMalo: function(){
    if(state.listaRefaccionesValid.length > 0)
      return state.listaRefaccionesValid
    else
      return []
    }
};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  },
  listaLaneMutation: (state, value) => {
    state.listaLane = value;
  },
  listaRefaccionValidMutation: (state, value) => {
    state.listaRefaccionesValid = value;
  }
};
const actions = {
  async buscarComponentes({ commit }, value) {    

    console.log(`http://prosisdev.sytes.net:88/api/component/${value.numPlaza}/${value.numConvenio}`)
    await Axios.get(`http://prosisdev.sytes.net:88/api/component/${value.numPlaza}/${value.numConvenio}`)
      .then(response => {
        commit("listaRefaccionesMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit }, value) {  
        //console.log(`http://prosisdev.sytes.net:88/api/component/${value.numConvenio}/${value.numPlaza}/${value.id.description}/${value.id.brand}`)
    await Axios.get(
      `http://prosisdev.sytes.net:88/api/component/${value.numConvenio}/${value.numPlaza}/${value.id.description}/${value.id.brand}`
    )
      .then(response => {  
        console.log(response.data)       
        if(response.data.message == 'Ok') {          
          commit("listaRefaccionValidMutation", response.data.result.listaFiltro);
          commit("listaLaneMutation", response.data.result.listLane);
        }
      })
      .catch(Ex => {
        console.log('Cath aqui')
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
