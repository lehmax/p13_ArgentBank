import { FormEvent } from 'react'

import { Navigate } from 'react-router-dom'
import { authenticateUser } from '../../features/auth/authSlice'
import { useAppDispatch } from '../../hooks'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  )
}

const LoginForm = () => {
  const { isLoggedIn } = useAuth()
  const dispatch = useAppDispatch()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.currentTarget

    const email = target.username.value
    const password = target.password.value
    const persist = target['remember-me'].checked

    dispatch(authenticateUser({ email, password, persist }))
  }

  return isLoggedIn ? (
    <Navigate to="/profile" replace={true} />
  ) : (
    <form onSubmit={onSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
    </form>
  )
}

export default Login
