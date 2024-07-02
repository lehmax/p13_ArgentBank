const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

console.log('ENDPOINT', ENDPOINT)

export const authenticateUser = async (email: string, password: string) => {
  const response = await fetch(`${ENDPOINT}/user/login`, {
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

  if (!response.ok) {
    const error = await response.json()

    throw new Error(error.message)
  }

  return response.json()
}
