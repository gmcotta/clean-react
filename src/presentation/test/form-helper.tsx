import { screen } from '@testing-library/react'

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
