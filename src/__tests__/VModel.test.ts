/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from '@testing-library/vue'
import VModel from '@/components/VModel.vue'

test('properly handles v-model', async () => {
  render(VModel)

  screen.getByText('Hi, my name is Alice')

  const usernameInput = screen.getByLabelText(/username/i)

  await fireEvent.update(usernameInput, 'Bob')

  screen.getByText('Hi, my name is Bob')
})
