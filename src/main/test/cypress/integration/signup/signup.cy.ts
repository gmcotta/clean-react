import { faker } from '@faker-js/faker'

import * as HTTPMock from '../signup/signup-mocks'
import * as Helpers from '../../support/helpers'
import * as FormHelpers from '../../support/form-helpers'

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
    FormHelpers.testInputStatus('name', 'Campo obrigatório')
    cy.getByName('name').should('have.attr', 'readOnly')

    FormHelpers.testInputStatus('email', 'Campo obrigatório')
    cy.getByName('email').should('have.attr', 'readOnly')

    FormHelpers.testInputStatus('password', 'Campo obrigatório')
    cy.getByName('password').should('have.attr', 'readOnly')

    FormHelpers.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByName('passwordConfirmation').should('have.attr', 'readOnly')

    cy.get('button[type="submit"]').should('be.disabled').should('have.text', 'Cadastrar')

    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show error state if form is invalid', () => {
    cy.getByName('name').focus().type(faker.random.alphaNumeric(4))
    FormHelpers.testInputStatus('name', 'Campo inválido')

    cy.getByName('email').focus().type(faker.random.word())
    FormHelpers.testInputStatus('email', 'Campo inválido')

    cy.getByName('password').focus().type(faker.internet.password(3))
    FormHelpers.testInputStatus('password', 'Campo inválido')

    cy.getByName('passwordConfirmation').focus().type(faker.internet.password(4))
    FormHelpers.testInputStatus('passwordConfirmation', 'Campo inválido')

    cy.get('button[type="submit"]').should('be.disabled').should('have.text', 'Cadastrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show valid state if form is valid', () => {
    cy.getByName('name').focus().type(faker.name.fullName())
    FormHelpers.testInputStatus('name')

    cy.getByName('email').focus().type(faker.internet.email())
    FormHelpers.testInputStatus('email')

    const password = faker.internet.password()
    cy.getByName('password').focus().type(password)
    FormHelpers.testInputStatus('password')

    cy.getByName('passwordConfirmation').focus().type(password)
    FormHelpers.testInputStatus('passwordConfirmation')

    cy.get('button[type="submit"]').should('not.be.disabled').should('have.text', 'Cadastrar')
    cy.getByAriaLabel('form-status').children().should('have.length', 0)
  })

  it('Should show EmailInUseError if status code is 403', () => {
    HTTPMock.mockEmailInUseError()

    simulateValidSubmit()
    FormHelpers.testMainError('E-mail já está em uso')
    Helpers.testUrl('/signup')
  })

  it('Should save accessToken in localStorage', () => {
    const account = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.firstName()
    }
    HTTPMock.mockOK(account)

    simulateValidSubmit()
    cy.getByAriaLabel('spinner').should('exist')
    Helpers.testUrl('/')
    Helpers.testLocalStorageItem('account', JSON.stringify(account))
  })

  it('Should show UnexpectedError for other errors', () => {
    HTTPMock.mockUnexpectedError()

    simulateValidSubmit()
    FormHelpers.testMainError('Aconteceu algo de errado. Tente novamente mais tarde.')
    Helpers.testUrl('/signup')
  })

  it('Should prevent multiple submits', () => {
    HTTPMock.mockOK()

    populateForm()
    cy.get('button[type="submit"]').dblclick()
    Helpers.testHttpCallsCount(1, 'signupSuccess')
  })

  it('Should not submit if form is invalid', () => {
    HTTPMock.mockOK()

    cy.getByName('email').focus().type(faker.internet.email()).type('{enter}')
    Helpers.testHttpCallsCount(0, 'signupSuccess')
  })
})
