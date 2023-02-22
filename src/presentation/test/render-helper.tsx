import { render } from '@testing-library/react'
import React, { FC } from 'react'
import { RecoilRoot, RecoilState, MutableSnapshot } from 'recoil'
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
  states?: Array<{
    atom: RecoilState<any>
    value: any
  }>
}

type Result = {
  setCurrentAccountMock: (account: Authentication.Model) => void
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel(), states = [] }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    getCurrentAccount: () => account,
    setCurrentAccount: setCurrentAccountMock
  }

  const initializeStates = ({ set }: MutableSnapshot): void => {
    [
      ...states,
      { atom: currentAccountState, value: mockedState }
    ].forEach(state => { set(state.atom, state.value) })
  }

  render(
      <RecoilRoot initializeState={initializeStates}>
          <Router location={history.location} navigator={history}>
            <Page />
          </Router>
      </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
