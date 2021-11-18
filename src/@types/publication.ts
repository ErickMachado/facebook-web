export type Comment = {
  author: {
    avatar: {
      url: string
    } | null
  }
  created_at: string
  id: string
  text: string
}

export type Like = {
  author_id: string
  id: string
  publication_id: string
}

export type Publication = {
  author: {
    avatar: {
      url: string
    } | null
    id: string
    name: string
  }
  created_at: string
  comments: Comment[]
  image_url: string | null
  image_public_id: string | null
  likes: Like[]
  subtitle: string | null
}
