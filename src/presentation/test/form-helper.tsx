import { fireEvent, screen } from '@testing-library/react'

export const populateField = (labelText: string, value: string): void => {
  const input = screen.getByLabelText(labelText)
  fireEvent.input(input, { target: { value } })
}

export const testErrorStatus = (fieldName: string, errorMessage = ''): void => {
  const wrapper = screen.getByLabelText(`${fieldName}-wrapper`)
  const input = screen.getByLabelText(fieldName)
  const label = screen.getByLabelText(`${fieldName}-label`)
  expect(wrapper).toHaveAttribute('data-status', errorMessage ? 'invalid' : 'valid')
  expect(input).toHaveProperty('title', errorMessage)
  expect(label).toHaveProperty('title', errorMessage)
}
