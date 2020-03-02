import Vue from "vue";
import Vuex from "vuex";


import Carriles from './Modulos/Carriles'
import Refacciones from './Modulos/Refacciones'
import DTC from './Modulos/DTC'
import Inventario from './Modulos/Inventario'
import Plazas from './Modulos/Plazas'
import Header from './Modulos/Header'
import Login from './Modulos/Login'


Vue.use(Vuex)

export default new Vuex.Store({

  modules:{

    DTC,
    Carriles,
    Refacciones,
    Inventario,
    Plazas,
    Header,
    Login    
    
  }

})
