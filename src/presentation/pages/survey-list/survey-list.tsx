import React, { FC, useEffect } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    (async () => {
      await loadSurveyList.loadAll()
    })()
  }, [])

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
