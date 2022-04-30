export interface DraftUser {
  id: string
  email: string
  createdAt: string
  name: string
}

export interface Draft {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  title: string
  description?: string
  urlPath?: string
  creator: DraftUser
  contributors: DraftUser[]
}
