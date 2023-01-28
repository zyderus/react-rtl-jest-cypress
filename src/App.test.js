import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import App from './App'

describe('bla', () => {
  test('bla test', () => {
    const setState = jest.fn()

    jest
      .spyOn(React, 'useState')
      // we don’t want our fake state to affect the next test
      .mockImplementationOnce(initState => [initState, setState])
    render(<App />)
  })
})
