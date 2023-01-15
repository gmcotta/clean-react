import { APIContext } from '@/presentation/contexts'
import React, { FC, memo, MouseEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../logo/logo'

import Styles from './header-styles.scss'

const Header: FC = () => {
  const { getCurrentAccount, setCurrentAccount } = useContext(APIContext)
  const navigate = useNavigate()

  const logout = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    navigate('/login')
  }

  return (
    <header className={Styles.headerWrapper}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrapper}>
            <span data-testid="username">{getCurrentAccount().name}</span>
            <a data-testid="logout" href="#" onClick={logout}>Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
