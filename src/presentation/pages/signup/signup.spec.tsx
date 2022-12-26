import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { FormHelper, ValidationStub } from '@/presentation/test'

import Signup from './signup'

const history = createMemoryHistory({ initialEntries: ['/login'] })

type SutParams = {
  errorMessage: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage

  render(
    <Router location={history.location} navigator={history}>
      <Signup validation={validationStub} />
    </Router>
  )
}

const simulateValidSubmit = (name = faker.name.fullName(), email = faker.internet.email(), password = faker.internet.password()): void => {
  FormHelper.populateField('Digite seu nome', name)
  FormHelper.populateField('Digite seu e-mail', email)
  FormHelper.populateField('Digite sua senha', password)
  FormHelper.populateField('Confirme sua senha', password)
  const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
  fireEvent.click(submitButton)
}

describe('<Signup />', () => {
  describe('Start', () => {
    it('Should not render spinner and error message on start', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.testChildCount('form-status', 0)
    })

    it('Should render button disabled on start', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.testButtonIsDisabled('Entrar')
    })

    it('Should render input status errors on start', () => {
      const errorMessage = faker.random.word()
      makeSut({ errorMessage })
      FormHelper.testElementTitle('name-error-status', errorMessage)
      FormHelper.testElementTitle('email-error-status', errorMessage)
      FormHelper.testElementTitle('password-error-status', errorMessage)
      FormHelper.testElementTitle('passwordConfirmation-error-status', errorMessage)
    })
  })

  describe('Validation', () => {
    it('Should show name error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('Digite seu nome', faker.name.firstName())
      FormHelper.testErrorStatus('name', errorMessage, '🔴')
    })

    it('Should show email error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('Digite seu e-mail', faker.internet.email())
      FormHelper.testErrorStatus('email', errorMessage, '🔴')
    })

    it('Should show password error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('Digite sua senha', faker.internet.password())
      FormHelper.testErrorStatus('password', errorMessage, '🔴')
    })

    it('Should show passwordConfirmation error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('Confirme sua senha', faker.internet.password())
      FormHelper.testErrorStatus('passwordConfirmation', errorMessage, '🔴')
    })

    it('Should show valid name state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('Digite seu nome', faker.name.firstName())
      FormHelper.testErrorStatus('name', 'Tudo certo!', '🟢')
    })

    it('Should show valid email state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('Digite seu e-mail', faker.internet.email())
      FormHelper.testErrorStatus('email', 'Tudo certo!', '🟢')
    })

    it('Should show valid password state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('Digite sua senha', faker.internet.password())
      FormHelper.testErrorStatus('password', 'Tudo certo!', '🟢')
    })

    it('Should show valid passwordConfirmation state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('Confirme sua senha', faker.internet.password())
      FormHelper.testErrorStatus('passwordConfirmation', 'Tudo certo!', '🟢')
    })

    it('Should enable submit button if form is valid', () => {
      makeSut()
      FormHelper.populateField('Digite seu nome', faker.name.fullName())
      FormHelper.populateField('Digite seu e-mail', faker.internet.email())
      FormHelper.populateField('Digite sua senha', faker.internet.password())
      FormHelper.populateField('Confirme sua senha', faker.internet.password())
      FormHelper.testButtonIsDisabled('Entrar', false)
    })

    it('Should show spinner on submit', () => {
      makeSut()
      simulateValidSubmit()
      FormHelper.testElementExists('spinner')
    })
  })
})
