import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind.css"
import Multiselect from 'vue-multiselect'

import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';

//import Notifications from 'vue-notification'


//Validaciones en formularios
Vue.use(VeeValidate, { 
    classes: true,
    classNames: {
      valid: 'is_valid',
      invalid: 'is_invalid'
    }
  });
const dictionary = {
  es: {
    messages:{
      required: () => 'Campo Requerido!!'
    }
  }
};
Validator.localize(dictionary);
Validator.localize('es');

// Componente Multiselect
Vue.component('multiselect', Multiselect)


// Notificaciones 

//Vue.use(Notifications)

import VueNotify from 'vuejs-notify'
Vue.use(VueNotify) // use defaults


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
