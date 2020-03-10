import Axios from "axios";
import qs from "qs";

const state = {
  listaDTCTecnico: [],
  listaDescriptions: []
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico,
  getListaDescriptions: () => state.listaDescriptions
};
const mutations = {
  listaDTCTecnicoMutation: (state, value) => {
    state.listaDTCTecnico = value;
  },
  listaDescriptionsMutation: (state, value) => {
    state.listaDescriptions = value;
  }
};

const actions = {
  //Cosnsulta API Listar Carriles
  async buscarDTC({ commit }, value) {
    console.log("Hello con Vue! => ListarDTC ");
    let response = await Axios.get(
      `http://127.0.0.1:5000/product`,
      qs.stringify(value)
    );
    console.log(response).then(
      response => {
        commit("listaCarrilesMutation", response.data);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  },
	
  async buscarDescriptions({ commit }) {
    console.log(`http://192.168.0.111:8084/api/typedescriptions`);
    await Axios.get(`http://192.168.0.111:8084/api/typedescriptions`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaDescriptionsMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear DTC
  async crearDTCTecnico({ commit }, value) {
    console.log("Hello con Vue! => ArmandoDTC");
    console.log(value)
    let newObject = {
      ReferenceNumber: value.ReferenceNumber,
      SinisterNumber: value.SinisterNumber,
      ReportNumber: value.ReportNumber,
      SinisterDate: value.SinisterDate,
      FailureDate: value.FailureDate,
      FailureNumber: value.FailureNumber,				 
      ShippingDate: value.ShippingElaboracionDate,
      ElaborationDate: value.ShippingElaboracionDate,
      TypeDescriptionId: value.TypeDescriptionId,
      Diagnosis: value.Diagnosis,
      Observation: value.Observation,
      userId: value.userId,
      agremmentInfoId: value.agremmentInfoId
    }

    console.log(newObject)
    console.log("Hello con Vue! => Creando DTC");
    await Axios.post(`http://192.168.0.111:8084/api/dtcData`, newObject)
    .then(response =>{
      console.log("Bien");    
      console.log(response.data)
      commit()
    })
    .catch((Ex) => {
      console.log(Ex)
    })
  },

    //Cosnsulta API Crear Carriles
    async nuevoDTC({ commit }, value) {
      console.log("Hello con Vue! => CrearDTC ");
      let response = await Axios.get(
        `http://127.0.0.1:5000/product`,
        qs.stringify(value)
      );
      console.log(response).then(
        response => {
          commit("listaCarrilesMutation", response.data);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
