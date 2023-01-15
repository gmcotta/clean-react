import React, { FC, useContext } from 'react'
import { SurveyContext } from '..'

import Styles from './error-styles.scss'

const Error: FC = () => {
  const { state, setState } = useContext(SurveyContext)
  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWapper}>
      <span data-testid="error">{state.error}</span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </div>
  )
}

export default Error
