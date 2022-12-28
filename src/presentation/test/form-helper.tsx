import { fireEvent, screen } from '@testing-library/react'

export const testChildCount = (labelText: string, count: number): void => {
  const errorWrap = screen.getByLabelText(labelText)
  expect(errorWrap.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (buttonText: string, isDisabled = true): void => {
  const button = screen.getByRole<HTMLButtonElement>('button', { name: buttonText })
  expect(button.disabled).toBe(isDisabled)
}

export const testElementTitle = (labelText: string, message: string): void => {
  const fieldErrorStatus = screen.getByLabelText(labelText)
  expect(fieldErrorStatus.title).toBe(message)
}

export const populateField = (labelText: string, value: string): void => {
  const input = screen.getByLabelText(labelText)
  fireEvent.input(input, { target: { value } })
}

export const testErrorStatus = (fieldName: string, errorMessage = ''): void => {
  const wrapper = screen.getByLabelText(`${fieldName}-wrapper`)
  const input = screen.getByLabelText(fieldName)
  const label = screen.getByLabelText(`${fieldName}-label`)
  expect(wrapper.getAttribute('data-status')).toBe(errorMessage ? 'invalid' : 'valid')
  expect(input.title).toBe(errorMessage)
  expect(label.title).toBe(errorMessage)
}

export const testElementExists = (labelText: string): void => {
  const element = screen.getByLabelText(labelText)
  expect(element).toBeTruthy()
}

export const testElementTextContent = (labelText: string, textContent: string): void => {
  const element = screen.getByLabelText(labelText)
  expect(element.textContent).toBe(textContent)
}
