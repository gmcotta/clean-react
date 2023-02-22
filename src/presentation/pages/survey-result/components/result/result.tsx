import React, { FC, useEffect, useState } from 'react'
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
  const [buttonClicked, setButtonClicked] = useState(false)

  useEffect(() => {
    if (!buttonClicked) return
    setButtonClicked(false)
    navigate('/')
  }, [buttonClicked])

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrapper} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answerList}>
        {surveyResult.answers.map(answer => (
          <SurveyResultDataAnswer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button
        className={Styles.button}
        data-testid="back-button"
        onClick={() => { setButtonClicked(true) }}
      >
        Voltar
      </button>
    </>
  )
}

export default Result
