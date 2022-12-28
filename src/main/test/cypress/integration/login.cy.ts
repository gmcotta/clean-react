/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

const baseUrl = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByAriaLabel('email-wrapper')
      .should('have.attr', 'data-status', 'invalid')

    cy.getByName('email')
      .should('have.attr', 'readOnly')
    cy.getByName('email')
      .should('have.attr', 'title', 'Campo obrigatório')
    cy.getByAriaLabel('email-label')
      .should('have.attr', 'title', 'Campo obrigatório')

    cy.getByName('password')
      .should('have.attr', 'readOnly')
    cy.getByName('password')
      .should('have.attr', 'title', 'Campo obrigatório')
    cy.getByAriaLabel('password-label')
      .should('have.attr', 'title', 'Campo obrigatório')

    cy.get('button[type="submit"]')
      .should('be.disabled')
      .should('have.text', 'Entrar')

    cy.getByAriaLabel('form-status').children()
      .should('have.length', 0)
  })

  it('Should show error state if form is invalid', () => {
    cy.getByName('email').focus().type(faker.random.word())
      .should('have.attr', 'title', 'Campo inválido')
    cy.getByAriaLabel('email-label')
      .should('have.attr', 'title', 'Campo inválido')
    cy.getByAriaLabel('email-wrapper')
      .should('have.attr', 'data-status', 'invalid')

    cy.getByName('password').focus().type(faker.internet.password(3))
      .should('have.attr', 'title', 'Campo inválido')
    cy.getByAriaLabel('password-label')
      .should('have.attr', 'title', 'Campo inválido')
    cy.getByAriaLabel('password-wrapper')
      .should('have.attr', 'data-status', 'invalid')

    cy.get('button[type="submit"]')
      .should('be.disabled')
      .should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children()
      .should('have.length', 0)
  })

  it('Should show valid state if form is valid', () => {
    cy.getByAriaLabel('email-wrapper')
      .should('have.attr', 'data-status', 'invalid')
    cy.getByName('email').focus().type(faker.internet.email())
      .should('not.have.attr', 'title')
    cy.getByAriaLabel('email-label')
      .should('not.have.attr', 'title')
    cy.getByAriaLabel('email-wrapper')
      .should('have.attr', 'data-status', 'valid')

    cy.getByAriaLabel('password-wrapper')
      .should('have.attr', 'data-status', 'invalid')
    cy.getByName('password').focus().type(faker.internet.password(5))
      .should('not.have.attr', 'title')
    cy.getByAriaLabel('password-label')
      .should('not.have.attr', 'title')
    cy.getByAriaLabel('password-wrapper')
      .should('have.attr', 'data-status', 'valid')

    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .should('have.text', 'Entrar')
    cy.getByAriaLabel('form-status').children()
      .should('have.length', 0)
  })

  it('Should show InvalidCredentialError if invalid credentials are provided', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5050/api/login'
    }, {
      body: {
        body: faker.random.word()
      },
      statusCode: 401
    }).as('loginFailure')

    cy.getByName('email').focus().type(faker.internet.email())
    cy.getByName('password').focus().type(faker.internet.password(5))
    cy.get('button[type="submit"]').click()
    cy.getByAriaLabel('form-status').within(() => {
      cy.getByAriaLabel('spinner').should('exist')
      cy.getByAriaLabel('main-error').should('not.exist')
      cy.getByAriaLabel('spinner').should('not.exist')
      cy.getByAriaLabel('main-error').should('have.text', 'Credenciais inválidas')
    })
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken in localStorage', () => {
    const accessToken = faker.datatype.uuid()
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5050/api/login'
    }, {
      body: {
        accessToken
      },
      statusCode: 200
    }).as('loginSuccess')

    cy.getByName('email').focus().type(faker.internet.email())
    cy.getByName('password').focus().type(faker.internet.password(5)).type('{enter}')
    cy.getByAriaLabel('form-status').within(() => {
      cy.getByAriaLabel('spinner').should('exist')
      cy.getByAriaLabel('main-error').should('not.exist')
      cy.getByAriaLabel('spinner').should('not.exist')
    })
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.equal(accessToken, window.localStorage.getItem('accessToken')))
  })

  it('Should show UnexpectedError for other errors', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5050/api/login'
    }, {
      body: {
        body: faker.random.word()
      },
      statusCode: 500
    }).as('loginFailure')

    cy.getByName('email').focus().type(faker.internet.email())
    cy.getByName('password').focus().type(faker.internet.password(5))
    cy.get('button[type="submit"]').click()
    cy.getByAriaLabel('form-status').within(() => {
      cy.getByAriaLabel('spinner').should('exist')
      cy.getByAriaLabel('main-error').should('not.exist')
      cy.getByAriaLabel('spinner').should('not.exist')
      cy.getByAriaLabel('main-error').should('have.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
    })
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should show UnexpectedError if invalid response is returned', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5050/api/login'
    }, {
      body: {
        invalid: faker.random.word()
      },
      statusCode: 200
    }).as('loginSuccess')

    cy.getByName('email').focus().type(faker.internet.email())
    cy.getByName('password').focus().type(faker.internet.password(5))
    cy.get('button[type="submit"]').click()
    cy.getByAriaLabel('form-status').within(() => {
      cy.getByAriaLabel('spinner').should('exist')
      cy.getByAriaLabel('main-error').should('not.exist')
      cy.getByAriaLabel('spinner').should('not.exist')
      cy.getByAriaLabel('main-error').should('have.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
    })
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should prevent multiple submits', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5050/api/login'
    }, {
      body: {
        invalid: faker.random.word()
      },
      statusCode: 200
    }).as('loginSuccess')

    cy.getByName('email').focus().type(faker.internet.email())
    cy.getByName('password').focus().type(faker.internet.password(5))
    cy.get('button[type="submit"]').dblclick()
    cy.get('@loginSuccess.all').should('have.length', 1)
  })

  it('Should not submit if form is invalid', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5050/api/login'
    }, {
      body: {
        invalid: faker.random.word()
      },
      statusCode: 200
    }).as('loginSuccess')

    cy.getByName('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@loginSuccess.all').should('have.length', 0)
  })
})
