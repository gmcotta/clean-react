import React, { FC } from 'react'

import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty } from './components'
import Styles from './survey-list-styles.scss'

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
