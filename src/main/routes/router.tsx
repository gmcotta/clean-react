import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import {
  makeSurveyList as MakeSurveyList,
  makeLogin as MakeLogin,
  makeSignup as MakeSignup
} from '@/main/factories/pages'
import { APIContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'

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
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MakeSurveyList />
              </PrivateRoute>
            } />
        </Routes>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export default Router
