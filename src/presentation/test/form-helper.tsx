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

export const populateField = (placeholderText: string, value: string): void => {
  const input = screen.getByPlaceholderText(placeholderText)
  fireEvent.input(input, { target: { value } })
}

export const testErrorStatus = (fieldName: string, errorMessage: string, statusEmoji: string): void => {
  const passwordErrorStatus = screen.getByLabelText(`${fieldName}-error-status`)
  expect(passwordErrorStatus.title).toBe(errorMessage)
  expect(passwordErrorStatus.textContent).toBe(statusEmoji)
}

export const testElementExists = (labelText: string): void => {
  const element = screen.getByLabelText(labelText)
  expect(element).toBeTruthy()
}
