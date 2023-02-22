import React, { ReactElement } from 'react'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'

import { mockAccountModel } from '@/domain/test'
import { renderWithHistory } from '@/presentation/test'

import PrivateRoute from './private-route'

type SutTypes = {
  history: MemoryHistory
}

const Page = (): ReactElement => {
  return (<div>page</div>)
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  renderWithHistory({
    history,
    account,
    Page: () => (
      <PrivateRoute>
          <Page />
        </PrivateRoute>
    )
  })

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
