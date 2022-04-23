export interface CreatePostDTO {
  id: string
  content: string
  description: string
  title: string
  ogCover: string
  urlPath: string | null
  publisherId: string
  contributorsIds: string[]
}
