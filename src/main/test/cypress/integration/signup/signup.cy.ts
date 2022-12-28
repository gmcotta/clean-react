import { faker } from '@faker-js/faker'

import * as HTTPMock from '../signup/signup-mocks'
import * as FormHelper from '../../support/form-helper'

const simulateValidSubmit = (): void => {
  cy.getByName('name').focus().type(faker.name.fullName())
  cy.getByName('email').focus().type(faker.internet.email())
  const password = faker.internet.password()
  cy.getByName('password').focus().type(password)
  cy.getByName('passwordConfirmation').focus().type(password)
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
    HTTPMock.mockEmailInUseError()

    simulateValidSubmit()
    FormHelper.testMainError('E-mail já está em uso')
    FormHelper.testUrl('/signup')
  })
})
