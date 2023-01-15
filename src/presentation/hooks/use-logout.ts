import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { APIContext } from '@/presentation/contexts'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(APIContext)
  const navigate = useNavigate()

  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login')
  }
}
