import { FieldValidation } from '@/presentation/validation/protocols'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}
  validate (value: string): InvalidFieldError {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(value) ? null : new InvalidFieldError()
  }
}
