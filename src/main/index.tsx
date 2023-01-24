import React from 'react'
import { createRoot } from 'react-dom/client'

import Router from '@/main/routes/router'
import '@/presentation/styles/global.scss'

const root = createRoot(document.querySelector('#main'))

root.render(
  <Router />
)
