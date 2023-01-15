import React, { FC } from 'react'

import { PrivateRoute } from '@/presentation/components'
import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'

export const makeSurveyList: FC = () => {
  return (
    <PrivateRoute>
      <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
    </PrivateRoute>
  )
}
