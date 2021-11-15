import { AxiosError } from 'axios'
import { Publication } from '../@types/profile'
import { api } from '../config/api'

class PublicationService {
  async publish(token: string, payload: FormData) {
    try {
      const { data } = await api.post<Publication>('publications', payload, {
        headers: {
          authorization: `bearer ${token}`
        }
      })

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message)
    }
  }

  async fetchAllPublications(token: string) {
    try {
      const { data } = await api.get<Publication[]>('publications', {
        headers: {
          authorization: `bearer ${token}`
        }
      })

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message)
    }
  }
}

export default new PublicationService()
