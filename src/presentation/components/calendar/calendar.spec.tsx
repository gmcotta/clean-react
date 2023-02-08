import React from 'react'
import { render, screen } from '@testing-library/react'

import Calendar from './calendar'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar', () => {
  it('Should render with correct values', () => {
    const date = new Date('2023-01-11T00:00:00')
    makeSut(date)

    expect(screen.getByTestId('day').textContent).toBe('11')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2023')
  })

  it('Should render with correct values when day has leading zero', () => {
    const date = new Date('2023-01-02T00:00:00')
    makeSut(date)

    expect(screen.getByTestId('day').textContent).toBe('02')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2023')
  })
})
