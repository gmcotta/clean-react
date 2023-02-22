import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { FormStatusBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/store'

const FormStatus: FC = () => {
  const [state] = useRecoilState(loginState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
