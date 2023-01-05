import React, { FC } from 'react'

import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'

export const makeSignup: FC = () => {
  const remoteAddAccount = makeRemoteAddAccount()
  const validation = makeSignupValidation()
  return (
    <Signup
      addAccount={remoteAddAccount}
      validation={validation}
    />
  )
}
