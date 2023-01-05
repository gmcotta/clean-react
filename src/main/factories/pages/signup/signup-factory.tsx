import React, { FC } from 'react'

import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'

export const makeSignup: FC = () => {
  const remoteAddAccount = makeRemoteAddAccount()
  const validation = makeSignupValidation()
  const localUpdateCurrentAccount = makeLocalUpdateCurrentAccount()
  return (
    <Signup
      addAccount={remoteAddAccount}
      validation={validation}
      updateCurrentAccount={localUpdateCurrentAccount}
    />
  )
}
