import Axios from "axios";


const state = {
  listaCarriles: []
};

const getters = {

  getListaCarriles: () => state.listaCarriles,

};
const mutations = {
  listaCarrilesMutation: (state, value) => {
    state.listaCarriles = value;
  }
};
const actions = {

  async buscarCarrilesPlaza({commit}, value){

    console.log(`https://localhost:44356/api/LanesCatalogs/params/${value.Plaza}`)
    await Axios.get(`https://localhost:44356/api/LanesCatalogs/params/${value}`)
  .then(response => {
    console.log("Bien")
    console.log(response.data)
    commit('listaCarrilesMutation', response.data)
  })
  .catch((Ex) => {
    console.log(Ex)
  })

  },
  //Cosnsulta API Listar Carriles
  async buscarCarriles({ commit }, value) {


    console.log(value)
    console.log("Hello con Vue! => ListarCarril ");    
    if(value.Plaza == '' && value.TipoCarril == ''){
      await Axios.get(`https://localhost:44356/api/LanesCatalogs/`)
      .then(response => {
        console.log("Bien")
        console.log(response.data)
        commit('listaCarrilesMutation', response.data)
      })
      .catch((Ex) => {
        console.log(Ex)
      })
    }
      else if(value.Plaza != '' && value.TipoCarril == ''){
        console.log(`https://localhost:44356/api/LanesCatalogs/params/${value.Plaza}`)
        await Axios.get(`https://localhost:44356/api/LanesCatalogs/params/${value.Plaza}`)
      .then(response => {
        console.log("Bien")
        console.log(response.data)
        commit('listaCarrilesMutation', response.data)
      })
      .catch((Ex) => {
        console.log(Ex)
      })
      }
    else{
    console.log(`https://localhost:44356/api/LanesCatalogs/params/${value.Plaza}/${value.TipoCarril}`)
      await Axios.get(`https://localhost:44356/api/LanesCatalogs/params/${value.Plaza}/${value.TipoCarril}`)
    .then(response => {
      console.log("Bien")
      console.log(response.data)
      commit('listaCarrilesMutation', response.data)
    })
    .catch((Ex) => {
      console.log(Ex)
    })
  }
  },
  //Consulta API Crear Carril
  //string "Existe" 
  async crearCarril({commit},value) {

      console.log(value)
    let newObject = {
      CapufeLaneNum: value.CapufeLaneNum,
      Lane: value.Lane,
      IdGare: value.IdGare,
      LaneType: parseInt(value.LaneType),
      SquaresCatalogId: value.SquaresCatalogId
    }
    console.log("Hello con Vue! => CrearCarril");
    await Axios.post(`https://localhost:44356/api/LanesCatalogs`, newObject)
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
  async editarCarriles({ commit }, value) {
    //var ok = Object.assign({}, value)

    
    let newObject = {
      CapufeLaneNum: value.capufeLaneNum,
      Lane: value.lane,
      IdGare: value.IdGare,
      LaneType: parseInt(value.typeCarril),
      SquaresCatalogId: value.squaresCatalogId
    }

    console.log(newObject)
    console.log("Hello con Vue! => EditarCarril ");
    await Axios.put(`https://localhost:44356/api/LanesCatalogs/${newObject.CapufeLaneNum}/${newObject.IdGare}`,newObject)
    .then(response => {
      console.log("Bien")
      commit("")
      console.log(response.data)      
    }).catch((Ex) => {
      console.log(Ex)
    })
  },
  //Consulta Api Eliminar Carril
  async eliminarCarril({commit}, value){
    

    console.log("Accion Eliminar")
    console.log(value)
    let newObject = {
      CapufeLaneNum: value.capufeLaneNum,
      Lane: value.lane,
      IdGare: value.idGare,
      LaneType: parseInt(value.typeCarril),
      SquaresCatalogId: value.squaresCatalogId
    }

    console.log(newObject)
    console.log("Hello con Vue! => EliminarCarril ");
    Axios.delete(`https://localhost:44356/api/LanesCatalogs/${newObject.CapufeLaneNum}/${newObject.IdGare}`)
    .then(response => {
      console.log("Bien")
      commit("")
      console.log(response.data)      
    }).catch((Ex) => {
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
