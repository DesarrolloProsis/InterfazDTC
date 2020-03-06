import Axios from "axios";

const state = {
  listaRefacciones: null
};

const getters = {
  getListaRefacciones: () => state.listaRefacciones
};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  }
};
const actions = {
  async buscarComponentes({ commit }) {
    console.log(`http://192.168.0.111:8084/api/Components/`);
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
  async buscarRefacciones({ commit }, value1, value2, value3) {
  
    console.log("Hello con Vue! => ListarRefacciones");

    if (value1 != "" && value2 != "" && value3 != "") {
      await Axios.get(`http://192.168.0.111:8084/api/Components/${value1}/${value2}/${value3}`)
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaRefaccionesMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    } else {
      await Axios.get(`http://192.168.0.111:8084/api/Components/`)
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaRefaccionesMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    }
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
