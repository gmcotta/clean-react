import React, { FC, useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: FC<Props> = ({ loadSurveyResult }) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    suerveyResult: null as LoadSurveyResult.Model[]
  })

  useEffect(() => {
    loadSurveyResult.load()
  }, [])

  const reload = (): void => {}

  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrapper}>
        {state.suerveyResult &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrapper} />
              <h2>Qual é o seu framework web favorito?</h2>
            </hgroup>
            <FlipMove className={Styles.answerList}>
              <li>
                <img src="" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
