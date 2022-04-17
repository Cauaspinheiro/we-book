import { CreateDraftDTO } from 'src/drafts/domain/create-draft.dto'
import { IsNotEmpty } from 'class-validator'

export class CreateDraftValidator implements CreateDraftDTO {
  @IsNotEmpty()
  content: string
}
