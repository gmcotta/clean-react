import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (fieldValue: string): Error {
    return new RequiredFieldError()
  }
}
