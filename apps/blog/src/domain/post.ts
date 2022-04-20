interface PostUser {
  id: string
  email: string
  createdAt: string
}

export interface Post {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  publisher: PostUser
  contributors: PostUser[]
  viewersCount: number
}
