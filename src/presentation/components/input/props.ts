import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = DetailedHTMLProps<InputHTMLAttributes <HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}
