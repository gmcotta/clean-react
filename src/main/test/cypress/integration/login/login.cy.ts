import { faker } from '@faker-js/faker'

import * as FormHelper from '../../utils/form-helpers'
import * as Helper from '../../utils/helpers'
import * as HTTPHelper from '../../utils/http-mocks'

const path = /login/
const mockInvalidCredentialsError = (): void => HTTPHelper.mockUnauthorizedError(
  path,
  'loginInvalidCredentials'
)

const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
  'POST',
  path,
  'loginUnexpectedError'
)

const mockSuccess = (account?: any): void => HTTPHelper.mockOK(
  'POST',
  path,
  account || {},
  'loginSuccess'
)

const populateForm = (): void => {
  cy.getByName('email').focus().type(faker.internet.email())
  cy.getByName('password').focus().type(faker.internet.password(5))
}

const simulateValidSubmit = (): void => {
  populateForm()
  cy.get('button[type="submit"]').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    cy.getByName('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByName('password').should('have.attr', 'readOnly')
    cy.get('button[type="submit"]').should('be.disabled').should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show error state if form is invalid', () => {
    cy.getByName('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Campo inválido')
    cy.getByName('password').focus().type(faker.internet.password(3))
    FormHelper.testInputStatus('password', 'Campo inválido')
    cy.get('button[type="submit"]').should('be.disabled').should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show valid state if form is valid', () => {
    cy.getByName('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByName('password').focus().type(faker.internet.password(5))
    FormHelper.testInputStatus('password')
    cy.get('button[type="submit"]').should('not.be.disabled').should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show InvalidCredentialError if status code is 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Credenciais inválidas')
    Helper.testUrl('/login')
  })

  it('Should save account in localStorage', () => {
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
    Helper.testUrl('/login')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateForm()
    cy.get('button[type="submit"]').click()
    cy.wait('@loginSuccess')
    cy.get('button[type="submit"]').click({ force: true })
    Helper.testHttpCallsCount(1, 'loginSuccess')
  })

  it('Should not submit if form is invalid', () => {
    mockSuccess()
    cy.getByName('email').focus().type(faker.internet.email()).type('{enter}')
    Helper.testHttpCallsCount(0, 'loginSuccess')
  })
})
