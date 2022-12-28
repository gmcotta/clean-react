import { faker } from '@faker-js/faker'
import * as HTTPHelper from '../../support/http-mocks'

export const mockInvalidCredentialsError = (): void => HTTPHelper.mockInvalidCredentialsError(
  'http://localhost:5050/api/login',
  'loginInvalidCredentials'
)

export const mockUnexpectedError = (): void => HTTPHelper.mockUnexpectedError(
  'POST',
  'http://localhost:5050/api/login',
  'loginUnexpectedError'
)

export const mockOK = (accessToken = faker.datatype.uuid()): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/login',
  {
    accessToken
  },
  'loginSuccess'
)

export const mockInvalidResponse = (): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/login',
  {
    invalid: faker.random.word()
  },
  'loginInvalidResponse'
)
