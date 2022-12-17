import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import Login from './login'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  errorMessage: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.errorMessage
  render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    authenticationSpy
  }
}

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(email)
  populatePasswordField(password)
  const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
  fireEvent.click(submitButton)
}

const simulateErrorStatus = (fieldName: string, errorMessage: string, statusEmoji: string): void => {
  const passwordErrorStatus = screen.getByLabelText(`${fieldName}-error-status`)
  expect(passwordErrorStatus.title).toBe(errorMessage)
  expect(passwordErrorStatus.textContent).toBe(statusEmoji)
}

describe('<Login />', () => {
  describe('start', () => {
    it('Should not render spinner and error message on start', () => {
      makeSut()
      const errorWrap = screen.getByLabelText('Status do formulário')
      expect(errorWrap.childElementCount).toBe(0)
    })

    it('Should render button disabled on start', () => {
      makeSut({ errorMessage: faker.random.words() })
      const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
      expect(submitButton.disabled).toBe(true)
    })

    it('Should render input status errors on start', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      const emailErrorStatus = screen.getByLabelText(/email-error-status/i)
      const passwordErrorStatus = screen.getByLabelText(/password-error-status/i)
      expect(emailErrorStatus.title).toBe(errorMessage)
      expect(passwordErrorStatus.title).toBe(errorMessage)
    })
  })

  describe('Validation', () => {
    it('Should show email error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      populateEmailField()
      simulateErrorStatus('email', errorMessage, '🔴')
    })

    it('Should show password error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      populatePasswordField()
      simulateErrorStatus('password', errorMessage, '🔴')
    })

    it('Should show valid email state if Validation succeeds', () => {
      makeSut()
      populateEmailField()
      simulateErrorStatus('email', 'Tudo certo!', '🟢')
    })

    it('Should show valid password state if Validation succeeds', () => {
      makeSut()
      populatePasswordField()
      simulateErrorStatus('password', 'Tudo certo!', '🟢')
    })

    it('Should enable submit button if Validation succeeds', () => {
      makeSut()
      populateEmailField()
      populatePasswordField()
      const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
      expect(submitButton.disabled).toBe(false)
    })

    it('Should show spinner on submit', () => {
      makeSut()
      simulateValidSubmit()
      const spinner = screen.getByLabelText(/spinner/i)
      expect(spinner).toBeTruthy()
    })
  })

  describe('Authentication', () => {
    it('Should call Authentication with correct values', () => {
      const { authenticationSpy } = makeSut()
      const email = faker.internet.email()
      const password = faker.internet.password()
      simulateValidSubmit(email, password)
      expect(authenticationSpy.params).toEqual({ email, password })
    })
  })
})
