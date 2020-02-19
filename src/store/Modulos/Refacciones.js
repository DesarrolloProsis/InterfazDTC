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

      if(value.year != ''){        
        await Axios.get(`https://localhost:44356/api/Components/${value.year}`)
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
    console.log(`https://localhost:44356/api/Components/`)
      await Axios.get(`https://localhost:44356/api/Components/`)
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
      ComponentId: 0,
      ComponentName: value.ComponentName,
      Year: value.Year,
      Price: parseFloat(value.Price),

    }

    console.log(newObject)
    console.log("Hello con Vue! => CrearCarril");
    await Axios.post(`https://localhost:44356/api/Components/`, newObject)
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
      ComponentId: value.ComponentId,
      ComponentName: value.ComponentName,
      Year: value.Year,
      Price: parseFloat(value.Price),

    }

    console.log(newObject)
    console.log("Hello con Vue! => CrearCarril");
    await Axios.put(`https://localhost:44356/api/Components/${newObject.ComponentId}`, newObject)
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
      ComponentId: value.componentId,
      ComponentName: value.componentName,
      Year: value.year,
      Price: parseFloat(value.price),

    }

    console.log(newObject)
    console.log("Hello con Vue! => CrearCarril");
    await Axios.delete(`https://localhost:44356/api/Components/${newObject.ComponentId}`)
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
