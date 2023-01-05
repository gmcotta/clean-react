import React, { FC } from 'react'

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: FC = () => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validation = makeLoginValidation()
  const localUpdateCurrentAccount = makeLocalUpdateCurrentAccount()
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validation}
      updateCurrentAccount={localUpdateCurrentAccount}
    />
  )
}
