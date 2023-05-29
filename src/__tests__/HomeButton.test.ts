/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/vue'
import HomeButtonVue from '@/components/HomeButton.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'

describe('HomeButtonコンポーネントのテスト', () => {
  test('ボタンが正常に表示される', () => {
    render(HomeButtonVue)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('ホーム')
  })
  test('ボタンをクリックするとホーム画面に遷移する', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: { template: '<div>Home</div>' }
        }
      ]
    })

    const wrapper = mount(HomeButtonVue, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.vm.$route.path).toBe('/')
  })
  test('スナップショット', () => {
    const { container } = render(HomeButtonVue)
    expect(container).toMatchSnapshot()
  })
})
