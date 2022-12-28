import { faker } from '@faker-js/faker'
import * as HTTPHelper from '../../support/http-mocks'

export const mockEmailInUseError = (): void => HTTPHelper.mockEmailInUseError(
  'http://localhost:5050/api/signup',
  'loginEmailInUse'
)

export const mockOK = (accessToken = faker.datatype.uuid()): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/signup',
  {
    accessToken
  },
  'loginSuccess'
)

export const mockUnexpectedError = (): void => HTTPHelper.mockUnexpectedError(
  'POST',
  'http://localhost:5050/api/signup',
  'loginUnexpectedError'
)
