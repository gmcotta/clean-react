const BASE_URL = Cypress.config().baseUrl

export const testInputStatus = (fieldName: string, errorMessage?: string): void => {
  cy.getByAriaLabel(`${fieldName}-wrapper`)
    .should('have.attr', 'data-status', errorMessage ? 'invalid' : 'valid')

  const attr = `${errorMessage ? '' : 'not.'}have.attr`
  cy.getByName(fieldName).should(attr, 'title', errorMessage)
  cy.getByAriaLabel(`${fieldName}-label`).should(attr, 'title', errorMessage)
}

export const testMainError = (errorMessage: string): void => {
  cy.getByAriaLabel('spinner').should('not.exist')
  cy.getByAriaLabel('main-error').should('have.text', errorMessage)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@loginSuccess.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${BASE_URL}${path}`)
}

export const testLocalStorageItem = (key: string, value: string): void => {
  cy.window().then(window => assert.equal(value, window.localStorage.getItem(key)))
}
