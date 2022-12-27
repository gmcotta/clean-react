import { faker } from '@faker-js/faker'

import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationSpies)
  return {
    sut,
    fieldValidationSpies
  }
}

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const errorMessage1 = faker.random.word()
    fieldValidationSpies[0].error = Error(errorMessage1)
    fieldValidationSpies[1].error = Error(faker.random.word())
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })
    expect(error).toBe(errorMessage1)
  })

  it('Should return falsy if there is no errors', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate('any_field', { [fieldName]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
