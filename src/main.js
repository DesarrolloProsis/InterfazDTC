import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind.css"
import Multiselect from 'vue-multiselect'
import { ValidationObserver, ValidationProvider, localize, extend  } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
import './registerServiceWorker'
import moment from "moment";
import * as rules from 'vee-validate/dist/rules';
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
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize('es', es);
extend('uniqueSinester', {
  validate(value){
      return store.getters['Header/GET_UNIQUE_SINESTER_NUMBER'](value)
  }
})
extend('uniqueReport', {
  validate(value){
    return store.getters['Header/GET_UNIQUE_REPORT_NUMBER'](value)
  }
})
extend('maxTime', {
  getMessage: (field) => `La ${field} debe ser menor que la HoraFin`,
  validate: (value, args) => {
    if(args[0] == ''){
      return true
    }    
    else{
      let horaISplite = value.split(':')            
      let horaFSplite = args[0].split(':')            
      let dateInicio = new Date(1995,11,17,horaISplite[0],horaISplite[1],0);
      let dateFin = new Date(1995,11,17,horaFSplite[0],horaFSplite[1],0);             
      return dateInicio < dateFin ? true : false    
    }   
  }
});
const FechaValidaList = {
  validate(value) {
      let fechas = value.split('\n')
      for(let item of fechas){
        if(item.length == 10){
          if(!moment(item, 'YYYY/MM/DD').isValid())
            return false          
        }
        else
          return false        
      }
      return true   
  }
}
extend('FechaValidaList',FechaValidaList)
// Componente Multiselect
Vue.component('multiselect', Multiselect)
// Notificaciones 
import VueNotify from 'vuejs-notify'
Vue.use(VueNotify)
//manejor de Solicitudes axios
import AxiosManejador from './store/ManejoSolicitudes'
Vue.prototype.$http = AxiosManejador
//Vlidaciones
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
//Youtube
import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
