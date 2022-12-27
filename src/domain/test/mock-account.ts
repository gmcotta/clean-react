import { faker } from '@faker-js/faker'

import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '../models'
import { AddAccountParams } from '../usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
