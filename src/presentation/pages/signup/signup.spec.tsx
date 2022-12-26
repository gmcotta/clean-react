import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render } from '@testing-library/react'

import { FormHelper } from '@/presentation/test'

import Signup from './signup'

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): void => {
  render(
    <Router location={history.location} navigator={history}>
      <Signup />
    </Router>
  )
}

describe('<Signup />', () => {
  describe('Start', () => {
    it('Should not render spinner and error message on start', () => {
      makeSut()
      FormHelper.testChildCount('form-status', 0)
    })

    it('Should render button disabled on start', () => {
      makeSut()
      FormHelper.testButtonIsDisabled('Entrar')
    })

    it('Should render input status errors on start', () => {
      const errorMessage = 'Campo obrigatório'
      makeSut()
      FormHelper.testElementTitle('name-error-status', errorMessage)
      FormHelper.testElementTitle('email-error-status', errorMessage)
      FormHelper.testElementTitle('password-error-status', errorMessage)
      FormHelper.testElementTitle('passwordConfirmation-error-status', errorMessage)
    })
  })
})
