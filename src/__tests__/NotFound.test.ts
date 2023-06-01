/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/vue'
import NotFoundVue from '@/views/NotFound.vue'

describe('NotFoundビューのテスト', () => {
  test('エラー画面が正常に表示される', () => {
    render(NotFoundVue)

    const heading = screen.getByRole('heading')
    const text = screen.getByText('アクセスしたページは存在しません')

    expect(heading).toHaveTextContent('Not Found')
    expect(text).toBeInTheDocument()
  })

  test('スナップショットテスト', () => {
    const { container } = render(NotFoundVue)
    expect(container).toMatchSnapshot()
  })
})
