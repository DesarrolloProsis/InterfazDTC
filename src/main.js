import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind.css"
import Multiselect from 'vue-multiselect'
import VeeValidate from 'vee-validate';
import { Validator, ValidationObserver, ValidationProvider } from 'vee-validate';
import es from "vee-validate/dist/locale/es";
import './registerServiceWorker'
import moment from "moment";
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
//Rputer
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//Img
import VueFileAgent from 'vue-file-agent';
Vue.use(VueFileAgent);
//Lazy
import VueLazyImage from "vue-lazy-images";
Vue.use(VueLazyImage)
//Validaciones en formularios
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(VeeValidate, { classes: false,}); 
const NoSiniestro = {
  validate(value){
      return store.getters['Header/GET_UNIQUE_SINESTER_NUMBER'](value)
  }
}
const NoReporte = {
  validate(value){
    return store.getters['Header/GET_UNIQUE_REPORT_NUMBER'](value)
  }
}
const FechaValidaList = {
  validate(value) {
      let fechas = value.split('\n')
      for(let item of fechas){
        if(item.length == 10){
          if(!moment(item, 'YYYY/MM/DD').isValid()){
            return false
          }
        }
        else{
          return false
        }
      }
      return true   
  }
}
Validator.extend('uniqueSinester', NoSiniestro)
Validator.extend('uniqueReport', NoReporte)
Validator.extend('FechaValidaList',FechaValidaList)
Validator.localize("es",es);
// Componente Multiselect
Vue.component('multiselect', Multiselect)
// Notificaciones 
import VueNotify from 'vuejs-notify'
Vue.use(VueNotify)
//manejor de Solicitudes axios
import manejo_solicitudes_run from './store/ManejoSolicitudes'
manejo_solicitudes_run()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
