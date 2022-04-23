export interface PublishDraftDTO {
  id: string
  content: string
  title: string
  description: string
  ogCover: string
  urlPath: string | null
  publisherId: string
  contributorsIds: string[]
}
