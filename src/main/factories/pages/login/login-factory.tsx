import React, { FC } from 'react'

import { makeLoginValidation } from '@/main/factories/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { Login } from '@/presentation/pages'

export const makeLogin: FC = () => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validation = makeLoginValidation()
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validation}
    />
  )
}
