import React, { FC } from 'react'

import { SurveyResultAnswerModel } from '@/domain/models'
import Styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: FC<Props> = ({ answer }) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
  return (
    <li
      data-testid="answer-wrapper"
      className={[Styles.answerWrapper, activeClassName].join(' ')}
    >
      {!!answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
