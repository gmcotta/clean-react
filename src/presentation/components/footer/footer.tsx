import React, { FC, memo } from 'react'

import Styles from './footer-styles.scss'

const Footer: FC = () => {
  return (
    <footer className={Styles.footer}></footer>
  )
}

export default memo(Footer)
