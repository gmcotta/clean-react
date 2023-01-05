import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup as MakeSignup } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<MakeSignup />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
