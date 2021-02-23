import Axios from "axios";
import moment from 'moment'

const API = process.env.VUE_APP_URL_API_PRODUCCION

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
  carriles: []
};
const getters = {
  //Inventario
  GET_CARRILES_STATE: () => state.carriles,
  GET_CARRILES_LANE: (state) => (lanefind) => {
    return state.full_Component.filter(item => item.lane == lanefind) 
  },
  getlistaRefaccionesInventario: () => state.listaInventario,
  getlistaLaneInventario: () => state.listaLaneInventario,
  getinfoComponenteInventario: () => state.infoComponenteInventario,
  getlistaUbicacionGeneralInventario: () => state.listaUbicacionGeneralInventario,  
  getEquipoMalo: () => state.listaRefaccionesValid.length > 0 ? state.listaRefaccionesValid : [],
  getListaRefaccionesValid: () => state.listaRefaccionesValid,
  getListaRefacciones: () => state.listaRefacciones ,
  getListaLane: () => state.listaLane,
  getComponentDisable () {
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
  getPaginationComponent: (state) => (index) => {
    let fin = index * 10
    let inicio = fin - 10
    return state.full_Component.slice(inicio ,fin)
},    
};
const mutations = {
  FULL_COMPONENT_MUTATION: (state, value) => state.full_Component = value,
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
  CARRILES_MUTATION: (state, value) => state.carriles = value
}
const actions = {
  async buscarComponentesInventario({ commit, rootGetters }, value) {
    commit("listaRefaccionesInventarioMutation", []);    
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/getReferenceSquareActual']}/${value.numPlaza}`)
    .then(response => {      
      commit("listaRefaccionesInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async buscarCarrilesInventario({ commit, rootGetters }, value){
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/getReferenceSquareActual']}/${value.componente}/${value.numPlaza}`)
    .then(response => {      
      commit("listaLaneInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async buscarInfoComponeteInventario({ commit, rootGetters }, value){
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/getReferenceSquareActual']}/${value.componente}/${value.carril}/${value.numPlaza}`)
    .then(response => {    
      commit("infoComponenteInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex); 
    });
  },
  async buscarUbicacionGeneralInventario({ commit, rootGetters }){
    commit("listaUbicacionGeneralInventarioMutation", []);
    await Axios.get(`${API}/component/InventarioUbicacion/${rootGetters['Login/getReferenceSquareActual']}`)
    .then(response => {    
      commit("listaUbicacionGeneralInventarioMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async updateComponenteInventary({ rootGetters }, value){
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
    await Axios.put(`${API}/component/updateInventory/${rootGetters['Login/getReferenceSquareActual']}`, newObject)
    .then(() => {          
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async buscarComponentes({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/component/${rootGetters['Login/getReferenceSquareActual']}/${value.idConvenio}`)            
      .then(response => {                
        commit("listaRefaccionesMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit, rootGetters }, value) {      
    await Axios.get(`${API}/component/GetComponetV2/${rootGetters['Login/getReferenceSquareActual']}/${value.numPlaza}/${value.idConvenio}/${value.attachedId}/${value.componentsRelationship}/${value.componentsRelationshipId}`)
      .then(response => {                            
          if(response.data.result != null){
            commit("listaRefaccionValidMutation", response.data.result.listaFiltro);
            commit("listaLaneMutation", response.data.result.listLane); 
          }
          else{
            commit("listaRefaccionValidMutation", []);
            commit("listaLaneMutation", []); 
          }       
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async FULL_COMPONETES({ commit, rootGetters }, value){
    await Axios.get(`${API}/DtcData/InventoryComponentsList/${rootGetters['Login/getReferenceSquareActual']}/${value.numPlaza}`)
      .then(response => {       
          console.log(response.data.result)                
          commit("FULL_COMPONENT_MUTATION", response.data.result)          
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async EDIT_COMPONETE_QUICK({ dispatch, rootGetters }, value){
    await Axios.put(`${API}/Component/UpdateInventoryList/${rootGetters['Login/getReferenceSquareActual']}`, value)
      .then(() => {                      
        dispatch('FULL_COMPONETES')       
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async GET_CARRILES({ commit }, plaza) {          
    Axios.get(`${API}/squaresCatalog/lanes/${plaza}`)
      .then(response => {                      
          if(response.status === 200){            
              commit("CARRILES_MUTATION", response.data.result);                         
          }                    
      })
      .catch((ex) => {          
          console.log(ex)
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
