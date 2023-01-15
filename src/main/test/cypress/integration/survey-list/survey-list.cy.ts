import { faker } from '@faker-js/faker'

import * as HTTPMock from './survey-list-mocks'
import * as Helpers from '../../support/helpers'

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', { name: faker.name.firstName(), accessToken: faker.datatype.uuid() })
  })

  it('Should show error on UnexpectedError', () => {
    HTTPMock.mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
  })

  it('Should logout on AccessDeniedError', () => {
    HTTPMock.mockAccessDeniedError()
    cy.visit('/')
    Helpers.testUrl('/login')
  })

  it('Should show correct username on header', () => {
    HTTPMock.mockUnexpectedError()
    cy.visit('/')
    const { name } = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })
})
