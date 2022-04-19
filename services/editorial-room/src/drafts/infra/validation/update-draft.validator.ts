import { UpdateDraftDTO } from 'src/drafts/domain/update-draft.dto'
import { CreateDraftValidator } from './create-draft.validator'

export class UpdateDraftValidator
  extends CreateDraftValidator
  implements UpdateDraftDTO {}
