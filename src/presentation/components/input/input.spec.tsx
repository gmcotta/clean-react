import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import InputBase from './input'

const makeSut = (): void => {
  render(
    <InputBase
      type="text"
      name="field"
      placeholder="test"
      state={{}}
      setState={null}
    />
  )
}

describe('<Input />', () => {
  it('Should begin with readOnly', () => {
    makeSut()
    const input = screen.getByLabelText('field')
    expect(input).toHaveAttribute('readOnly', '')
  })

  it('Should remove readOnly when Input is focused', () => {
    makeSut()
    const input = screen.getByLabelText('field')
    fireEvent.focus(input)
    expect(input).not.toHaveAttribute('readOnly')
  })
})
