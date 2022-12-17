import FormContext from '@/presentation/contexts/form/form-context'
import React, { FC, FocusEvent, useContext } from 'react'

import Styles from './input-styles.scss'
import { InputProps } from './props'

const Input: FC<InputProps> = (props) => {
  const { errorState } = useContext(FormContext)
  const errorMessage = errorState[props.name]

  const enableInput = (event: FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getAriaLabel = (): string => {
    return `${props.name}-error-status`
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return errorMessage
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span title={getTitle()} aria-label={getAriaLabel()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
