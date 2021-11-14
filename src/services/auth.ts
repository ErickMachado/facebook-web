import { AxiosError } from 'axios'
import { api } from '../config/api'
import { Profile } from '../@types/profile'

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  email: string
  name: string
  password: string
  username: string
}

class AuthService {
  async login(credentials: LoginPayload) {
    try {
      const payload = { ...credentials }
      const { data } = await api.post<{ token: string } & Profile>(
        'auth',
        payload
      )

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.error)
    }
  }

  async register(payload: RegisterPayload) {
    const redirectLink = import.meta.env.VITE_REDIRECT_LINK

    console.log(redirectLink)

    try {
      const { data } = await api.post('profiles', { ...payload, redirectLink })

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.error)
    }
  }

  async fetchProfileData(token: string) {
    try {
      const { data } = await api.get<Profile>('/auth', {
        headers: {
          authorization: `bearer ${token}`
        }
      })

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.error)
    }
  }
}

export default new AuthService()
