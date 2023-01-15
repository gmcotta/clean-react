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

export const mockOK = (account = { accessToken: faker.datatype.uuid(), name: faker.name.firstName() }): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/login',
  {
    accessToken: account.accessToken,
    name: account.name
  },
  'loginSuccess'
)

export const mockInvalidResponse = (): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/login',
  {
    invalid: faker.random.word(),
    invalid2: faker.random.words(2)
  },
  'loginInvalidResponse'
)
