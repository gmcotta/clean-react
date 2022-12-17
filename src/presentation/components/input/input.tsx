import FormContext from '@/presentation/contexts/form/form-context'
import React, { ChangeEvent, FC, FocusEvent, useContext } from 'react'

import Styles from './input-styles.scss'
import { InputProps } from './props'

const Input: FC<InputProps> = (props) => {
  const { state, setState } = useContext(FormContext)
  const errorMessage = state[`${props.name}Error`]

  const enableInput = (event: FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getAriaLabel = (): string => {
    return `${props.name}-error-status`
  }

  const getStatus = (): string => {
    return '🔴'
    // '🟢'
  }

  const getTitle = (): string => {
    return errorMessage
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} onChange={handleChange} />
      <span title={getTitle()} aria-label={getAriaLabel()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
