
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
describe("ComponentWithVuex", () => {
  it("renders a username using a real Vuex store", () => {
    const wrapper = mount(NavBar, { 
      store, 
      localVue 
    })
    
    console.log(wrapper.find(".rollUsuario"))
    
    
  })
})





