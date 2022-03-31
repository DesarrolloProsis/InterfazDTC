import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind.css"
import Multiselect from 'vue-multiselect'
import { ValidationObserver, ValidationProvider, localize, extend  } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
//import './registerServiceWorker'
import moment from "moment";
import * as rules from 'vee-validate/dist/rules';
import tooltip from 'vue-directive-tooltip';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { 
  faUserSecret,
  faScrewdriverWrench,
  faToolbox,
  faGears,
  faCalendarDays,
  faFileWaveform,
  faBuildingUser,
  faUsersGear,
  faVideo,
  faFileCircleQuestion,
  faClapperboard,
  faFileSignature,
  faFolderTree,
  faPaste,
  faFileCircleCheck,
  faBoxesStacked,
  faFileInvoiceDollar,
  faArrowsDownToPeople,
  faCopy,
  faFileCircleXmark,
  faFileInvoice,
  faFileLines,
  faRightFromBracket,
  faBars,
  faCircleInfo,
  faCalendarDay,
  faRepeat,
  faPlus,
  faFloppyDisk,
  faTrash,
  faMagnifyingGlass,
  faPenToSquare,
  faUserLock,
  faSquarePlus,
  faSquareMinus,
  faUserCheck,
  faCircleXmark,
  faXmark,
  faRightLong,
  faArrowLeftLong,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
/*  */

import { 
  faCircleQuestion,
  faComments,
  faCirclePlay,
  faEyeSlash,
  faEye,

} from '@fortawesome/free-regular-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret,
  faScrewdriverWrench,
  faToolbox,
  faGears,
  faCircleQuestion,
  faCalendarDays,
  faFileWaveform,
  faBuildingUser,
  faUsersGear,
  faComments,
  faVideo,
  faFileCircleQuestion,
  faCirclePlay,
  faClapperboard,
  faFileSignature,
  faFolderTree,
  faPaste,
  faFileCircleCheck,
  faBoxesStacked,
  faFileInvoiceDollar,
  faArrowsDownToPeople,
  faCopy,
  faFileCircleXmark,
  faFileInvoice,
  faFileLines,
  faRightFromBracket,
  faBars,
  faEyeSlash,
  faEye,
  faCircleInfo,
  faCalendarDay,
  faRepeat,
  faPlus,
  faFloppyDisk,
  faTrash,
  faMagnifyingGlass,
  faPenToSquare,
  faUserLock,
  faSquarePlus,
  faSquareMinus,
  faUserCheck,
  faCircleXmark,
  faXmark,
  faRightLong,
  faArrowLeftLong,
  faDownload
  )

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css';
Vue.use(tooltip)
//Router
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
  getMessage: (field) => `La ${field} debe ser menor que la HoraFin`,
  validate(value){
    return store.getters['Header/GET_UNIQUE_REPORT_NUMBER'](value)
  }
})
extend('fechaMenorNow', { 
  getMessage: (field) => `La ${field} debe ser menor que la fecha actual`, 
  validate: (value) => {
    return Date.parse(value) < Date.now() ? true : false
  }
});
extend('maxTime', {
  getMessage: (field) => `La ${field} debe ser menor que la HoraFin`,
  validate: (value, args) => {
    if(args[0] == ''){
      return true
    }    
    else{
      return value < args[0] ? true : false    
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
//Validaciones
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
//Youtube
import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)
//DateTime Picker
import 'vue-datetime/dist/vue-datetime.css'
//SesionExpire
import sesionExpire from 'idle-vue'
const evenstHub = new Vue()
Vue.use(sesionExpire,{
  eventEmitter: evenstHub,
  store,
  idleTime: 30000, // 3 seconds
  startAtIdle: false
})


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
