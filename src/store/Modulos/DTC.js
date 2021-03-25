import Axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION
import CookiesService from '../../services/CookiesService'
const state = {  
  listaDescriptions: [],
  listaDmg: [],
  listaDmgLibre: [],
  listaPropuestoLibre: [],
  newlistaDmg: [],  
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
  getInsertDmgComplete: () => state.insertDmgComplete,
  GET_LISTA_DTC: () => (tipoVista) => {
    if(tipoVista){      
      return state.listaInfoDTC
        .filter(dtc => dtc.dtcView.statusId == 4)
        .map((item) => {
          if(item.paths.length > 0)
            item.dtcView.imgbool = false
          else  
            item.dtcView.imgbool = true

          if(item.pdfExists)
            item.dtcView.escaneadobool = false
          else
            item.dtcView.escaneadobool = true

          return item.dtcView          
        })     
    }
    else
      return state.listaInfoDTC.filter(dtc => dtc.dtcView.statusId < 4).map(item => item.dtcView)
  },
  GET_FOTOS_EQUIPO_DAÑADO_REFERENCE: () => (numeroReferencia) => state.listaInfoDTC.find(dtc => dtc.dtcView.referenceNumber == numeroReferencia).paths,
  GET_TABLE_DTC_CARDS: () => state.tableFormComponent, 
  GET_IMAGENES_DTC: (state) => (reference) => state.listaImagenesDTC.find(item => item.referenceNumber == reference), 
  getDmgLibre: () => state.listaDmgLibre,
  getPropuestoLibre: () => state.listaPropuestoLibre,    
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
  insertDmgCompleteMutation: (state, value) => state.insertDmgComplete = value,
  TABLA_DTC_CARDS_MUTATION: (state, value) => state.tableFormComponent = value,
  BORRAR_DTC_MUTATION: (state, value) => state.listaInfoDTC.splice(state.listaInfoDTC.findIndex(a => a.referenceNumber == value), 1),
  COMPONENTES_EDIT: (state, value) => state.componetesEdit = value,
  LISTA_DMG_LIBRE_MUTATION: (state, value) => state.listaDmgLibre = value,
  LISTA_PROPUESTO_LIBRE_EDIT_MUTATION: (state, value) => state.listaPropuestoLibre = value,
  LISTA_IMAGENES_DTC_MUTATION: (state, value) => state.listaImagenesDTC.push(value),    
  LISTA_DTC_MUTATION: (state, value) => state.listaInfoDTC = value,  
  LISTA_DESCRIPCIONES_MUTATION: (state, value) => state.listaDescriptions = value,
  NUEVO_ITEM_DTC_DAÑADO_MUTATION: (state, value) => state.newlistaDmg.push(value),
  ELIMINAR_ITEM_DTC_DAÑADO_MUTATION: (state, value) => state.newlistaDmg.splice(value, 1),
  ACTUALIZAR_ITEM_DTC_DAÑADO_MUTATION: (state, value) => state.newlistaDmg.splice(value.index, 1, value.value),
  LIMPIAR_LISTA_DTC_DAÑADO_MUTATION: (state) => state.newlistaDmg = [],
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
  async BUSCAR_DESCRIPCIONES_DTC({ commit, rootGetters }) {
    await Axios.get(`${API}/typedescriptions/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}`, CookiesService.obtener_bearer_token())
      .then(response => {
        commit("LISTA_DESCRIPCIONES_MUTATION", response.data.result);
      })
      .catch(Ex => {
        console.log(Ex);
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
      });
  },
  //Consulta API Crear DTC
  async CREAR_LISTA_DTC_DAÑADO({ state, commit, rootGetters }, value) {
    let arrayDmg = []
    for (let i = 0; i < state.newlistaDmg.length; i++) {
      for (let g = 0; g < state.newlistaDmg[i].length; g++) {
        state.newlistaDmg[i][g]['ReferenceNumber'] = value.refNum
        state.newlistaDmg[i][g]['IntPartida'] = i + 1
        state.newlistaDmg[i][g]['strLifeTimeReal'].toString()
        arrayDmg.push(state.newlistaDmg[i][g])
      }
    }              
    await Axios.post(`${API}/requestedComponent/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.flagCreate}`, arrayDmg, CookiesService.obtener_bearer_token())
      .then(response => {      
        if (response.status == 200) {
          commit('insertDmgCompleteMutation', true)
        }
      })
      .catch(Ex => {        
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
      });
  },
  async BUSCAR_LISTA_DTC({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcData/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.idUser}/${value.numPlaza}`, CookiesService.obtener_bearer_token())
      .then(response => {                      
        commit("LISTA_DTC_MUTATION", response.data.result);
      })
      .catch(Ex => {
        commit("LISTA_DTC_MUTATION", []);
        console.log(Ex);
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
      });
  },
  async BUSCAR_TABLA_CARDS({ commit, rootGetters }, value) {            
    await Axios.get(`${API}/dtcData/TableForm/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value}`, CookiesService.obtener_bearer_token())
      .then(response => {
        if (response.data.result != null)
          commit("TABLA_DTC_CARDS_MUTATION", response.data.result);
        else
          commit("TABLA_DTC_CARDS_MUTATION", []);
      })
      .catch(Ex => {
        commit("TABLA_DTC_CARDS_MUTATION", []);
        console.log(Ex);
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
      });
  },
  async BORRAR_DTC({ commit, rootGetters }, value) {    
    await Axios.delete(`${API}/dtcData/Delete/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.refNum}/${value.userId}`, CookiesService.obtener_bearer_token())
      .then(() => {
        commit("BORRAR_DTC_MUTATION", value)
        commit
      })
      .catch(Ex => {
        console.log(Ex);
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
      });
  },
  async COMPONENT_EDIT({ commit, rootGetters }, value) {    
    await Axios.get(`${API}/dtcData/EditInfo/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value}`, CookiesService.obtener_bearer_token())
      .then(response => {
        commit("COMPONENTES_EDIT", response.data.result)
      })
      .catch(Ex => {
        console.log(Ex); 
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
      });
  },
  async COMPONENT_EDIT_OPEN({ commit, rootGetters }, value) {
    await Axios.get(`${API}/dtcData/EditInfo/Open/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value}`, CookiesService.obtener_bearer_token())
      .then(response => {
        commit("COMPONENTES_EDIT", response.data.result)
      })
      .catch(Ex => {
        console.log(Ex);
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
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
    await Axios.post(`${API}/requestedComponent/Open/${rootGetters['Login/GET_REFERENCIA_ACTUAL_PLAZA']}/${value.flagCreate}`, arrayDmg, CookiesService.obtener_bearer_token())
      .then(response => {
        if (response.status == 201) {
          commit('insertDmgCompleteMutation', true)
        }
      })
      .catch(Ex => {        
        if(Ex.response.status == 401)
            CookiesService.token_no_autorizado()
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
