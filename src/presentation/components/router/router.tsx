import React, { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  }
])

const Router: FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
