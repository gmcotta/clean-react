import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { Login } from '@/presentation/pages'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Login
            validation={ { validate: () => '' } }
            authentication={{ auth: async () => await Promise.resolve({ accessToken: '' }) }}
          />
        }/>
        <Route path="/signup" element={<div>Sign up</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
