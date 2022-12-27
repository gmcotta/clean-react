import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly fieldName: string, private readonly minLength: number) {}
  validate (input: object): Error {
    return input[this.fieldName]?.length < this.minLength ? new InvalidFieldError() : null
  }
}
