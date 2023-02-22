import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { currentAccountState } from '@/presentation/store'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const navigate = useNavigate()

  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login')
  }
}
