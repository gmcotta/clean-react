import { SurveyModel } from '@/domain/models'
import { Icon, IconName } from '@/presentation/components'
import React, { FC } from 'react'

import Styles from './survey-item-styles.scss'

type Props = {
  survey: SurveyModel
}

const SurveyItem: FC<Props> = ({ survey }) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={Styles.iconWrapper} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
