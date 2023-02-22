import React, { FC, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
import { surveyResultState, surveyResultOnAnswerState } from '@/presentation/pages/survey-result/store'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(surveyResultOnAnswerState)

  const handleError = useErrorHandler((error: Error) => {
    setState(oldValue => ({
      ...oldValue,
      surveyResult: null,
      error: error.message,
      isLoading: false
    }))
  })

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(oldValue => ({ ...oldValue, surveyResult })) })
      .catch(handleError)
  }, [state.reload])

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return
    setState(oldValue => ({ ...oldValue, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => { setState(oldValue => ({ ...oldValue, isLoading: false, surveyResult })) })
      .catch(handleError)
  }

  const reload = (): void => {
    setState(oldvalue => ({
      surveyResult: null,
      error: '',
      reload: !oldvalue.reload,
      isLoading: false
    }))
  }

  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrapper}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
