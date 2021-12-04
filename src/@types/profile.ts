export type Avatar = {
  url: string
}

export type Like = {
  author_id: string
  id: string
  publication_id: string
}

export type Comment = {
  author: {
    avatar: Avatar | null
    id: string
    name: string
  }
  created_at: string
  id: string
  publication_id: string
  text: string
}

export type Publication = {
  author: {
    avatar: Avatar
    id: string
    name: string
  }
  author_id: string
  comments: Comment[]
  created_at: string
  id: string
  image_url: string
  image_public_id: string
  likes: Like[]
  subtitle: string
}

export type Profile = {
  avatar: Avatar | null
  bio: string | null
  city: string | null
  created_at: string
  email: string
  id: string
  name: string
  publications: Publication[]
  username: string
}
