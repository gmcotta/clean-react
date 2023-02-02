import React, { FC } from 'react'

import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'

export const makeSurveyList: FC = () => {
  return (
      <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
  )
}
