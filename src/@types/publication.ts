export type Publication = {
  author: {
    avatar: {
      url: string
    } | null
    id: string
    name: string
  }
  created_at: string
  image_url: string | null
  image_public_id: string | null
  subtitle: string | null
}
