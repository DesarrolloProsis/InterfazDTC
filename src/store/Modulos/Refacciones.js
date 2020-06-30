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
  listaUbicacionGeneralInventario: []

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
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  },
  listaLaneMutation: (state, value) => {
    state.listaLane = value;
  },
  listaRefaccionValidMutation: (state, value) => {
    state.listaRefaccionesValid = value;
  },
  //Inventario
  listaRefaccionesInventarioMutation: (state, value) => {
    state.listaInventario = value
  },
  listaLaneInventarioMutation: (state, value) => {
    state.listaLaneInventario = value
  },  
  infoComponenteInventarioMutation: (state, value) => {
    state.infoComponenteInventario = value
  },
  listaUbicacionGeneralInventarioMutation: (state, value) => {
    state.listaUbicacionGeneralInventario = value
  },
  cleanOut: (state) => {
    state.infoComponenteInventario = []
    state.listaInventario = []
    state.listaLane = []
    state.listaLaneInventario = []
    state.listaRefacciones = []
    state.listaRefaccionesValid = []
    state.listaUbicacionGeneralInventario = []
  }
};
const actions = {

  async buscarComponentesInventario({commit}, value) {
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
      strFltLane: value.infoComponentes.ubicacion,
      strFltComponent: value.infoComponentes.componente,
      strFltSerialNumber: value.infoComponentes.oldNumSerie,
      strFltSquare: value.infoPlaza.numPlaza,
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
    
    console.log(newObject)
    await Axios.put(`http://prosisdev.sytes.net:88/api/component/updateInventary`, newObject)
    .then(response => {          

      if(response.data.message == 'Ok')
          alert('Se actualizo correctamente')
      else
          alert('Ocurrio un Error!!')
      
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },

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
    
    await Axios.get(
      `http://prosisdev.sytes.net:88/api/component/${value.numConvenio}/${value.numPlaza}/${value.id.description}/${value.id.brand}`
    )
      .then(response => {    
                
          commit("listaRefaccionValidMutation", response.data.result.listaFiltro);
          commit("listaLaneMutation", response.data.result.listLane);        
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
