import { FormEvent, useEffect, useState } from 'react'

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
  const { setCurrentUser } = useAuth()

  useEffect(() => {
    setCurrentUser()
  }, [])

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
  const { currentUser, token, setCurrentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const { firstName, lastName } = currentUser || {}
  const isName = firstName && lastName && !isEditing

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.currentTarget

    const firstName = target.firstName.value
    const lastName = target.lastName.value

    const save = async () => {
      if (!token) return

      try {
        const request = await api().editProfile(token, { firstName, lastName })

        if (request.status === 200) {
          setCurrentUser()
          setIsEditing(false)
        }
      } catch (error) {
        console.error(error)
      }
    }

    save()
  }

  return (
    <>
      <h1>
        Welcome back
        {isName && (
          <div>
            {firstName} {lastName}
          </div>
        )}
      </h1>
      {isEditing ? (
        <form className="edit-name" onSubmit={onSubmit}>
          <div className="fields">
            <div className="input-wrapper">
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder={currentUser?.firstName}
              />
            </div>
            <div className="input-wrapper">
              <label className="sr-only" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder={currentUser?.lastName}
              />
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="edit-button">
              Save
            </button>
            <button className="edit-button" onClick={() => setIsEditing(false)}>
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
