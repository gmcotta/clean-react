import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup as MakeSignup } from '@/main/factories/pages/signup/signup-factory'
import { APIContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'
import { SurveyList } from '@/presentation/pages'

const Router: FC = () => {
  return (
    <APIContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignup />} />
          <Route path="/" element={
            <PrivateRoute>
              <SurveyList />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export default Router
