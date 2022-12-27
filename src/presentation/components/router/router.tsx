import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

type RouterFactories = {
  Login: FC
  Signup: FC
}

const Router: FC<RouterFactories> = (factories) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<factories.Login />} />
        <Route path="/signup" element={<factories.Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
