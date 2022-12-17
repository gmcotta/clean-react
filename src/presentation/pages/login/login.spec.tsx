import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/presentation/test'
import Login from './login'

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  render(<Login validation={validationSpy} />)
  return { validationSpy }
}

describe('<Login />', () => {
  it('Should not render spinner and error message on start', () => {
    makeSut()
    const errorWrap = screen.getByLabelText('Status do formulário')
    expect(errorWrap.childElementCount).toBe(0)
  })

  it('Should render button disabled on start', () => {
    makeSut()
    const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
    expect(submitButton.disabled).toBe(true)
  })

  it('Should render input status errors on start', () => {
    screen.logTestingPlaygroundURL()
    const { validationSpy } = makeSut()
    const emailErrorStatus = screen.getByLabelText(/email-error-status/i)
    const passwordErrorStatus = screen.getByLabelText(/password-error-status/i)
    expect(emailErrorStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordErrorStatus.title).toBe('Campo obrigatório')
  })

  it('Should call Validation with correct email value', () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()
    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  it('Should call Validation with correct password value', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  it('Should show email error if Validation fails', () => {
    const { validationSpy } = makeSut()
    const errorMessage = validationSpy.errorMessage
    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailErrorStatus = screen.getByLabelText(/email-error-status/i)
    expect(emailErrorStatus.title).toBe(errorMessage)
    expect(emailErrorStatus.textContent).toBe('🔴')
  })
})
