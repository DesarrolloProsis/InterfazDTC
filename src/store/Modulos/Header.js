import Axios from "axios";

const state = {
  listaHeaders: [],
  numConvenio: null,
  datosSinester: {}
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
    if (state.listaHeaders.length === 1) {
      return {
        id: null,
        numConvenio: state.listaHeaders[0]["agrement"],
        numPlaza: state.listaHeaders[0]["plaza"].substr(0, 3)
      };
    } else return state.listaHeaders;
  },
  getnumConvenio: () => state.numConvenio
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
  }
};

const actions = {
  //Consulta API Crear Carril
  async crearHeaders({ commit, state }, value) {
    
    let newObject = {
      ReferenceNumber: state.datosSinester.ReferenceNumber,
      SinisterNumber: state.datosSinester.SinisterNumber,
      ReportNumber: state.datosSinester.ReportNumber,
      SinisterDate: state.datosSinester.SinisterDate,
      FailureDate: state.datosSinester.FailureDate,
      FailureNumber: state.datosSinester.FailureNumber,
      ShippingDate: state.datosSinester.ShippingElaboracionDate,
      ElaborationDate: state.datosSinester.ShippingElaboracionDate,
      TypeDescriptionId: state.datosSinester.TypeDescriptionId,
      Diagnosis: state.datosSinester.Diagnosis,
      Observation: state.datosSinester.Observation,
      userId: value.userId,
      agremmentInfoId: 2
    };
    console.log("Hello con Vue! => ArmandoDTC");
    console.log(newObject);

    await Axios.post(`https://localhost:44358/api/dtcData`, newObject)
      .then(response => {
        
        console.log(response.data);
        commit();
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
