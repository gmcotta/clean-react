import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  it('Should return error if comparation is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(10),
      [fieldToCompare]: faker.random.alphaNumeric(9)
    })
    expect(error).toStrictEqual(new InvalidFieldError())
  })

  it('Should return falsy if comparation is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const valueToCompare = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: valueToCompare,
      [fieldToCompare]: valueToCompare
    })
    expect(error).toBeFalsy()
  })
})
