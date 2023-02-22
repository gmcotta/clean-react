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
import { currentAccountState } from '@/presentation/store'

const initialState = {
  setCurrentAccount: setCurrentAccountAdapter,
  getCurrentAccount: getCurrentAccountAdapter
}

const Router: FC = () => {
  return (
    <RecoilRoot initializeState={({ set }) => {
      set(currentAccountState, initialState)
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
    </RecoilRoot>
  )
}

export default Router
