import { RequiredFieldError } from '@/presentation/validation/errors'
import { FieldValidation } from '@/presentation/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (fieldValue: string): Error | null {
    return fieldValue ? null : new RequiredFieldError()
  }
}
