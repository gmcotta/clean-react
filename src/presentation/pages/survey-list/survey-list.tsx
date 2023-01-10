import React, { FC, useEffect, useState } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })
  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }))
  }, [])

  return (
    <div className={Styles.surveyListWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        {state.error
          ? (
            <div>
              <span data-testid="error">{state.error}</span>
            </div>
            )
          : (
            <ul data-testid="survey-list">
              {state.surveys.length
                ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />)
                : <SurveyItemEmpty />
              }
            </ul>
            )
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
