import { Icon, IconName } from '@/presentation/components'
import React, { FC } from 'react'

import Styles from './survey-item-styles.scss'

const SurveyItem: FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbDown} className={Styles.iconWrapper} />
        <time>
          <span className={Styles.day}>29</span>
          <span className={Styles.month}>12</span>
          <span className={Styles.year}>2022</span>
        </time>
        <p>Qual é o seu framework favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
