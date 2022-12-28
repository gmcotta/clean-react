/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByAriaLabel('email-error-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')
    cy.getByAriaLabel('password-error-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.text', '🔴')
    cy.get('button[type="submit"]')
      .should('be.disabled')
      .should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children()
      .should('have.length', 0)
  })
})
