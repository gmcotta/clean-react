import React, { FC } from 'react'

import { SpinnerProps } from './props'
import Styles from './spinner-styles.scss'

const Spinner: FC<SpinnerProps> = ({ isNegative, ...props }) => {
  const negativeClass = isNegative ? Styles.negative : ''
  return (
    <div aria-label='spinner' {...props} className={[Styles.spinner, props.className, negativeClass].join(' ')}>
      <div></div><div></div><div></div><div></div>
    </div>
  )
}
export default Spinner
