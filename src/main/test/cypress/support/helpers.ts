const BASE_URL = Cypress.config().baseUrl

export const testHttpCallsCount = (count: number, alias: string): void => {
  cy.get(`@${alias}.all`).should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${BASE_URL}${path}`)
}

export const testLocalStorageItem = (key: string, value: string): void => {
  cy.window().then(window => assert.equal(value, window.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
