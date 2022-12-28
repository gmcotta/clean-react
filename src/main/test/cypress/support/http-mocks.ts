import { faker } from '@faker-js/faker'

export const mockInvalidCredentialsError = (url: RegExp | string, alias: string): void => {
  cy.intercept({
    method: 'POST',
    url
  }, {
    body: {
      body: faker.random.word()
    },
    statusCode: 401
  }).as(alias)
}

export const mockEmailInUseError = (url: RegExp | string, alias: string): void => {
  cy.intercept({
    method: 'POST',
    url
  }, {
    body: {
      body: faker.random.word()
    },
    statusCode: 403
  }).as(alias)
}

export const mockUnexpectedError = (method: 'POST' | 'GET', url: RegExp | string, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    body: {
      body: faker.random.word()
    },
    statusCode: faker.helpers.arrayElement([400, 404, 500])
  }).as(alias)
}

export const mockOK = (method: 'POST' | 'GET', url: RegExp | string, body: any, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    body,
    statusCode: 200
  }).as(alias)
}
