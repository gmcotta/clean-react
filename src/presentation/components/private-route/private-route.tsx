import React, { FC, ReactElement, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { APIContext } from '@/presentation/contexts'

type PrivateRouteProps = {
  children: ReactElement
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { getCurrentAccount } = useContext(APIContext)
  return getCurrentAccount()?.accessToken ? children : <Navigate to="/login" />
}

export default PrivateRoute
