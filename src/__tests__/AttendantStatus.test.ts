/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/vue'
import AttendantStatusVue from '@/components/AttendantStatus.vue'
import { mount } from '@vue/test-utils'

describe('AttendantStatusコンポーネントのテスト', () => {
  const attendantStatuses = ['出勤', '有給', '半休', '慶弔休', '欠勤', '休日出勤']

  test('コンポーネントが正しく表示される', () => {
    render(AttendantStatusVue)
    const label = screen.getByLabelText('出欠:')
    const input = screen.getByRole('textbox')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  test('input要素をクリックするとドロップダウンリストが表示される', async () => {
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

  test('ドロップダウンリストが正しく表示されること', async () => {
    const wrapper = mount(AttendantStatusVue)
    const input = wrapper.find('input')

    // ドロップダウンリストが非表示の状態であることを確認
    expect(wrapper.find('.dropdown-menu').isVisible()).toBe(false)

    // input 要素をクリックしてドロップダウンリストが表示されることを確認
    await input.trigger('click')
    expect(wrapper.find('.dropdown-menu').isVisible()).toBe(true)

    // ドロップダウンリストの要素数が正しいことを確認
    const options = wrapper.findAll('.dropdown-menu li')
    expect(options.length).toBe(attendantStatuses.length)

    // ドロップダウンリストの要素が正しく表示されていることを確認
    attendantStatuses.forEach((status, index) => {
      expect(options[index].text()).toBe(status)
    })
  })

  test('ドロップダウンリストの要素を選択できること', async () => {
    const wrapper = mount(AttendantStatusVue)
    const input = wrapper.find('input')
    const selectedStatus = '出勤'

    // input 要素をクリックしてドロップダウンリストを表示
    await input.trigger('click')

    // ドロップダウンリストの要素をクリックして選択
    const option = wrapper.find('.dropdown-menu li')
    await option.trigger('click')

    // 選択した要素が正しく表示されていることを確認
    expect(input.element.value).toBe(selectedStatus)

    // ドロップダウンリストが非表示になっていることを確認
    expect(wrapper.find('.dropdown-menu').isVisible()).toBe(false)
  })

  test('スナップショットテスト', () => {
    const { container } = render(AttendantStatusVue)
    expect(container).toMatchSnapshot()
  })
})
