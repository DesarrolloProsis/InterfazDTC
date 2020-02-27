import Axios from "axios";

const state = {
  listaPlazas: []
};

const getters = {
  getListaPlazas: () => state.listaPlazas
};
const mutations = {
  listaPlazasMutation: (state, value) => {
    state.listaPlazas = value;
  }
};
const actions = {
  async buscarPlazasId({ commit }, value) {
    console.log(`https://localhost:44356/api/LanesCatalogs/${value}`);
    await Axios.get(`http://192.168.0.111:8084/api/LanesCatalogs/${value}`)
      .then(response => {
        console.log("Bien");
        console.log(response.data);
        commit("listaCarrilesMutation", response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Cosnsulta API Listar Carriles
  async buscarPlazas({ commit }, value) {
    console.log(value);
    console.log("Hello con Vue! => ListarCarril ");
    if (value.Plaza == "") {
      await Axios.get(`http://192.168.0.111:8084/api/squarescatalogs/`)
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaPlazasMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    } else if (value.Plaza != "") {
      console.log(`https://localhost:44356/api/SquaresCatalogs/${value}`);
      await Axios.get(`http://192.168.0.111:8084/api/SquaresCatalogs/${value}`)
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaCarrilesMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    } else {
      console.log(`https://localhost:44356/api/SquaresCatalogs/${value}`);
      await Axios.get(
        `http://192.168.0.111:8084/api/SquaresCatalogs/params/${value}/${value.TipoCarril}`
      )
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaCarrilesMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    }
  },
  //Consulta API Crear Plaza
  //string "Existe"
  async crearPlaza({ commit }, value) {
    console.log(value);
    let newObject = {
      SquareNum: value.SquareNum,
      SquareName: value.SquareName,
      Delegation: value.Delegation
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    await Axios.post(
      `http://192.168.0.111:8084/api/SquaresCatalogs/`,
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
  //Consulta API Editar Carril
  async editarPlaza({ commit }, value) {
    //var ok = Object.assign({}, value)

    let newObject = {
      SquareNum: value.squareNum,
      SquareName: value.squareName,
      Delegation: value.delegation
    };

    console.log(newObject);
    console.log("Hello con Vue! => EditarCarril ");
    await Axios.put(
      `http://192.168.0.111:8084/api/SquaresCatalogs/${newObject.squareNum}`,
      newObject
    )
      .then(response => {
        console.log("Bien");
        commit("");
        console.log(response.data);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta Api Eliminar Carril
  async eliminarPlaza({ commit }, value) {
    console.log("Accion Eliminar PLAZA");
    console.log(value);

    console.log("Hello con Vue! => EliminarCarril ");
    Axios.delete(`http://192.168.0.111:8084/api/SquaresCatalogs/${value}`)
      .then(response => {
        console.log("Bien");
        commit("");
        console.log(response.data);
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
