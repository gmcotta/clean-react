import React, { FC, useContext } from 'react'

import Spinner from '@/presentation/components/spinner/spinner'
import FormContext from '@/presentation/contexts/form/form-context'
import Styles from './form-status-styles.scss'

const FormStatus: FC = () => {
  const { state } = useContext(FormContext)
  return (
    <div aria-label='form-status' className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {state.mainError && <span aria-label='main-error' className={Styles.error}>{state.mainError}</span>}
    </div>
  )
}

export default FormStatus
