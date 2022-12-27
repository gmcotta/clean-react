import React, { FC, ReactNode, useContext } from 'react'

import FormContext from '@/presentation/contexts/form/form-context'

type SubmitButtonProps = {
  children: ReactNode
}

const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  const { state } = useContext(FormContext)

  return (
    <button type="submit" disabled={state.isFormInvalid}>
      {children}
    </button>
  )
}

export default SubmitButton
