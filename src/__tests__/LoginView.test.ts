/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/vue'
import LoginViewVue from '@/views/LoginView.vue'

test('ログイン画面が正常に表示される', () => {
  render(LoginViewVue)

  const title = screen.getByRole('heading')

  expect(title).toHaveTextContent('ログイン')
})
