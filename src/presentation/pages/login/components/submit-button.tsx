import React, { FC, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/store'

type Props = {
  children: ReactNode
}

const SubmitButton: FC<Props> = ({ children }) => {
  const state = useRecoilValue(loginState)
  return (
    <SubmitButtonBase state={state}>{children}</SubmitButtonBase>
  )
}

export default SubmitButton
