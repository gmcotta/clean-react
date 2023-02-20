import * as Helpers from '../../utils/helpers'
import * as HTTPHelper from '../../utils/http-mocks'

const path = /surveys\/any_id\/results/
const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
  'GET',
  path,
  'surveyResultUnexpectedError'
)

// const mockAccessDeniedError = (): void => HTTPHelper.mockForbiddenError(
//   'GET',
//   path,
//   'surveyResultAccessDeniedError'
// )

// const mockSuccess = (surveyResult?: any): void => HTTPHelper.mockOK(
//   'GET',
//   path,
//   surveyResult || {},
//   'surveyResultAccessSuccess'
// )

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helpers.setLocalStorageItem('account', account)
    })
  })

  it('Should show error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id', { failOnStatusCode: false })
    cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
  })

  // it('Should reload on button click', () => {
  //   mockUnexpectedError()
  //   cy.visit('/surveys/any_id')
  //   cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
  //   cy.fixture('survey-list').then(list => {
  //     mockSuccess(list)
  //     cy.getByTestId('reload').click()
  //     cy.get('li:not(:empty)').should('have.length', 2)
  //   })
  // })

  // it('Should logout on AccessDeniedError', () => {
  //   // mockAccessDeniedError()
  //   cy.visit('/surveys/1')
  //   Helpers.testUrl('/login')
  // })

  // it('Should show correct username on header', () => {
  //   mockUnexpectedError()
  //   cy.visit('/surveys/any_id')
  //   const { name } = Helpers.getLocalStorageItem('account')
  //   cy.getByTestId('username').should('contain.text', name)
  // })

  // it('Should logout when logout link is clicked', () => {
  //   mockUnexpectedError()
  //   cy.visit('/surveys/any_id')
  //   cy.getByTestId('logout').click()
  //   Helpers.testUrl('/login')
  // })

  // it('Should show survey items', () => {
  //   cy.fixture('survey-result').then(list => {
  //     mockSuccess(list)
  //     cy.visit('/surveys/any_id')
  //     cy.get('li:empty').should('have.length', 4)
  //     cy.get('li:not(:empty)').should('have.length', 2)
  //     cy.get('li:first-child').then(li => {
  //       assert.equal(li.find('[data-testid="day"]').text(), '16')
  //       assert.equal(li.find('[data-testid="month"]').text(), 'jan')
  //       assert.equal(li.find('[data-testid="year"]').text(), '2023')
  //       assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
  //       cy.fixture('icons').then(icon => {
  //         assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
  //       })
  //     })
  //     cy.get('li:nth-child(2)').then(li => {
  //       assert.equal(li.find('[data-testid="day"]').text(), '09')
  //       assert.equal(li.find('[data-testid="month"]').text(), 'dez')
  //       assert.equal(li.find('[data-testid="year"]').text(), '2022')
  //       assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
  //       cy.fixture('icons').then(icon => {
  //         assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
  //       })
  //     })
  //   })
  // })
})
