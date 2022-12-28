import FormContext from '@/presentation/contexts/form/form-context'
import React, { ChangeEvent, FC, useContext } from 'react'

import Styles from './input-styles.scss'
import { InputProps } from './props'

const Input: FC<InputProps> = (props) => {
  const { state, setState } = useContext(FormContext)
  const errorMessage = state[`${props.name}Error`]

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        placeholder=" "
        readOnly
        onFocus={event => { event.target.readOnly = false }}
        onChange={handleChange}
        id={props.name}
        aria-label={props.name}
      />
      <label htmlFor={props.name}>{props.placeholder}</label>
      <span
        title={errorMessage || 'Tudo certo!'}
        aria-label={`${props.name}-error-status`}
        className={Styles.status}
      >
        {errorMessage ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
