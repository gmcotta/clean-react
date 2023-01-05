import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup as MakeSignup } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { APIContext } from '@/presentation/contexts'

const Router: FC = () => {
  return (
    <APIContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignup />} />
          <Route path="/" element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export default Router
