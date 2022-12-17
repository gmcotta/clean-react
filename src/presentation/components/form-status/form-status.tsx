import React, { FC, useContext } from 'react'

import Spinner from '@/presentation/components/spinner/spinner'
import FormContext from '@/presentation/contexts/form/form-context'
import Styles from './form-status-styles.scss'

const FormStatus: FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)
  return (
    <div aria-label='Status do formulário' className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
