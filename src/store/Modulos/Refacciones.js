import Axios from "axios";


const state = {
  listaRefacciones: []
};

const getters = {

     getListaRefacciones: () => state.listaRefacciones,
};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  }
};
const actions = {
  //Cosnsulta API Listar Carriles
  async buscarRefacciones({ commit }, value) {
   
    console.log(value)
    console.log("Hello con Vue! => ListarRefacciones");    
    if(value.year == '' && value.marca == ''){
      console.log("Si entro")
      await Axios.get(`http://192.168.0.111:8084/api/SparePartsCatalogs`)
      .then(response => {
        console.log("Bien")
        console.log(response.data)
        commit("listaRefaccionesMutation", response.data)
      })
      .catch((Ex) => {
        console.log(Ex)
      })
    }
      else if(value.year != '' && value.marca == ''){
        console.log(`http://192.168.0.111:8084/api/SparePartsCatalogs/params/${value.year}`)
        await Axios.get(`http://192.168.0.111:8084/api/SparePartsCatalogs/params/${value.year}`)
      .then(response => {
        console.log("Bien")
        console.log(response.data)
        commit("listaRefaccionesMutation", response.data)
      })
      .catch((Ex) => {
        console.log(Ex)
      })
      }
    else{
    console.log(`http://192.168.0.111:8084/api/SparePartsCatalogs/params/null/${value.marca}`)
      await Axios.get(`http://192.168.0.111:8084/api/SparePartsCatalogs/params/null/${value.marca}`)
    .then(response => {
      console.log("Bien")
      console.log(response.data)
      commit("listaRefaccionesMutation", response.data)
    })
    .catch((Ex) => {
      console.log(Ex)
    })
  }
  },

  //Consulta API Crear Carril
  async crearRefaccion({ commit }, value) {
    console.log("Hello con Vue! => CrearRefaccion");
    console.log(value)
    let newObject = {
      NumPart: value.NoParte,
      TypeService: value.TipoServicio,
      Name: value.Nombre,
      Brand: value.Marca,
      Price: parseInt(value.Precio),
      Unit: parseInt(value.Unidad),
      PieceYear: value.Year,
      SparePartImage: "Sin-Imagen",
      Description: value.Descripcion

    }

    console.log(newObject)
    console.log("Hello con Vue! => CrearCarril");
    await Axios.post(`http://192.168.0.111:8084/api/SparePartsCatalogs`, newObject)
    .then(response =>{
      console.log("Bien");    
      console.log(response.data)
      commit()
    })
    .catch((Ex) => {
      console.log(Ex)
    })
  },
  //Consulta API Editar Carril
  async editarRefaccion({ commit }, value) {
    console.log("Hello con Vue! => EditarRefaccion");
    console.log(value)
    let newObject = {
      NumPart: value.NoParte,
      TypeService: value.TipoServicio,
      Name: value.Nombre,
      Brand: value.Marca,
      Price: parseInt(value.Precio),
      Unit: parseInt(value.Unidad),
      PieceYear: value.Year,
      SparePartImage: "Sin-Imagen",
      Description: value.Descripcion

    }

    console.log(newObject)
    console.log("Hello con Vue! => CrearCarril");
    await Axios.put(`http://192.168.0.111:8084/api/SparePartsCatalogs/${newObject.NumPart}`, newObject)
    .then(response =>{
      console.log("Bien");    
      console.log(response.data)
      commit()
    })
    .catch((Ex) => {
      console.log(Ex)
    })
  },
  async eliminarRefaccion ({ commit }, value) {
    console.log("Hello con Vue! => EliminarRefaccion");
    console.log(value)
    let newObject = {
      NumPart: value.numPart,
      TypeService: value.typeService,
      Name: value.name,
      Brand: value.brand,
      Price: parseInt(value.price),
      Unit: parseInt(value.unit),
      PieceYear: value.pieceYear,
      SparePartImage: "Sin-Imagen",
      Description: value.description

    }

    console.log(newObject)
    console.log("Hello con Vue! => CrearCarril");
    await Axios.delete(`http://192.168.0.111:8084/api/SparePartsCatalogs/${newObject.NumPart}`, newObject)
    .then(response =>{
      console.log("Bien");    
      console.log(response.data)
      commit()
    })
    .catch((Ex) => {
      console.log(Ex)
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
