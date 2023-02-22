import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { FormStatusBase } from '@/presentation/components'
import { signupState } from '@/presentation/pages/signup/store'

const FormStatus: FC = () => {
  const [state] = useRecoilState(signupState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
