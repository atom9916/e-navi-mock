/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/vue'
import DailyViewVue from '@/views/DailyView.vue'
import { mount } from '@vue/test-utils'

describe('DailyViewビューのテスト', () => {
  test('h2要素が正しく表示される', () => {
    render(DailyViewVue)

    const h2 = screen.getByRole('heading')

    expect(h2).toHaveTextContent('日次勤怠')
  })
  test('ボタンをクリックすると日次勤怠がPOSTされる', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(DailyViewVue, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({ path: '/y/attendanceRegistration' })
  })
})
