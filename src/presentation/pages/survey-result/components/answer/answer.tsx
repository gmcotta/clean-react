import React, { FC, MouseEvent, useContext } from 'react'

import { SurveyResultAnswerModel } from '@/domain/models'
import { SurveyResultAnswerContext } from '@/presentation/pages/survey-result/contexts'

import Styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: FC<Props> = ({ answer }) => {
  const { onAnswer } = useContext(SurveyResultAnswerContext)
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
  const handleAnswerClick = (event: MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }
    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrapper"
      className={[Styles.answerWrapper, activeClassName].join(' ')}
      onClick={handleAnswerClick}
    >
      {!!answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
