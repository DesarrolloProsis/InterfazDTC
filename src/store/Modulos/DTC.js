import Axios from "axios";

const state = {
  listaDTCTecnico: [],
  listaDescriptions: [],
  listaDmg: [],
  newlistaDmg: [],
  listaDTC: [],
  validaciones: [false, false, false, false],
  insertDmgComplete: false
};

const getters = {
  getListaDTCTecnico: () => state.listaDTCTecnico,
  getListaDescriptions: () => state.listaDescriptions,
  getValidaciones: () => state.validaciones,
  getInsertDmgComplete: () => state.insertDmgComplete,
};
const mutations = {
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
    state.newlistaDmg = state.newlistaDmg.filter(partida => partida.description != value)    
  },
  listaDmgClearMutation: (state) => {
    state.listaDmg = []
  },
  listaDTCMutation: (state, value) => {
    state.listaDTC = value;
  },
  validacionMutation: (state, value) => {
    state.validaciones[value.index] = value.data
  },
  insertDmgCompleteMutation: (state, value) => {
    state.insertDmgComplete = value
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
        

    if(state.newlistaDmg.length > 0){

      let arrayDmg = []    
      let strComponent = ''
      let intPartida = 1

      strComponent = state.newlistaDmg[0]['description']

        
    for(let i = 0; i < state.newlistaDmg.length; i++){
            

    if(strComponent == state.newlistaDmg[i].description){
        console.log(state.newlistaDmg[i].description)
    }
    else{
      strComponent = state.newlistaDmg[i].description
      intPartida++
    }


    let obj = {
      ComponentsStockId: state.newlistaDmg[i].componentsStockId,
      ReferenceNumber: value,
      CapufeLaneNum: state.newlistaDmg[i].capufeLaneNum,
      IdGare: state.newlistaDmg[i].idGare,
      Marca: state.newlistaDmg[i].brand,
      Modelo: state.newlistaDmg[i].model,
      NumSerie: state.newlistaDmg[i].serialNumber,
      Unity: state.newlistaDmg[i].unity,
      DateInstallationDate: state.newlistaDmg[i].instalationDate,
      DateMaintenanceDate: state.newlistaDmg[i].maintenanceDate,
      MaintenanceFolio: state.newlistaDmg[i].maintenanceFolio,
      IntLifeTimeExpected: state.newlistaDmg[i].lifeTime,
      DateLifeTimeReal: state.newlistaDmg[i].instalationDate,        
      IntPartida: intPartida
    }
    arrayDmg.push(obj)
        
  }
      console.log(arrayDmg)

       await Axios.post(
      `http://prosisdev.sytes.net:88/api/requestedComponent`,
      arrayDmg
    )
      .then(response => {                  
        
        console.log(response)
        if(response.status == 201 && response.statusText == 'Created'){  
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

    }

    

   
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
