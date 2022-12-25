import React, { FC } from 'react'

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: FC = () => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validation = makeLoginValidation()
  const localSaveAccessToken = makeLocalSaveAccessToken()
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validation}
      saveAccessToken={localSaveAccessToken}
    />
  )
}
