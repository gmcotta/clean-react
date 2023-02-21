import React, { FC } from 'react'

import { Spinner } from '@/presentation/components'

import Styles from './loading-styles.scss'

const Loading: FC = () => {
  return (
    <div data-testid="loading" className={Styles.loadingWrapper}>
      <div className={Styles.loading}>
        <p>Aguarde...</p>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading
