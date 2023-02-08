import React, { FC } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Calendar, Icon, IconName } from '@/presentation/components'
import Styles from './item-styles.scss'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrapper} />
        <Calendar date={survey.date} className={Styles.calendarWrapper} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer className={Styles.itemFooter}>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
