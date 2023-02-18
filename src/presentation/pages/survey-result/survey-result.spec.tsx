import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render, screen } from '@testing-library/react'

import { mockAccountModel } from '@/domain/test'
import { APIContext } from '@/presentation/contexts'
import SurveyResult from './survey-result'

const makeSut = (): void => {
  const history = createMemoryHistory({ initialEntries: ['/surveys'] })

  render(
    <APIContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult />|
      </Router>
    </APIContext.Provider>
  )
}

describe('SurveyResult', () => {
  it('Should show correct initial stage', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
})
