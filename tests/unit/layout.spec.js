
import Vuex from 'vuex'
import NavBar from '../../src/components/Navbar.vue'
import Footer from '../../src/components/Footer.vue'
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
          nombreRoll: "Tecnico",
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
  const wrapperNav = mount(NavBar, { mocks:{ $route}, store, localVue, stubs: { RouterLink: RouterLinkStub }})    
  it("NavBar.vue --- Mostrar NavBar", () => {    
    if(wrapperNav.vm.$route.path != '/')
      expect(wrapperNav.find('#navBarShow').exists()).toBe(true)      
    else
      expect(wrapperNav.find('#navBarShow').exists()).toBe(false)       
  })
  it("NavBar.vue --- Mostrar Usuario", () => {        
    if(wrapperNav.vm.$route.path != '/')
      expect(wrapperNav.find('#testNombreUsuario').text()).toBe('Bienvenido: Luis Eduardo Emiliano Torres')
    else
      expect(wrapperNav.find('#navBarShow').exists()).toBe(false)    
  })
  it("NavBar.vue --- Lista Acceso Rapido", () => {        
    if(wrapperNav.vm.$route.path != '/')
      expect(wrapperNav.find('#testListaAccesoRapido').element.childElementCount).toBe(4)    
    else
      expect(wrapperNav.find('#testListaAccesoRapido').element.childElementCount).toBe(0)
  })
  const wrapperFooter = mount(Footer, { mocks:{ $route}, store, localVue, stubs: { RouterLink: RouterLinkStub }})    
  it("Footer.vue --- Mostrar TipoUsuario", () => {
    if(wrapperFooter.vm.$route.path != '/')
      expect(wrapperFooter.find('#testNombreRoll').text()).toBe('Tecnico')
    else
      expect(wrapperFooter.find('#nombreRollShow').exists()).toBe(false)    
  })
})





