import { render, fireEvent, screen } from '@testing-library/vue'
import ExampleForTest from '@/components/ExampleForTest.vue'

test('increments value on click', async () => {
  render(ExampleForTest)

  screen.getByText('Times clicked: 0')

  const button = screen.getByText('increment')

  await fireEvent.click(button)
  await fireEvent.click(button)

  screen.getByText('Times clicked: 2')
})
