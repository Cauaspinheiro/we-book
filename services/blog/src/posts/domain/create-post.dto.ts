export interface CreatePostDTO {
  id: string
  content: string
  description: string
  title: string
  ogCover: string
  urlPath: string
  publisherId: string
  contributorsIds: string[]
}
