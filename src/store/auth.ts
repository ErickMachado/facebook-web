import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { Profile } from '../@types/profile'
import AuthService from '../services/auth'

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
    async logout() {
      Cookies.remove('facebook:token')
      this.$reset()

      return true
    },
    async register(payload: RegisterPayload) {
      try {
        await AuthService.register(payload)

        return true
      } catch (error) {
        throw new Error((error as Error).message)
      }
    },
    async fetchProfileData() {
      try {
        const token = Cookies.get('facebook:token')

        if (!token) throw new Error('Unauthorized')

        const profile = await AuthService.fetchProfileData(token)

        this.SET_PROFILE(profile)
      } catch (error) {
        return Promise.reject()
      }
    },
    SET_PROFILE(profile: Profile) {
      this.profile = profile
    }
  }
})

export default useAuth
