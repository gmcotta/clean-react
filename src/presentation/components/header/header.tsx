import React, { FC, memo } from 'react'
import Logo from '../logo/logo'

import Styles from './header-styles.scss'

const Header: FC = () => {
  return (
    <header className={Styles.headerWrapper}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrapper}>
            <span>Gustavo</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
