import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { ValidationStub } from '@/presentation/test'
import Login from './login'

type SutParams = {
  errorMessage: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage
  render(<Login validation={validationStub} />)
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
      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
      fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
      const emailErrorStatus = screen.getByLabelText(/email-error-status/i)
      expect(emailErrorStatus.title).toBe(errorMessage)
      expect(emailErrorStatus.textContent).toBe('🔴')
    })

    it('Should show password error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
      fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
      const passwordErrorStatus = screen.getByLabelText(/password-error-status/i)
      expect(passwordErrorStatus.title).toBe(errorMessage)
      expect(passwordErrorStatus.textContent).toBe('🔴')
    })

    it('Should show valid email state if Validation succeeds', () => {
      makeSut()
      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
      fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
      const emailErrorStatus = screen.getByLabelText(/email-error-status/i)
      expect(emailErrorStatus.title).toBe('Tudo certo!')
      expect(emailErrorStatus.textContent).toBe('🟢')
    })

    it('Should show valid password state if Validation succeeds', () => {
      makeSut()
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
      fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
      const passwordErrorStatus = screen.getByLabelText(/password-error-status/i)
      expect(passwordErrorStatus.title).toBe('Tudo certo!')
      expect(passwordErrorStatus.textContent).toBe('🟢')
    })

    it('Should enable submit button if Validation succeeds', () => {
      makeSut()
      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
      fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
      fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
      const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
      expect(submitButton.disabled).toBe(false)
    })

    it('Should show spinner on submit', () => {
      makeSut()
      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
      fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
      fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
      const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
      fireEvent.click(submitButton)
      const spinner = screen.getByLabelText(/spinner/i)
      expect(spinner).toBeTruthy()
    })
  })
})
