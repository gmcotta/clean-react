import * as HTTPHelper from '../../support/http-mocks'

export const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
  'GET',
  /surveys/,
  'surveyListUnexpectedError'
)

export const mockAccessDeniedError = (): void => HTTPHelper.mockForbiddenError(
  'GET',
  /surveys/,
  'surveyListAccessDeniedError'
)
