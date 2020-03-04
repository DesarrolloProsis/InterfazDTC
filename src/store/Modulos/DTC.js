import Axios from "axios";
import qs from "qs";

const state = {
  listaDTCTecnico: []
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico
};
const mutations = {
  listaDTCTecnicoMutation: (state, value) => {
    state.listaDTCTecnico = value;
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
      Description: value.Description,
      ShippingDate: value.ShippingDate,
      ElaborationDate: value.ElaborationDate,
      UserId: value.UserId,
      AgremmentInfoId: value.AgremmentInfoId
    }

    console.log(newObject)
    console.log("Hello con Vue! => Creando DTC");
    await Axios.post(`http://192.168.0.79:82/api/dtcdatas/`, newObject)
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
