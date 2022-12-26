import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { AuthenticationSpy, SaveAccessTokenMock, ValidationStub, FormHelper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import Login from './login'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  errorMessage: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.errorMessage
  render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return {
    authenticationSpy,
    saveAccessTokenMock
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

const testErrorStatus = (fieldName: string, errorMessage: string, statusEmoji: string): void => {
  const passwordErrorStatus = screen.getByLabelText(`${fieldName}-error-status`)
  expect(passwordErrorStatus.title).toBe(errorMessage)
  expect(passwordErrorStatus.textContent).toBe(statusEmoji)
}

const testElementExists = (labelText: string): void => {
  const element = screen.getByLabelText(labelText)
  expect(element).toBeTruthy()
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
      FormHelper.testElementTitle('email-error-status', errorMessage)
      FormHelper.testElementTitle('password-error-status', errorMessage)
    })
  })

  describe('Validation', () => {
    it('Should show email error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      populateEmailField()
      testErrorStatus('email', errorMessage, '🔴')
    })

    it('Should show password error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      populatePasswordField()
      testErrorStatus('password', errorMessage, '🔴')
    })

    it('Should show valid email state if Validation succeeds', () => {
      makeSut()
      populateEmailField()
      testErrorStatus('email', 'Tudo certo!', '🟢')
    })

    it('Should show valid password state if Validation succeeds', () => {
      makeSut()
      populatePasswordField()
      testErrorStatus('password', 'Tudo certo!', '🟢')
    })

    it('Should enable submit button if Validation succeeds', () => {
      makeSut()
      populateEmailField()
      populatePasswordField()
      FormHelper.testButtonIsDisabled('Entrar', false)
    })

    it('Should show spinner on submit', () => {
      makeSut()
      simulateValidSubmit()
      testElementExists('spinner')
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
      populateEmailField()
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
        const mainError = await screen.findByLabelText(/main-error/i)
        expect(mainError.textContent).toBe(error.message)
        FormHelper.testChildCount('form-status', 1)
      })
    })

    it('Should call SaveAccessToken on success', async () => {
      const { authenticationSpy, saveAccessTokenMock } = makeSut()
      simulateValidSubmit()
      await waitFor(() => {
        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
        expect(history.index).toBe(0)
        expect(history.location.pathname).toBe('/')
      })
    })

    it('Should present error if SaveAccessToken fails', async () => {
      const { saveAccessTokenMock } = makeSut()
      const error = new InvalidCredentialsError()
      jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
      simulateValidSubmit()
      await waitFor(async () => {
        const mainError = await screen.findByLabelText(/main-error/i)
        expect(mainError.textContent).toBe(error.message)
        FormHelper.testChildCount('form-status', 1)
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
