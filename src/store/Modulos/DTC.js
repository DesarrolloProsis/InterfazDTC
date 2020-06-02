import Axios from "axios";

const state = {
  listaDTCTecnico: [],
  listaDescriptions: [],
  listaDmg: [],
  newlistaDmg: [],
  listaDTC: [],
  validaciones: [false, false, false, false],
  insertDmgComplete: false,
  listaInfoDTC: [],
  tableFormComponent: [],
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico,
  getListaDescriptions: () => state.listaDescriptions,
  getValidaciones: () => state.validaciones,
  getInsertDmgComplete: () => state.insertDmgComplete,
  getlistaInfoDTC: () => state.listaInfoDTC,
  gettableFormComp: () => state.tableFormComponent
  
};
const mutations = {

  listaInfoDTCMutation: (state, value) => {
    state.listaInfoDTC = value
  }, 
  listaDTCTecnicoMutation: (state, value) => {
    state.listaDTCTecnico = value;
  },
  listaDescriptionsMutation: (state, value) => {    
    state.listaDescriptions = value;
  },
  newlistaDmgMutationPush: (state, value) => {    
    state.newlistaDmg.push(value);
  },
  listaDmgMutationDelete: (state, value) =>{    
    state.newlistaDmg.splice(value, 1)  
  },
  listaDmgMutationUpdate: (state, value) =>{   
    console.log(value) 
    state.newlistaDmg.splice(value.index, 1, value.value)  
  },
  listaDmgClearMutation: (state) => {
    state.newlistaDmg = []
  },
  listaDTCMutation: (state, value) => {
    state.listaDTC = value;
  },
  validacionMutation: (state, value) => {
    state.validaciones[value.index] = value.data
  },
  insertDmgCompleteMutation: (state, value) => {
    state.insertDmgComplete = value
  },
  tableFormComponentMutation: (state, value) => {
    state.tableFormComponent = value
  }
};

const actions = {
  
  async buscarDTC({ commit }) {    
    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcdata`)
      .then(response => {        
        console.log(response.data);
        commit("listaDescriptionsMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async buscarDescriptions({ commit }) {    
    await Axios.get(`http://prosisdev.sytes.net:88/api/typedescriptions`)
      .then(response => {
        commit("listaDescriptionsMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear DTC
  async crearDmg({ state, commit } , value ) {

    let arrayDmg = []    
    for(let i = 0;  i < state.newlistaDmg.length; i++){
          
          for(let g = 0;  g < state.newlistaDmg[i].length; g++){

                state.newlistaDmg[i][g]['ReferenceNumber'] = value
                state.newlistaDmg[i][g]['IntPartida'] = i + 1
                state.newlistaDmg[i][g]['strLifeTimeReal'].toString()
                arrayDmg.push(state.newlistaDmg[i][g])
          }
    }

console.log(arrayDmg)

          await Axios.post(
      `http://prosisdev.sytes.net:88/api/requestedComponent`,      
      arrayDmg
        )
      .then(response => {   
        
        console.log(response)
          
        if(response.status == 201){  
            console.log('Si se inserta')          
            commit('insertDmgCompleteMutation', true)          
        }
        else{
          alert('No se Pudo  Insertar Dmg')
        }        
      })
      .catch(Ex => {
        console.log('ERRO!!! ' + Ex);
      });
  },
  async buscarListaDTC({commit}, value){

    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcData/${value.idUser}/${value.numPlaza}`)
    .then(response => {
      commit("listaInfoDTCMutation", response.data.result);
    })
    .catch(Ex => {
      console.log(Ex);
    });

  },
  async tableFormComponent({commit}, value){

    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcData/TableForm/${value}`)
    .then(response => {

      if(response.data.result != null)
        commit("tableFormComponentMutation", response.data.result);
      else
        alert("Ocurrio un Error")
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
