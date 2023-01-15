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
