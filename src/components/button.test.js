import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './button'
import { BrowserRouter as Router } from 'react-router-dom'

test('renders a button', () => {
  const actionProp = 'bla'
  const textProp = 'test me click'

  // React-Testing-Library
  render(
    <Router>
      <Button onClick={actionProp}>{textProp}</Button>
    </Router>
  )
  const btn = screen.getByText(textProp)

  expect(btn).toHaveProperty('onclick')
})

test('renders a button element when path prop is absent', () => {
  const btnText = 'test me click'

  // React-Testing-Library
  render(<Button onClick={() => {}}>test me click</Button>)
  const btn = screen.getByText(btnText)

  // Jest
  expect(btn).toHaveProperty('onclick')
  // Jest-DOM
  expect(btn).toContainHTML('<button')
})
