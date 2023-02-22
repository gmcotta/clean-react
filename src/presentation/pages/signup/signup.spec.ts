import { createMemoryHistory } from '@remix-run/router'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { EmailInUseError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'
import { AddAccountSpy } from '@/domain/test'
import { FormHelper, renderWithHistory, ValidationStub } from '@/presentation/test'
import Signup from './signup'

const history = createMemoryHistory({ initialEntries: ['/signup'] })

type SutParams = {
  errorMessage: string
}

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.errorMessage
  const addAccountSpy = new AddAccountSpy()

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Signup({
      validation: validationStub,
      addAccount: addAccountSpy
    })
  })

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
      expect(screen.getByLabelText('form-status').children).toHaveLength(0)
    })

    it('Should render button disabled on start', () => {
      const errorMessage = faker.random.words()
      makeSut({ errorMessage })
      expect(screen.getByRole<HTMLButtonElement>('button', { name: /cadastrar/i })).toBeDisabled()
    })

    it('Should render input status errors on start', () => {
      const errorMessage = faker.random.word()
      makeSut({ errorMessage })
      expect(screen.getByLabelText('name')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('name-label')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('email')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('email-label')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('password')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('password-label')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('passwordConfirmation')).toHaveProperty('title', errorMessage)
      expect(screen.getByLabelText('passwordConfirmation-label')).toHaveProperty('title', errorMessage)
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
      expect(screen.getByRole<HTMLButtonElement>('button', { name: /cadastrar/i })).toBeEnabled()
    })

    it('Should show spinner on submit', () => {
      makeSut()
      simulateValidSubmit()
      expect(screen.queryByLabelText('spinner')).toBeInTheDocument()
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
        expect(screen.getByLabelText('main-error')).toHaveTextContent(error.message)
        expect(screen.getByLabelText('form-status').children).toHaveLength(1)
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
