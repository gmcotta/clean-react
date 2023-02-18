import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { render, screen, waitFor } from '@testing-library/react'

import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'
import { APIContext } from '@/presentation/contexts'
import SurveyResult from './survey-result'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/surveys'] })
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.survey = surveyResult
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

  it('Shoud show SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2023-02-18T00:00:00')
    })
    makeSut(surveyResult)
    await waitFor(() => {
      expect(screen.getByTestId('day').textContent).toBe('18')
      expect(screen.getByTestId('month').textContent).toBe('fev')
      expect(screen.getByTestId('year').textContent).toBe('2023')
      expect(screen.getByTestId('question').textContent).toBe(surveyResult.question)
      expect(screen.getByTestId('answers').childElementCount).toBe(2)
      const images = screen.queryAllByTestId('image')
      expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
      expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
      expect(images[1]).toBeFalsy()
      const answers = screen.queryAllByTestId('answer')
      expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
      expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
      const percentages = screen.queryAllByTestId('percent')
      expect(percentages[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
      expect(percentages[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
      const activeAnswers = screen.queryAllByTestId('answer-wrapper')
      expect(activeAnswers[0]).toHaveClass('active')
      expect(activeAnswers[1]).not.toHaveClass('active')
    })
  })
})