import { FieldValidationSpy } from '@/validation/validators/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationSpies)
  return {
    sut,
    fieldValidationSpies
  }
}

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const { sut, fieldValidationSpies } = makeSut()
    fieldValidationSpies[0].error = Error('first_error_message')
    fieldValidationSpies[1].error = Error('second_error_message')
    const error = sut.validate('any_field', 'anyValue')
    expect(error).toBe('first_error_message')
  })
})
