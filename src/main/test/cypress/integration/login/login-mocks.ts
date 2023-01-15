import { faker } from '@faker-js/faker'
import * as HTTPHelper from '../../support/http-mocks'

export const mockInvalidCredentialsError = (): void => HTTPHelper.mockUnauthorizedError(
  'http://localhost:5050/api/login',
  'loginInvalidCredentials'
)

export const mockUnexpectedError = (): void => HTTPHelper.mockServerError(
  'POST',
  'http://localhost:5050/api/login',
  'loginUnexpectedError'
)

export const mockOK = (account = { accessToken: faker.datatype.uuid(), name: faker.name.firstName() }): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/login',
  {
    accessToken: account.accessToken,
    name: account.name
  },
  'loginSuccess'
)
