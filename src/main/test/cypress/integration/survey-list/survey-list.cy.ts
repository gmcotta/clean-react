import * as Helpers from '../../utils/helpers'
import * as HTTPHelper from '../../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
  'GET',
  path,
  'surveyListUnexpectedError'
)

const mockAccessDeniedError = (): void => HTTPHelper.mockForbiddenError(
  'GET',
  path,
  'surveyListAccessDeniedError'
)

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helpers.setLocalStorageItem('account', account)
    })
  })

  it('Should show error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/')
    Helpers.testUrl('/login')
  })

  it('Should show correct username on header', () => {
    mockUnexpectedError()
    cy.visit('/')
    const { name } = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout when logout link is clicked', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('logout').click()
    Helpers.testUrl('/login')
  })
})
