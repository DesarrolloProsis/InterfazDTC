import { mount } from '@vue/test-utils'
import NavBar from '../../src/components/Navbar.vue'

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
