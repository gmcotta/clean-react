import React, { FC } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './list-styles.scss'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const SurveyList: FC<Props> = ({ surveys }) => {
  return (
    <ul className={Styles.surveyListWrapper} data-testid="survey-list">
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default SurveyList
