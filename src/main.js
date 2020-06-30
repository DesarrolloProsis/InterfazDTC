import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind.css"
import Multiselect from 'vue-multiselect'

import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import es from "vee-validate/dist/locale/es";

//Validaciones en formularios
Vue.use(VeeValidate, { 
    classes: true,
    classNames: {
      valid: 'is_valid',
      invalid: 'is_invalid'
    }
  });  
const NoSiniestro = {
  validate(value){
      return store.getters['Header/getUniqueNoSinester'](value)
  }
}
const NoReporte = {
  validate(value){
    return store.getters['Header/getUniqueNoReport'](value)
  }
}
Validator.extend('uniqueSinester', NoSiniestro)
Validator.extend('uniqueReport', NoReporte)
Validator.localize("es",es);

// Componente Multiselect
Vue.component('multiselect', Multiselect)

// Notificaciones 
import VueNotify from 'vuejs-notify'
Vue.use(VueNotify)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
