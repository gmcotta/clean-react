import React, { ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'
import { render } from '@testing-library/react'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { APIContext } from '@/presentation/contexts'

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

  render(
    <APIContext.Provider
      value={{
        getCurrentAccount: getCurrentAccountMock,
        setCurrentAccount: setCurrentAccountMock
      }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute>
          <Page />
        </PrivateRoute>
      </Router>
    </APIContext.Provider>
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
