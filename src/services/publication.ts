import { AxiosError } from 'axios'
import { Comment, Publication } from '../@types/profile'
import { Like } from '../@types/publication'
import { api } from '../config/api'

type CreateCommentPayload = {
  publication_id: string
  text: string
}

type LikePayload = {
  author_id: string
  publication_id: string
}

class PublicationService {
  async comment(token: string, payload: CreateCommentPayload) {
    try {
      const { data } = await api.post<Comment>('comments', payload, {
        headers: {
          authorization: `bearer ${token}`
        }
      })

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message)
    }
  }

  async like(token: string, { author_id, publication_id }: LikePayload) {
    try {
      const { data } = await api.post<Like[]>(
        `likes/${publication_id}`,
        author_id,
        {
          headers: {
            authorization: `bearer ${token}`
          }
        }
      )

      return data
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message)
    }
  }

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
