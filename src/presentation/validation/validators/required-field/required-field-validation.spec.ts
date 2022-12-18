import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '@/presentation/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (fieldName: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(fieldName)
}

describe('RequiredFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const sut = makeSut('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return false if field is valid', () => {
    const sut = makeSut('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
