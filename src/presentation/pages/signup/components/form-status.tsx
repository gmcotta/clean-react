import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'
import { signupState } from '@/presentation/pages/signup/store'

const FormStatus: FC = () => {
  const state = useRecoilValue(signupState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
