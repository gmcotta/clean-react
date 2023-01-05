import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { AddAccountSpy, FormHelper, ValidationStub } from '@/presentation/test'

import Signup from './signup'
import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { APIContext } from '@/presentation/contexts'

const history = createMemoryHistory({ initialEntries: ['/signup'] })

type SutParams = {
  errorMessage: string
}

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()

  render(
    <APIContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Signup
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </APIContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (name = faker.name.fullName(), email = faker.internet.email(), password = faker.internet.password()): void => {
  FormHelper.populateField('name', name)
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  FormHelper.populateField('passwordConfirmation', password)
  const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /cadastrar/i })
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
      FormHelper.testButtonIsDisabled('Cadastrar')
    })

    it('Should render input status errors on start', () => {
      const errorMessage = faker.random.word()
      makeSut({ errorMessage })
      FormHelper.testElementTitle('name', errorMessage)
      FormHelper.testElementTitle('name-label', errorMessage)
      FormHelper.testElementTitle('email', errorMessage)
      FormHelper.testElementTitle('email-label', errorMessage)
      FormHelper.testElementTitle('password', errorMessage)
      FormHelper.testElementTitle('password-label', errorMessage)
      FormHelper.testElementTitle('passwordConfirmation', errorMessage)
      FormHelper.testElementTitle('passwordConfirmation-label', errorMessage)
    })
  })

  describe('Validation', () => {
    it('Should show name error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('name', faker.name.firstName())
      FormHelper.testErrorStatus('name', errorMessage)
    })

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

    it('Should show passwordConfirmation error if Validation fails', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      FormHelper.populateField('passwordConfirmation', faker.internet.password())
      FormHelper.testErrorStatus('passwordConfirmation', errorMessage)
    })

    it('Should show valid name state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('name', faker.name.firstName())
      FormHelper.testErrorStatus('name')
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

    it('Should show valid passwordConfirmation state if Validation succeeds', () => {
      makeSut()
      FormHelper.populateField('passwordConfirmation', faker.internet.password())
      FormHelper.testErrorStatus('passwordConfirmation')
    })

    it('Should enable submit button if form is valid', () => {
      makeSut()
      FormHelper.populateField('name', faker.name.fullName())
      FormHelper.populateField('email', faker.internet.email())
      FormHelper.populateField('password', faker.internet.password())
      FormHelper.populateField('passwordConfirmation', faker.internet.password())
      FormHelper.testButtonIsDisabled('Cadastrar', false)
    })

    it('Should show spinner on submit', () => {
      makeSut()
      simulateValidSubmit()
      FormHelper.testElementExists('spinner')
    })
  })

  describe('AddAccount', () => {
    it('Should call AddAccount with correct values', () => {
      const { addAccountSpy } = makeSut()
      const name = faker.name.fullName()
      const email = faker.internet.email()
      const password = faker.internet.password()

      simulateValidSubmit(name, email, password)
      expect(addAccountSpy.params).toStrictEqual({
        name,
        email,
        password,
        passwordConfirmation: password
      })
    })

    it('Should call AddAccount only once', () => {
      const { addAccountSpy } = makeSut()
      simulateValidSubmit()
      simulateValidSubmit()
      expect(addAccountSpy.callsCount).toBe(1)
    })

    it('Should not call AddAccount if form is invalid', () => {
      const errorMessage = faker.random.words()
      const { addAccountSpy } = makeSut({ errorMessage })
      FormHelper.populateField('email', faker.internet.email())
      fireEvent.submit(screen.getByRole('form'))
      expect(addAccountSpy.callsCount).toBe(0)
    })

    it('Should show error if AddAccount fails', async () => {
      const { addAccountSpy } = makeSut()
      const error = new EmailInUseError()
      jest
        .spyOn(addAccountSpy, 'add')
        .mockRejectedValueOnce(error)
      simulateValidSubmit()
      await waitFor(async () => {
        FormHelper.testElementTextContent('main-error', error.message)
        FormHelper.testChildCount('form-status', 1)
      })
    })

    it('Should call UpdateCurrentAccount on success', async () => {
      const { addAccountSpy, setCurrentAccountMock } = makeSut()
      simulateValidSubmit()
      await waitFor(() => {
        expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
        expect(history.index).toBe(0)
        expect(history.location.pathname).toBe('/')
      })
    })

    it('Should go to login page', () => {
      makeSut()
      const login = screen.getByText('Voltar para Login')
      fireEvent.click(login)
      expect(history.index).toBe(1)
      expect(history.location.pathname).toBe('/login')
    })
  })
})
