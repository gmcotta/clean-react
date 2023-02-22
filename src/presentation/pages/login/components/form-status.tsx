import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/store'

const FormStatus: FC = () => {
  const state = useRecoilValue(loginState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
