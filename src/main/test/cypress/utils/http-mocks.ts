import { faker } from '@faker-js/faker'

type HttpMethods = 'POST' | 'GET' | 'PUT'

export const mockUnauthorizedError = (url: RegExp | string, alias: string): void => {
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

export const mockForbiddenError = (method: HttpMethods, url: RegExp | string, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    body: {
      body: faker.random.word()
    },
    statusCode: 403
  }).as(alias)
}

export const mockServerError = (method: HttpMethods, url: RegExp | string, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    body: {
      error: faker.random.word()
    },
    statusCode: faker.helpers.arrayElement([400, 404, 500])
  }).as(alias)
}

export const mockOK = (method: HttpMethods, url: RegExp | string, body: any, alias: string): void => {
  cy.intercept({
    method,
    url
  }, {
    body,
    statusCode: 200
  }).as(alias)
}
