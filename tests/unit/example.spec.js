import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import NavBar from '../../src/components/Navbar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Store({
  modules:{
      Login: {
        namespaced: true,
        state: {
          cookiesUser:{
            rollId: 1
          }
        }
      }
  }
})

test('HelloWorld.vue', () => {
  const wrapper = mount(NavBar, {
    propsData: {
      pruebas: 'Hello world'
    }
  })
  console.log(wrapper)
  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')

})
