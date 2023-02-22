import React, { FC } from 'react'

import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'

type Props = {
  state: any
}

const FormStatusBase: FC<Props> = ({ state }) => {
  return (
    <div aria-label='form-status' className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {state.mainError && <span aria-label='main-error' className={Styles.error}>{state.mainError}</span>}
    </div>
  )
}

export default FormStatusBase
