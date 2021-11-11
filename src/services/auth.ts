import { AxiosError } from 'axios'
import { api } from '../config/api'
import { Profile } from '../@types/profile'

type LoginPayload = {
  email: string
  password: string
}

class AuthService {
  async login(credentials: LoginPayload) {
    const redirectLink = import.meta.env.VUE_APP_REDIRECT_URL

    try {
      const payload = { ...credentials, redirectLink }
      const { data } = await api.post<{ token: string } & Profile>(
        'auth',
        payload
      )

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.error)
    }
  }
}

export default new AuthService()
