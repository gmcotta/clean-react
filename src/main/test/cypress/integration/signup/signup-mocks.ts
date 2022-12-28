import * as HTTPHelper from '../../support/http-mocks'

export const mockEmailInUseError = (): void => HTTPHelper.mockEmailInUseError(
  'http://localhost:5050/api/signup',
  'loginEmailInUse'
)
