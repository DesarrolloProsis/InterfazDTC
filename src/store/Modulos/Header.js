import Axios from "axios"
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state = {
  listaHeaders: [],
  datosSinester: {},
  headerSeleccionado: {},
  referenciaDtc: '',
  observaciones: '',
  diagnostico: '',
  listaUnique: [],
  insertHeaderComplete: false,  
  convenioActual: {}
};
const getters = { 
  GET_HEADER_SELECCIONADO: () => state.headerSeleccionado,
  GET_CONVENIO_PLAZA: () => state.convenioActual,  
  GET_UNIQUE_SINESTER_NUMBER: (state) => (num) => {
    return state.listaUnique.every(item => {
      return item.sinisterNumber != num
    })
  },
  GET_UNIQUE_REPORT_NUMBER: (state) => (num) => {
    return state.listaUnique.every(item => {
      return item.reportNumber != num
    })
  },  
  getInsertHeaderComplete: () => state.insertHeaderComplete,    
};
const mutations = {
  HEADER_SELECCIONADO_MUTATION: (state, value) => state.headerSeleccionado = value,
  CONVENIO_ACTUAL_MUTATION: (state, value) => state.convenioActual = value,
  clearDatosSinesterMutation: (state) => {
    state.datosSinester = {}
    state.descripcion = ''
    state.observaciones = ''
  },
  cleanOut: (state) => {
    state.listaHeaders = []
    state.listaUnique = []
    state.referenciaDtc = ''
  },
  insertHeaderCompleteMutation: (state, value) => state.insertHeaderComplete = value,  
  datosSinesterMutation: (state, value) => state.datosSinester = value,
  REFERENCIA_DTC_MUTATION: (state, value) => state.referenciaDtc = value,
  listaHeadersMutation: (state, value) => state.listaHeaders = value,
  listaUniqueMutation: (state, value) => state.listaUnique = value,
  OBSERVACION_MUTATION: (state, value) => state.observaciones = value,
  DIAGNOSTICO_MUTATION: (state, value) => state.diagnostico = value,
  INFO_CARD_DTC: (state, value) => state.infoDTCCard = value,
  LIBERAR_VALIDACION_NUMS: (state, value) => {    
    let index = state.listaUnique.findIndex(item => item.sinisterNumber === value.numSiniestro && item.reportNumber === value.numReporte)            
    if(index != -1 ){      
      state.listaUnique.splice(index, 1)
    }    
  },
};
const actions = {
  async buscarReferencia({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcdata/BuscarReferencia/${rootGetters['Login/getReferenceSquareActual']}/${value}`)    
      .then(response => {
        console.log(response)
        if (response.data.result.length == 1) {          
          commit("REFERENCIA_DTC_MUTATION", response.data.result[0].referenceNumber);
        }
        if(response.data.result.length > 1){
          commit("REFERENCIA_DTC_MUTATION", response.data.result);
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
  async CREAR_HEADER_DTC({ state, commit, rootGetters }, value) {      
    let newObject = {
      ReferenceNumber: state.referenciaDtc,
      SinisterNumber: state.datosSinester.SinisterNumber == '' ? null : state.datosSinester.SinisterNumber,
      ReportNumber: state.datosSinester.ReportNumber,
      SinisterDate: state.datosSinester.SinisterDate,
      FailureDate: state.datosSinester.FailureDate == '' ? null : state.datosSinester.FailureDate,
      FailureNumber: state.datosSinester.FailureNumber == null ? ' ' : state.datosSinester.FailureNumber,
      ShippingDate: state.datosSinester.ShippingElaboracionDate,
      ElaborationDate: state.datosSinester.ShippingElaboracionDate,
      TypeDescriptionId: state.datosSinester.TypeDescriptionId,
      Diagnosis: state.diagnostico,
      Observation: state.observaciones == null ? '' : state.observaciones,
      UserId: value.header.userId,
      AgremmentInfoId: value.header.agremmentInfoId,
      flag: value.flag,
      DTCStatus: value.status,
      OpenFlag: value.openFlag,
      SquareId: value.header.plaza.slice(0,3)
    }      
    console.log(newObject)         
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
