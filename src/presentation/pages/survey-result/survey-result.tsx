import React, { FC, useEffect, useState } from 'react'

import { LoadSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: FC<Props> = ({ loadSurveyResult }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(oldValue => ({
      ...oldValue,
      surveyResult: null,
      error: error.message
    }))
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(survey => setState(oldValue => ({
        ...oldValue,
        surveyResult: survey
      })))
      .catch(handleError)
  }, [state.reload])

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
