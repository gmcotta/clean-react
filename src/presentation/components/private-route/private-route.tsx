import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute: FC = () => {
  return <Navigate to="/login" />
}

export default PrivateRoute
