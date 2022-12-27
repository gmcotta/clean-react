import { faker } from '@faker-js/faker'

import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)])
  })

  it('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toStrictEqual([new EmailValidation(field)])
  })

  it('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = Number(faker.random.numeric(2))
    const validations = sut.field(field).min(length).build()
    expect(validations).toStrictEqual([new MinLengthValidation(field, length)])
  })

  it('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toStrictEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  it('Should return a list of validations', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const length = Number(faker.random.numeric(2))
    const validations = sut.field(field).required().email().min(length).sameAs(fieldToCompare).build()
    expect(validations).toStrictEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, length),
      new CompareFieldsValidation(field, fieldToCompare)
    ])
  })
})
