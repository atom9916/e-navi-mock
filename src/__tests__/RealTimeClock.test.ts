/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/vue'
import RealTimeClockVue from '@/components/RealTimeClock.vue'
import { mount } from '@vue/test-utils'

describe('ReallTimeClockコンポーネントのテスト', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })
  test('現在の日付と時刻が正しく表示される', async () => {
    jest.setSystemTime(new Date(2023, 5, 26, 9, 0, 0))

    const now = new Date()
    const expectedCurrentDate = now.toLocaleDateString()
    const expectedCurrentTime = now.toLocaleTimeString()

    const wrapper = mount(RealTimeClockVue)
    await wrapper.vm.$nextTick()

    const currentDate = wrapper.find('p#today-contents').text()
    const currentTime = wrapper.find('p#now-contents').text()

    expect(currentDate).toEqual(`今日は\u00A0${expectedCurrentDate}\u00A0です`)
    expect(currentTime).toEqual(`現在の時刻は\u00A0${expectedCurrentTime}\u00a0です`)
  })

  test('スナップショットテスト', () => {
    const { container } = render(RealTimeClockVue)

    expect(container).toMatchSnapshot()
  })
})
