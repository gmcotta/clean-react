import React, { FC } from 'react'

import { Footer, Header, Icon, IconName } from '@/presentation/components'
import Styles from './survey-list-styles.scss'

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
