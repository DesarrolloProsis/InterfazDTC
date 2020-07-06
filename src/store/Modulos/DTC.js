import Axios from "axios";

const state = {
  listaDTCTecnico: [],
  listaDescriptions: [],
  listaDmg: [],
  newlistaDmg: [],
  listaDTC: [],  
  insertDmgComplete: false,
  listaInfoDTC: [],
  tableFormComponent: [],
  componetesEdit: {}
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico,
  getListaDescriptions: () => state.listaDescriptions,  
  getInsertDmgComplete: () => state.insertDmgComplete,
  getlistaInfoDTC: () => state.listaInfoDTC,
  gettableFormComp: () => state.tableFormComponent,
  getcomponentesEdit: () => state.componetesEdit
  
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
            
    state.newlistaDmg.splice(value.index, 1, value.value)  
  },
  listaDmgClearMutation: (state) => {
    state.newlistaDmg = []
  },
  listaDTCMutation: (state, value) => {
    state.listaDTC = value;
  },    
  insertDmgCompleteMutation: (state, value) => {
    state.insertDmgComplete = value
  },
  tableFormComponentMutation: (state, value) => {
    state.tableFormComponent = value
  },
  cleanOut: (state) => {

    state.listaDescriptions = []
    state.listaInfoDTC = []    
  },
  BORRAR_DTC_MUTATION: (state, value) => {
    state.listaInfoDTC.splice( state.listaInfoDTC.findIndex(a => a.referenceNumber == value) , 1);
  },
  COMPONENTES_EDIT: (state, value) => {

    state.componetesEdit = value
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

                state.newlistaDmg[i][g]['ReferenceNumber'] = value.refNum
                state.newlistaDmg[i][g]['IntPartida'] = i + 1
                state.newlistaDmg[i][g]['strLifeTimeReal'].toString()
                arrayDmg.push(state.newlistaDmg[i][g])
          }
    }
    console.log(JSON.stringify(arrayDmg))
    console.log(`https://localhost:44358/api/requestedComponent/1`)
    //await Axios.post(`http://prosisdev.sytes.net:88/api/requestedComponent/0`,arrayDmg)
    await Axios.post(`https://localhost:44358/api/RequestedComponent/${value.flagCreate}`,arrayDmg)
      .then(response => {   
                          
        if(response.status == 201){                    
            commit('insertDmgCompleteMutation', true)          
        }      
      })
      .catch(Ex => {
        console.log('ERROR!!! ' + Ex);
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
  },
  async BORRAR_DTC({commit},value){        
    await Axios.delete(`http://prosisdev.sytes.net:88/api/dtcData/Delete/${value}`)
    .then(response => {

        console.log(response)
        commit("BORRAR_DTC_MUTATION", value)
    })
    .catch(Ex => {
      console.log(Ex);
    });
  },
  async COMPONENT_EDIT({commit}, value){

    await Axios.get(`http://prosisdev.sytes.net:88/api/dtcData/EditInfo/${value}`)
    .then(response => {
        
        commit("COMPONENTES_EDIT", response.data.result)
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
