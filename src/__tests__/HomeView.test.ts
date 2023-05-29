/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/vue'
import HomeViewVue from '@/views/HomeView.vue'

describe('HomeViewビューのテスト', () => {
  test('画面が正しく表示される', () => {
    render(HomeViewVue)

    const h3 = screen.getByRole('heading')

    expect(h3).toHaveTextContent('ホーム')
  })
  test('スナップショットテスト', () => {
    const { container } = render(HomeViewVue)

    expect(container).toMatchSnapshot()
  })
})
