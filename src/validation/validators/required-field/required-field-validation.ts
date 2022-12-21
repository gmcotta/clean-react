import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (fieldValue: string): Error | null {
    return fieldValue ? null : new RequiredFieldError()
  }
}
