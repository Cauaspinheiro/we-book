export interface PublishDraftDTO {
  id: string
  content: string
  title: string
  description: string
  ogCover: string
  urlPath: string
  publisherId: string
  contributorsIds: string[]
}
