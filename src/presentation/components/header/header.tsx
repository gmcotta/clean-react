import React, { FC, memo, MouseEvent, useContext } from 'react'

import { Logo } from '@/presentation/components'
import { APIContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'

import Styles from './header-styles.scss'

const Header: FC = () => {
  const { getCurrentAccount } = useContext(APIContext)
  const logout = useLogout()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrapper}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrapper}>
            <span data-testid="username">{getCurrentAccount().name}</span>
            <a data-testid="logout" href="#" onClick={handleClick}>Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
