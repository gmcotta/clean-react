import React, { FC } from 'react'

import { SpinnerProps } from './props'
import Styles from './spinner-styles.scss'

const Spinner: FC<SpinnerProps> = (props) => {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(' ')}><div></div><div></div><div></div><div></div></div>
  )
}
export default Spinner
