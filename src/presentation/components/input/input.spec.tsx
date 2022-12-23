import React from 'react'
import { render, screen } from '@testing-library/react'
import Context from '@/presentation/contexts/form/form-context'
import Input from './input'

describe('<Input />', () => {
  it('Should begin with readOnly', () => {
    render(<Context.Provider value={{ state: {} }}><Input name="field" placeholder="test" /></Context.Provider>)
    const input = screen.getByPlaceholderText('test')
    expect(input).toHaveAttribute('readOnly', '')
  })
})
