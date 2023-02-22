import React, { FC, ReactNode } from 'react'
import { useRecoilState } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'
import { signupState } from '@/presentation/pages/signup/store'

type Props = {
  children: ReactNode
}

const SubmitButton: FC<Props> = ({ children }) => {
  const [state] = useRecoilState(signupState)
  return (
    <SubmitButtonBase state={state}>{children}</SubmitButtonBase>
  )
}

export default SubmitButton
