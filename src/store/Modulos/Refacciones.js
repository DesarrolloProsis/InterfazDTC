import Axios from "axios";
import moment from 'moment'

const state = {

  listaRefacciones: [],  
  listaRefaccionesValid: [],
  listaLane: [],
  //Inventario
  listaInventario: [],
  listaLaneInventario: [],
  infoComponenteInventario: [],
  listaUbicacionGeneralInventario: [],
  full_Component: [],

};

const getters = {


  getPaginationComponent: (state) => (index) => {

      let fin = index * 10
      let inicio = fin - 10
      return state.full_Component.slice(inicio ,fin)

  },

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
  },
  //Inventario
  getlistaRefaccionesInventario: function(){
    return  state.listaInventario
  },
  getlistaLaneInventario: function(){
    return state.listaLaneInventario
  },
  getinfoComponenteInventario: function(){
    return state.infoComponenteInventario
  },
  getlistaUbicacionGeneralInventario: function(){
    return state.listaUbicacionGeneralInventario
  }

};
const mutations = {
  listaRefaccionesMutation: (state, value) => state.listaRefacciones = value,

  listaLaneMutation: (state, value) => state.listaLane = value,

  listaRefaccionValidMutation: (state, value) => state.listaRefaccionesValid = value,
  //Inventario
  listaRefaccionesInventarioMutation: (state, value) => state.listaInventario = value,

  listaLaneInventarioMutation: (state, value) => state.listaLaneInventario = value,  

  infoComponenteInventarioMutation: (state, value) => state.infoComponenteInventario = value,

  listaUbicacionGeneralInventarioMutation: (state, value) => state.listaUbicacionGeneralInventario = value,
  
  cleanOut: (state) => {
    state.infoComponenteInventario = []
    state.listaInventario = []
    state.listaLane = []
    state.listaLaneInventario = []
    state.listaRefacciones = []
    state.listaRefaccionesValid = []
    state.listaUbicacionGeneralInventario = []
  },
  FULL_COMPONENT_MUTATION: (state, value) => state.full_Component = value
}

const actions = {

  async buscarComponentesInventario({commit}, value) {
    //await Axios.get(`https://localhost:44358/api/component/Inventario/${value.numPlaza}`)
    await Axios.get(`http://prosisdev.sytes.net:88/api/component/Inventario/${value.numPlaza}`)
    .then(response => {      
      commit("listaRefaccionesInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async buscarCarrilesInventario({ commit }, value){
    await Axios.get(`http://prosisdev.sytes.net:88/api/component/Inventario/${value.componente}/${value.numPlaza}`)
    .then(response => {      
      commit("listaLaneInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async buscarInfoComponeteInventario({commit}, value){
    await Axios.get(`http://prosisdev.sytes.net:88/api/component/Inventario/${value.componente}/${value.carril}/${value.numPlaza}`)
    .then(response => {    
      commit("infoComponenteInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex); 
    });
  },
  async buscarUbicacionGeneralInventario({commit}){
    await Axios.get(`http://prosisdev.sytes.net:88/api/component/InventarioUbicacion`)
    .then(response => {    
      commit("listaUbicacionGeneralInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async updateComponenteInventary(context,value){
        
    let newObject = {
      TableFolio: value.infoComponentes.idComponent,
      strInventaryNumCapufe: value.infoComponentes.numInventarioCapufe,
      strInventaryNumProsis: value.infoComponentes.numInventarioProsis,
      strMorel: value.infoComponentes.modelo,
      strBrand: value.infoComponentes.marca,
      strSerialNumber: value.infoComponentes.numSerie,
      strInstalationDate: value.infoComponentes.fechaInstalacion,
      strObservation: value.infoComponentes.observaciones,
      intUbicacion: value.infoUbicacionGeneral[0].typeUbicationId,
      strMaintenanceDate: value.infoComponentes.fechaUltimoMantenimiento,
      strMaintenanceFolio: value.infoComponentes.folioUltimoMantenimiento
    }          
    await Axios.put(`http://prosisdev.sytes.net:88/api/component/updateInventory`, newObject)
    .then(() => {          
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async buscarComponentes({ commit }, value) {    
    await Axios.get(`https://localhost:44358/api/component/${value.numPlaza}/${value.numConvenio}`)
    //await Axios.get(`http://prosisdev.sytes.net:88/api/component/${value.numPlaza}/${value.numConvenio}`)
      .then(response => {        
        commit("listaRefaccionesMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit }, value) {  
    
    await Axios.get(
      `https://localhost:44358/api/component/${value.numConvenio}/${value.numPlaza}/${value.id.description}/${value.id.brand}`
      //`http://prosisdev.sytes.net:88/api/component/${value.numConvenio}/${value.numPlaza}/${value.id.description}/${value.id.brand}`
    )
      .then(response => {                    
          commit("listaRefaccionValidMutation", response.data.result.listaFiltro);
          commit("listaLaneMutation", response.data.result.listLane);        
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async FULL_COMPONETES({commit}, value){
    
    await Axios.get(`http://prosisdev.sytes.net:88/api/DtcData/InventoryComponentsList/${value.numPlaza}`)
      .then(response => {                    
          commit("FULL_COMPONENT_MUTATION", response.data.result)          
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async EDIT_COMPONETE_QUICK({dispatch}, value){
    
    await Axios.put(`http://prosisdev.sytes.net:88/api/Component/UpdateInventoryList`, value)
      .then(() => {                      
        dispatch('FULL_COMPONETES')       
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
