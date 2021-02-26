import Axios from "axios";
import CookiesService from '../../services/CookiesService'
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
  GET_REFACCIONES_VALIDAS: () => state.listaRefaccionesValid.length > 0 ? state.listaRefaccionesValid : [],      
  GET_PAGINACION_COMPONENTES: (state) => (index) => {
    let fin = index * 10
    let inicio = fin - 10
    return state.full_Component.slice(inicio ,fin)
},    
};
const mutations = {
  FULL_COMPONENT_MUTATION: (state, value) => state.full_Component = value,
  LISTA_REFACCIONES_MUTATION: (state, value) => state.listaRefacciones = value,
  LISTA_LANE_MUTATION: (state, value) => state.listaLane = value,
  LISTA_REFACCIONES_VALIDAS_MUTATION: (state, value) => state.listaRefaccionesValid = value,
  //Inventario
  LISTA_REFACCIONES_INVENTARIO_MUTATION: (state, value) => state.listaInventario = value,
  LISTA_LANE_INVENTARIO_MUTATION: (state, value) => state.listaLaneInventario = value,  
  INFO_COMPONENTE_INVENTARIO_MUTATION: (state, value) => state.infoComponenteInventario = value,
  LISTA_UBICACION_GENERAL_INVENTARIO_MUTATION: (state, value) => state.listaUbicacionGeneralInventario = value,
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
  async BUSCAR_COMPONETES_INVENTARIO({ commit, rootGetters }, value) {
    commit("LISTA_REFACCIONES_INVENTARIO_MUTATION", []);    
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.numPlaza}`, CookiesService.obtener_bearer_token())
    .then(response => {      
      commit("LISTA_REFACCIONES_INVENTARIO_MUTATION", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async BUSCAR_CARRILES_INVENTARIO({ commit, rootGetters }, value){
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.componente}/${value.numPlaza}`, CookiesService.obtener_bearer_token())
    .then(response => {      
      commit("LISTA_LANE_INVENTARIO_MUTATION", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async BUSCAR_INFO_COMPONENTES_INVENTARIO({ commit, rootGetters }, value){
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.componente}/${value.carril}/${value.numPlaza}`, CookiesService.obtener_bearer_token())
    .then(response => {    
      commit("INFO_COMPONENTE_INVENTARIO_MUTATION", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex); 
    });
  },
  async BUSCAR_UBICACION_GENERAL_INVENTARIO({ commit, rootGetters }){
    commit("LISTA_UBICACION_GENERAL_INVENTARIO_MUTATION", []);
    await Axios.get(`${API}/component/InventarioUbicacion/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, CookiesService.obtener_bearer_token())
    .then(response => {    
      commit("LISTA_UBICACION_GENERAL_INVENTARIO_MUTATION", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async ACTUALIZAR_COMPONENTE_INVENTARIO({ rootGetters }, value){
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
    await Axios.put(`${API}/component/updateInventory/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, newObject, CookiesService.obtener_bearer_token())
    .then(() => {          
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async BUSCAR_COMPONETES({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/component/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.idConvenio}`, CookiesService.obtener_bearer_token())            
      .then(response => {                
        commit("LISTA_REFACCIONES_MUTATION", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit, rootGetters }, value) {      
    await Axios.get(`${API}/component/GetComponetV2/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.numPlaza}/${value.idConvenio}/${value.attachedId}/${value.componentsRelationship}/${value.componentsRelationshipId}`, CookiesService.obtener_bearer_token())
      .then(response => {                            
          if(response.data.result != null){
            commit("LISTA_REFACCIONES_VALIDAS_MUTATION", response.data.result.listaFiltro);
            commit("LISTA_LANE_MUTATION", response.data.result.listLane); 
          }
          else{
            commit("LISTA_REFACCIONES_VALIDAS_MUTATION", []);
            commit("LISTA_LANE_MUTATION", []); 
          }       
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async FULL_COMPONETES({ commit, rootGetters }, value){
    await Axios.get(`${API}/DtcData/InventoryComponentsList/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.numPlaza}`, CookiesService.obtener_bearer_token())
      .then(response => {       
          console.log(response.data.result)                
          commit("FULL_COMPONENT_MUTATION", response.data.result)          
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async EDIT_COMPONETE_QUICK({ dispatch, rootGetters }, value){
    await Axios.put(`${API}/Component/UpdateInventoryList/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, value, CookiesService.obtener_bearer_token())
      .then(() => {                      
        dispatch('FULL_COMPONETES')       
      })
      .catch(Ex => {        
        console.log(Ex);
      })
  },
  async BUSCAR_CARRILES({ commit }, plaza) {  
    console.log(plaza)        
    Axios.get(`${API}/squaresCatalog/lanes/${plaza}`, CookiesService.obtener_bearer_token())
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
