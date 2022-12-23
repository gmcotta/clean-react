import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Context from '@/presentation/contexts/form/form-context'
import Input from './input'

const makeSut = (): void => {
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" placeholder="test" />
    </Context.Provider>
  )
}

describe('<Input />', () => {
  it('Should begin with readOnly', () => {
    makeSut()
    const input = screen.getByPlaceholderText('test')
    expect(input).toHaveAttribute('readOnly', '')
  })

  it('Should remove readOnly when Input is focused', () => {
    makeSut()
    const input = screen.getByPlaceholderText('test')
    fireEvent.focus(input)
    expect(input).not.toHaveAttribute('readOnly')
  })
})
