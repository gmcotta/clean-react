import React, { FC, Fragment } from 'react'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'

import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import { SurveyResultDataAnswer } from '@/presentation/pages/survey-result/components'
import Styles from './result-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: FC<Props> = ({ surveyResult }) => {
  const navigate = useNavigate()

  const handleBack = (): void => {
    navigate(-1)
  }

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrapper} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answerList}>
        {surveyResult.answers.map(answer => (
          <Fragment key={answer.answer}>
            <SurveyResultDataAnswer answer={answer} />
          </Fragment>
        ))}
      </FlipMove>
      <button className={Styles.button} data-testid="back-button" onClick={handleBack}>Voltar</button>
    </>
  )
}

export default Result
