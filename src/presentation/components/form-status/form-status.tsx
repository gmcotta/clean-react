import React, { FC, useContext } from 'react'

import Spinner from '@/presentation/components/spinner/spinner'
import FormContext from '@/presentation/contexts/form/form-context'
import Styles from './form-status-styles.scss'

const FormStatus: FC = () => {
  const { state, errorState } = useContext(FormContext)
  return (
    <div aria-label='Status do formulário' className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.mainError && <span className={Styles.error}>{errorState.mainError}</span>}
    </div>
  )
}

export default FormStatus
