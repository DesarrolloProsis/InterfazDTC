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
  //Cosnsulta API Listar Carriles
  async buscarCarriles({ commit }, value) {

    console.log("Hello con Vue! => ListarCarril ");
    console.log(value)
    if(value.Plaza == '' && value.TipoCarril == '')
      await Axios.get(`http://192.168.0.111:8084/api/LanesCatalogs/`)
      .then(response => {
        console.log("Bien")
        console.log(response.data)
        commit('listaCarrilesMutation', response.data)
      })
      .catch((Ex) => {
        console.log(Ex)
      })
    else
      await Axios.get(`http://192.168.0.111:8084/api/LanesCatalogs/params/${value.Plaza}/${value.TipoCarril}`)
    .then(response => {
      console.log("Bien")
      console.log(response.data)
      commit('listaCarrilesMutation', response.data)
    })
    .catch((Ex) => {
      console.log(Ex)
    })
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
    await Axios.post(`http://192.168.0.111:8084/api/LanesCatalogs`, newObject)
    .then(response =>{
      console.log("Bien");    
      console.log(response)
      commit()
    })
    .catch((Ex) => {
      console.log(Ex)
    })

  },
  //Consulta API Editar Carril
  async editarCarriles({ commit }, value) {
    //var ok = Object.assign({}, value)

    console.log(value)
    let newObject = {
      CapufeLaneNum: value.capufeLaneNum,
      Lane: value.lane,
      IdGare: 65,
      LaneType: parseInt(value.typeCarril),
      SquaresCatalogId: value.squaresCatalogId
    }
    console.log(newObject)
    console.log("Hello con Vue! => EditarCarril ");
    await Axios.put(`http://192.168.0.111:8084/api/LanesCatalogs/${newObject.CapufeLaneNum}/${newObject.IdGare}`,newObject)
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
    
    let newObject = {
      CapufeLaneNum: value.CapufeLaneNum,
      Lane: value.Lane,
      IdGare: value.IdGare,
      LaneType: parseInt(value.LaneType),
      SquaresCatalogId: value.SquaresCatalogId
    }

    console.log(newObject)
    console.log("Hello con Vue! => EliminarCarril ");
    Axios.delete(`http://192.168.0.111:8084/api/LanesCatalogs/${newObject.CapufeLaneNum}/${newObject.IdGare}`)
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
