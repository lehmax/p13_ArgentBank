const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

console.log('ENDPOINT', ENDPOINT)

const request = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)

  if (!response.ok) {
    const error = await response.json()

    throw new Error(error.message)
  }

  return response.json()
}

export const authenticateUser = (email: string, password: string) => {
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
}

export const fetchProfile = (token: string) => {
  return request(`${ENDPOINT}/user/profile`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
