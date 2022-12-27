import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

import { makeSignupValidation } from './signup-validation-factory'

describe('SignupValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toStrictEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().min(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().min(5).sameAs('password').build()
    ]))
  })
})
