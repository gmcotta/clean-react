import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { AuthenticationSpy, ValidationStub, FormHelper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import Login from './login'
import { APIContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  errorMessage: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()

  render(
      <APIContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Login
            validation={validationStub}
            authentication={authenticationSpy}
            />
        </Router>
      </APIContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
  fireEvent.click(submitButton)
}

describe('<Login />', () => {
  describe('start', () => {
    it('Should not render spinner and error message on start', () => {
      makeSut()
      FormHelper.testChildCount('form-status', 0)
    })

    it('Should render button disabled on start', () => {
      makeSut({ errorMessage: faker.random.words() })
      FormHelper.testButtonIsDisabled('Entrar')
    })

    it('Should render input status errors on start', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.testElementTitle('email', errorMessage)
      FormHelper.testElementTitle('email-label', errorMessage)
      FormHelper.testElementTitle('password', errorMessage)
      FormHelper.testElementTitle('password-label', errorMessage)
    })
  })

  describe('Validation', () => {
    it('Should show email error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('email', faker.internet.email())

      FormHelper.testErrorStatus('email', errorMessage)
    })

    it('Should show password error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('password', faker.internet.password())
      FormHelper.testErrorStatus('password', errorMessage)
    })

    it('Should show valid email state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('email', faker.internet.email())
      FormHelper.testErrorStatus('email')
    })

    it('Should show valid password state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('password', faker.internet.password())
      FormHelper.testErrorStatus('password')
    })

    it('Should enable submit button if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('email', faker.internet.email())
      FormHelper.populateField('password', faker.internet.password())
      FormHelper.testButtonIsDisabled('Entrar', false)
    })

    it('Should show spinner on submit', () => {
      makeSut()
      simulateValidSubmit()
      FormHelper.testElementExists('spinner')
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

    it('Should call Authentication only once', () => {
      const { authenticationSpy } = makeSut()
      simulateValidSubmit()
      simulateValidSubmit()
      expect(authenticationSpy.callsCount).toBe(1)
    })

    it('Should not call Authentication if form is invalid', () => {
      const errorMessage = faker.random.words()
      const { authenticationSpy } = makeSut({ errorMessage })
      FormHelper.populateField('email', faker.internet.email())
      fireEvent.submit(screen.getByRole('form'))
      expect(authenticationSpy.callsCount).toBe(0)
    })

    it('Should show error if Authentication fails', async () => {
      const { authenticationSpy } = makeSut()
      const error = new InvalidCredentialsError()
      jest
        .spyOn(authenticationSpy, 'auth')
        .mockRejectedValueOnce(error)
      simulateValidSubmit()
      await waitFor(async () => {
        FormHelper.testElementTextContent('main-error', error.message)
        FormHelper.testChildCount('form-status', 1)
      })
    })

    it('Should call UpdateCurrentAccount on success', async () => {
      const { authenticationSpy, setCurrentAccountMock } = makeSut()
      simulateValidSubmit()
      await waitFor(() => {
        expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
        expect(history.index).toBe(0)
        expect(history.location.pathname).toBe('/')
      })
    })

    it('Should go to sign up page', () => {
      makeSut()
      const signUp = screen.getByText(/criar conta/i)
      fireEvent.click(signUp)
      expect(history.index).toBe(1)
      expect(history.location.pathname).toBe('/signup')
    })
  })
})
