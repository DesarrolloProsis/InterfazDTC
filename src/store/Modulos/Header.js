import Axios from "axios"

const state = {
  listaHeaders: [],  
  datosSinester: {},
  referenceNum: '',
  observaciones: '',
  diagnostico: '',
  listaUnique: [],
  insertHeaderComplete: false,  
};

const getters = {
  getDatosSinester: function() {

    return { ...state.datosSinester, 'diagnostico': state.diagnostico, 'observaciones': state.observaciones  }
  },
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
        regionalCoordination: state.listaHeaders[0]["regionalCoordination"],
        referenceSquare: state.listaHeaders[0]["referenceSquare"],
        adminName: state.listaHeaders[0]["adminName"],
        adminMail: state.listaHeaders[0]["adminMail"]
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
   getreferenceNum: () => state.referenceNum,   

   getUniqueNoSinester: (state) => (num) => {         
     return state.listaUnique.every(item =>{       
      return item.sinisterNumber != num
     })     
  },
  getUniqueNoReport: (state) => (num) => {         
    return state.listaUnique.every(item =>{      
     return item.reportNumber != num
    })     
 },
  getInsertHeaderComplete: () => state.insertHeaderComplete,

  getDiagnostico: () => state.diagnostico,  
  
  getFechaSiniestro: () => state.datosSinester.SinisterDate
 
};
const mutations = {
  listaHeadersMutation: (state, value) => {
    state.listaHeaders = value;
  },
  datosSinesterMutation: (state, value) => {
    state.datosSinester = value;
  },
  referenceNumMutation: (state, value) => {
    state.referenceNum = value;
  },
  listaUniqueMutation: (state, value) => {
    state.listaUnique = value
  },
  insertHeaderCompleteMutation: (state, value) => {
    state.insertHeaderComplete = value
  },
  clearDatosSinesterMutation: (state) => {
    state.datosSinester = {}
    state.descripcion = ''
  },
  cleanOut: (state) => {
    state.listaHeaders = []
    state.listaUnique = []
    state.referenceNum = ''
  },
  OBSERVACION_MUTATION: (state, value) => {

    state.observaciones = value
  },
  DIAGNOSTICO_MUTATION: (state, value) => {

    state.diagnostico = value
  },
  INFO_CARD_DTC: (state, value) => {

    state.infoDTCCard = value
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
  async crearHeaders({ state, commit }, value) {
    
    console.log(value)

    let newObject = {
      ReferenceNumber: state.referenceNum,
      SinisterNumber: state.datosSinester.SinisterNumber == '' ? null : state.datosSinester.SinisterNumber,
      ReportNumber: state.datosSinester.ReportNumber,
      SinisterDate: state.datosSinester.SinisterDate,
      FailureDate: state.datosSinester.FailureDate == '' ? null : state.datosSinester.FailureDate,
      FailureNumber: state.datosSinester.FailureNumber,
      ShippingDate: state.datosSinester.ShippingElaboracionDate,
      ElaborationDate: state.datosSinester.ShippingElaboracionDate,
      TypeDescriptionId: state.datosSinester.TypeDescriptionId,
      Diagnosis: state.diagnostico,
      Observation: state.observaciones == null ? '' : state.observaciones,      
      UserId: value.datosUser.userId,
      AgremmentInfoId: value.datosUser.agremmentInfoId,
      flag: value.flag,      
      DTCStatus: value.status
  
    }
      console.log(newObject)
    await Axios.post(`http://prosisdev.sytes.net:88/api/dtcData`, newObject)        
      .then(response => {    
        
        console.log(response)
          if(response.status === 201){                                            
             commit('insertHeaderCompleteMutation', true)
          }                              
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
