import Axios from '../ManejoSolicitudes'
const API = process.env.VUE_APP_URL_API_PRODUCCION
const state = {
  listaRefacciones: [],  
  listaRefaccionesValid: [],
  listaLane: [],
  //Inventario
  listaInventario: [],  
  infoComponenteInventario: [],
  listaUbicacionGeneralInventario: [],
  full_Component: [],
  carriles: []
};
const getters = {
  //Inventario
  GET_LIST_LANE_FORMAT: () => {    
    let iteradorSinRepetidos = [...new Set(state.listaLane)]; // Array sin duplicados          
    let numerosUnicos = []
    iteradorSinRepetidos.forEach(item => numerosUnicos.push(item))
    return state.listaLane.map((lane, index) => {
      let laneNew = {}
      laneNew['lane'] = lane
      numerosUnicos.includes(lane) 
        ? laneNew['laneUnic'] = lane + index
        : laneNew['laneUnic'] = lane      
      return laneNew
    })
  },  
  GET_CARRILES_STATE: () => state.carriles.sort((a, b) => (a.lane > b.lane) ? 1 : -1),
  GET_CARRILES_LANE: (state) => (lanefind) => {
    return state.full_Component.filter(item => item.lane == lanefind) 
  },      
  GET_REFACCIONES_VALIDAS: () => state.listaRefaccionesValid.length > 0 ? state.listaRefaccionesValid : [],      
  GET_PAGINACION_COMPONENTES: (state) => state.full_Component,    
};
const mutations = {
  FULL_COMPONENT_MUTATION: (state, value) => state.full_Component = value,
  LISTA_REFACCIONES_MUTATION: (state, value) => state.listaRefacciones = value,
  LISTA_LANE_MUTATION: (state, value) => state.listaLane = value,
  LISTA_REFACCIONES_VALIDAS_MUTATION: (state, value) => state.listaRefaccionesValid = value,
  //Inventario
  LISTA_REFACCIONES_INVENTARIO_MUTATION: (state, value) => state.listaInventario = value,  
  INFO_COMPONENTE_INVENTARIO_MUTATION: (state, value) => state.infoComponenteInventario = value,
  LISTA_UBICACION_GENERAL_INVENTARIO_MUTATION: (state, value) => state.listaUbicacionGeneralInventario = value,
  cleanOut: (state) => {
    state.infoComponenteInventario = []
    state.listaInventario = []
    state.listaLane = []    
    state.listaRefacciones = []
    state.listaRefaccionesValid = []
    state.listaUbicacionGeneralInventario = []
  }, 
  CARRILES_MUTATION: (state, value) => state.carriles = value
}
const actions = {
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
      strMaintenanceFolio: value.infoComponentes.folioUltimoMantenimiento,
      intUserId: value.intUserId

    }             
    await Axios.put(`${API}/component/updateInventory/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, newObject)           
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit, rootGetters }, value) {          
    await Axios.get(`${API}/component/GetComponetV2/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.numPlaza}/${value.idConvenio}/${value.attachedId}/${value.componentsRelationship}/${value.componentsRelationshipId}`)
      .then(response => {
          console.log(response)                            
          if(response.data.result != null){
            commit("LISTA_REFACCIONES_VALIDAS_MUTATION", response.data.result.listaFiltro);
            commit("LISTA_LANE_MUTATION", response.data.result.listLane); 
          }
          else{
            commit("LISTA_REFACCIONES_VALIDAS_MUTATION", []);
            commit("LISTA_LANE_MUTATION", []); 
          }       
      })      
  },
  async BUSCAR_CARRILES({ commit }, plaza) { 
    console.log(plaza)         
    Axios.get(`${API}/squaresCatalog/lanes/${plaza}`)
      .then(response => {                                
          if(response.status === 200){            
              commit("CARRILES_MUTATION", response.data.result);                         
          }                    
      })      
  },
  async BUSCAR_COMPONETES({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/component/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.idConvenio}`)            
      .then(response => commit("LISTA_REFACCIONES_MUTATION", response.data.result))    
  },
  
  async BUSCAR_INFO_COMPONENTES_INVENTARIO({ commit, rootGetters }, value){
    console.log(`${API}/component/Inventario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.componente}/${value.carril}/${value.numPlaza}`)
    await Axios.get(`${API}/component/Inventario/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.componente}/${value.carril}/${value.numPlaza}`)
      .then(response => commit("INFO_COMPONENTE_INVENTARIO_MUTATION", response.data.result))      
  },
  async BUSCAR_UBICACION_GENERAL_INVENTARIO({ commit, rootGetters }){
    commit("LISTA_UBICACION_GENERAL_INVENTARIO_MUTATION", []);
    await Axios.get(`${API}/component/InventarioUbicacion/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`)
      .then(response => commit("LISTA_UBICACION_GENERAL_INVENTARIO_MUTATION", response.data.result))      
  },
  async FULL_COMPONETES({ commit, rootGetters }, value){
    await Axios.get(`${API}/DtcData/InventoryComponentsList/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.numPlaza}`)
      .then(response => commit("FULL_COMPONENT_MUTATION", response.data.result))      
  },
  async EDIT_COMPONETE_QUICK({ rootGetters }, value){
    await Axios.put(`${API}/Component/UpdateInventoryList/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, value)      
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
