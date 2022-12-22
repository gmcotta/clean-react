import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/pages/login/login-factory'

ReactDOM.render(
  <Router Login={makeLogin} />,
  document.querySelector('#main')
)
