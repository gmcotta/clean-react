import React, { FC, FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AddAccount } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { APIContext, FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './signup-styles.scss'

type SignupProps = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: FC<SignupProps> = ({ validation, addAccount }) => {
  const { setCurrentAccount } = useContext(APIContext)

  const navigate = useNavigate()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: 'Campo obrigatório'
  })

  useEffect(() => {
    validate('name')
  }, [state.name])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  useEffect(() => {
    validate('passwordConfirmation')
  }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const error = validation.validate(field, state)
    setState(prevState => ({ ...prevState, [`${field}Error`]: error }))
    setState(prevState => ({
      ...prevState,
      isFormInvalid: !!prevState.nameError ||
        !!prevState.emailError ||
        !!prevState.passwordError ||
        !!prevState.passwordConfirmationError
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(prevState => ({ ...prevState, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      navigate('/', { replace: true })
    } catch (error) {
      setState(prevState => ({ ...state, isLoading: false, mainError: error.message }))
    }
  }

  return (
    <div className={Styles.signupWrapper}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form role="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder='Digite seu nome' />
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <Input type="password" name="passwordConfirmation" placeholder='Confirme sua senha' />
          <SubmitButton>Cadastrar</SubmitButton>
          <Link to="/login" className={Styles.link}>Voltar para Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Signup
