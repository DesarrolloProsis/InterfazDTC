import Axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION

const state = {
  listaDTCTecnico: [],
  listaDescriptions: [],
  listaDmg: [],
  listaDmgLibre: [],
  listaPropuestoLibre: [],
  newlistaDmg: [],
  listaDTC: [],
  insertDmgComplete: false,
  listaInfoDTC: [],
  tableFormComponent: [],
  componetesEdit: {},
  listaImagenesDTC: [],
  dtcStatus: [
    { id: 1, nombre: 'Inconcluso'},
    { id: 2, nombre: 'Concluido'},
    { id: 3, nombre: 'Sellado'},
    { id: 4, nombre: 'GMMEP'}
  ]
};
const getters = {
  getListaDTCTecnico: () => {
    console.log('hoa')
    console.log(state.listaDTC)
    state.listaDTCTecnico
  },
  getListaDescriptions: () => state.listaDescriptions,
  getInsertDmgComplete: () => state.insertDmgComplete,
  getlistaInfoDTC: () => (tipoVista) => {
    if(tipoVista){
      let prueba = []
      state.listaInfoDTC
        .filter(dtc => dtc.statusId == 4)
        .forEach(async (item) =>  {          
          await Axios.get(`${API}/dtcData/EquipoDañado/Images/GetPaths/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}`)
          .then((response)=>{
            //console.log(response)
            if(response.data.length > 0){
              let obj = { ...item, 'imgbool': false}
              prueba.push(obj)              
            }
            else{
              let obj = { ...item, 'imgbool': true}
              prueba.push(obj)              
            }
          })

          .catch((ex)=>{
            console.log(ex)
          })
      })
      console.log(prueba)
      return prueba
    }
    else
      return state.listaInfoDTC.filter(dtc => dtc.statusId < 4)
  },
  gettableFormComp: () => state.tableFormComponent,
  getcomponentesEdit: () => state.componetesEdit,
  getDmgLibre: () => state.listaDmgLibre,
  getPropuestoLibre: () => state.listaPropuestoLibre,  
  getImagenesDTC: (state) => (reference) => state.listaImagenesDTC.find(item => item.referenceNumber == reference)  
};
const mutations = {
  listaDmgLibreClearMutation: (state) => {
    state.listaDmgLibre = []
    state.listaPropuestoLibre = []
  },
  cleanOut: (state) => {
    state.listaDescriptions = []
    state.listaInfoDTC = []
  },
  listaDTCMutation: (state, value) => state.listaDTC = value,
  insertDmgCompleteMutation: (state, value) => state.insertDmgComplete = value,
  tableFormComponentMutation: (state, value) => state.tableFormComponent = value,
  BORRAR_DTC_MUTATION: (state, value) => state.listaInfoDTC.splice(state.listaInfoDTC.findIndex(a => a.referenceNumber == value), 1),
  COMPONENTES_EDIT: (state, value) => state.componetesEdit = value,
  LISTA_DMG_LIBRE_MUTATION: (state, value) => state.listaDmgLibre = value,
  LISTA_PROPUESTO_LIBRE_EDIT_MUTATION: (state, value) => state.listaPropuestoLibre = value,
  LISTA_IMAGENES_DTC_MUTATION: (state, value) => state.listaImagenesDTC.push(value),    
  listaInfoDTCMutation: (state, value) => state.listaInfoDTC = value,
  listaDTCTecnicoMutation: (state, value) => state.listaDTCTecnico = value,
  listaDescriptionsMutation: (state, value) => state.listaDescriptions = value,
  newlistaDmgMutationPush: (state, value) => state.newlistaDmg.push(value),
  listaDmgMutationDelete: (state, value) => state.newlistaDmg.splice(value, 1),
  listaDmgMutationUpdate: (state, value) => state.newlistaDmg.splice(value.index, 1, value.value),
  listaDmgClearMutation: (state) => state.newlistaDmg = [],
  LIMPIAR_IMAGENES_REF: (state, value) => {
    let index = state.listaImagenesDTC
            .map(function (e) {
              return e.referenceNumber;
            })
            .indexOf(value);
      if(index > -1)
            state.listaImagenesDTC.splice(index, 1)
  },
  LIMPIAR_IMAGENES_FULL: (state) => state.listaImagenesDTC = []  
};
const actions = {
  async buscarDTC({ commit, rootGetters }) {      
    await Axios.get(`${API}/dtcdata/${rootGetters['Login/getReferenceSquareActual']}`)
      .then(response => {        
        commit("listaDescriptionsMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async buscarDescriptions({ commit, rootGetters }) {
    await Axios.get(`${API}/typedescriptions/${rootGetters['Login/getReferenceSquareActual']}`)
      .then(response => {
        commit("listaDescriptionsMutation", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  //Consulta API Crear DTC
  async crearDmg({ state, commit, rootGetters }, value) {
    let arrayDmg = []
    for (let i = 0; i < state.newlistaDmg.length; i++) {
      for (let g = 0; g < state.newlistaDmg[i].length; g++) {
        state.newlistaDmg[i][g]['ReferenceNumber'] = value.refNum
        state.newlistaDmg[i][g]['IntPartida'] = i + 1
        state.newlistaDmg[i][g]['strLifeTimeReal'].toString()
        arrayDmg.push(state.newlistaDmg[i][g])
      }
    }      
    console.log(arrayDmg)    
    //await Axios.post(`https://localhost:44358/api/requestedComponent/${value.flagCreate}`, arrayDmg)
    await Axios.post(`${API}/requestedComponent/${rootGetters['Login/getReferenceSquareActual']}/${value.flagCreate}`, arrayDmg)
      .then(response => {      
        if (response.status == 200) {
          commit('insertDmgCompleteMutation', true)
        }
      })
      .catch(Ex => {
        console.log('ERROR!!! ' + Ex);
      });
  },
  async buscarListaDTC({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcData/${rootGetters['Login/getReferenceSquareActual']}/${value.idUser}/${value.numPlaza}`)
      .then(response => {                      
        commit("listaInfoDTCMutation", response.data.result);
      })
      .catch(Ex => {
        commit("listaInfoDTCMutation", []);
        console.log(Ex);
      });
  },
  async tableFormComponent({ commit, rootGetters }, value) {        
    //await Axios.get(`https://localhost:44358/api/dtcData/TableForm/${value}`)
    await Axios.get(`${API}/dtcData/TableForm/${rootGetters['Login/getReferenceSquareActual']}/${value}`)
      .then(response => {
        if (response.data.result != null)
          commit("tableFormComponentMutation", response.data.result);
        else
          alert("Ocurrio un Error")
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async BORRAR_DTC({ commit, rootGetters }, value) {
    
    await Axios.delete(`${API}/dtcData/Delete/${rootGetters['Login/getReferenceSquareActual']}/${value.refNum}/${value.userId}`)
      .then(() => {
        commit("BORRAR_DTC_MUTATION", value)
        commit
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async COMPONENT_EDIT({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcData/EditInfo/${rootGetters['Login/getReferenceSquareActual']}/${value}`)
      .then(response => {
        commit("COMPONENTES_EDIT", response.data.result)
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async COMPONENT_EDIT_OPEN({ commit, rootGetters }, value) {
    await Axios.get(`${API}/dtcData/EditInfo/Open/${rootGetters['Login/getReferenceSquareActual']}/${value}`)
      .then(response => {
        commit("COMPONENTES_EDIT", response.data.result)
      })
      .catch(Ex => {
        console.log(Ex);
      });
  },
  async crearDmgLibre({ state, commit, rootGetters }, value) {
    let arrayDmg = []
    for (let i = 0; i < state.listaDmgLibre.length; i++) {
      let newItem = {
        BitFlag: 1,
        StrReferenceNumber: value.refNum,
        StrUnity: state.listaDmgLibre[i].unidad,
        StrComponent: state.listaDmgLibre[i].componente,
        StrQuantity: state.listaDmgLibre[i].cantidad,
        StrBrand: state.listaDmgLibre[i].marca,
        StrModel: state.listaDmgLibre[i].modelo,
        StrSerialNumber: state.listaDmgLibre[i].numserie,
        StrLane: state.listaDmgLibre[i].ubicacion,
        StrInstallationDate: state.listaDmgLibre[i].fechaInstalacion,
        StrMaintenanceDate: state.listaDmgLibre[i].fechaMantenimiento,
        StrLifeTimeExpected: state.listaDmgLibre[i].fechaFabricante,
        IntItem: state.listaDmgLibre[i].partida,
        StrMaintenanceFolio: state.listaDmgLibre[i].folioMantenimiento,
        StrLifeTimeReal: state.listaDmgLibre[i].fechaReal,
        //Equipo Propuesto
        StrUnitaryPrice: state.listaPropuestoLibre[i].precioUnitario,
        StrDollarUnitaryPrice: '------------',
        StrTotalPrice: state.listaPropuestoLibre[i].precioTotal,
        StrDollarTotalPrice: '--------------',
        StrBrandProposed: state.listaPropuestoLibre[i].marca,
        StrModelProposed: state.listaPropuestoLibre[i].modelo,
      }
      arrayDmg.push(newItem)
    }    
    await Axios.post(`${API}/requestedComponent/Open/${rootGetters['Login/getReferenceSquareActual']}/${value.flagCreate}`, arrayDmg)
      .then(response => {
        if (response.status == 201) {
          commit('insertDmgCompleteMutation', true)
        }
      })
      .catch(Ex => {
        console.log('ERROR!!! ' + Ex);
      });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
