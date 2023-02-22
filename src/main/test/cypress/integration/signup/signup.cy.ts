import { faker } from '@faker-js/faker'

import * as FormHelper from '../../utils/form-helpers'
import * as Helper from '../../utils/helpers'
import * as HTTPHelper from '../../utils/http-mocks'

const path = /signup/
const mockEmailInUseError = (): void => {
  HTTPHelper.mockForbiddenError(
    'POST',
    path,
    'signupEmailInUse'
  )
}

const mockSuccess = (account?: any): void => {
  HTTPHelper.mockOK(
    'POST',
    path,
    account || {},
    'signupSuccess'
  )
}

const mockUnexpectedError = (): void => {
  HTTPHelper.mockServerError(
    'POST',
    path,
    'signupUnexpectedError'
  )
}

const populateForm = (): void => {
  cy.getByName('name').focus().type(faker.name.fullName())
  cy.getByName('email').focus().type(faker.internet.email())
  const password = faker.internet.password()
  cy.getByName('password').focus().type(password)
  cy.getByName('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateForm()
  cy.get('button[type="submit"]').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    cy.getByName('name').should('have.attr', 'readOnly')

    FormHelper.testInputStatus('email', 'Campo obrigatório')
    cy.getByName('email').should('have.attr', 'readOnly')

    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByName('password').should('have.attr', 'readOnly')

    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByName('passwordConfirmation').should('have.attr', 'readOnly')

    cy.get('button[type="submit"]').should('be.disabled').should('have.text', 'Cadastrar')

    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show error state if form is invalid', () => {
    cy.getByName('name').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('name', 'Campo inválido')

    cy.getByName('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Campo inválido')

    cy.getByName('password').focus().type(faker.internet.password(3))
    FormHelper.testInputStatus('password', 'Campo inválido')

    cy.getByName('passwordConfirmation').focus().type(faker.internet.password(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Campo inválido')

    cy.get('button[type="submit"]').should('be.disabled').should('have.text', 'Cadastrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show valid state if form is valid', () => {
    cy.getByName('name').focus().type(faker.name.fullName())
    FormHelper.testInputStatus('name')

    cy.getByName('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.internet.password()
    cy.getByName('password').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByName('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.get('button[type="submit"]').should('not.be.disabled').should('have.text', 'Cadastrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show EmailInUseError if status code is 403', () => {
    mockEmailInUseError()

    simulateValidSubmit()
    FormHelper.testMainError('E-mail já está em uso')
    Helper.testUrl('/signup')
  })

  it('Should save accessToken in localStorage', () => {
    cy.fixture('account').then(account => {
      mockSuccess(account)

      simulateValidSubmit()
      cy.getByAriaLabel('spinner').should('exist')
      Helper.testUrl('/')
      Helper.testLocalStorageItem('account', JSON.stringify(account))
    })
  })

  it('Should show UnexpectedError for other errors', () => {
    mockUnexpectedError()

    simulateValidSubmit()
    FormHelper.testMainError('Aconteceu algo de errado. Tente novamente mais tarde.')
    Helper.testUrl('/signup')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateForm()
    cy.get('button[type="submit"]').click()
    cy.wait('@signupSuccess')
    cy.get('button[type="submit"]').click({ force: true })
    Helper.testHttpCallsCount(1, 'signupSuccess')
  })

  it('Should not submit if form is invalid', () => {
    mockSuccess()

    cy.getByName('email').focus().type(faker.internet.email()).type('{enter}')
    Helper.testHttpCallsCount(0, 'signupSuccess')
  })
})
