import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './login'

describe('<Login />', () => {
  it('Should not render spinner and error message on start', () => {
    render(<Login />)
    const errorWrap = screen.getByLabelText('Status do formulário')
    expect(errorWrap.childElementCount).toBe(0)
  })

  it('Should render button disabled on start', () => {
    render(<Login />)
    const submitButton = screen.getByRole<HTMLButtonElement>('button', { name: /entrar/i })
    expect(submitButton.disabled).toBe(true)
  })
})
