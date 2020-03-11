import Axios from "axios";

const state = {
  listaRefacciones: null,
  listaLane: null
};

const getters = {
  getListaRefacciones: () => state.listaRefacciones,
  getListaLane: () => state.listaLane
};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  },
  listaLaneMutation: (state, value) => {
    state.listaLane = value;
  }
};
const actions = {
  async buscarComponentes({ commit }) {
    console.log(`http://192.168.0.111:8084/api/Component/`);
    await Axios.get(`http://192.168.0.111:8084/api/component`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaRefaccionesMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarComponenteId({ commit }, value) {
    console.log("Hello con Vue! => ListarRefacciones");

    console.log(
      `http://192.168.0.111:8084/api/component/${value.numConvenio}/${value.numPlaza}/${value.id}`
    );
    await Axios.get(
      `https://localhost:44358//api/component/${value.numConvenio}/${value.numPlaza}/${value.id}`
    )
      .then(response => {
        console.log("Bien");
        console.log(response.data.response);
        commit("listaRefaccionesMutation", response.data.response);
        commit("listaLaneMutation", response.data.listLane);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },

  //Consulta API Crear Carril
  async crearRefaccion({ commit }, value) {
    console.log("Hello con Vue! => CrearRefaccion");
    console.log(value);
    let newObject = {
      ComponentName: value.ComponentName,
      Year: value.Year,
      Price: parseFloat(value.Price),
      Brand: value.Brand,
      Description: value.Description,
      ServiceTypeId: parseInt(value.ServiceTypeId),
      UnitId: parseInt(value.UnitId),
      Model: value.Model,
      AutomaticSignature: true
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    await Axios.post(`http://192.168.0.111:8084/api/Components/`, newObject)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit();
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Editar Carril
  async editarRefaccion({ commit }, value) {
    console.log("Hello con Vue! => EditarRefaccion");
    console.log(value);
    let newObject = {
      ComponentId: value.ComponentId,
      ComponentName: value.ComponentName,
      Year: value.Year,
      Price: parseFloat(value.Price),
      Brand: value.Brand,
      Description: value.Description,
      ServiceTypeNum: parseInt(value.ServiceTypeId),
      UnitTypeNum: parseInt(value.Unit)
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    console.log(
      `http://192.168.0.111:8084/api/Components/${newObject.ComponentId}`
    );
    await Axios.put(
      `http://192.168.0.111:8084/api/Components/${newObject.ComponentId}`,
      newObject
    )
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit();
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async eliminarRefaccion({ commit }, value) {
    console.log("Hello con Vue! => EliminarRefaccion");
    console.log(value);

    let newObject = {
      ComponentId: value.componentId,
      ComponentName: value.componentName,
      Year: value.year,
      Price: parseFloat(value.price)
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    await Axios.delete(
      `http://192.168.0.111:8084/api/Components/${newObject.ComponentId}`
    )
      .then(response => {
        console.log("Bien");
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
