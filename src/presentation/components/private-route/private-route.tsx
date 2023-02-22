import React, { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { currentAccountState } from '@/presentation/store'

type PrivateRouteProps = {
  children: ReactElement
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()?.accessToken ? children : <Navigate to="/login" />
}

export default PrivateRoute
