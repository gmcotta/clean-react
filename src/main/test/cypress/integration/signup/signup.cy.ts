import { faker } from '@faker-js/faker'
import * as FormHelper from '../../support/form-helper'

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
})
