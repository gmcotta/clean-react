import React, { FC } from 'react'
import FlipMove from 'react-flip-move'

import { Calendar, Footer, Header, Loading } from '@/presentation/components'

import Styles from './survey-result-styles.scss'

const SurveyResult: FC = () => {
  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        {false &&
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
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
