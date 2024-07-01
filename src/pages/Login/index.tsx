import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login as loginAction } from '../../features/auth/userSlice'
import { login } from '../../services/api'
import { RootState } from '../../store'

const Login = () => {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form />
      </section>
    </main>
  )
}

const Form = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.currentTarget
    const email = target.username.value
    const password = target.password.value
    const rememberMe = target['remember-me'].checked

    const handleLogin = async () => {
      try {
        const response = await login(email, password)

        if (response.status === 200) {
          const { token } = response.body

          dispatch(loginAction(token))

          if (rememberMe) {
            localStorage.setItem('sessionToken', token)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    handleLogin()
  }

  return (
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
