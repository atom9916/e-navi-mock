/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/vue'
import DaylyViewVue from '@/views/DaylyView.vue'
import { mount } from '@vue/test-utils'

describe('DailyViewビューのテスト', () => {
  test('h2要素が正しく表示される', () => {
    render(DaylyViewVue)

    const h2 = screen.getByRole('heading')
    const button = screen.getByRole('button')

    expect(h2).toHaveTextContent('日次勤怠')
    expect(button).toHaveTextContent('登録する')
  })
  test('ボタンをクリックすると日次勤怠がPOSTされる', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(DaylyViewVue, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({ path: '/dayly/attendanceRegistration' })
  })
})
