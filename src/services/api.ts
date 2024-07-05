import { Person } from '../features/auth/types'

export const api = () => {
  const ENDPOINT = import.meta.env.VITE_API_ENDPOINT
  const request = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init)

    if (!response.ok) {
      const error = await response.json()

      throw new Error(error.message)
    }

    return response.json()
  }

  return {
    authenticateUser: (email: string, password: string) => {
      return request(`${ENDPOINT}/user/login`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
    },
    fetchProfile: (token: string) => {
      return request(`${ENDPOINT}/user/profile`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    },
    editProfile: (token: string, data: Person) => {
      return request(`${ENDPOINT}/user/profile`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
    },
  }
}
