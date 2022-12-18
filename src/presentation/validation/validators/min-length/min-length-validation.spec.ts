import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/presentation/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (fieldName: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(fieldName, minLength)
}

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut('field', 5)
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if value is valid', () => {
    const sut = makeSut('field', 5)
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
