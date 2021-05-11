
import Vuex from 'vuex'
import NavBar from '../../src/components/Navbar.vue'
import { mount, createLocalVue } from "@vue/test-utils"
//Se importa para obtener etiquetas router-link
import { RouterLinkStub } from '@vue/test-utils';
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  modules:{    
    Login: {
      namespaced: true,
      state: {
        cookiesUser:{
          rollId: 7,
          nombreUsuario: "Luis Eduardo Emiliano Torres"
        }
      }
    }
  }
})
const $route = {
  path: '/home',
  params: {
    item: {
      msg: 'Hola Mundo!!'
    }
  }
}
describe("Componentes Layout", () => {
  it("NavBar.vue --- Mostrar NavBar", () => {
    const wrapper = mount(NavBar, { mocks:{ $route}, store, localVue, stubs: { RouterLink: RouterLinkStub }})    
    if(wrapper.vm.$route.path != '/')
      expect(wrapper.find('#navBarShow').exists()).toBe(true)      
    else
      expect(wrapper.find('#navBarShow').exists()).toBe(true)       
  })
  it("NavBar.vue --- Mostrar Usuario", () => {    
    const wrapper = mount(NavBar, { mocks:{ $route}, store, localVue, stubs: { RouterLink: RouterLinkStub }})    
    if(wrapper.vm.$route.path != '/')
      expect(wrapper.find('#testNombreUsuario').text()).toBe('Bienvenido: Luis Eduardo Emiliano Torres')
    else
      expect(wrapper.find('#navBarShow').exists()).toBe(true)    
  })
  it("NavBar.vue --- Lista Acceso Rapido", () => {    
    const wrapper = mount(NavBar, { mocks:{ $route}, store, localVue, stubs: { RouterLink: RouterLinkStub }})    
    if(wrapper.vm.$route.path != '/')
      expect(wrapper.find('#testListaAccesoRapido').element.childElementCount).toBe(4)    
    else
      expect(wrapper.find('#testListaAccesoRapido').element.childElementCount).toBe(0)
  })
})





