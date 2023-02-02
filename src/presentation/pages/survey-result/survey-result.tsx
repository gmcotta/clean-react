import React, { FC } from 'react'
import FlipMove from 'react-flip-move'

import { Footer, Header, Spinner } from '@/presentation/components'

import Styles from './survey-result-styles.scss'

const SurveyResult: FC = () => {
  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div className={Styles.contentWrapper}>
        <h2>Qual é o seu framework web favorito?</h2>
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
        <div className={Styles.loadingWrapper}>
          <div className={Styles.loading}>
            <p>Aguarde...</p>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
