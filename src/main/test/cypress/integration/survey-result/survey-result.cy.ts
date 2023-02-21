import * as Helpers from '../../utils/helpers'
import * as HTTPHelper from '../../utils/http-mocks'

const path = /surveys\/any_id\/results/

const mockLoadSuccess = (surveyResult?: any): void => HTTPHelper.mockOK(
  'GET',
  path,
  surveyResult || {},
  'surveyResultAccessSuccess'
)

describe('SurveyResult', () => {
  describe('load', () => {
    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helpers.setLocalStorageItem('account', account)
      })
    })

    const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
      'GET',
      path,
      'surveyResultUnexpectedError'
    )

    const mockAccessDeniedError = (): void => HTTPHelper.mockForbiddenError(
      'GET',
      path,
      'surveyResultAccessDeniedError'
    )

    it('Should show error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
    })

    it('Should reload on button click', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
      cy.fixture('survey-result').then(result => {
        mockLoadSuccess(result)
        cy.getByTestId('reload').click()
        cy.getByTestId('question').should('exist')
      })
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helpers.testUrl('/login')
    })

    it('Should show survey result', () => {
      cy.fixture('survey-result').then(result => {
        mockLoadSuccess(result)
        cy.visit('/surveys/any_id')
        cy.getByTestId('day').should('have.text', '20')
        cy.getByTestId('month').should('have.text', 'fev')
        cy.getByTestId('year').should('have.text', '2023')
        cy.getByTestId('question').should('have.text', 'Pergunta')
        cy.get('li:nth-child(1)').then(li => {
          assert.equal(
            li.find('[data-testid="image"]').attr('src'),
            'https://picsum.photos/200'
          )
          assert.equal(li.find('[data-testid="answer"]').text(), 'Sim')
          assert.equal(li.find('[data-testid="percent"]').text(), '51%')
        })
        cy.get('li:nth-child(2)').then(li => {
          assert.notExists(li.find('[data-testid="image"]'))
          assert.equal(li.find('[data-testid="answer"]').text(), 'Não')
          assert.equal(li.find('[data-testid="percent"]').text(), '49%')
        })
      })
    })

    it('Should go back to SurveyList when back button is clicked', () => {
      cy.fixture('survey-result').then(result => {
        cy.visit('/')
        mockLoadSuccess(result)
        cy.visit('/surveys/any_id')
        cy.getByTestId('back-button').click()
        Helpers.testUrl('/')
      })
    })
  })

  describe('save', () => {
    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helpers.setLocalStorageItem('account', account)
      })
      cy.fixture('survey-result').then(result => {
        mockLoadSuccess(result)
        cy.visit('/surveys/any_id')
      })
    })

    const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
      'PUT',
      path,
      'surveyResultSaveUnexpectedError'
    )

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Aconteceu algo de errado. Tente novamente mais tarde.')
    })
  })
})
