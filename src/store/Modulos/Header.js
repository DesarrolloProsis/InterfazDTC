import Axios from '../ManejoSolicitudes'
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
  DATOS_SINESTER_MUTATION: (state, value) => state.datosSinester = value,
  REFERENCIA_DTC_MUTATION: (state, value) => state.referenciaDtc = value,
  LISTA_HEADERS_MUTATION: (state, value) => state.listaHeaders = value,
  LISTA_UNIQUE_MUTATION: (state, value) => state.listaUnique = value,
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
  async BUSCAR_REFERENCIA_DTC_VALIDA({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcdata/BuscarReferencia/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value}`)
      .then(response => {        
        if (response.data.result.length == 1) {          
          commit("REFERENCIA_DTC_MUTATION", response.data.result[0].referenceNumber);
        }
        if(response.data.result.length > 1){
          commit("REFERENCIA_DTC_MUTATION", response.data.result);
        }
      }) 
  },
  async BUSCAR_LISTA_UNIQUE({ commit, rootGetters }) {
    await Axios.get(`${API}/dtcdata/InvalidReferenceNumbers/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`)
      .then(response => {        
        if (response.data.message) {
          commit("LISTA_UNIQUE_MUTATION", response.data.result);
        }
      })
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
      SquareId: value.header.plaza.slice(0,3),
      adminId: value.adminIdPlaza,
      diagnosisReference: value.referenceFicha != '' ? value.referenceFicha : '--',
      tipofalla: value.tipofalla
    }                
    await Axios.post(`${API}/dtcData/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, newObject)
      .then(response => {        
        if (response.status === 201) {
          commit('insertHeaderCompleteMutation', true)
        }
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
