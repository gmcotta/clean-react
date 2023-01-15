import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccessDeniedError } from '@/domain/errors'
import { APIContext } from '@/presentation/contexts'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const { setCurrentAccount } = useContext(APIContext)
  const navigate = useNavigate()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login')
    } else {
      callback(error)
    }
  }
}
