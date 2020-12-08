import Vue from "vue";
import Vuex from "vuex";
import Refacciones from './Modulos/Refacciones'
import DTC from './Modulos/DTC'
import Header from './Modulos/Header'
import Login from './Modulos/Login'
import Usuarios from './Modulos/Usuarios'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    DTC,    
    Refacciones,        
    Header,
    Login,
    Usuarios        
  }
})
