import Axios from "axios";

const state = {
  listaInventario: []
};

const getters = {
  getListaInventario: () => state.listaInventario
};
const mutations = {
  listaInventarioMutation: (state, value) => {
    state.listaInventario = value;
  }
};
const actions = {
  //Cosnsulta API Listar Carriles
  async buscarInventario({ commit }, value) {
    console.log(value);
    console.log("Hello con Vue! => ListarRefacciones");
    if (value.year == "" && value.marca == "") {
      console.log("Si entro");
      await Axios.get(`http://192.168.0.111:8084/api/Inventories/`)
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaInventarioMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    } else if (value.year != "" && value.marca == "") {
      console.log(`https://localhost:44356/api/Inventories/${value.year}`);
      await Axios.get(
        `http://192.168.0.111:8084/api/Inventories/year/${value.year}`
      )
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaInventarioMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    } else if (value.year == "" && value.marca != "") {
      console.log(`http://localhost:44356/api/Inventories/${value.year}`);
      await Axios.get(
        `http://192.168.0.111:8084/api/Inventories/marca/${value.marca}`
      )
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaInventarioMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    } else {
      console.log(
        `http://192.168.0.111:8084/api/SparePartsCatalogs/params/null/${value.marca}`
      );
      await Axios.get(
        `http://192.168.0.111:8084/api/Inventories/${value.year}/${value.marca}`
      )
        .then(response => {
          console.log("Bien");
          console.log(response.data);
          commit("listaInventarioMutation", response.data);
        })
        .catch(Ex => {
          console.log(Ex);
        });
    }
  },

  //Consulta API Crear Carril
  async crearInventario({ commit }, value) {
    console.log("Hello con Vue! => CrearRefaccion");
    console.log(value);
    let newObject = {
      NumPart: value.NumPart,
      Name: value.Name,
      Unit: 1,
      PieceYear: value.year,
      InventoryImage: "Sin-Imagen",
      Description: value.Description,
      Status: false,
      ComponentId: value.ComponentId
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    await Axios.post(`http://192.168.0.111:8084/api/Inventories/`, newObject)
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
  async editarInventario({ commit }, value) {
    console.log("Hello con Vue! => EditarRefaccion");
    console.log(value);
    let newObject = {
      Id: value.Id,
      NumPart: value.NumPart,
      TypeService: value.TypeService,
      Name: value.Name,
      Brand: value.Brand,
      Price: parseFloat(value.Price),
      Unit: parseInt(value.Unit),
      PieceYear: value.year,
      InventoryImage: "Sin-Imagen",
      Description: value.Description,
      ComponentId: value.ComponentId,
      Status: false
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    await Axios.put(
      `http://192.168.0.111:8084/api/Inventories/${newObject.Id}`,
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
  async eliminarInventario({ commit }, value) {
    console.log("Hello con Vue! => EliminarRefaccion");
    console.log(value);
    let newObject = {
      Id: value.Id,
      NumPart: value.NumPart,
      TypeService: value.TypeService,
      Name: value.Name,
      Brand: value.Brand,
      Price: parseFloat(value.Price),
      Unit: parseInt(value.Unit),
      PieceYear: value.year,
      InventoryImage: "Sin-Imagen",
      Description: value.Description,
      ComponentId: value.ComponentId,
      Status: false
    };

    console.log(newObject);
    console.log("Hello con Vue! => CrearCarril");
    await Axios.delete(
      `http://192.168.0.111:8084/api/Inventories/${newObject.Id}`
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
