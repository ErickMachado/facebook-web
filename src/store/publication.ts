import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { Comment, Publication } from '../@types/profile'
import PublicationService from '../services/publication'

type CreateCommentPayload = {
  publication_id: string
  text: string
}

const usePublication = defineStore('publication', {
  actions: {
    async comment(payload: CreateCommentPayload) {
      const token = Cookies.get('facebook:token')

      if (!token) throw new Error('Unauthorized')

      try {
        const comment = await PublicationService.comment(token, payload)

        this.APPEND_COMMENT(comment)
      } catch (error) {
        throw new Error((error as Error).message)
      }
    },
    async publish(payload: FormData) {
      try {
        const token = Cookies.get('facebook:token')

        if (!token) throw new Error('Unauthorized')

        const publication = await PublicationService.publish(token, payload)

        this.APPEND_PUBLICATION(publication)
      } catch (error) {
        throw new Error((error as Error).message)
      }
    },
    async fetchAllPublications() {
      const token = Cookies.get('facebook:token')

      if (!token) throw new Error('Unauthorized')

      const publications = await PublicationService.fetchAllPublications(token)

      this.SET_PUBLICATIONS(publications)
    },
    APPEND_PUBLICATION(publication: Publication) {
      this.$patch(({ publications }) => publications.unshift(publication))
    },
    APPEND_COMMENT(comment: Comment) {
      this.$patch(({ publications }) => {
        const publication = publications.find(
          ({ id }) => id === comment.publication_id
        )

        if (!publication) return

        publication.comments.push(comment)
      })
    },
    SET_PUBLICATIONS(publications: Publication[]) {
      this.$state.publications = publications
    }
  },
  getters: {
    getPublications: (state) => state.publications
  },
  state: () => ({
    publications: [] as Publication[]
  })
})

export default usePublication
