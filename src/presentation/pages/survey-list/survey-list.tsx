import { Logo, Footer } from '@/presentation/components'
import React, { FC } from 'react'

import Styles from './survey-list-styles.scss'

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrapper}>
      <header className={Styles.headerWrapper}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrapper}>
            <span>Gustavo</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>29</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>29</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>29</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>29</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>29</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>

        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
