import React, { FC, memo } from 'react'

import Logo from '@/presentation/components/logo/logo'
import Styles from './login-header-styles.scss'

const LoginHeader: FC = () => {
  return (
    <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
  )
}

export default memo(LoginHeader)
