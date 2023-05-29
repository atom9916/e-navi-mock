/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/vue'
import AttendantStatusVue from '@/components/AttendantStatus.vue'

describe('AttendantStatusコンポーネントのテスト', () => {
  test('コンポーネントが正しく表示される', () => {
    render(AttendantStatusVue)
    const label = screen.getByLabelText('出欠:')
    const input = screen.getByRole('textbox')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })
  test('input要素をクリックするとドロップダウンリストが表示される', async () => {
    const attendantStatuses = ['出勤', '有給', '半休', '慶弔休', '欠勤', '休日出勤']

    render(AttendantStatusVue)
    const input = screen.getByRole('textbox')
    await fireEvent.click(input)

    const ul = screen.getByRole('list')
    const li = screen.getAllByRole('listitem')

    expect(ul).toBeInTheDocument()
    li.map((list, index) => {
      expect(list).toHaveTextContent(attendantStatuses[index])
    })
  })
  test('スナップショットテスト', () => {
    const { container } = render(AttendantStatusVue)
    expect(container).toMatchSnapshot()
  })
})
