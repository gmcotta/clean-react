import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (input: object): Error | null {
    return input[this.fieldName] ? null : new RequiredFieldError()
  }
}
