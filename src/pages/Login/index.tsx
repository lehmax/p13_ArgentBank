import { FormEvent } from 'react'

import { Navigate } from 'react-router-dom'
import TextInput from '../../components/TextInput'
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
  const { isLoggedIn, error } = useAuth()
  const dispatch = useAppDispatch()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const isValid = form.checkValidity()
    form.classList.add('submitted')

    if (isValid) {
      const email = form.username.value.trim()
      const password = form.password.value.trim()
      const persist = form['remember-me'].checked

      dispatch(authenticateUser({ email, password, persist }))
    }
  }

  return isLoggedIn ? (
    <Navigate to="/profile" replace={true} />
  ) : (
    <form noValidate onSubmit={onSubmit}>
      <TextInput
        type="email"
        id="username"
        name="username"
        label="Username (email)"
        required
      />
      <TextInput
        type="password"
        id="password"
        label="Password"
        name="password"
        required
      />

      {error && <div className="error-message">{error}</div>}
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
    </form>
  )
}

export default Login
