import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters'
import {
  makeSurveyList as MakeSurveyList,
  makeLogin as MakeLogin,
  makeSignup as MakeSignup,
  makeSurveyResult as MakeSurveyResult
} from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { APIContext } from '@/presentation/contexts'

const Router: FC = () => {
  return (
    <RecoilRoot>
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
              }
            />
            <Route
              path="/surveys/:id"
              element={
                <PrivateRoute>
                  <MakeSurveyResult />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </APIContext.Provider>
    </RecoilRoot>
  )
}

export default Router
