import React, { FC, FocusEvent } from 'react'

import Styles from './input-styles.scss'
import { InputProps } from './props'

const Input: FC<InputProps> = (props) => {
  const enableInput = (event: FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Input
