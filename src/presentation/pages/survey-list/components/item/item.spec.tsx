import React from 'react'
import { render, screen } from '@testing-library/react'
import SurveyItem from './item'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('Should render with thumb down icon', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
