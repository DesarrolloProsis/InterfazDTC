import Axios from "axios";

const state = {
  listaRefacciones: null,
  listaRefaccionesValid: null,
  listaLane: null
};

const getters = {
  getListaRefacciones: function(){ 
    return state.listaRefacciones 
  },
  getListaLane: function(){
     return state.listaLane
  },
  getComponentDisable: function(){

    if(state.listaRefaccionesValid != [] && state.listaRefaccionesValid != null){

        return {
          unity: state.listaRefaccionesValid[0]['unity'],
          brand: state.listaRefaccionesValid[0]['brand'],
          model: state.listaRefaccionesValid[0]['model'],
          instalationDate: state.listaRefaccionesValid[0]['instalationDate'].substr(0,10),
          lifeTime: state.listaRefaccionesValid[0]['lifeTime'],          
          unitaryPrice: state.listaRefaccionesValid[0]['unitaryPrice'],
          idGare: state.listaRefaccionesValid[0]['idGare'],
          componentsStockId: state.listaRefaccionesValid[0]['componentsStockId']        
        }
    }
  },  
  getEquipoMalo: function(){
      return state.listaRefaccionesValid
    }
};
const mutations = {
  listaRefaccionesMutation: (state, value) => {
    state.listaRefacciones = value;
  },
  listaLaneMutation: (state, value) => {
    state.listaLane = value;
  },
  listaRefaccionValidMutation: (state, value) => {
    state.listaRefaccionesValid = value;
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
      `http://192.168.0.111:8084/api/component/${value.numConvenio}/${value.numPlaza}/${value.id}`
    )
      .then(response => {
        console.log("Bien");
        console.log(response.data.response);
        commit("listaRefaccionValidMutation", response.data.response);
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
