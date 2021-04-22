
import Vuex from 'vuex'
import NavBar from '../../src/components/Navbar.vue'
import { mount, createLocalVue } from "@vue/test-utils"

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules:{    
    Login: {
      namespaced: true,
      state: {
        cookiesUser:{
          rollId: "alice"
        }
      }
    }
  }
})
describe("Componentes Layout", () => {
  it("NavBar.vue", () => {
    const wrapper = mount(NavBar, { 
      store, 
      localVue 
    })
    
    console.log(wrapper.find(".rollUsuario"))
    
    
  })
})





