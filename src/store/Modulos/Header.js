import Axios from "axios"

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
  getDatosSinester: function () {

    return { ...state.datosSinester, 'diagnostico': state.diagnostico, 'observaciones': state.observaciones }
  },
  getHeaders: function () {
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
  getConvenioPlaza: function () {
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
        numConvenio: state.listaHeaders[state.PLAZAELEGIDA]["agrement"],
        numPlaza: numPlaza,
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
  async buscarReferencia({ commit }, value) {

    //await Axios.get(`https://localhost:44358/api/dtcdata/${value}`)
    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcdata/${value}`)
      .then(response => {
        if (response.data.message) {
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
        if (response.data.message) {
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
      DTCStatus: value.status,
      OpenFlag: value.openFlag,
      SquareId: value.datosUser.plaza.slice(0,3)
    }
    console.log(newObject)
    
    //await Axios.post(`https://localhost:44358/api/dtcData`, newObject)
    await Axios.post(`http://prosisdev.sytes.net:88/api/dtcData`, newObject)
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
