import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { Publication } from '../@types/profile'
import PublicationService from '../services/publication'

const usePublication = defineStore('publication', {
  actions: {
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
      this.$patch((state) => state.publications.unshift(publication))
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
