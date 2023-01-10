import React, { FC } from 'react'

import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import { SurveyItem, SurveyItemEmpty } from './components'

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItem />
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
