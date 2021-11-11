import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { Profile } from '../@types/profile'
import AuthService from '../services/auth'

type LoginPayload = {
  email: string
  password: string
}

const useAuth = defineStore('auth', {
  state: () => ({
    profile: {
      avatar: null,
      bio: null,
      city: null,
      created_at: '',
      email: '',
      id: '',
      name: '',
      publications: [],
      username: ''
    } as Profile
  }),
  actions: {
    async login(credentials: LoginPayload) {
      try {
        const { token, ...profile } = await AuthService.login(credentials)

        Cookies.set('facebook:token', token)

        this.SET_PROFILE(profile)
      } catch (error) {
        throw new Error((error as Error).message)
      }
    },
    SET_PROFILE(profile: Profile) {
      this.profile = profile
    }
  }
})

export default useAuth
