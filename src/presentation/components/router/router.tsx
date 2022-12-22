import React, { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

type RouterProps = {
  Login: FC
}

const Router: FC<RouterProps> = ({ Login }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<div>Sign up</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
