import Axios from "axios"
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state = {
  listaHeaders: [],
  datosSinester: {},
  referenceNum: '',
  observaciones: '',
  diagnostico: '',
  listaUnique: [],
  insertHeaderComplete: false,
  PLAZAELEGIDA: 0
};
const getters = {
  getDatosSinester: () => {
    return { ...state.datosSinester, 'diagnostico': state.diagnostico, 'observaciones': state.observaciones }
  },
  getHeaders: () => {
    if (state.listaHeaders.length > 0) {
      return {
        agrement: state.listaHeaders[state.PLAZAELEGIDA]["agrement"],
        managerName: state.listaHeaders[state.PLAZAELEGIDA]["managerName"],
        position: state.listaHeaders[state.PLAZAELEGIDA]["position"],
        mail: state.listaHeaders[state.PLAZAELEGIDA]["mail"],
        plaza: state.listaHeaders[state.PLAZAELEGIDA]["plaza"],
        nombre: state.listaHeaders[state.PLAZAELEGIDA]["nombre"],
        agremmentInfoId: state.listaHeaders[state.PLAZAELEGIDA]["agremmentInfoId"],
        userId: state.listaHeaders[state.PLAZAELEGIDA]["userId"],
        regionalCoordination: state.listaHeaders[state.PLAZAELEGIDA]["regionalCoordination"],
        referenceSquare: state.listaHeaders[state.PLAZAELEGIDA]["referenceSquare"],
        adminName: state.listaHeaders[state.PLAZAELEGIDA]["adminName"],
        adminMail: state.listaHeaders[state.PLAZAELEGIDA]["adminMail"]
      };
    } else return state.listaHeaders;
  },
  getConvenioPlaza: () => {
    if (state.listaHeaders.length > 0) {
      let numPlaza = ''
      if(state.listaHeaders[state.PLAZAELEGIDA]["referenceSquare"] == "TM"){
          numPlaza = state.listaHeaders[state.PLAZAELEGIDA]["plaza"].substr(0, 4)
      }
      else{
        numPlaza = state.listaHeaders[state.PLAZAELEGIDA]["plaza"].substr(0, 3)
      }
      return {
        id: null,
        numPlaza: numPlaza,
        numConvenio: state.listaHeaders[state.PLAZAELEGIDA]["agrement"],        
        idConvenio: state.listaHeaders[state.PLAZAELEGIDA]["agremmentInfoId"]
      };
    } else return state.listaHeaders;
  },
  getreferenceNum: () => state.referenceNum,
  getUniqueNoSinester: (state) => (num) => {
    return state.listaUnique.every(item => {
      return item.sinisterNumber != num
    })
  },
  getUniqueNoReport: (state) => (num) => {
    return state.listaUnique.every(item => {
      return item.reportNumber != num
    })
  },
  getUSERSELECT: (state) => state.PLAZAELEGIDA,
  getInsertHeaderComplete: () => state.insertHeaderComplete,
  getDiagnostico: () => state.diagnostico,
  getFechaSiniestro: () => state.datosSinester.SinisterDate
};
const mutations = {
  clearDatosSinesterMutation: (state) => {
    state.datosSinester = {}
    state.descripcion = ''
    state.observaciones = ''
  },
  cleanOut: (state) => {
    state.listaHeaders = []
    state.listaUnique = []
    state.referenceNum = ''
  },
  insertHeaderCompleteMutation: (state, value) => state.insertHeaderComplete = value,
  PLAZAELEGIDAMUTATION: (state,value) => state.PLAZAELEGIDA = value,
  datosSinesterMutation: (state, value) => state.datosSinester = value,
  referenceNumMutation: (state, value) => state.referenceNum = value,
  listaHeadersMutation: (state, value) => state.listaHeaders = value,
  listaUniqueMutation: (state, value) => state.listaUnique = value,
  OBSERVACION_MUTATION: (state, value) => state.observaciones = value,
  DIAGNOSTICO_MUTATION: (state, value) => state.diagnostico = value,
  INFO_CARD_DTC: (state, value) => state.infoDTCCard = value,
  PLAZAELEGIDAFINDMUTATION: (state, value) => {         
    let index = state.listaHeaders.findIndex(item => item.referenceSquare == value)    
    if(index != -1){
      state.PLAZAELEGIDA = index
    }
  }
};
const actions = {
  async buscarReferencia({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcdata/${rootGetters['Login/getReferenceSquareActual']}/${value}`)    
      .then(response => {
        if (response.data.result.length == 1) {          
          commit("referenceNumMutation", response.data.result[0].referenceNumber);
        }
        if(response.data.result.length > 1){
          commit("referenceNumMutation", response.data.result);
        }
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async buscarListaUnique({ commit, rootGetters }) {
    await Axios.get(`${API}/dtcdata/InvalidReferenceNumbers/${rootGetters['Login/getReferenceSquareActual']}`)
      .then(response => {
        if (response.data.message) {
          commit("listaUniqueMutation", response.data.result);
        }
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear Carril
  async crearHeaders({ state, commit, rootGetters }, value) {  
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
      DTCStatus: value.status,
      OpenFlag: value.openFlag,
      SquareId: value.datosUser.plaza.slice(0,3)
    }            
    await Axios.post(`${API}/dtcData/${rootGetters['Login/getReferenceSquareActual']}`, newObject)
      .then(response => {
        if (response.status === 201) {
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
