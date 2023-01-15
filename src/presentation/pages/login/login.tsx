import React, { FC, FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { FormContext, APIContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './login-styles.scss'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login: FC<LoginProps> = ({ validation, authentication }) => {
  const { setCurrentAccount } = useContext(APIContext)
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const emailError = validation.validate('email', state)
    const passwordError = validation.validate('password', state)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      navigate('/', { replace: true })
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.loginWrapper}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form role="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <SubmitButton>Entrar</SubmitButton>
          <Link to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
