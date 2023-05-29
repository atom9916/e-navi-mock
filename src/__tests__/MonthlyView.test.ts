/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/vue'
import MonthlyViewVue from '@/views/MonthlyView.vue'

describe('MonthlyViewビューのテスト', () => {
  test('画面が正しく表示されている', () => {
    render(MonthlyViewVue)

    const h2 = screen.getByRole('heading')

    expect(h2).toHaveTextContent('月次勤怠')
  })
  test('スナップショットテスト', () => {
    const { container } = render(MonthlyViewVue)

    expect(container).toMatchSnapshot()
  })
})
