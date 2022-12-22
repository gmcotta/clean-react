import React, { FC } from 'react'

import RemoteAuthentication from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export const makeLogin: FC = () => {
  const url = 'http://localhost:3333/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validations = [
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ]
  const validationComposite = ValidationComposite.build(validations)
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
