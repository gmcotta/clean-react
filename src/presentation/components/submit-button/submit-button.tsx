import React, { FC, ReactNode } from 'react'

type SubmitButtonProps = {
  children: ReactNode
  state: any
}

const SubmitButtonBase: FC<SubmitButtonProps> = ({ children, state }) => {
  return (
    <button type="submit" disabled={state.isFormInvalid}>
      {children}
    </button>
  )
}

export default SubmitButtonBase
