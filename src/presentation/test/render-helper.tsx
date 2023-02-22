import { render } from '@testing-library/react'
import React, { FC } from 'react'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { MemoryHistory } from '@remix-run/router'

import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/store'

type Params = {
  Page: FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: Authentication.Model) => void
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    getCurrentAccount: () => account,
    setCurrentAccount: setCurrentAccountMock
  }

  render(
      <RecoilRoot initializeState={({ set }) => {
        set(currentAccountState, mockedState)
      }}>
          <Router location={history.location} navigator={history}>
            <Page />
          </Router>
      </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
