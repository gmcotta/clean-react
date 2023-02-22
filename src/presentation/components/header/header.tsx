import React, { FC, memo, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import { Logo } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'
import { currentAccountState } from '@/presentation/store'

import Styles from './header-styles.scss'

const Header: FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
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
