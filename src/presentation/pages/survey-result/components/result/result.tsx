import React, { FC, Fragment } from 'react'
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

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrapper} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answerList}>
        {surveyResult.answers.map(answer => (
          <Fragment key={answer.answer}>
            <SurveyResultDataAnswer answer={answer} />
          </Fragment>
        ))}
      </ul>
      <button
        className={Styles.button}
        data-testid="back-button"
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </>
  )
}

export default Result
