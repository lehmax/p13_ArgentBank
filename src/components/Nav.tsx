import { NavLink } from 'react-router-dom'

import Logo from '../assets/argentBankLogo.png'
import { useAuth } from '../hooks/useAuth'

export const Nav = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <AuthButton />
      </div>
    </nav>
  )
}

const AuthButton = () => {
  const { isLoggedIn, logout, currentUser } = useAuth()

  return isLoggedIn ? (
    <>
      {currentUser?.firstName ? (
        <NavLink to="/profile" className="main-nav-item">
          <i className="fa fa-user-circle" />
          {currentUser.firstName}
        </NavLink>
      ) : null}
      <button onClick={logout} className="main-nav-item">
        <i className="fa fa-sign-out"></i>
        Sign out
      </button>
    </>
  ) : (
    <NavLink to="/login" className="main-nav-item">
      <i className="fa fa-user-circle"></i>
      Sign in
    </NavLink>
  )
}
