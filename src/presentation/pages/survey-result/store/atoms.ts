import { atom } from 'recoil'

import { LoadSurveyResult } from '@/domain/usecases'

export const surveyResultState = atom({
  key: 'surveyResultState',
  default: {
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  }
})

export const surveyResultOnAnswerState = atom({
  key: 'surveyResultOnAnswerState',
  default: {
    onAnswer: null as (answer: string) => void
  }
})
