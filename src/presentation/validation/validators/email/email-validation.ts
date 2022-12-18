import { FieldValidation } from '@/presentation/validation/protocols'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}
  validate (value: string): InvalidFieldError {
    return new InvalidFieldError()
  }
}
