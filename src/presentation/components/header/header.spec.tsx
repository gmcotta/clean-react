import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'

import { APIContext } from '@/presentation/contexts'
import Header from './header'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
      <APIContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </APIContext.Provider>
  )

  return {
    history,
    setCurrentAccountMock
  }
}

describe('<Header />', () => {
  it('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
