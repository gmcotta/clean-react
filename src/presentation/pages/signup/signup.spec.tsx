import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render } from '@testing-library/react'
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
      const errorMessage = 'Campo obrigatório'
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
  })
})
