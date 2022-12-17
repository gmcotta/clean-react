import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { Validation } from '@/presentation/protocols/validation'
import Login from './login'

type SutTypes = {
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
    makeSut()
    // screen.logTestingPlaygroundURL()
    const emailErrorStatus = screen.getByLabelText(/email-error-status/i)
    const passwordErrorStatus = screen.getByLabelText(/password-error-status/i)
    expect(emailErrorStatus.title).toBe('Campo obrigatório')
    expect(passwordErrorStatus.title).toBe('Campo obrigatório')
  })

  it('Should call Validation with correct email value', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i)
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({ email: 'any_email' })
  })
})
