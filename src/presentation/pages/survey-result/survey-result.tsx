import React, { FC, useEffect, useState } from 'react'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
import { SurveyResultAnswerContext } from '@/presentation/pages/survey-result/contexts'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
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

  const onAnswer = (answer: string): void => {
    setState(oldValue => ({ ...oldValue, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }

  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <SurveyResultAnswerContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrapper}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultAnswerContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
