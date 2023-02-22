import React, { ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/store'

import PrivateRoute from './private-route'

type SutTypes = {
  history: MemoryHistory
}

const Page = (): ReactElement => {
  return (<div>page</div>)
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const getCurrentAccountMock = (): AccountModel => account
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    getCurrentAccount: getCurrentAccountMock,
    setCurrentAccount: setCurrentAccountMock
  }
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(currentAccountState, mockedState)
      }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute>
          <Page />
        </PrivateRoute>
      </Router>
    </RecoilRoot>
  )
  return {
    history
  }
}

describe('PrivateRoute', () => {
  it('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
