import { FieldValidation } from '@/presentation/validation/protocols'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly fieldName: string, private readonly minLength: number) {}
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
