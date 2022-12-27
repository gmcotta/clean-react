import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (fieldName: string): EmailValidation => {
  return new EmailValidation(fieldName)
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut('email')
    const error = sut.validate({ email: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut('email')
    const error = sut.validate({ email: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const sut = makeSut('email')
    const error = sut.validate({ email: '' })
    expect(error).toBeFalsy()
  })
})
