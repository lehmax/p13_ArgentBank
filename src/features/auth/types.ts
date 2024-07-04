export interface Credentials {
  email: string
  password: string
}

export interface loginPayload extends Credentials {
  persist: boolean
}

export interface Person {
  firstName: string
  lastName: string
}

export interface User extends Person {
  id: number
  email: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  loggedIn: boolean
  token: string | null
  user: User | null
  persist: boolean
}
