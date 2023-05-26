/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/vue'
import LogoutViewVue from '@/views/LogoutView.vue'
import { mount } from '@vue/test-utils'

describe('Logoutビューのテスト', () => {
  test('画面が正しく表示される', () => {
    render(LogoutViewVue)

    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('再ログイン')
  })

  it('クリックするとログイン画面に遷移', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(LogoutViewVue, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    await wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({ path: '/login' })
  })

  test('スナップショット', () => {
    const { container } = render(LogoutViewVue)
    expect(container).toMatchSnapshot()
  })
})
