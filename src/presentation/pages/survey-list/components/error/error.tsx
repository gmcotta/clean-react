import React, { FC, useContext } from 'react'
import { SurveyContext } from '..'

const Error: FC = () => {
  const { state, setState } = useContext(SurveyContext)
  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </div>
  )
}

export default Error
