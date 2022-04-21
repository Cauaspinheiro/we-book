interface PostUser {
  id: string
  email: string
  createdAt: string
  name: string
}

export interface Post {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  urlPath: string
  ogCover: string
  publisher: PostUser
  contributors: PostUser[]
  viewersCount: number
}
