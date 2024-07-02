import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../../features/auth/authSlice'
import { useAuth } from '../../hooks/useAuth'
import { fetchProfile } from '../../services/api'

const Profile = () => {
  const { token } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) return

    const getProfile = async () => {
      try {
        const response = await fetchProfile(token)

        if (response.status === 200) {
          dispatch(setUser(response.body))
        }
      } catch (error) {
        console.error(error)
      }
    }

    getProfile()
  }, [token])

  return (
    <main className="main bg-dark">
      <Name />
      <Accounts />
    </main>
  )
}

const Name = () => {
  const { currentUser } = useAuth()
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {currentUser?.firstName} {currentUser?.lastName}
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  )
}

const Accounts = () => {
  const accounts: Account[] = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance',
    },
  ]

  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account key={index} {...account} />
      ))}
    </>
  )
}

const Account = ({ title, amount, description }: AccountProps) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

interface Account {
  title: string
  amount: string
  description: string
}

interface AccountProps extends Account {}

export default Profile
