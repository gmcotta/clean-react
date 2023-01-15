import { faker } from '@faker-js/faker'
import * as HTTPHelper from '../../support/http-mocks'

export const mockEmailInUseError = (): void => HTTPHelper.mockEmailInUseError(
  'http://localhost:5050/api/signup',
  'signupEmailInUse'
)

export const mockOK = (account = { accessToken: faker.datatype.uuid(), name: faker.name.firstName() }): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/signup',
  {
    accessToken: account.accessToken,
    name: account.name
  },
  'signupSuccess'
)

export const mockUnexpectedError = (): void => HTTPHelper.mockUnexpectedError(
  'POST',
  'http://localhost:5050/api/signup',
  'signupUnexpectedError'
)

export const mockInvalidResponse = (): void => HTTPHelper.mockOK(
  'POST',
  'http://localhost:5050/api/signup',
  {
    invalid: faker.random.word()
  },
  'signupInvalidResponse'
)
