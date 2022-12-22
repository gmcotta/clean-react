import { EmailValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation('any_field')])
  })

  it('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toStrictEqual([new EmailValidation('any_field')])
  })
})
