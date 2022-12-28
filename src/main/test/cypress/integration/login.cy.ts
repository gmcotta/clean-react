/// <reference types="cypress" />
// const { faker } = require('@faker-js/faker')
import { faker } from '@faker-js/faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByName('email')
      .should('have.attr', 'readOnly')
    cy.getByAriaLabel('email-error-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')

    cy.getByName('password')
      .should('have.attr', 'readOnly')
    cy.getByAriaLabel('password-error-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')

    cy.get('button[type="submit"]')
      .should('be.disabled')
      .should('have.text', 'Entrar')

    cy.getByAriaLabel('form-status').children()
      .should('have.length', 0)
  })

  it('Should show error state if form is invalid', () => {
    cy.getByName('email').focus().type(faker.random.word())
    cy.getByAriaLabel('email-error-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('have.text', '🔴')

    cy.getByName('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByAriaLabel('password-error-status')
      .should('have.attr', 'title', 'Campo inválido')
      .should('have.text', '🔴')

    cy.get('button[type="submit"]')
      .should('be.disabled')
      .should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children()
      .should('have.length', 0)
  })
})
