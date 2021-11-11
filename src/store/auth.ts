import { defineStore } from 'pinia'
import AuthService from '../services/auth'

type LoginPayload = {
  email: string
  password: string
}

const useAuth = defineStore('auth', {
  actions: {
    async login(credentials: LoginPayload) {
      try {
        const profile = await AuthService.login(credentials)

        console.log(profile)
      } catch (error) {
        throw new Error((error as Error).message)
      }
    }
  }
})

export default useAuth
