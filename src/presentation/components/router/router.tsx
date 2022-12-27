import { Signup } from '@/presentation/pages'
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
        <Route path="/signup" element={
          <Signup
            addAccount={{ add: () => null }}
            validation={{ validate: () => null }}
            saveAccessToken={{ save: () => null }}
          />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
