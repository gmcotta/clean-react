import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/form-context'

import Styles from './signup-styles.scss'

const Signup: FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state: {} }}>
        <form role="form" className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder='Digite seu nome' />
          <Input type="email" name="email" placeholder='Digite seu e-mail' />
          <Input type="password" name="password" placeholder='Digite sua senha' />
          <Input type="password" name="passwordConfirmation" placeholder='Confirme sua senha' />
          <button className={Styles.submit} type="submit">Entrar</button>
          <Link to="/login" className={Styles.link}>Voltar para Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Signup
