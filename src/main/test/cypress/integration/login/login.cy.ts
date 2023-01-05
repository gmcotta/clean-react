import { faker } from '@faker-js/faker'

import * as HTTPMock from './login-mocks'
import * as FormHelper from '../../support/form-helper'

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
    HTTPMock.mockInvalidCredentialsError()

    simulateValidSubmit()
    FormHelper.testMainError('Credenciais inválidas')
    FormHelper.testUrl('/login')
  })

  it('Should save account in localStorage', () => {
    const account = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName()
    }
    HTTPMock.mockOK(account)

    simulateValidSubmit()
    cy.getByAriaLabel('spinner').should('exist')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('account', JSON.stringify(account))
  })

  it('Should show UnexpectedError for other errors', () => {
    HTTPMock.mockUnexpectedError()

    simulateValidSubmit()
    FormHelper.testMainError('Aconteceu algo de errado. Tente novamente mais tarde.')
    FormHelper.testUrl('/login')
  })

  // TODO: ajustar esse teste
  it.skip('Should show UnexpectedError if invalid response is returned', () => {
    HTTPMock.mockInvalidResponse()

    simulateValidSubmit()
    FormHelper.testMainError('Aconteceu algo de errado. Tente novamente mais tarde.')
    FormHelper.testUrl('/login')
  })

  it('Should prevent multiple submits', () => {
    HTTPMock.mockOK()

    populateForm()
    cy.get('button[type="submit"]').dblclick()
    FormHelper.testHttpCallsCount(1, 'loginSuccess')
  })

  it('Should not submit if form is invalid', () => {
    HTTPMock.mockOK()

    cy.getByName('email').focus().type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0, 'loginSuccess')
  })
})
