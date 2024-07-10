import Cookies from 'js-cookie'

const SESSION_COOKIE_NAME = 'SESSION'

export const persistToken = (jwtPayload: string) => {
  const jwt = parseJwt(jwtPayload)

  if (!jwt?.exp) return

  const expires = new Date(jwt.exp * 1000)

  Cookies.set(SESSION_COOKIE_NAME, jwtPayload, { expires })
}

export const getToken = () => Cookies.get(SESSION_COOKIE_NAME)
export const removeToken = () => Cookies.remove(SESSION_COOKIE_NAME)

interface Jwt {
  exp: number
  iat: number
  [key: string]: unknown
}

/**
 * Returns a JS object representation of a Javascript Web Token from its common encoded
 * string form.
 */
const parseJwt = (token: string): Jwt | undefined => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return undefined
  }
}
