import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { APIContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'

import SurveyResult from './survey-result'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys'],
    initialIndex: 1
  })
  const setCurrentAccountMock = jest.fn()
  render(
    <APIContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />|
      </Router>
    </APIContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock
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
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2023-02-18T00:00:00')
    })
    loadSurveyResultSpy.survey = surveyResult
    makeSut(loadSurveyResultSpy)

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

  it('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut(loadSurveyResultSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('question')).not.toBeInTheDocument()
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
    })
  })

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new AccessDeniedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    const { history, setCurrentAccountMock } = makeSut(loadSurveyResultSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    })
    expect(history.location.pathname).toBe('/login')
  })

  it('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut(loadSurveyResultSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
    })
    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('Should go to SurveyList when back button is clicked', async () => {
    const { history } = makeSut()
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('back-button'))
    })
    expect(history.location.pathname).toBe('/')
  })
})
