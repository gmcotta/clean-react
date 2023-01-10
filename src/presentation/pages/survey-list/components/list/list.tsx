import React, { FC, useContext } from 'react'

import { SurveyModel } from '@/domain/models'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '..'
import Styles from './list-styles.scss'

const SurveyList: FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.surveyListWrapper} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default SurveyList
