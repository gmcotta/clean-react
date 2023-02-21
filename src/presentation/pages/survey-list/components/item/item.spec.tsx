import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from '@remix-run/router'

import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

import SurveyItem from './item'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router location={history.location} navigator={history}>
      <SurveyItem survey={survey} />
    </Router>
  )

  return { history }
}

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2023-01-11T00:00:00')
    })
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day').textContent).toBe('11')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2023')
  })

  it('Should render with thumb down icon and day with leading zero', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    })
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day').textContent).toBe('03')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year').textContent).toBe('2019')
  })

  it('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
