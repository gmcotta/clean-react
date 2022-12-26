import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render, screen } from '@testing-library/react'

import Signup from './signup'

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): void => {
  render(
    <Router location={history.location} navigator={history}>
      <Signup />
    </Router>
  )
}

const testChildCount = (labelText: string, count: number): void => {
  const errorWrap = screen.getByLabelText(labelText)
  expect(errorWrap.childElementCount).toBe(count)
}

const testButtonIsDisabled = (buttonText: string, isDisabled = true): void => {
  const button = screen.getByRole<HTMLButtonElement>('button', { name: buttonText })
  expect(button.disabled).toBe(isDisabled)
}

const testElementTitle = (labelText: string, message: string): void => {
  const fieldErrorStatus = screen.getByLabelText(labelText)
  expect(fieldErrorStatus.title).toBe(message)
}

describe('<Signup />', () => {
  describe('Start', () => {
    it('Should not render spinner and error message on start', () => {
      makeSut()
      testChildCount('form-status', 0)
    })

    it('Should render button disabled on start', () => {
      makeSut()
      testButtonIsDisabled('Entrar')
    })

    it('Should render input status errors on start', () => {
      const errorMessage = 'Campo obrigatório'
      makeSut()
      testElementTitle('name-error-status', errorMessage)
      testElementTitle('email-error-status', errorMessage)
      testElementTitle('password-error-status', errorMessage)
      testElementTitle('passwordConfirmation-error-status', errorMessage)
    })
  })
})
