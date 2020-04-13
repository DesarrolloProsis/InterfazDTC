import Axios from "axios";

const state = {
  listaHeaders: [],
  numConvenio: '',
  datosSinester: {},
  referenceNum: '',
  descripcion: '',
  listaUnique: []
};

const getters = {
  getHeaders: function() {
    if (state.listaHeaders.length === 1) {
      return {
        agrement: state.listaHeaders[0]["agrement"],
        managerName: state.listaHeaders[0]["managerName"],
        position: state.listaHeaders[0]["position"],
        mail: state.listaHeaders[0]["mail"],
        plaza: state.listaHeaders[0]["plaza"],
        nombre: state.listaHeaders[0]["nombre"],
        agremmentInfoId: state.listaHeaders[0]["agremmentInfoId"],
        userId: state.listaHeaders[0]["userId"],
        regionalCoordination: state.listaHeaders[0]["regionalCoordination"]
      };
    } else return state.listaHeaders;
  },
  getConvenioPlaza: function() {
    if (state.listaHeaders.length > 0) {
      return {
        id: null,
        numConvenio: state.listaHeaders[0]["agrement"],
        numPlaza: state.listaHeaders[0]["plaza"].substr(0, 3)
      };
    } else return state.listaHeaders;
  },
   getnumConvenio: () => state.numConvenio,

   getreferenceNum: () => state.referenceNum,
   getListaunique: () => state.listaUnique
  
 
};
const mutations = {
  listaHeadersMutation: (state, value) => {
    state.listaHeaders = value;
  },
  numConvenioMutation: (state, value) => {
    state.numConvenio = value;
  },
  datosSinesterMutation: (state, value) => {
    state.datosSinester = value;
  },
  referenceNumMutation: (state, value) => {
    state.referenceNum = value;
  },
  descripcionMutation: (state, value) =>{
    state.descripcion = value
  },
  listaUniqueMutation: (state, value) => {
    state.listaUnique = value
  }
};

const actions = {
  async buscarReferencia({ commit }, value) {
        
    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcdata/${value}`)
      .then(response => {             
        if(response.data.message){
          commit("referenceNumMutation", response.data.result);
        }
        
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async buscarListaUnique({ commit }) {
        
    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcdata/InvalidReferenceNumbers`)
      .then(response => {             
        if(response.data.message){
          commit("listaUniqueMutation", response.data.result);
        }
        
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear Carril
  async crearHeaders({ state }, value) {
      

    let newObject = {
      ReferenceNumber: state.referenceNum,
      SinisterNumber: state.datosSinester.SinisterNumber,
      ReportNumber: state.datosSinester.ReportNumber,
      SinisterDate: state.datosSinester.SinisterDate,
      FailureDate: state.datosSinester.FailureDate,
      FailureNumber: state.datosSinester.FailureNumber,
      ShippingDate: state.datosSinester.ShippingElaboracionDate,
      ElaborationDate: state.datosSinester.ShippingElaboracionDate,
      TypeDescriptionId: state.datosSinester.TypeDescriptionId,
      Diagnosis: state.descripcion,
      Observation: state.datosSinester.Observaciones,      
      userId: value.userId,
      agremmentInfoId: value.agremmentInfoId
    };
    
    console.log(newObject)
    
    //await Axios.post(`http://prosisdev.sytes.net:88/api/dtcData`, newObject)    
    await Axios.post(`https://localhost:44358/api/dtcData`, newObject)
      .then(response => {

        console.log(response.data)
        if(response.data.message == 'Ok')
        
        
             
      })
      .catch(Ex => {
        console.log(Ex);
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
