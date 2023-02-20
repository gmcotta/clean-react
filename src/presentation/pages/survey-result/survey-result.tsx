import React, { FC, useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'

import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'

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
  const navigate = useNavigate()

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

  const handleBack = (): void => {
    navigate(-1)
  }

  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrapper}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWrapper} />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answerList}>
              {state.surveyResult.answers.map(answer => (
                <li data-testid="answer-wrapper" key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
                  {!!answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                  <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                  <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
                </li>
              ))}
            </FlipMove>
            <button data-testid="back-button" onClick={handleBack}>Voltar</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
