import { FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../../features/auth/authSlice'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

const Profile = () => {
  return (
    <main className="main bg-dark">
      <UserProvider>
        <Accounts />
      </UserProvider>
    </main>
  )
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) return

    const getProfile = async () => {
      try {
        const response = await api().fetchProfile(token)

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
    <>
      <div className="header">
        <UserName />
      </div>
      {children}
    </>
  )
}

const UserName = () => {
  const { currentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit')

    setIsEditing(false)
  }

  return (
    <>
      <h1>
        Welcome back
        <br />
        {!isEditing && currentUser?.firstName + ' ' + currentUser?.firstName}
      </h1>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder={currentUser?.firstName}
              />
            </div>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder={currentUser?.lastName}
            />
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit Name
        </button>
      )}
    </>
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
