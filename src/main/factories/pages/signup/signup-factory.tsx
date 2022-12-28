import React, { FC } from 'react'

import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'

export const makeSignup: FC = () => {
  const remoteAddAccount = makeRemoteAddAccount()
  const validation = makeSignupValidation()
  const localSaveAccessToken = makeLocalSaveAccessToken()
  return (
    <Signup
      addAccount={remoteAddAccount}
      validation={validation}
      saveAccessToken={localSaveAccessToken}
    />
  )
}