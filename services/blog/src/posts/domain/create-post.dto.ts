export interface CreatePostDTO {
  id: string
  content: string
  description: string
  title: string
  urlPath: string | null
  publisherId: string
  contributorsIds: string[]
}
