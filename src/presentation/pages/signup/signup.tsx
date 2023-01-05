import React, { FC, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './signup-styles.scss'

type SignupProps = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const Signup: FC<SignupProps> = ({ validation, addAccount, updateCurrentAccount }) => {
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
    const nameError = validation.validate('name', state)
    const emailError = validation.validate('email', state)
    const passwordError = validation.validate('password', state)
    const passwordConfirmationError = validation.validate('passwordConfirmation', state)
    const isFormInvalid = !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await updateCurrentAccount.save(account)
      navigate('/', { replace: true })
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
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
