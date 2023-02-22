import React, { FC, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { Authentication } from '@/domain/usecases'
import { Footer, LoginHeader } from '@/presentation/components'
import { FormStatus, Input, SubmitButton } from '@/presentation/pages/login/components'
import { loginState } from '@/presentation/pages/login/store'
import { Validation } from '@/presentation/protocols/validation'
import { currentAccountState } from '@/presentation/store'

import Styles from './login-styles.scss'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login: FC<LoginProps> = ({ validation, authentication }) => {
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const navigate = useNavigate()
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => {
    resetLoginState()
  }, [])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  const validate = (field: string): void => {
    const error = validation.validate(field, state)
    setState(prevState => ({ ...prevState, [`${field}Error`]: error }))
    setState(prevState => ({
      ...prevState,
      isFormInvalid: !!prevState.emailError || !!prevState.passwordError
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(prevState => ({ ...prevState, isLoading: true }))
      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      navigate('/', { replace: true })
    } catch (error) {
      setState(prevState => ({ ...prevState, isLoading: false, mainError: error.message }))
    }
  }

  return (
    <div className={Styles.loginWrapper}>
      <LoginHeader />
      <form role="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder='Digite seu e-mail' />
        <Input type="password" name="password" placeholder='Digite sua senha' />
        <SubmitButton>Entrar</SubmitButton>
        <Link to="/signup" className={Styles.link}>Criar conta</Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
