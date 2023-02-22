import React, { FC, HTMLInputTypeAttribute } from 'react'
import { useRecoilState } from 'recoil'

import { InputBase } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/store'

type Props = {
  type: HTMLInputTypeAttribute
  name: string
  placeholder: string
}

const Input: FC<Props> = ({ type, name, placeholder }) => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input
