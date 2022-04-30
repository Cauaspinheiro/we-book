export interface PublishDraftDTO {
  id: string
  content: string
  title: string
  description: string
  urlPath: string | null
  publisherId: string
  contributorsIds: string[]
}
