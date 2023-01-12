import React, { FC } from 'react'

import { makeSignupValidation } from '@/main/factories/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { Signup } from '@/presentation/pages'

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
