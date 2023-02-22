import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'
import { RecoilRoot } from 'recoil'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/store'
import Header from './header'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }
  render(
      <RecoilRoot initializeState={({ set }) => {
        set(currentAccountState, mockedState)
      }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </RecoilRoot>
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

  it('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
