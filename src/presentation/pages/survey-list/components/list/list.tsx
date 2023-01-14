import React, { FC, useContext } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './list-styles.scss'

const SurveyList: FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.surveyListWrapper} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default SurveyList
