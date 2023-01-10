import React, { FC, useContext } from 'react'
import { SurveyContext } from '..'

const Error: FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
