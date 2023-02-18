import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render, screen, waitFor } from '@testing-library/react'

import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'
import { APIContext } from '@/presentation/contexts'
import SurveyResult from './survey-result'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/surveys'] })
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <APIContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />|
      </Router>
    </APIContext.Provider>
  )
  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult', () => {
  it('Should show correct initial stage', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  it('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
