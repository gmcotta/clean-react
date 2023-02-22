import React, { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { LoadSurveyList } from '@/domain/usecases'
import { Error, Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyList as List } from '@/presentation/pages/survey-list/components'
import { surveyListState } from '@/presentation/pages/survey-list/store'

import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(prevState => ({ ...prevState, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyListState)

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState(prevState => ({ ...prevState, surveys })) })
      .catch(error => { handleError(error) })
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({ surveys: [], error: '', reload: !old.reload }))
  }

  return (
    <div className={Styles.surveyListWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
          {state.error
            ? <Error error={state.error} reload={reload} />
            : <List surveys={state.surveys} />
          }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
